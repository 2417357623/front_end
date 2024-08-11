<template>
  <div class='generateItem'>
    <el-select
        v-model='value'
        placeholder='Select'
        size='large'
        style='width: 240px'
    >
      <el-option
          v-for='item in options'
          :key='item.value'
          :label='item.label'
          :value='item.value'
      />
    </el-select>
    <el-button>生成</el-button>
  </div>
  <div>
    <el-steps style="max-width: 600px" :active="active" finish-status="success">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
  </div>
</template>

<script setup>
const value = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>

<style>
  .generateItem {
    display: flex;
    gap: 24px;
    align-content: center;
    justify-content: flex-start;
  }
</style>