<template>
  <div class='menuContent'>
    <div style='display: flex;align-content: center; justify-content:center;width: 100%'>
      校验信息展示
    </div>
    <div style='justify-content: center;display: flex'>
      <el-tree
          node-key='index'
          class='selected-tree'
          :data='treeData'
          :props='defaultProps'
          default-expand-all
      />
    </div>
  </div>
</template>

<script setup>

import {useDeployStore} from '@/stores/deployStore'

const deployStore = useDeployStore();
const {treeData} = deployStore

const defaultProps = {
  children: 'children',
  label: 'label',
};


</script>

<style scoped>
.selected-tree {
  max-width: 300px;
  margin-top: 24px;
  flex-grow: 1;
  overflow-y: auto; /* 当内容超过最大高度时显示滚动条 */
}

.menuContent {
  width: calc(100% - 48px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 48px);
}
</style>