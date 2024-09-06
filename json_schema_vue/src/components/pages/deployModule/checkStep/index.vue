<template>
  <div class='check-content'>
    <div class='menu'>
      <DeployMenu v-model='curProduct' ></DeployMenu>
    </div>
    <div class='display'>
      <keep-alive>
        <DeployDisplay :curTableData='curTableData' :key='curProduct' :curProduct='curProduct'></DeployDisplay>
      </keep-alive>
    </div>
    <div class='overview'>
      <div style='flex-grow: 1'>
        <DeployOverview :treeData='treeData'></DeployOverview>
      </div>
      <div style='margin-top: 24px;margin-bottom: 24px'>
        <CheckBtn :projectName='projectName'></CheckBtn>
      </div>
      <div style='margin-bottom: 24px;display: flex;'>
        <el-button @click='previousStep'>上一步</el-button>
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
import { useDeployStore } from '@/stores/deployStore.js';

const deployStore = useDeployStore()
const {handledTableData,menuIndex} = deployStore

const treeData = reactive({})

const curProduct = ref("batch")
const curTableData = computed(()=>{
  return handledTableData.value[curProduct.value]
})

const props = defineProps({
  projectName:String
})

const activeStep = defineModel('activeStep')

const nextStep = () => {
  activeStep.value = activeStep.value +1;
}

const previousStep = () => {
  activeStep.value = activeStep.value -1;
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