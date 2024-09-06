<template>
  <el-button @click='check'>部署校验</el-button>
</template>

<script setup>

import { useProductStore } from '@/stores/productStore.js';
import { EiInfo } from '@/utils/eiinfo.js';
import myApi from '@/api/index.js';
import { useDeployStore } from '@/stores/deployStore.js';

const props = defineProps({
  projectName:String,
});

const deployStore = useDeployStore()
const {jsonData,handledTableData} = deployStore


const check = ()=>{
  let uniqueCheckInfo = {
    projectName:props.projectName,
    tableData:handledTableData.value
  }
  let inInfo = new EiInfo()
  inInfo.set("uniqueCheckInfo",uniqueCheckInfo)
  //返回校验未通过的制品信息
  myApi.uniqueCheck(inInfo).then(res =>{
    let resultData = res.get("tableData")
    deployStore.setHandledTableData(resultData)
  })
  let dependencyCheckInfo = {
    projectName:props.projectName,
    jsonData:jsonData.value,
    tableData:handledTableData.value
  }
  let dInInfo = new EiInfo()
  dInInfo.set("dependencyCheckInfo",dependencyCheckInfo)
  myApi.dependencyCheck(dInInfo).then(res =>{
    let resultData = res.get("tableData")
    deployStore.setHandledTableData(resultData)
  })
}

const checkArea = ()=>{

}

const checkBatch = ()=>{

}
</script>
