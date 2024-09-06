import { ref, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { checkFlag, productConfig } from '@/constant/productConfig.js';

export const useDeployStore = () => {

  const store = defineStore('deployStore', () => {

//从文件夹中解析出来的原始json信息，用来做部署校验
//数据格式{"batch":{"objType":"TASK","resourceList":[],"baseDataList":[]},"area":{"baseDataList":[{"serialNum":"000000000","recReviseTime":"2022-07-20 18:32:05","dataType":"area","workRegionUuid":"DY_NO_00_00_0037a9375b904749b6bf71b2d236c3b7","uuid":"DY_NO_00_00_906c7e0f59bc439cb09bfd3dc1d56a66","recRevisor":"179240","areaCode":"AA","areaId":"root->AATEST","recCreator":"178996","areaCodePath":"root->AA","areaName":"AATEST","recCreateTime":"2021-05-14 14:31:09","standardRange":"0","parentAreaId":"root","dataLevel":"1"}],"type":"area"}}
    const jsonData = ref({});

    //数据格式{batch:[{uuid:11,name:11},{}],table:[]}
    const handledTableData = ref({});

    //要在menu展示的制品
    const menuIndex = computed(() => {
      return Object.keys(handledTableData.value);
    });


    //数据格式[{uuid:11,name:11},{uuid:11,name:11}]
    const stepData = computed(() => {
      if (handledTableData.value.hasOwnProperty('batch')) {
        let array = handledTableData.value.batch;
        let allStep = [];
        array.forEach((item) => {
          allStep = [...allStep, ...item?.stepConfigList];
        });
        let result = addColumnVariable(allStep, checkFlag.variable, 0);
        return result;
      }
    });

    const setJsonData = (value) => {
      jsonData.value = value;
    };

    const setHandledTableData = (value) => {
      handledTableData.value = value;
    };

    //一旦传入应用的jsonData变化，也就是导入的资料变化，那么立马对立面的文件进行解析，获取需要呈现的内容。
    watch(jsonData, (newVal) => {
      let obj = handleJsonData(jsonData.value);
      handledTableData.value = obj;
    }, { deep: true });

    //找到某个特定key的数组，即为需要在表格中展示的某一制品的表格数据。这个key需要在constant配置中配置好。
    const findArray = (targetKey, productInfo) => {
      // 检查当前对象是否是数组
      if (Array.isArray(productInfo)) {
        return null; // 如果是数组，直接返回 null，因为我们找的是数组本身
      }

      // 遍历对象的每个属性
      for (const key in productInfo) {
        if (productInfo.hasOwnProperty(key)) {
          const value = productInfo[key];

          // 检查当前 key 是否匹配 targetKey 且值是一个数组
          if (key === targetKey && Array.isArray(value)) {
            return value; // 找到第一个匹配的数组，直接返回
          }

          // 如果值是一个对象，递归搜索
          if (typeof value === 'object' && value !== null) {
            const result = findArray(targetKey, value);
            if (result) {
              return result; // 如果在递归中找到匹配项，返回结果
            }
          }
        }
      }

      return null; // 如果没有找到匹配的数组，返回 null
    };

    const addColumnVariable = (array, key, value) => {
      // 使用 map 方法为每个对象添加 uniqueCheckStatus
      //如果需要把变量应用在key上要加[]
      const updatedArray = array.map(item => ({
        ...item, // 保留原有的属性
        [key]: value, // 添加 newKey 属性
      }));

      return updatedArray;
    };

//处理从导入后得到的完整json信息，得到可以展示的表格信息。（依赖信息也需要从中提取，在别的方法处理）
    const handleJsonData = (jsonData) => {
      let obj = {};
      Object.entries(jsonData).forEach(([key, value]) => {
        //如果解析的key是在所有已配置的制品里的，就要把这些key对应的值解析到表格里展示出来
        if (productConfig.getAllProductIndex().includes(key)) {
          //对展示的基本数据存放的key进行了统一
          // let targetKey = getOneProduct(key)?.jsonDataShowInfo;
          let targetKey = 'baseDataList';
          let dataArray = findArray(targetKey, value);
          //加入校验状态
          obj[key] = addColumnVariable(dataArray, checkFlag.variable, 0);
          //对batch的stepConfigList单独处理
          if(key == 'batch'){
            dataArray.forEach((item)=>{
              item.stepConfigList = addColumnVariable(item.stepConfigList, checkFlag.variable, 0)
            })
          }
        }

      });
      return obj;
    };


    return {
      jsonData,
      handledTableData,
      setJsonData,
      menuIndex,
      setHandledTableData,
      stepData,
    };

  })();

  const storeObj = { ...store, ...storeToRefs(store) };

  // 透過傳入的參數決定該元件是否要在onMounted或onActivated生命週期中更新資料，
  // 需要注意的是生命週期要放在useUsersStore這層，而不是defineStore裡面，因為defineStore只會執行一次
  // 如果放在defineStore裡面，那就只有第一次呼叫useUsersStore建立該users store的元件的生命週期有綁定而已，
  // 之後呼叫useUsersStore的元件就沒有綁定onMounted或onActivated了
  onMounted(() => {

  });

  // onActivated for KeepAlive use
  onActivated(() => {
  });

  return storeObj;
};