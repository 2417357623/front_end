<!-- 功能: 导出模块的公共制品区域-->
<!-- 作者: 李炎-->
<!--关键逻辑: 包括一个查询区，一个表格区，表格区的el-table和导出模块的已选择制品区的el-tree做联动
    table数据在选择后格式化传给导出模块，导出模块接受该值传给tree。
    tree在选择后格式化传给公共制品区域，做些处理之后传给table。
    相关的数据元:tableData,selectionItemsForTree,treeItems,selectionItemsForTable.
    相关方法:handleSelectionChange，watch(selectionItemsForTable),handleTreeCheckChange,watch(selectionItemsForTree)
-->
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
            @select='handleSelectionChange'
            @select-all='handleSelectionChange'
            ref="multipleTableRef"
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

const queryInfo = ref({});
const tableData  = ref([])
const tableColumn = ref([]);
const curComponent = shallowRef();
const loading = ref(false);
const tableAllSelectedIndex = ref([])

const productStore = useProductStore();
const multipleTableRef = ref();
//数组,[{index:"1",label:'222'},{index:"2",label:'222'}]
const selectionItemsForTree = productStore.selectionItemsForTree;
const selectionItemsForTable = productStore.selectionItemsForTable;

onMounted(() => {
  getBaseData();
});

//每次查询之后，更新表格数据，并且勾选已选择的制品
watch(queryInfo, async (newValue) => {
  loading.value = true;
  await getData();
  handleTreeDataChange(selectionItemsForTree)
});

watch(selectionItemsForTable,(newVal)=>{
  handleTreeDataChange(newVal)
})

//不同制品获取表格信息的统一配置
const curProductData = productStore.productItems.find((item) => item.index == props.product);

//获取制品列信息和制品对应的查询区域组件
const getBaseData = () => {
  tableColumn.value = curProductData.column;
  curComponent.value = curProductData.curComponent;
};

//获取列表数据
const getData = async () => {
  let info = new EiInfo();
  Object.entries(queryInfo.value).forEach(([key, value]) => {
    info.set(`inqu_status-0-${key}`, value);
  });
  info.set('result-limit', -1);
  info.set('result-offset', 0);
  // curProductData.getDataMethod(info).then((res) => {
  //   let resBlock = res.getBlock('result');
  //   tableData.value = resBlock.getMappedRows();
  //   loading.value = false;
  // });

  // 使用 await 等待 curProductData.getDataMethod 的结果
  const res = await curProductData.getDataMethod(info);
  let resBlock = res.getBlock('result');
  tableData.value = resBlock.getMappedRows();

  // 在数据加载完成后设置 loading 为 false
  loading.value = false;
};

//当行数据选择时，把数据提供给已选制品栏
const handleSelectionChange = (selection) => {
  //更新已勾选列表
  selection.map((item)=>{
    tableAllSelectedIndex.value.length = 0;
    tableAllSelectedIndex.value.push(item.uuid)
  })
  //更新传递给el-tree的数据
  let childrenArray = [];
  selection.map((item) => {
    let map = {};
    map['label'] = item[curProductData.treeShowInfo];
    map['index'] = item['uuid'];
    childrenArray.push(map);
  });
  let selectedInfo =
      {
        index:curProductData.index,
        label: curProductData.cname,
        children: childrenArray,
      };
  let productionIsExist = selectionItemsForTree.find((item) => item.label === curProductData.cname);
  if(productionIsExist){
    selectionItemsForTree.find((item) => item.label === curProductData.cname).children = childrenArray
  }else {
    selectionItemsForTree.push(selectedInfo);
  }

};

//根据树传来的数据，改变已勾选的列
const handleTreeDataChange = (newVal)=> {
  let rows = newVal.find((item) => item.index === props.product)?.children
  if (rows) {
    tableAllSelectedIndex.value = rows.map(item => item.index)
    setCheckData();
  }
}

//根据已勾选的列来设置表格的勾选状态
const setCheckData = ()=>{
  let selectedArray = tableData.value.filter(item => tableAllSelectedIndex.value.includes(item.uuid))
  tableData.value.forEach((item) => {
    if (tableAllSelectedIndex.value.includes(item.uuid)) {
      multipleTableRef.value?.toggleRowSelection(item, true)
    } else {
      multipleTableRef.value?.toggleRowSelection(item, false)
    }
  })
}


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