import { Download } from '@element-plus/icons-vue';
import { defineStore } from 'pinia'
import BatchQuery from '@/components/pages/ExportModule/dataDisplay/queryArea/BatchQuery.vue';
import AreaQuery from '@/components/pages/ExportModule/dataDisplay/queryArea/AreaQuery.vue';
import myApi from '@/api/index.js';

export const useProductStore = defineStore('productStore', ()=>{
  const productItems = reactive([
    {
      //根据index判断唯一制品，和ename一致
      index:"batch",
      //选项的值
      ename: 'batch',
      //option选项的显示值
      cname: '批式任务',
      //制品图表
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
      curComponent: null,
      //查询部分
      queryArea:{
        taskName:'任务名称',
        taskType:'任务类型'
      },
      //查询数据调用的接口
      getDataMethod: myApi.getBatchInfo,
      //已选择的制品里，要显示的列信息的prop
      treeShowInfo:"taskName"
    },
    {
      //根据index判断唯一制品，和ename一致
      index:"area",
      //选项的值
      ename: 'area',
      //option选项的显示值
      cname: '数据分类',
      //制品图表
      icon: Download,
      //查询结果需要显示的列
      column: [
        {
          prop: 'areaName',
          label: '中文名',
          width: '',
        },
        {
          prop: 'areaCode',
          label: '代码',
          width: '',
        },
        {
          prop: 'dataType',
          label: '类型',
          width: '',
        },
        {
          prop: 'areaId',
          label: '全路径',
          width: '',
        },
      ],
      //查询组件
      curComponent: null,
      queryArea:{
        areaName:'中文名',
        areaCode:'代码'
      },
      //查询数据调用的接口
      getDataMethod: myApi.getAreaInfo,
      //已选择的制品里，要显示的列信息的prop
      treeShowInfo:"areaName"
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

  const getQueryArea = (index)=>{
    productItems.find(item => item.index === index)?.queryArea
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