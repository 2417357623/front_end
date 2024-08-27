<template>
  <div style='display: flex ; flex-direction: column'>
    <div class='selectArea'>
      <div class='inputCompose'>
        <div>
          工作空间
        </div>
        <el-select
            v-model='projectName'
            placeholder='Select'
            size='default'
            style='width: 240px'
            filterable
            remote
            clearable
            :remote-method='remoteMethod'
            remote-show-suffix
            :loading='loading'
        >
          <el-option
              v-for='item in options'
              :label='item.label'
              :value='item.value'
          />
        </el-select>
      </div>
      <div class='inputCompose'>
        <div>
          制品选择
        </div>
        <el-select
            v-model='productValue'
            placeholder='Select'
            size='default'
            style='width: 240px'
        >
          <el-option
              v-for='item in productStore.productItems'
              :key='item.ename'
              :label='item.cname'
              :value='item.ename'
          />
        </el-select>
      </div>
    </div>
    <div class='contentArea'>
      <div class='menuArea'>
        <el-menu
            :default-active='productValue'
            class='el-menu-vertical-demo'
            @open='handleOpen'
            @close='handleClose'
            style='height: 100%'
            @select='handleSelect'
        >
          <el-menu-item
              v-for='item in  productStore.productItems'
              :index='item.ename'
          >
            {{ item.cname }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class='queryArea'>
        <keep-alive>
          <DisplayArea :product='activeProductMenuItem' :key='activeProductMenuItem' :projectName='projectName' />
        </keep-alive>
      </div>
      <div class='selectedProductArea'>
        <div style='display: flex;align-content: center;'>
          已选择制品信息
        </div>
                <el-tree
                    node-key="index"
                    ref="treeRef"
                    class='selected-tree'
                    :data="treeItems"
                    :props="defaultProps"
                    default-expand-all
                    show-checkbox
                    @check="handleTreeCheckChange"
                />
        <Pack></Pack>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import DisplayArea from './dataDisplay/index.vue'
import myApi from '@/api/index.js';
import { EiInfo } from '@/utils/eiinfo.js';
import { useProductStore } from '@/stores/productStore.js';
import { ElTree } from 'element-plus'
import Pack from './pack/index.vue'

const projectName = ref('');
provide('projectName',projectName)
const productValue = ref('batch');

//总的工作空间列表
const list = ref([]);

//筛选后的工作空间列表
const options = ref([]);
const loading = ref(false);
const activeProductMenuItem = ref('batch');

const productStore = useProductStore();
const tableSelectedIndex = productStore.tableSelectedIndex
const treeSelectedIndex = productStore.treeSelectedIndex
const tableSelectedRows = productStore.tableSelectedRows
const treeItems = ref([])

const treeRef = ref()

const defaultProps = {
  children: 'children',
  label: 'label',
};

//挂载后加载工作空间
onMounted(() => {
      loadProjectInfo();
    },
);

//一旦选择的制品变化，制品菜单变化
watch(productValue, (newVal) => {
  activeProductMenuItem.value = newVal;
});

watch(tableSelectedRows,async (newVal)=>{
  //将table的已选行的uuid由对象展开成一维数组
  treeItems.value = getTreeByTableData(newVal)
  treeSelectedIndex.length = 0;
  treeSelectedIndex.push(...Object.values(tableSelectedIndex).flat());
  //在 treeItems.value 被更新后，
  // Vue 开始计划 DOM 的更新，但这个更新还没有完成。如果你在这时立即调用 setCheckedKeys，
  // Vue 可能还没有将 treeItems 的新状态反映在 el-tree 组件的 DOM 结构中。因此，setCheckedKeys 操作的目标 DOM 节点可能还不存在或未正确初始化，导致无法正确勾选。
  await nextTick();
  treeRef.value.setCheckedKeys(treeSelectedIndex,false);
})

//远程查询的select
const remoteMethod = (query) => {
  if (loading.value == true) {
    return;
  }
  if (query) {
    loading.value = true;
    options.value = list.value.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
    );
    loading.value = false;
  } else {
    options.value = list.value;
  }
};

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const handleSelect = (index) => {
  activeProductMenuItem.value = index;
};

const loadProjectInfo = () => {
  loading.value = true;
  const queryInfo = new EiInfo();
  myApi.getProjectInfo(queryInfo).then(res => {
    const resBlock = res.getBlock('result');
    for (let i = 0; i < resBlock.rows.length; i++) {
      let value = resBlock.getCell(i, 'projectName');
      let label = resBlock.getCell(i, 'projectEname') + '|' + resBlock.getCell(i, 'projectAlias');
      list.value.push({
        value: value,
        label: label,
      });
    }
    options.value = list.value;
    loading.value = false;
    if (options.value.length > 0) {
      projectName.value = options.value[0].value;
    }
  });
};

const handleTreeCheckChange = () => {

  let keys = treeRef.value.getCheckedKeys(false)
  treeSelectedIndex.length = 0;
  treeSelectedIndex.push(...keys)
};

//当table的勾选值变化时，根据table的数据更新el-tree的数据
const getTreeByTableData = (data)=>{

  let treeData = []
  //value是每个制品的数组对象
  Object.entries(data).forEach(([key, value]) =>{
    if(value.length > 0){
      let curObject = {};
      let childrenArray = [];
      curObject["label"] = key
      let treeShowInfo = productStore.productItems.find((item)=> item.index ==  key)?.treeShowInfo
      childrenArray = value.map((item)=>{
        return {
          index: item.uuid,
          label: item[treeShowInfo]
        }
      })
      curObject["children"] = childrenArray
      treeData.push(curObject)
    }
  })
  return treeData
}




</script>

<style scoped>
.selectArea {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.contentArea {
  display: flex;
  border: 1px solid var(--ep-border-color);
  height: 800px;
  flex-grow: 1;
}

.menuArea {
  height: 100%;
}

.queryArea {
  flex-grow: 1;
  padding: 24px;
}

.selectedProductArea {
  width: 200px;
  border: 1px solid var(--ep-border-color);
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.selected-tree {
  max-width: 200px;
  margin-top: 24px;
  flex-grow: 1;
  overflow-y: auto;  /* 当内容超过最大高度时显示滚动条 */
}

</style>