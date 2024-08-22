<template>
  <div class='inputCompose'>
    <div style='white-space: nowrap'>任务名称</div>
    <el-input v-model='taskName'></el-input>
  </div>
  <div class='inputCompose'>
    <div style='white-space: nowrap'>任务描述</div>
    <el-input v-model='desc'></el-input>
  </div>
  <div class='inputCompose'>
    <div style='white-space: nowrap'>任务类型</div>
    <el-input v-model='taskType'></el-input>
  </div>
  <div class='inputCompose'>
    <div style='white-space: nowrap'>发布状态</div>
    <el-input v-model='releaseStatus'></el-input>
  </div>
  <div>
    <el-button @click='query'>
      查询
    </el-button>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus';

const taskName = ref();
const desc = ref();
const taskType = ref();
const releaseStatus = ref();

const queryInfo = defineModel()

const props = defineProps(['projectName'])

const query = () => {
  if(!props.projectName){
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: teal' }, '请选择工作空间'),
      position: 'top-right',
      duration:0
    })
    return;
  }

  queryInfo.value = {
      taskName: taskName.value,
      desc: desc.value,
      taskType: taskType.value,
      releaseStatus: releaseStatus.value,
      projectName: props.projectName
    };
};


</script>

<style>
</style>