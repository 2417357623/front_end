<template>
  <div class='queryArea'>
    <div
        v-for='item in queryItems'
        class='inputCompose'
    >
      <div style='white-space: nowrap'>{{ item.cname }}</div>
      <el-input v-model='item.ename'></el-input>
    </div>
  </div>
  <div class='gridArea'>
    <div class='table-content'>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </div>
</template>

<script setup>

defineProps({
  product: String
});

//在子组件内获取table数据，queryItem数据,现在为假数据
const queryItems = [
  {
    cname:"中文名称",
    ename: "cname"
  },
  {
    cname: "英文名称",
    ename: "ename"
  }
]


const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]


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