<template>
  <div class='content'>
    <div class='stepMenu'>
      <StepMenu :activeStep='activeStep'></StepMenu>
    </div>
    <div>
      <div v-if="activeStep === 1">
        <PrepareStep v-model:projectName='projectName' v-model:activeStep='activeStep'></PrepareStep>
      </div>
      <div v-else-if="activeStep === 2">
        <CheckStep :projectName='projectName' v-model:activeStep='activeStep'></CheckStep>
      </div>
      <div v-else-if="activeStep === 3">
        <GenerateStep></GenerateStep>
      </div>
    </div>
  </div>
</template>

<script setup>
import StepMenu from '../deployModule/stepMenu/index.vue'
import PrepareStep from '../deployModule/prepareStep/index.vue'
import GenerateStep from '../deployModule/generateStep/index.vue'
import CheckStep from '../deployModule/checkStep/index.vue'

const activeStep = ref(1);
const projectName = ref()

onMounted(
    ()=>{
      console.log('onMounted')
    }
)

</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}

.stepMenu {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-bottom: 24px; /* 根据需要调整间距 */
}

</style>