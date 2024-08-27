import { Download } from '@element-plus/icons-vue';
import { defineStore } from 'pinia'
import BatchQuery from '@/components/pages/ExportModule/dataDisplay/queryArea/BatchQuery.vue';
import myApi from '@/api/index.js';

export const useProductStore = defineStore('productStore', ()=>{
  const productItems = reactive([
    {
      //根据index判断唯一制品，和ename一致
      index:"batch",
      ename: 'batch',
      cname: '批式任务',
      icon: Download,
      //查询结果需要显示的列
      column: [
        {
          prop: 'taskName',
          label: '任务名称',
          width: '',
        },
        {
          prop: 'desc',
          label: '任务描述',
          width: '',
        },
        {
          prop: 'taskType',
          label: '任务类型',
          width: '',
        },
      ],
      //查询组件
      curComponent: BatchQuery,
      //查询数据调用的接口
      getDataMethod: myApi.getBatchInfo,
      //已选择的制品里，要显示的列信息的prop
      treeShowInfo:"taskName"
    },
    {
      index:'table',
      ename: 'table',
      cname: '表',
      icon: Download,
    },
  ]);

  //el-table 和 el-tree 的联动数据
  const createObj = ()=>{
    let obj = {}
    productItems.map((item)=>{
      obj[item.index] = []
    })
    return obj
  }

  //一定要在响应式对象创建的时候完成数据的初始化
  //数据格式{batch:[{uuid:11,name:11},{}],table:[]}
  const tableSelectedRows = reactive(createObj())
  //数据格式{batch:["111","222"],table:[]}
  const tableSelectedIndex = reactive(createObj())

  const treeSelectedRows = reactive([])
  const treeSelectedIndex = reactive([])


  const activeMenuItem = ref('批式任务');

  const setActiveMenuItem = (key) => {
    activeMenuItem.value = key
  }

  const getOneProduct = (index)=>{
    return productItems.find(item => item.index === index)
  }


  return{
    productItems,
    activeMenuItem,
    setActiveMenuItem,
    treeSelectedRows,
    tableSelectedRows,
    tableSelectedIndex,
    treeSelectedIndex
  }

})