<template>
  <div class='check-content'>
    <div class='menu'>
      <DeployMenu v-model='curProduct' :menuIndex='menuIndex'></DeployMenu>
    </div>
    <div class='display'>
      <keep-alive>
        <DeployDisplay :curTableData='curTableData' :key='curProduct' :curProduct='curProduct'></DeployDisplay>
      </keep-alive>
    </div>
    <div class='overview'>
      <div style='flex-grow: 1'>
        <DeployOverview></DeployOverview>
      </div>
      <div style='margin-top: 24px;margin-bottom: 24px'>
        <CheckBtn></CheckBtn>
      </div>
      <div style='margin-bottom: 24px'>
        <el-button @click='nextStep'>下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import DeployDisplay from './deployDisplay/index.vue'
import DeployOverview from './deployOverview/index.vue'
import DeployMenu from './deployMenu/index.vue'
import CheckBtn from './checkBtn/index.vue'

//数据格式{batch:[{uuid:11,name:11},{}],table:[]}
const tableData = reactive({
  "batch": [
    {
      "revisor": " ",
      "creator": "178628",
      "topologyName": null,
      "triggerEndTime": "",
      "versionInfo": "",
      "uuid": "DS_JB_MC_00_8d695e32dc3b4039ade57c8eea8e8df6",
      "triggerRules": "定时触发 每天00:00:00",
      "showReleaseStatus": "",
      "taskType": "2",
      "versionId": null,
      "createTime": "2023-11-20 09:13:16",
      "revisetime": " ",
      "customSort": "",
      "releaseStatus": "",
      "storagePosition": "114",
      "taskName": "234234",
      "changeStatus": null,
      "triggerStartTime": "2099-12-31 00:00:00",
      "triggerRule": "1 00 00 00 * ? ?",
      "desc": ""
    },
    {
      "revisor": " ",
      "creator": "E20220000029",
      "topologyName": null,
      "triggerEndTime": "",
      "versionInfo": "",
      "uuid": "DS_JB_CL_00_0969c96bea5342768acde4d50c26b873",
      "triggerRules": "",
      "showReleaseStatus": "",
      "taskType": "1",
      "versionId": null,
      "createTime": "2022-03-24 16:45:14",
      "revisetime": " ",
      "customSort": "",
      "releaseStatus": "",
      "storagePosition": "DS_JL_00_00_6652c6ff7c3f461a88fa2cd2a4b3215b",
      "taskName": "UU",
      "changeStatus": null,
      "triggerStartTime": "",
      "triggerRule": "",
      "desc": ""
    }
  ],
  "area": [
    {
      "serialNum": "000000000",
      "recReviseTime": "2022-07-20 18:32:05",
      "dataType": "area",
      "workRegionUuid": "DY_NO_00_00_0037a9375b904749b6bf71b2d236c3b7",
      "uuid": "DY_NO_00_00_906c7e0f59bc439cb09bfd3dc1d56a66",
      "recRevisor": "179240",
      "areaCode": "AA",
      "areaId": "root->AATEST",
      "recCreator": "178996",
      "areaCodePath": "root->AA",
      "areaName": "AATEST",
      "recCreateTime": "2021-05-14 14:31:09",
      "standardRange": "0",
      "parentAreaId": "root",
      "dataLevel": "1"
    }
  ]
})
//要在menu展示的制品
const menuIndex = computed(()=>{
  return Object.keys(tableData)
})

const curProduct = ref("batch")
const curTableData = computed(()=>{
  return tableData[curProduct.value]
})

const props = defineProps({
  projectName:String
})

const activeStep = defineModel('activeStep')

const nextStep = () => {
  activeStep.value = activeStep.value +1;
}

</script>

<style scoped>
.check-content {
  display: flex;
  height: 800px;
  border: 1px solid var(--ep-border-color);
}

.menu {
  height: 100%;
}

.display {
  flex-grow: 1;
  padding: 24px;
}

.overview {
  border: 1px solid var(--ep-border-color);
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>