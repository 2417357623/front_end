<!--el-upload可以做上传，action和data分别对应上传的地址和携带的参数，on-success是上传成功后的回调函数，可以拿到结果。-->
<!--el-upload内部也是用form-data的格式上传的（这种一般适用于文件上传），当然我们自己也可以用multipart/form-data格式上传，需要设置headers为Content-Type:multipart/form-data。自己造axios-->
<!--后台必须写好@RequestParam("file")MultipartFile mFile,@RequestParam("jsonConfig")String obj类似的接受参数。-->
<!--我公司的接口调用地址和经过包装的方法调用地址是不一样的，需要分开写axios地址-->
<template>
    <div class='btns'>
      <el-upload
          v-model:file-list="fileList"
          :action=url
          class='upload-demo'
          drag
          :data='data'
          :on-success="handleSuccess"
      >
        <el-button type='primary'>导入</el-button>
        <template #tip>
        </template>
      </el-upload>
      <el-button>生成任务</el-button>
      <el-button>导出</el-button>
    </div>
    <div>
      <el-empty description='description' />
    </div>
  </template>
  
  <script setup>
  
  import { ElNotification } from 'element-plus';
  import { useDeployStore } from '@/stores/deployStore.js';
  import { productConfig } from '@/constant/productConfig.js';
  
  const deployStore = useDeployStore()
  const fileList = ref([]);
  const allProductIndex = productConfig.getAllProductIndex();
  const data = reactive({
    //这样就可以传数组，后台用string接受，然后转为JSONArray jsonArray =  JSONArray.parseArray(obj);
    jsonConfig: JSON.stringify(allProductIndex)
  })
  
  
  
  let host = window.location.host;
  let reg = /^localhost:4000+/;
  
  const baseURL = reg.test(host)
      ? '.././xdata-succeed-mill'
      : '../.';
  
  const url = baseURL + '/importAndExport/parseFileForDeploy'
  
  const handleSuccess = (response, file, fileList) => {
  
    deployStore.setJsonData(response.result)
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: var(--ep-color-primary)' }, '导入成功'),
      position: 'top-right',
      type: 'success',
    });
  };
  
  </script>
  
  <style>
  .btns {
    display: flex;
    align-content: center;
    justify-content: flex-start;
    gap: 24px;
    margin-bottom: 24px;
  }
  </style>