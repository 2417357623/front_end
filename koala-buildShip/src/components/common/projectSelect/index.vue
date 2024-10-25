<template>
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
</template>

<script setup>
//远程查询的select
import { EiInfo } from '@/utils/eiinfo.js';
import myApi from '@/api/index.js/';

const projectName = defineModel()

//总的工作空间列表
const list = ref([]);

//筛选后的工作空间列表
const options = ref([]);
const loading = ref(false);

//挂载后加载工作空间
onMounted(() => {
      loadProjectInfo();
    },
);


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
</script>