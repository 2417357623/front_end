import {ref, computed} from 'vue'
import {defineStore, storeToRefs} from 'pinia'
import {checkFlag, productConfig} from '@/config/productConfig.js'
import * as CONSTANTS from '@/constant/index.js'


export const  useDeployStore = () => {
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
            let data = {...JSON.parse(JSON.stringify(jsonData.value))}
            const {tData, dData} = handleJsonData(data)
            handledTableData.value = tData
            dependencyData.value = dData
        })

        //每当依赖校验结束，需要根据返回的数据，判断依赖校验的表格显示值，并且对缺失的依赖信息做提示
        const computeDependencyCheck = ()=>{
            Object.entries(handledTableData.value).forEach(
                ([key,productArray])=>{
                    let requiredDependency = productConfig.getRequiredDependency(key)
                    let unrequiredDependency = productConfig.getUnrequiredDependency(key)
                    let dependency  = dependencyData.value[key]
                    productArray.forEach(
                        (productItem)=>{
                            productItem[checkFlag.dependencyCheck.variable] = CONSTANTS.CHECK_SUCCESS
                            unrequiredDependency.forEach((dependencyVariable) =>{
                                //某一个制品列表对象的依赖的字符串
                                let dependencyStr = productItem[dependencyVariable]
                                let dependencyArr = dependencyStr ? dependencyStr.split(',') : []
                                dependencyArr.forEach(
                                    (uuid)=>{
                                        let obj = dependency[dependencyVariable].find( item => item.uuid === productItem.uuid)
                                        if(!obj.isExist){
                                            productItem[checkFlag.dependencyCheck.variable] = CONSTANTS.CHECK_WARN
                                        }
                                    }
                                )
                            })
                            requiredDependency.forEach((dependencyVariable) =>{
                                //某一个制品列表对象的依赖的字符串
                                let dependencyStr = productItem[dependencyVariable]
                                let dependencyArr = dependencyStr ? dependencyStr.split(',') : []
                                dependencyArr.forEach(
                                    (uuid)=>{
                                        let obj = dependency[dependencyVariable].find( item => item.uuid === uuid)
                                        if(!obj.isExist){
                                            productItem[checkFlag.dependencyCheck.variable] = CONSTANTS.CHECK_FAILED
                                        }
                                    }
                                )
                            })
                        }
                    )
                }
            )
        }


        //每次部署校验的时候调用，根据校验结果都要重新计算策略列的值，只有成功的才会是导入状态。其余默认不导入
        const computeIsImport = ()=>{
            Object.entries(handledTableData.value).map(
                ([key, productArray]) => {
                    productArray.forEach(item => {
                        item.isImport = item[checkFlag.uniqueCheck.variable] == CONSTANTS.CHECK_SUCCESS && item[checkFlag.dependencyCheck.variable] == CONSTANTS.CHECK_SUCCESS
                    })
                    handledTableData.value[key] = productArray
                }
            )
        }

        //用于部署的数据，根据是否导入的列，取出需要导入的数据
        const generateTableData = computed(() => {
            let resultObj = {}
            let data = {...JSON.parse(JSON.stringify(handledTableData.value))}
            const filteredProducts = Object.entries(data).map(
                ([key, productArray]) =>
                    (resultObj[key] = productArray.filter(
                        (item) =>
                            item.isImport == true
                    ))
            )
            return resultObj
        })

        //要在menu展示的制品
        const menuIndex = computed(() => {
            return Object.keys(handledTableData.value)
        })

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

        //基于handledTableData，筛选出里面出了问题的数据,步骤的问题统一不显示，而是用隶属的任务来展示
        const failedTableData = computed(() => {
            return getFailedProduct()
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

        const setJsonData = (value) => {
            jsonData.value = value
        }

        const setHandledTableData = (value) => {
            handledTableData.value = value
        }

        const setDependencyData = (value) => {
            dependencyData.value = value
        }

        //找到某个特定key的数组，即为需要在表格中展示的某一制品的表格数据。这个key需要在constant配置中配置好。
        const findArray = (targetKey, productInfo) => {
            // 检查当前对象是否是数组
            if (Array.isArray(productInfo)) {
                return null // 如果是数组，直接返回 null，因为我们找的是数组本身
            }

            // 遍历对象的每个属性
            for (const key in productInfo) {
                if (productInfo.hasOwnProperty(key)) {
                    const value = productInfo[key]

                    // 检查当前 key 是否匹配 targetKey 且值是一个数组
                    if (key === targetKey && Array.isArray(value)) {
                        return value // 找到第一个匹配的数组，直接返回
                    }

                    // 如果值是一个对象，递归搜索
                    if (typeof value === 'object' && value !== null) {
                        const result = findArray(targetKey, value)
                        if (result) {
                            return result // 如果在递归中找到匹配项，返回结果
                        }
                    }
                }
            }

            return null // 如果没有找到匹配的数组，返回 null
        }

        const addColumnVariable = (array, key, value) => {
            // 使用 map 方法为每个对象添加 uniqueCheckStatus
            //如果需要把变量应用在key上要加[]
            const updatedArray = array.map((item) => ({
                ...item, // 保留原有的属性
                [key]: value // 添加 newKey 属性
            }))

            return updatedArray
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
                    let temp = addColumnVariable(dataArray, checkFlag.uniqueCheck.variable, CONSTANTS.CHECK_UNDO)
                    temp = addColumnVariable(temp, "isImport", false)
                    obj.tData[key] = addColumnVariable(temp, checkFlag.dependencyCheck.variable, CONSTANTS.CHECK_UNDO)
                    //对batch的stepConfigList单独加上校验状态，因为只有task有子展示项step
                    if (key == 'batch') {
                        dataArray.forEach((item, index) => {
                            let temp = addColumnVariable(item.stepConfigList, checkFlag.uniqueCheck.variable, CONSTANTS.CHECK_UNDO)
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

        const getFailedProduct = () => {
            let data = {...JSON.parse(JSON.stringify(handledTableData.value))}
            let resultObj = {}
            const filteredProducts = Object.entries(data).map(
                ([key, productArray]) =>
                    (resultObj[key] = productArray.filter(
                        (item) =>
                            item[checkFlag.uniqueCheck.variable] != 1 ||
                            item[checkFlag.dependencyCheck.variable] != 1
                    ))
            )
            return resultObj
        }

        const isAllChecked = () => {
            let data = {...JSON.parse(JSON.stringify(handledTableData.value))}
            let array = []
            let flag = true
            const filteredProducts = Object.entries(data).map(([key, productArray]) => {
                array = productArray.filter(
                    (item) =>
                        item[checkFlag.uniqueCheck.variable] == 0 ||
                        item[checkFlag.dependencyCheck.variable] == 0
                )
                if (array.length > 0) {
                    flag = false
                }
            })
            return flag
        }

        const isAllHasDependency = () => {
            let data = {...JSON.parse(JSON.stringify(handledTableData.value))}
            let array = []
            let flag = true
            const filteredProducts = Object.entries(data).map(([key, productArray]) => {
                array = productArray.filter((item) => item[checkFlag.dependencyCheck.variable] == -1)
                if (array.length > 0) {
                    flag = false
                }
            })
            return flag
        }

        const isAllUnique = () => {
            let data = {...JSON.parse(JSON.stringify(handledTableData.value))}
            let array = []
            let flag = true
            const filteredProducts = Object.entries(data).map(([key, productArray]) => {
                array = productArray.filter((item) => item[checkFlag.uniqueCheck.variable] == -1)
                if (array.length > 0) {
                    flag = false
                }
            })
            return flag
        }

        //当部署制品信息输入完，点击下一步之后，需要重置当前的校验状态
        const resetTableData = () => {
            Object.entries(handledTableData.value).forEach(([key, productArray]) => {
                productArray.forEach((item) => {
                    item[checkFlag.uniqueCheck.variable] = CONSTANTS.CHECK_UNDO
                    item[checkFlag.dependencyCheck.variable] = CONSTANTS.CHECK_UNDO
                    item.isImport = false
                })
                if (key == 'batch') {
                    productArray.forEach((item) => {
                        item.stepConfigList.forEach((stepItem) => {
                            stepItem[checkFlag.uniqueCheck.variable] = 0
                            stepItem[checkFlag.dependencyCheck.variable] = 0
                        })
                    })
                }
            })
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
            isAllChecked,
            isAllHasDependency,
            isAllUnique,
            resetTableData,
            computeIsImport,
            computeDependencyCheck,
            setDependencyData
        }
    })()

    const storeObj = {...store, ...storeToRefs(store)}

    // 透過傳入的參數決定該元件是否要在onMounted或onActivated生命週期中更新資料，
    // 需要注意的是生命週期要放在useUsersStore這層，而不是defineStore裡面，因為defineStore只會執行一次
    // 如果放在defineStore裡面，那就只有第一次呼叫useUsersStore建立該users store的元件的生命週期有綁定而已，
    // 之後呼叫useUsersStore的元件就沒有綁定onMounted或onActivated了
    onMounted(() => {
    })

    // onActivated for KeepAlive use
    onActivated(() => {
    })

    return storeObj
}
