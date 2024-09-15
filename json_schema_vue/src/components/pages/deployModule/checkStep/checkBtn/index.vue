/**
这个组件是用来校验制品的，把需要检测的制品传给后端，返回一个的表数据每个行都会增加一个标识检测结果的变量。
例如：task是这样的
{"batch":[{"taskUuid":"DS_JB_MC_00_8d695e32dc3b4039ade57c8eea8e8df6","uniqueCheck":-1,"stepConfigList":[{"stepUuid":"DS_TK_DQ_00_d34c58794a5d493395bdf5f6cefc6841","uniqueCheck":-1}]}]}
task底下的步骤也同样做校验，然后返回一个检测结果变量

*/

<template>
  <el-button @click='check'>部署校验</el-button>
</template>

<script setup>

import { useProductStore } from '@/stores/productStore.js';
import { EiInfo } from '@/utils/eiinfo.js';
import myApi from '@/api/index.js';
import { useDeployStore } from '@/stores/deployStore.js';

const props = defineProps({
  projectName: String,
});

const deployStore = useDeployStore()
const { jsonData, handledTableData ,dependencyData} = deployStore


 const check = async() => {
  let uniqueCheckInfo = {
    projectName: props.projectName,
    tableData: handledTableData.value
  }
  let inInfo = new EiInfo()
  inInfo.set("uniqueCheckInfo", uniqueCheckInfo)
  //返回校验之后的制品信息
  let uniqueRes = await myApi.uniqueCheck(inInfo)
  let uniqueResultData = uniqueRes.get("tableData")
  deployStore.setHandledTableData(uniqueResultData)

  let dependencyCheckInfo = {
    params: {
      projectName: props.projectName
    },
    dependencyData: dependencyData.value,
    tableData: handledTableData.value
  }
  let dInInfo = new EiInfo()
  dInInfo.set("dependencyCheckInfo", dependencyCheckInfo)
  myApi.dependencyCheck(dInInfo).then(res => {
    let resultData = res.get("tableData")
    deployStore.setHandledTableData(resultData)
    deployStore.computeIsImport()
  })
}

const checkArea = () => {

}

const checkBatch = () => {

}
</script>
