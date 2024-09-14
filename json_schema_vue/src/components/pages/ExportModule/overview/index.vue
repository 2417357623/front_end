<template>
  <div class="content">
    <div style="display: flex; align-content: center; width: 100%">已选择制品信息</div>
    <el-tree
      node-key="index"
      ref="treeRef"
      class="selected-tree"
      :data="treeItems"
      :props="defaultProps"
      default-expand-all
      show-checkbox
      @check="handleTreeCheckChange"
    />
    <div style="margin-top: 24px">
      <Pack></Pack>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/productStore.js'
import { ref } from 'vue'

const productStore = useProductStore()
const { treeSelectedIndex, tableSelectedIndex, tableSelectedRows, setTreeSelectedIndex } =
  productStore
import { productConfig } from '@/config/productConfig.js'
const treeItems = ref([])

const treeRef = ref()

const defaultProps = {
  children: 'children',
  label: 'label'
}

watch(tableSelectedRows.value, async (newVal) => {
  //将table的已选行的uuid由对象展开成一维数组
  treeItems.value = getTreeByTableData(newVal)
  setTreeSelectedIndex(Object.values(tableSelectedIndex.value).flat())
  //在 treeItems.value 被更新后，
  // Vue 开始计划 DOM 的更新，但这个更新还没有完成。如果你在这时立即调用 setCheckedKeys，
  // Vue 可能还没有将 treeItems 的新状态反映在 el-tree 组件的 DOM 结构中。因此，setCheckedKeys 操作的目标 DOM 节点可能还不存在或未正确初始化，导致无法正确勾选。
  await nextTick()
  treeRef.value.setCheckedKeys(treeSelectedIndex.value, false)
})

const handleTreeCheckChange = () => {
  let keys = treeRef.value.getCheckedKeys(false)
  setTreeSelectedIndex(keys)
}

//当table的勾选值变化时，根据table的数据更新el-tree的数据
const getTreeByTableData = (data) => {
  let treeData = []
  //value是每个制品的数组对象
  Object.entries(data).forEach(([key, value]) => {
    if (value.length > 0) {
      let curObject = {}
      let childrenArray = []
      let cname = productConfig.getOneProduct(key)?.cname
      curObject['label'] = cname
      let treeShowInfo = productConfig.getOneProduct(key)?.treeShowInfo
      childrenArray = value.map((item) => {
        return {
          index: item.uuid,
          label: item[treeShowInfo]
        }
      })
      curObject['children'] = childrenArray
      treeData.push(curObject)
    }
  })
  return treeData
}
</script>

<style scoped>
.selected-tree {
  max-width: 300px;
  margin-top: 24px;
  flex-grow: 1;
  overflow-y: auto; /* 当内容超过最大高度时显示滚动条 */
  overflow-x: auto; /* 当内容超过最大高度时显示滚动条 */
}

.content {
  width: calc(100% - 48px);
  border: 1px solid var(--ep-border-color);
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 48px);
}
</style>
