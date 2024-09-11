<template>
  <el-button @click='generateProduct'>部署制品</el-button>
  <div>
    <el-button @click='previousStep'>上一步</el-button>
  </div>
</template>

<script setup>
import myApi from '@/api/index.js'
import { EiInfo } from '@/utils/eiinfo.js';
import { useDeployStore } from '@/stores/deployStore.js';

const props = defineProps({
  projectName: String,
});

const activeStep = defineModel('activeStep')
const deployStore = useDeployStore()
const { jsonData, generateTableData ,dependencyData} = deployStore

const previousStep = () => {
  activeStep.value = activeStep.value - 1;
}

const generateProduct = () => {
  const generateInfo = {
    params: {
      projectName: props.projectName,
      storagePosition:""
    },
    dependencyData: dependencyData.value,
    tableData: generateTableData.value
  }
  let inInfo = new EiInfo()
  inInfo.set("generateInfo", generateInfo)
  myApi.generateProduct(inInfo).then(res => {
  })
}
</script>