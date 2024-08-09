<template>
  <div class='content'>
    <div>
      <el-select
          v-model='value'
          placeholder='Select'
          size='large'
          style='width: 240px'
      >
        <el-option
            v-for='item in options'
            :key='item.value'
            :label='item.label'
            :value='item.value'
        />
      </el-select>
    </div>
    <div>
      <el-select
          v-model='value'
          placeholder='Select'
          size='large'
          style='width: 240px'
      >
        <el-option
            v-for='item in options'
            :key='item.value'
            :label='item.label'
            :value='item.value'
        />
      </el-select>
    </div>
  </div>
  <div class='detailSelect'>
    <el-select
        v-model='value'
        placeholder='Select'
        size='large'
        style='width: calc(24px + 480px)'
    >
      <el-option
          v-for='item in options'
          :key='item.value'
          :label='item.label'
          :value='item.value'
      />
    </el-select>
  </div>
  <div class='table-content'>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script setup>
const value = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];

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
  .content {
    display: flex;
    gap:24px;
    margin-bottom: 24px;
  }

  .table-content {
    margin-top: 24px;
  }

  .detailSelect {
    display: flex;
  }
</style>