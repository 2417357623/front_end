<script setup>
import { ElButton, ElSelect,ElOption } from 'element-plus';

</script>

<template>
  <div>
    <el-button>Default</el-button>
    <el-select >
      <el-option>1</el-option>
      <el-option>2</el-option>
      <el-option>3</el-option>
      <el-option>4</el-option>
    </el-select>
  </div>
</template>

<style scoped>
  .el-button{
    width: 500px;
    display: block;
  }
  ::v-deep .el-select__caret{
    color: red;
  }
</style>
