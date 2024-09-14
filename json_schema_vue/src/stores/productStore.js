import { defineStore, storeToRefs } from 'pinia';
import {productConfig} from '@/config/productConfig.js'

export const useProductStore = ()=>{

  const store = defineStore('productStore', ()=>{

    //el-table 和 el-tree 的联动数据
    const createObj = ()=>{
      let obj = {}
      productConfig.productItems.map((item)=>{
        obj[item.index] = []
      })
      return obj
    }

    //一定要在响应式对象创建的时候完成数据的初始化
    //数据格式{batch:[{uuid:11,name:11},{}],table:[]}
    const tableSelectedRows = ref(createObj())
    //数据格式{batch:["111","222"],table:[]}
    const tableSelectedIndex = ref(createObj())

    const treeSelectedRows = ref([])
    const treeSelectedIndex = ref([])

    const activeMenuItem = ref('批式任务');

    const setActiveMenuItem = (key) => {
      activeMenuItem.value = key
    }

    const setTableSelectedRows = (value) => {
      tableSelectedRows.value = value
    }

    const setTableSelectedIndex = (value) => {
      tableSelectedIndex.value = value
    }

    const setTreeSelectedIndex = (value) =>{
      treeSelectedIndex.value = value
    }

    return{
      activeMenuItem,
      treeSelectedRows,
      tableSelectedRows,
      tableSelectedIndex,
      treeSelectedIndex,
      setTableSelectedRows,
      setActiveMenuItem,
      setTableSelectedIndex,
      setTreeSelectedIndex
    }

  })()

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
}