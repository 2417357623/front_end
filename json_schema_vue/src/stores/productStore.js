import { Download } from '@element-plus/icons-vue';
import { defineStore } from 'pinia'
import BatchQuery from '@/components/pages/ExportModule/queryArea/BatchQuery.vue';
import myApi from '@/api/index.js';

export const useProductStore = defineStore('productStore', ()=>{
  const productItems = shallowRef([
    {
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
          prop: 'releaseStatus',
          label: '发布状态',
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
      //已选择的制品里，要显示的列的prop
      // treeShowInfo:"taskName"
    },
    {
      ename: 'table',
      cname: '表',
      icon: Download,
    },
  ]);

  const incrementIndex = ref(0);

  const indexAddOne = ()=>{
    incrementIndex.value++
  }

  const activeMenuItem = ref('批示任务');

  const setActiveMenuItem = (key) => {
    activeMenuItem.value = key
  }

  return{
    productItems,
    activeMenuItem,
    setActiveMenuItem,
    incrementIndex,
    indexAddOne
  }

})