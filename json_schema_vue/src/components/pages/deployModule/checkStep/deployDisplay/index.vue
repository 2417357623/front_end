<template>
  <div class='table-content'>
    <el-table :data='props.curTableData' style='width: 100%' border max-height='683px'>
      <el-table-column v-if="props.curProduct === 'batch'" type="expand">
        <template #default="props">
          <div m="4">
            <el-table :data="props.row.stepConfigList">
              <el-table-column v-for='column in stepColumn' :label="column.label" :prop="column.prop">
              </el-table-column>
              <el-table-column label="唯一性校验" :prop=uniqueCheck.variable>
                <template #default="scope">
                  <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #default>
                      <div>{{ uniqueCheck.getDesc(scope.row[uniqueCheck.variable]) }}</div>
                    </template>
                    <template #reference>
                      <el-icon :color='uniqueCheck.getColor(scope.row[uniqueCheck.variable])'>
                        <component :is='uniqueCheck.getIcon(scope.row[uniqueCheck.variable])' />
                      </el-icon>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="依赖校验" :prop=dependencyCheck.variable>
                <template #default="scope">
                  <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #default>
                      <div>{{ dependencyCheck.getDesc(scope.row[dependencyCheck.variable]) }}</div>
                    </template>
                    <template #reference>
                      <el-icon :color='dependencyCheck.getColor(scope.row[dependencyCheck.variable])'>
                        <component :is='dependencyCheck.getIcon(scope.row[dependencyCheck.variable])' />
                      </el-icon>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-for='column in tableColumn' :prop='column.prop' :label='column.label' :width='column.width'>
      </el-table-column>
      <el-table-column label="唯一性校验" :prop=uniqueCheck.variable>
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>{{ uniqueCheck.getDesc(scope.row[uniqueCheck.variable]) }}</div>
            </template>
            <template #reference>
              <el-icon :color='uniqueCheck.getColor(scope.row[uniqueCheck.variable])'>
                <component :is='uniqueCheck.getIcon(scope.row[uniqueCheck.variable])' />
              </el-icon>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="依赖校验" :prop=dependencyCheck.variable>
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>{{ dependencyCheck.getDesc(scope.row[dependencyCheck.variable]) }}</div>
            </template>
            <template #reference>
              <el-icon :color='dependencyCheck.getColor(scope.row[dependencyCheck.variable])'>
                <component :is='dependencyCheck.getIcon(scope.row[dependencyCheck.variable])' />
              </el-icon>
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
import { productConfig } from '@/constant/productConfig'

const props = defineProps({
  curTableData: Array,
  curProduct: String,
});

const productStore = useProductStore();
const deployStore = useDeployStore();
const { stepData } = deployStore
const tableColumn = productConfig.getOneProduct(props.curProduct)?.column;
const stepColumn = productConfig.getOneProduct(props.curProduct)?.stepColumn;
const uniqueCheck = checkFlag.uniqueCheck
const dependencyCheck = checkFlag.dependencyCheck

</script>

<style scoped></style>