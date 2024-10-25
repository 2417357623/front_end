<!-- 功能: 导出模块的公共制品区域-->
<!-- 作者: 李炎-->
<!--关键逻辑: 包括一个查询区，一个表格区，表格区的el-table和导出模块的已选择制品区的el-tree做联动
    table数据在选择后格式化传给导出模块，导出模块接受该值传给tree。
    tree在选择后格式化传给公共制品区域，做些处理之后传给table。
    相关的数据元:tableData,selectionItemsForTree,treeItems,selectionItemsForTable.
    相关方法:handleSelectionChange，watch(selectionItemsForTable),handleTreeCheckChange,watch(selectionItemsForTree)
-->
<template>
  <div class="content">
    <div class="queryArea">
      <component
        v-if="curProductData?.curComponent"
        :is="curComponent"
        v-model="queryInfo"
        :projectName="projectName"
      />
      <QueryArea
        v-else
        v-model="queryInfo"
        :projectName="projectName"
        :curProduct="props.curProduct"
      ></QueryArea>
    </div>
    <div class="gridArea">
      <div class="table-content">
        <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="loading"
          border
          max-height="683px"
          @select="handleSelectionChange"
          @select-all="handleSelectionChange"
          ref="multipleTableRef"
        >
          <el-table-column type="selection" width="50" />
          <el-table-column
            v-for="column in tableColumn"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EiInfo } from '@/utils/eiinfo.js'
import BatchQuery from '@/components/pages/ExportModule/dataDisplay/queryArea/BatchQuery.vue'
import { useProductStore } from '@/stores/productStore.js'
import QueryArea from './queryArea/index.vue'
import { productConfig } from '@/config/index.js'

const props = defineProps({
  curProduct: String,
  projectName: String
})

const queryInfo = ref({})
const tableData = ref([])
const loading = ref(false)

const productStore = useProductStore()
const {
  tableSelectedIndex,
  treeSelectedIndex,
  treeSelectedRows,
  tableSelectedRows,
  setTableSelectedRows,
  setTableSelectedIndex,
  setTreeSelectedIndex
} = productStore
const multipleTableRef = ref()

//不同制品获取表格信息的统一配置
const curProductData = computed(() => {
  return productConfig.getOneProduct(props.curProduct)
})

const tableColumn = computed(() => {
  return curProductData.value.column
})

const curComponent = computed(() => {
  return curProductData.value.curComponent
})

const a =  ref([
    {
      a:reactive({a:1})
    },
    ref({}),
    {
      a:1
    },
    {
      a:{...reactive({batch:[{uuid:11,name:11},{}],table:[]})}
    }
])
/*Getter 不应有副作用​
计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，不要改变其他状态、在 getter 中做异步请求或者更改 DOM！一个计算属性的声明中描述的是如何根据其他值派生一个值。因此 getter 的职责应该仅为计算和返回该值。在之后的指引中我们会讨论如何使用侦听器根据其他响应式状态的变更来创建副作用。

避免直接修改计算属性值​
从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。*/
//所以这样做事错的，响应式对象里的key的值就是响应式的，但不要想着赋给新值
// curSelectedIndex.value = tableSelectedIndex[curProductData.index]
// const curSelectedRows = computed(()=>tableSelectedRows[curProductData.index])
const queryProps = reactive({})

//watch侦听，只有在里面的监听值是reactive的时候才会侦听该对象内部属性的变化，如果是ref那属性值变化也不会触发监听
//下面这种情况也会触发监听，只要数据变了都会监听到
// const count = reactive({
//   a:1
// })
// watch(count,()=>{
//   console.log(2)
// })
// function increment() {
//   let array = 1
//   count.a = 0;
//   count.a = 1
// }
watch(tableSelectedIndex.value, (newVal) => {
  a
  let obj = tableSelectedRows.value
  let test = {...tableSelectedRows.value}
  let array = []
  // obj[props.curProduct] = tableData.value.filter((item) => tableSelectedIndex.value[props.curProduct].includes(item.uuid))
  tableData.value.forEach((item)=>{
    if(tableSelectedIndex.value[props.curProduct].includes(item.uuid))
    array.push(item)
  })

  obj[curProductData.value.index].splice(0, 
  obj[curProductData.value.index].length, ...array)


  setTableSelectedRows(obj)
}
)

//每次查询之后，更新表格数据，并且勾选已选择的制品
watch(queryInfo, async () => {
  loading.value = true
  await getData()
  await nextTick()
  setCheckData()
})

//注意，你不能直接侦听响应式对象的属性值
watch(treeSelectedIndex, (newVal) => {
  handleTreeDataChange(newVal)
})

//获取列表数据
const getData = async () => {
  let info = new EiInfo()
  Object.entries(queryInfo.value).forEach(([key, value]) => {
    info.set(`inqu_status-0-${key}`, value)
  })
  info.set('result-limit', -1)
  info.set('result-offset', 0)
  // curProductData.getDataMethod(info).then((res) => {
  //   let resBlock = res.getBlock('result');
  //   tableData.value = resBlock.getMappedRows();
  //   loading.value = false;
  // });

  // 使用 await 等待 curProductData.getDataMethod 的结果
  const res = await curProductData.value.getDataMethod(info)
  let resBlock = res.getBlock('result')
  tableData.value = resBlock.getMappedRows()

  // 在数据加载完成后设置 loading 为 false
  loading.value = false
}

//当行数据选择时，把数据提供给已选制品栏
const handleSelectionChange = (selection) => {

  let obj = tableSelectedIndex.value
 
  let array = []
  //更新已勾选列表
  selection.forEach((item) => {
    array.push(item.uuid)
  })
  obj[curProductData.value.index].splice(0, 
  obj[curProductData.value.index].length, ...array)

  setTableSelectedIndex(obj)
}

//根据树传来的数据，改变已勾选的列
const handleTreeDataChange = (indexInfo) => {
  let obj = tableSelectedIndex.value
  let array = obj[curProductData.value.index].filter((childIndex) =>
    indexInfo.includes(childIndex))
  
  obj[curProductData.value.index].splice(0, 
  obj[curProductData.value.index].length, ...array)
  setTableSelectedIndex(obj)
  setCheckData()
}

//根据已勾选的列来设置表格的勾选状态
const setCheckData = () => {
  tableData.value.forEach((item) => {
    if (tableSelectedIndex.value[curProductData.value.index].includes(item.uuid)) {
      multipleTableRef.value?.toggleRowSelection(item, true)
    } else {
      multipleTableRef.value?.toggleRowSelection(item, false)
    }
  })
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false

  // 对数组进行排序并转换为字符串进行比较
  const sortedArr1 = [...arr1].sort()
  const sortedArr2 = [...arr2].sort()

  return sortedArr1.toString() === sortedArr2.toString()
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
  height: 100%;
}
</style>
