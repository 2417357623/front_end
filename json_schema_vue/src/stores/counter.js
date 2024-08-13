import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ExportModule from '@/components/pages/ExportModule/ExportModule.vue'
import { Download } from '@element-plus/icons-vue';

export const useStore = defineStore('store',() => {
  const module = ref(  {
    index:'1',
    ename:ExportModule,
    cname:'导出',
    icon:Download
  },)
  const changeValue = (newValue) =>{
    module.value = newValue
  }

  return {
    module,changeValue
  }
})