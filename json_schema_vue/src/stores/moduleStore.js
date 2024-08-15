import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ExportModule from '@/components/pages/ExportModule/ExportModule.vue'
import ImportModule from '@/components/pages/ImportModule.vue';
import ModifyModule from '@/components/pages/ModifyModule.vue';
import GenerateModule from '@/components/pages/GenerateModule.vue';
import { Download, EditPen, Upload, VideoPlay } from '@element-plus/icons-vue';
export const useModuleStore = defineStore('store',() => {
  const menuItems = shallowRef([
    {
      index: '1',
      ename: "ExportModule",
      cname: '导出',
      icon: Download,
    },
    {
      index: '2',
      ename: "ImportModule",
      cname: '导入',
      icon: Upload,
    },
    {
      index: '3',
      ename: "ModifyModule",
      cname: '修改工具',
      icon: EditPen,
    },
    {
      index: '4',
      ename: "GenerateModule",
      cname: '制品生成',
      icon: VideoPlay
    },
  ]);


  const activeMenuItem = ref('ExportModule')

  const setActiveMenuItem = (key)=>{
    activeMenuItem.value = key
  }

  const componentMap = {
    ExportModule,
    ImportModule,
    ModifyModule,
    GenerateModule
  }

  const currentMenu = computed(() => {
    return menuItems.value.find(item => item.ename === activeMenuItem.value);
  });

  const curComponent =  computed(()=>{
    return componentMap[currentMenu.value.ename]
  })

  return {
    menuItems,
    activeMenuItem,
    setActiveMenuItem,
    currentMenu,
    curComponent
  };

})