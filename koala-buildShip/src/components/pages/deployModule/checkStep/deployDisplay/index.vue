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
          <ExpendRow :value="props"/>
        </template>
      </el-table-column>
      <el-table-column v-for='column in tableColumn' :prop='column.prop' :label='column.label' :width='column.width' :formatter="column.formatter">
      </el-table-column>
      <el-table-column v-for='check in checkFlag' :label="check.columnName" :prop=check.variable>
        <template #default="scope" style="display: flex; justify-content: center; align-content: center">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>{{ check.getDesc(scope.row[check.variable]) }}</div>
            </template>
            <template #reference>
              <el-icon :color='check.getColor(scope.row[check.variable])'>
                <component :is='check.getIcon(scope.row[check.variable])'/>
              </el-icon>
            </template>
          </el-popover>
        </template>
      </el-table-column>
     <!-- 有个问题，两个策略就结果来说都是导入或者不导入，干脆做成一个-->
<!--      <el-table-column v-for='check in checkFlag' :label=check.strategyColumnName :prop=check.strategyVariable>-->
<!--        <template #default="scope">-->
<!--          <el-switch v-model="scope.row[check.strategyVariable]"-->
<!--                     class="ml-2"-->
<!--                     inline-prompt-->
<!--                     style="&#45;&#45;el-switch-on-color: #13ce66; &#45;&#45;el-switch-off-color: #ff4949"-->
<!--                     :active-text=check.strategyActiveText-->
<!--                     :inactive-text=check.strategyInactiveText-->
<!--                     @change="handleSwitchChange(scope.row, check)"-->
<!--                     :v-show="getDisable(scope.row[check.variable])"/>-->
<!--        </template>-->
<!--      </el-table-column> -->
      <el-table-column  label="校验警告策略" prop="isImport">
        <template #default="scope">
          <el-switch v-model='scope.row.isImport'
                     class="ml-2"
                     inline-prompt
                     style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                     active-text="导入"
                     inactive-text="不导入"
                     @change="handleChange"
                     :disabled="getIsDisabled(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {useProductStore} from '@/stores/productStore.js';
import {checkFlag} from '@/config/index.js';
import {useDeployStore} from '@/stores/deployStore.js';
import {productConfig} from '@/config/index.js';
import ExpendRow from './expendRow/index.vue'

const CONSTANTS = inject("CONSTANTS")
const props = defineProps({
  curTableData: Array,
  curProduct: String,
})

const productStore = useProductStore();
const deployStore = useDeployStore();
const {stepData} = deployStore
const tableColumn = productConfig.getOneProduct(props.curProduct)?.column;
const stepColumn = productConfig.getOneProduct(props.curProduct)?.stepColumn;

const handleChange = (value) => {
  if(value){
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: var(--ep-color-primary)' }, '当唯一性校验未通过时，强制导入会覆盖新环境。当依赖校验未通过时，强制导入会丢失原来制品关联的部分依赖信息'),
      position: 'top-right',
      type: 'warning',
    });
  }
}

const getIsDisabled = (row)=>{
  const isSucceed = row[checkFlag.uniqueCheck.variable] == 1 && row[checkFlag.dependencyCheck.variable] == 1
  const isFailed = row[checkFlag.dependencyCheck.variable] == -1
  const isUndo = row[checkFlag.uniqueCheck.variable] == 0 || row[checkFlag.dependencyCheck.variable] == 0
  return (isSucceed || isFailed || isUndo)
}

</script>

<style scoped></style>