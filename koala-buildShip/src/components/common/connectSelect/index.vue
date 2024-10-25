<template>
    <el-form :model="connect">
      <el-form-item v-for="(item,index) in oldDataArray" :label="`connectName:${item.connectName}`" :key="item.uuid">
        <!-- connect[index]里面应该是一个对象,包括了旧的uuid和新的数据。 -->
         <!-- select选择对象的时候一定要指定value-key 
         By using the value-key attribute, data with duplicate labels can be properly handled. 
         The value of the label property is duplicated, but the option can be identified through the id. -->
          
        <el-select
        :key="item.uuid"
        v-model='connect[item.uuid]'
        placeholder='Select'
        size='default'
        style='width: 240px'
        filterable
        remote
        clearable
        :remote-method='remoteMethod'
        remote-show-suffix
        :loading='loading'
        value-key="uuid"
    >
      <el-option
          v-for='option in options'
          :key="option.value.uuid" 
          :label='option.label'
          :value='option.value'
      />
    </el-select>
      </el-form-item>
    </el-form>

  </template>
  
  <script setup>
  //远程查询的select
  import { EiInfo } from '@/utils/eiinfo.js';
  import myApi from '@/api/index.js/';
  import { computed, watch } from 'vue';
  import {useDeployStore} from "@/stores/deployStore.js";
import { el } from 'element-plus/es/locales.mjs';

  const deployStore = useDeployStore()
  const {handledTableData,dependencyData,replaceDependencyData,unexistDependencyData} = deployStore

  const oldDataArray = computed(() => {
    return unexistDependencyData.value?.dataSourceList
  })
  
  const connect = defineModel({
    default: {}
  })
  
  //总的工作空间列表
  const list = ref([]);
  
  //筛选后的工作空间列表
  const options = ref([]);
  const loading = ref(false);
  
  //挂载后加载工作空间
  onMounted(() => {
    loadInfo();
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
  
  const loadInfo = () => {
    loading.value = true;
    const queryInfo = new EiInfo();
    myApi.getConnectInfo(queryInfo).then(res => {
      const resBlock = res.getBlock('result');
      const rows = res.getBlock('result').getMappedRows()
      for (let i = 0; i < resBlock.rows.length; i++) {
        let value = rows[i]
        let label = resBlock.getCell(i, 'connectName')
        list.value.push({
          value: value,
          label: label,
        });
      }
      options.value = list.value;
      loading.value = false;
    });
  };
  </script>