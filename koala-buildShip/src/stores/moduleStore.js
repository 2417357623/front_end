import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ExportModule from '@/components/pages/ExportModule/index.vue'
import ImportModule from '@/components/pages/importModule/index.vue';
import ModifyModule from '@/components/pages/ModifyModule.vue';
import DeployModule from '@/components/pages/deployModule/index.vue';
import { Download, EditPen, Upload, VideoPlay } from '@element-plus/icons-vue';
export const useModuleStore = defineStore('store',() => {
  const menuItems = shallowRef([
    {
      index: '1',
      ename: "ExportModule",
      cname: '制品打包',
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
      ename: "DeployModule",
      cname: '制品部署',
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
    DeployModule
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