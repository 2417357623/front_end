<template>
  <div class='table-content'>
    <el-table :data='props.curTableData' style='width: 100%' border max-height='683px'>
      <!-- <el-table-column v-if="props.curProduct === 'batch'" type="expand">
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
</el-table-column> -->
      <el-table-column type="expand">
        <template #default="props">
          <ExpendRow :value="props" />
        </template>
      </el-table-column>
      <el-table-column v-for='column in tableColumn' :prop='column.prop' :label='column.label' :width='column.width'>
      </el-table-column>
      <el-table-column v-for='check in checkFlag' :label="check.columnName" :prop=check.variable>
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>{{ check.getDesc(scope.row[check.variable]) }}</div>
            </template>
            <template #reference>
              <el-icon :color='check.getColor(scope.row[check.variable])'>
                <component :is='check.getIcon(scope.row[check.variable])' />
              </el-icon>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-for='check in checkFlag' :label=check.strategyColumnName :prop=check.strategyVariable>
        <template #default="scope">
          <el-switch v-model="scope.row[check.strategyVariable]" class="ml-2" inline-prompt
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" :active-text=check.strategyActiveText
            :inactive-text=check.strategyInactiveText :before-change="getUniqueDisable(scope.row[check.variable])" @change="handleSwitchChange(scope.row, check)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/productStore.js';
import { checkFlag } from '@/config/productConfig.js';
import { useDeployStore } from '@/stores/deployStore.js';
import { productConfig} from '@/config/productConfig.js';
import ExpendRow from './expendRow/index.vue'

const CONSTANTS = inject("CONSTANTS")
const props = defineProps({
  curTableData: Array,
  curProduct: String,
})

const productStore = useProductStore();
const deployStore = useDeployStore();
const { stepData } = deployStore
const tableColumn = productConfig.getOneProduct(props.curProduct)?.column;
const stepColumn = productConfig.getOneProduct(props.curProduct)?.stepColumn;

const getUniqueDisable = (uniqueCheckFlag)=>{
  return uniqueCheckFlag == CONSTANTS.CHECK_WARN ? true : false
}

//每次变化策略的时候，都会对校验结果产生影响
const  handleSwitchChange = (row, check)=> {
  // 假设上面列的数据变量是 check.variable
  if (row[check.strategyVariable]) {
    // 根据策略列状态变化，更新对应的其他列
    row[check.variable] = CONSTANTS.CHECK_SUCCESS;
  } else {
    row[check.variable] = CONSTANTS.CHECK_WARN;
  }
}

</script>

<style scoped></style>