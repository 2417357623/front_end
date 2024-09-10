<template>
  <el-button @click='generateProduct'>部署制品</el-button>
  <div>
    <el-button @click='previousStep'>上一步</el-button>
  </div>
</template>

<script setup>
import myApi from '@/api/index.js'
const projectName = defineModel('projectName')
const activeStep = defineModel('activeStep')

const previousStep = () => {
  activeStep.value = activeStep.value -1;
}

const generateProduct = ()=>{

  myApi.generateProduct() 
}
</script>