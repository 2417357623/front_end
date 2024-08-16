import { Download } from '@element-plus/icons-vue';
import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', ()=>{
  const menuItems = shallowRef([
    {
      ename: 'batch',
      cname: '批式任务',
      icon: Download,
    },
    {
      ename: 'table',
      cname: '表',
      icon: Download,
    },
  ]);

  const activeMenuItem = ref('批示任务');
  const setActiveMenuItem = (key) => {
    activeMenuItem.value = key
  }

  return{
    menuItems,
    activeMenuItem,
    setActiveMenuItem
  }

})