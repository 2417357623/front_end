<template>
  <el-button @click='packProduct'>打包</el-button>
</template>

<script setup>
import { useProductStore } from '@/stores/productStore.js';
import { EiInfo } from '@/utils/eiinfo.js';
import myApi from '@/api/index.js';
import { ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';

const productStore = useProductStore();
const { tableSelectedIndex } = storeToRefs(productStore);
const projectName = inject('projectName');

//调用了controller的接口，通过原始的@ResponseBody@PostMapping(value = "/importAndExport/exportConfigForPack")方式，调用接口，返回数据。（因为eiinfo作为json不满足下载需要二进制文件的需求）
//由于返回的二进制文件不支持默认responseType（json）的格式，需要新写axios，设置responseType，从而获取blob格式的文件
//Blob 是指二进制大对象（Binary Large Object），通常用于表示不可变的、原始数据的二进制文件。Blob 对象常用于文件的读写操作，如图片、视频、PDF 等。它是 Web 应用程序中处理二进制数据的关键。
const packProduct = () => {
  const tableInfo = {
    'tableSelectedIndex': tableSelectedIndex.value,
    'projectName': projectName.value,
  };
  console.log(JSON.stringify(tableInfo));
  myApi.packProduct(tableInfo)
      .then(res => {
        let blob = new Blob([res], { type: 'application/octet-stream' });
        let reader = new FileReader();
        // 将 Blob 对象转换为 base64
        reader.readAsDataURL(blob);
        reader.onload = (e) => {
          // 创建一个 a 标签用于下载文件
          let a = document.createElement('a');
          a.download = 'productConfig.zip';
          a.href = e.target.result;
          // 由于 Firefox 的兼容性问题，将 a 标签添加到 DOM 中
          document.body.appendChild(a);
          // 触发点击事件，开始下载
          a.click();
          // 点击完成后移除 a 标签
          document.body.removeChild(a);
        };
        ElNotification({
          title: '提示',
          message: h('i', { style: 'color: var(--ep-color-primary)' }, "打包成功"),
          position: 'top-right',
          type: 'success',
        });
      })
      .catch(error => {
        ElNotification({
          title: '提示',
          message: h('i', { style: 'color: var(--ep-color-primary)' }, error),
          position: 'top-right',
          type: 'error',
        });
      });
};
</script>
