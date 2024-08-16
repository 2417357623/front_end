<template>
  <div class='queryArea'>
    <component :is='curComponent' v-model='queryInfo' :projectName='projectName'/>
  </div>
  <div class='gridArea'>
    <div class='table-content'>
      <el-table :data='tableData' style='width: 100%' v-loading="loading">
        <el-table-column type='selection' width='50' />
        <el-table-column
            v-for='column in tableColumn'
            :prop='column.prop'
            :label='column.label'
            :width='column.width'
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>

import { EiInfo } from '~/utils/eiinfo.js';
import myApi from '@/api';
import BatchQuery from '~/components/pages/ExportModule/queryArea/BatchQuery.vue';

const props = defineProps({
  product: String,
  projectName : String
});

const queryInfo = ref({});
const tableData = ref([]);
const tableColumn = ref([]);
const curComponent = shallowRef()
const loading = ref(false)

onMounted(() => {
  getBaseData(props.product)
});

watch(queryInfo,(newValue)=>{
  loading.value = true;
  getData(props.product)
})

//获取制品列信息和制品对应的查询区域组件
const getBaseData = (key) => {
  if(key == 'batch'){
    tableColumn.value = [
      {
        prop: 'taskName',
        label: '任务名称',
        width: '180',
      },
      {
        prop: 'desc',
        label: '任务描述',
        width: '180',
      },
      {
        prop: 'releaseStatus',
        label: '发布状态',
        width: '180',
      },
      {
        prop: 'taskType',
        label: '任务类型',
        width: '180',
      },
    ]
    curComponent.value = BatchQuery
  }
}

const getData = (key) => {
  if (key == 'batch') {
    let info = new EiInfo();
    Object.entries(queryInfo.value).forEach(([key, value]) => {
      info.set(`inqu_status-0-${key}`, value);
    });
    info.set("result-limit", 10)
    info.set("result-offset", 0)
    myApi.getBatchInfo(info).then((res) => {
      let resBlock = res.getBlock('result');
      tableData.value = resBlock.getMappedRows();
      loading.value = false;
    });
  }
};


</script>

<style scoped>
.queryArea {
  display: flex;
  gap: 24px;
}

.table-content {
  margin-top: 24px;
  border: 1px solid var(--ep-border-color);
}

</style>