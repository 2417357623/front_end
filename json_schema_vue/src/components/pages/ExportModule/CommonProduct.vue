<template>
  <div class='content'>
    <div class='queryArea'>
      <component :is='curComponent' v-model='queryInfo' :projectName='projectName' />
    </div>
    <div class='gridArea'>
      <div class='table-content'>
        <el-table
            :data='tableData'
            style='width: 100%'
            v-loading='loading'
            border
            max-height='683px'
            @selection-change='handleSelectionChange'
            :selectable='selectedTableRow'
        >
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
  </div>
</template>

<script setup>

import { EiInfo } from '~/utils/eiinfo.js';
import myApi from '@/api';
import BatchQuery from '~/components/pages/ExportModule/queryArea/BatchQuery.vue';
import { useProductStore } from '@/stores/productStore.js';

const props = defineProps({
  product: String,
  projectName: String,
});

//数组,[{index:"1",label:'222'},{index:"2",label:'222'}]
const selectionItems = defineModel();

const queryInfo = ref({});
const tableData = ref([]);
const tableColumn = ref([]);
const curComponent = shallowRef();
const loading = ref(false);
const selectedTableRow = ref([]);

const productStore = useProductStore();

onMounted(() => {
  getBaseData();
});

watch(queryInfo, (newValue) => {
  loading.value = true;
  getData();
});

//不同制品获取表格信息的统一配置
const curProductData = productStore.productItems.find((item) => item.index == props.product);

//获取制品列信息和制品对应的查询区域组件
const getBaseData = () => {
  tableColumn.value = curProductData.column;
  curComponent.value = curProductData.curComponent;
};

//获取列表数据
const getData = () => {
  let info = new EiInfo();
  Object.entries(queryInfo.value).forEach(([key, value]) => {
    info.set(`inqu_status-0-${key}`, value);
  });
  info.set('result-limit', -1);
  info.set('result-offset', 0);
  curProductData.getDataMethod(info).then((res) => {
    let resBlock = res.getBlock('result');
    tableData.value = resBlock.getMappedRows();
    loading.value = false;
  });
};

//当行数据选择时，把数据提供给已选制品栏
const handleSelectionChange = (selection) => {
  let childrenArray = [];
  selection.map((item) => {
    let map = {};
    map['label'] = item[curProductData.treeShowInfo];
    map['index'] = item[productStore.incrementIndex];
    childrenArray.push(map);

  });
  let selectedInfo =
      {
        index:productStore.incrementIndex,
        label: curProductData.cname,
        children: childrenArray,
      };
  let flag = selectionItems.find((item) => item.lable === curProductData.cname);
  if(flag){
    flag
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
  height: 100%;
}

.gridArea {
  flex-grow: 1;
}

.content {
  display: flex;
  flex-direction: column;
}
</style>