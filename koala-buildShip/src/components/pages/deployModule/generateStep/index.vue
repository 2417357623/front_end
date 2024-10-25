<!-- 需要有一条针对选择制品handledtableData的构建链条，至于dependyData，是在构建的基础之上进行的，只要确定好链条上制品的顺序，就能保证依赖的正确加载，我们不会对依赖进行构建，只会建立依赖和要构建的制品的联系 -->

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
