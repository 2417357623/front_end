import { ref, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { checkFlag, productConfig } from '@/config/index.js'
import * as CONSTANTS from '@/constant/index.js'
import {
  pickObj,
  deepClone,
  handleEveryRow,
  filterTableData,
  findArray,
  addColumnVariable,
  handleDependencyRow
} from '../utils/utilFunction'

export const useDeployStore = () => {
  const store = defineStore('deployStore', () => {
    //从文件夹中解析出来的原始json信息，用来做部署校验
    //数据格式{"batch":{"objType":"TASK","resourceList":[],"baseDataList":[]},"area":{"baseDataList":[{"serialNum":"000000000","recReviseTime":"2022-07-20 18:32:05","dataType":"area","workRegionUuid":"DY_NO_00_00_0037a9375b904749b6bf71b2d236c3b7","uuid":"DY_NO_00_00_906c7e0f59bc439cb09bfd3dc1d56a66","recRevisor":"179240","areaCode":"AA","areaId":"root->AATEST","recCreator":"178996","areaCodePath":"root->AA","areaName":"AATEST","recCreateTime":"2021-05-14 14:31:09","standardRange":"0","parentAreaId":"root","dataLevel":"1"}],"type":"area"}}
    const jsonData = ref({})

    //一旦传入应用的jsonData变化，也就是导入的资料变化，那么立马对立面的文件进行解析，获取需要呈现的内容。
    //数据格式{batch:[{uuid:11,name:11},{}],table:[]}
    const handledTableData = ref({})

    //提供给依赖校验的信息，确保制品部署之前，所需要的依赖链条的数据，都在制品包里或者新环境里
    //数据格式{batch:{stepList :[{},{}],dataSourceList :[{},{}]},table.....}
    const dependencyData = ref({})

    //handledTableData会在别的地方手动的改变值，所以不能用compute来定义
    //同时解析出依赖的信息
    watch(jsonData, () => {
      let data = { ...JSON.parse(JSON.stringify(jsonData.value)) }
      const { tData, dData } = handleJsonData(data)
      handledTableData.value = tData
      dependencyData.value = dData
    })

    const combinedDependencyData = computed(() => {
      return combineDependency(dependencyData.value)
    })

    const unexistDependencyData = computed(() => {
      return getUnexistDependency(combinedDependencyData.value)
    })

    //用于部署的数据，根据是否导入的列，取出需要导入的数据
    const generateTableData = computed(() => {
      let objCopy = deepClone(handledTableData.value)
      return filterTableData(objCopy, (item, key) => {
        return item.isImport == true
      })
    })

    //要在menu展示的制品
    const menuIndex = computed(() => {
      return Object.keys(handledTableData.value)
    })

    //基于handledTableData，筛选出里面出了问题的数据,步骤的问题统一不显示，而是用隶属的任务来展示
    const failedTableData = computed(() => {
      return getFailedProduct(handledTableData.value)
    })

    //检验信息展示里需要的数据，数据结构是个tree，根据失败的数据来展示
    const treeData = computed(() => {
      //格式化
      let formatData = []
      Object.entries(failedTableData.value).forEach(([key, value]) => {
        if (value.length > 0) {
          let curObject = {}
          let childrenArray = []
          let cname = productConfig.getOneProduct(key)?.cname
          curObject['label'] = cname
          let treeShowInfo = productConfig.getOneProduct(key)?.treeShowInfo
          let uuidDescKey = productConfig.getOneProduct(key)?.uuidDescKey
          childrenArray = value.map((item) => {
            return {
              index: item[uuidDescKey],
              label: item[treeShowInfo]
            }
          })
          curObject['children'] = childrenArray
          formatData.push(curObject)
        }
      })
      return formatData
    })
    //每当依赖校验结束，需要根据返回的数据，判断依赖校验的表格显示值，并且对缺失的依赖信息做提示
    //参数：制品表的每一行,该制品行的制品列别.为每个行数据加上一个下拉展示错误信息的列。并且根据不同的依赖存在信息，显示不同的依赖校验状态。
    const processProductItemDependencies = (productItem, key) => {
      let requiredDependency = productConfig.getRequiredDependency(key)
      let unrequiredDependency = productConfig.getUnrequiredDependency(key)
      let dependency = dependencyData.value[key]

      productItem[checkFlag.dependencyCheck.variable] = CONSTANTS.CHECK_SUCCESS
      productItem.valueForExpendRow = {
        unrequired: [],
        required: []
      }
      unrequiredDependency.forEach((item) => {
        //获取被依赖制品的列的key
        let dependencyVariable = productConfig.getOneProductDependencyListName(item)
        //获取被依赖制品的唯一性校验的字段.
        let uniqueCheck = productConfig.getUniqueCheck(item)
        //某一个制品列表对象的依赖的字符串
        let dependencyStr = productItem[dependencyVariable]
        let dependencyArr = dependencyStr ? dependencyStr.split(',') : []
        dependencyArr.forEach((uuid) => {
          let obj = dependency[dependencyVariable].find((item) => item.uuid === productItem.uuid)
          let showObj = pickObj(obj, uniqueCheck)
          if (!obj.isExist) {
            productItem[checkFlag.dependencyCheck.variable] = CONSTANTS.CHECK_WARN
            productItem.valueForExpendRow.unrequired.push(showObj)
          }
        })
      })
      requiredDependency.forEach((item) => {
        //获取被依赖制品的列的key
        let dependencyVariable = productConfig.getOneProductDependencyListName(item)
        //获取被依赖制品的唯一性校验的字段.
        let uniqueCheck = productConfig.getUniqueCheck(item)
        //某一个制品列表对象的依赖的字符串
        let dependencyStr = productItem[dependencyVariable]
        let dependencyArr = dependencyStr ? dependencyStr.split(',') : []
        dependencyArr.forEach((uuid) => {
          let obj = dependency[dependencyVariable].find((item) => item.uuid === uuid)
          let showObj = pickObj(obj, uniqueCheck)
          if (!obj.isExist) {
            productItem[checkFlag.dependencyCheck.variable] = CONSTANTS.CHECK_FAILED
            productItem.valueForExpendRow.required.push(showObj)
          }
        })
      })

      return productItem
    }

    const computeDependencyCheck = (obj) => {
      obj = handleEveryRow(obj, processProductItemDependencies)
      return computeIsImport(obj)
    }

    //每次部署校验的时候调用，根据校验结果都要重新计算策略列的值，只有成功的才会是导入状态。其余默认不导入
    const computeIsImport = (obj) => {
      // Define the compute function
      let compute = (item, key) => {
        let itemCopy = deepClone(item) // Clone each item
        itemCopy.isImport =
          itemCopy[checkFlag.uniqueCheck.variable] == CONSTANTS.CHECK_SUCCESS &&
          itemCopy[checkFlag.dependencyCheck.variable] == CONSTANTS.CHECK_SUCCESS
        return itemCopy
      }

      // Process the copied object
      return handleEveryRow(obj, compute)
    }

    //从任务里得到的步骤的数据
    //数据格式[{uuid:11,name:11},{uuid:11,name:11}]
    const stepData = computed(() => {
      if (handledTableData.value.hasOwnProperty('batch')) {
        let array = handledTableData.value.batch
        let allStep = []
        array.forEach((item) => {
          allStep = [...allStep, ...item?.stepConfigList]
        })
        let temp = addColumnVariable(allStep, checkFlag.uniqueCheck.variable, CONSTANTS.CHECK_UNDO)
        let result = addColumnVariable(temp, checkFlag.uniqueCheck.variable, CONSTANTS.CHECK_UNDO)
        return result
      }
    })

    const setJsonData = (value) => {
      jsonData.value = value
    }

    const setHandledTableData = (value) => {
      handledTableData.value = value
    }

    const setDependencyData = (value) => {
      dependencyData.value = value
    }

    //处理从导入后得到的完整json信息，得到可以展示的表格信息。（依赖信息也需要从中提取，在别的方法处理）
    const handleJsonData = (jsonData) => {
      let obj = {
        tData: {},
        dData: {}
      }
      Object.entries(jsonData).forEach(([key, value]) => {
        //如果解析的key是在所有已配置的制品里的，就要把这些key对应的值解析到表格里展示出来
        if (productConfig.getAllProductIndex().includes(key)) {
          let targetKey = 'baseDataList'
          let dataArray = findArray(targetKey, value)

          //加入校验状态,策略
          let temp = addColumnVariable(
            dataArray,
            checkFlag.uniqueCheck.variable,
            CONSTANTS.CHECK_UNDO
          )
          temp = addColumnVariable(temp, 'isImport', false)
          obj.tData[key] = addColumnVariable(
            temp,
            checkFlag.dependencyCheck.variable,
            CONSTANTS.CHECK_UNDO
          )
          //对batch的stepConfigList单独加上校验状态，因为只有task有子展示项step
          if (key == 'batch') {
            dataArray.forEach((item, index) => {
              let temp = addColumnVariable(
                item.stepConfigList,
                checkFlag.uniqueCheck.variable,
                CONSTANTS.CHECK_UNDO
              )
              obj.tData[key][index].stepConfigList = addColumnVariable(
                temp,
                checkFlag.dependencyCheck.variable,
                0
              )
            })
          }

          //提取所有的dependency
          obj.dData[key] = value.dependency
        }
      })
      return obj
    }

    const getFailedProduct = (obj) => {
      let resultObj = {}
      const filteredProducts = Object.entries(obj).map(
        ([key, productArray]) =>
          (resultObj[key] = productArray.filter(
            (item) =>
              item[checkFlag.uniqueCheck.variable] != 1 ||
              item[checkFlag.dependencyCheck.variable] != 1
          ))
      )
      return resultObj
    }

    //当部署制品信息输入完，点击下一步之后，需要重置当前的校验状态
    const resetTableData = (obj) => {
      const handleMethod = (item, key) => {
        let itemCopy = deepClone(item)
        itemCopy[checkFlag.uniqueCheck.variable] = CONSTANTS.CHECK_UNDO
        itemCopy[checkFlag.dependencyCheck.variable] = CONSTANTS.CHECK_UNDO
        itemCopy.isImport = false
        if (key == 'batch') {
          itemCopy.stepConfigList.forEach((stepItem) => {
            stepItem[checkFlag.uniqueCheck.variable] = 0
            stepItem[checkFlag.dependencyCheck.variable] = 0
          })
        }
        return itemCopy
      }
      return handleEveryRow(obj, handleMethod)
    }

    const resetDependencyData = (obj) => {
       

    }
    //---------------------------------------------------- 依赖这块的数据作用，制品部署的时候用来确定唯一的对应的制品。显示错误的依赖信息。可以切换依赖
    //一个纯函数，功能拆开第一层，把后面一样的数组的内容拼到一起
    const combineDependency = (obj) => {
      let object = deepClone(obj)
      let result = {}
      Object.entries(object).forEach(([key, value]) => {
        //value是个对象，把里面同样值的key合并到一起，形成新的数组
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (!result[subKey]) {
            result[subKey] = []
          }
          result[subKey] = result[subKey].concat(subValue)
        })
      })
      return result
    }

    //找到处理过的在目标环境缺失的依赖对象
    const getUnexistDependency = (obj) => {
      let object = deepClone(obj)
      let result = {}
      Object.entries(object).forEach(([key, value]) => {
        result[key] = value.filter((item) => item?.isExist == false)
      })
      return result
    }

    const replaceDependencyData = (form, dependencyObj, handledTableObj) => {
      let connectObj = form.connect
      Object.entries(connectObj).map(([uuid, newObj]) => {
        let a = changeTableObjUuid(uuid, newObj,handledTableObj, 'connect')
        let b = changeDependencyObj(uuid, newObj, dependencyObj)
      })
    }

    const changeTableObjUuid = (uuid, newObj,handledTableObj, productType) => {
        let dependencyListName = getOneProductDependencyListName(productType)
        let newUuid = newObj.uuid
        let handleMethod = (item, key) => {
            let itemCopy = deepClone(item)
            itemCopy[dependencyListName].map(subItem => {
                return subItem == uuid ? newUuid : item;
              });
            return itemCopy  
        }
        return handleEveryRow(handledTableObj,handleMethod)
    }

    const changeDependencyObj = (uuid, newObj, dependencyObj, productType) => {
        let handleMethod = (item, key,subKey) => {
            if(item.uuid == uuid){
                return newObj
            }else {
                return item
            }
        }
        return handleDependencyRow(dependencyObj,handleMethod)
    }


    return {
      jsonData,
      handledTableData,
      dependencyData,
      setJsonData,
      menuIndex,
      setHandledTableData,
      stepData,
      treeData,
      generateTableData,
      combinedDependencyData,
      unexistDependencyData,
      resetTableData,
      computeIsImport,
      computeDependencyCheck,
      setDependencyData,
      replaceDependencyData
    }
  })()

  const storeObj = { ...store, ...storeToRefs(store) }

  // 透過傳入的參數決定該元件是否要在onMounted或onActivated生命週期中更新資料，
  // 需要注意的是生命週期要放在useUsersStore這層，而不是defineStore裡面，因為defineStore只會執行一次
  // 如果放在defineStore裡面，那就只有第一次呼叫useUsersStore建立該users store的元件的生命週期有綁定而已，
  // 之後呼叫useUsersStore的元件就沒有綁定onMounted或onActivated了
  onMounted(() => {})

  // onActivated for KeepAlive use
  onActivated(() => {})

  return storeObj
}
