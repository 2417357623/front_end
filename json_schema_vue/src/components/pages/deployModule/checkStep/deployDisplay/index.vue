<template>
  <div class='table-content'>
    <el-table
        :data='props.curTableData'
        style='width: 100%'
        border
        max-height='683px'
    >
      <el-table-column v-if="props.curProduct === 'batch'" type="expand">
        <template #default="props">
          <div m="4">
            <el-table :data="props.row.stepConfigList" >
              <el-table-column v-for='column in stepColumn'
                               :label="column.label"
                               :prop="column.prop" >
              </el-table-column>
              <el-table-column label="唯一性校验" :prop=checkColumn>
                <template #default="scope">
                  <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #default>
                      <div>{{checkFlag.getDesc(scope.row[checkColumn])}}</div>
                    </template>
                    <template #reference>
                      <el-icon :color='checkFlag.getColor(scope.row[checkColumn])'><component :is='checkFlag.getIcon(scope.row[checkColumn])' /></el-icon>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          v-for='column in tableColumn'
          :prop='column.prop'
          :label='column.label'
          :width='column.width'
      >
      </el-table-column>
      <el-table-column label="唯一性校验" :prop=checkColumn>
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>{{checkFlag.getDesc(scope.row[checkColumn])}}</div>
            </template>
            <template #reference>
              <el-icon :color='checkFlag.getColor(scope.row[checkColumn])'><component :is='checkFlag.getIcon(scope.row[checkColumn])' /></el-icon>
            </template>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>

import { useProductStore } from '@/stores/productStore.js';
import { checkFlag } from '@/constant/productConfig.js';
import { useDeployStore } from '@/stores/deployStore.js';
import {productConfig} from '@/constant/productConfig'

const props = defineProps({
  curTableData: Array,
  curProduct: String,
});

const productStore = useProductStore();
const deployStore = useDeployStore();
const {stepData} = deployStore
const tableColumn = productConfig.getOneProduct(props.curProduct)?.column;
const stepColumn = productConfig.getOneProduct('step')?.column;
const checkColumn = checkFlag.variable

</script>

<style scoped>

</style>