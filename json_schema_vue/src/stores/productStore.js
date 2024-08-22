import { Download } from '@element-plus/icons-vue';
import { defineStore } from 'pinia'
import BatchQuery from '@/components/pages/ExportModule/queryArea/BatchQuery.vue';
import myApi from '@/api/index.js';

export const useProductStore = defineStore('productStore', ()=>{
  const productItems = shallowRef([
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
      //已选择的制品里，要显示的列的prop
      treeShowInfo:"taskName"
    },
    {
      index:'table',
      ename: 'table',
      cname: '表',
      icon: Download,
    },
  ]);

  const incrementIndex = ref(0);

  //el-table 和 el-tree 的联动数据
  const selectionItemsForTable = ref([])
  const selectionItemsForTree = ref([])


  const indexAddOne = ()=>{
    incrementIndex.value++
  }

  const activeMenuItem = ref('批式任务');

  const setActiveMenuItem = (key) => {
    activeMenuItem.value = key
  }

  return{
    productItems,
    activeMenuItem,
    setActiveMenuItem,
    incrementIndex,
    indexAddOne,
    selectionItemsForTree,
    selectionItemsForTable
  }

})