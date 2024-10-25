<template>
    <el-cascader v-model="checkedArray" :props="elProps" :options="options" :disabled="!props.projectName" :show-all-levels="false"/>
</template>

<script setup>
import { ref, watch } from 'vue'
import { EiInfo } from '@/utils/eiinfo.js';
import myApi from '@/api/index.js'

// 定义 value 并初始化为响应式变量
const checkedArray = ref([])
const options = ref([])

const props = defineProps({
    projectName: String
})

const node  = defineModel()

watch(checkedArray,()=>{
    node.value = checkedArray.value[checkedArray.value.length -1]
    console.log(node.value) 
})


// 每当 projectName 变化时，获取根目录下的子目录
watch(() => props.projectName, () => {
    if (props.projectName) {
        const queryInfo = new EiInfo()
        queryInfo.set(`inqu_status-0-node`, 'root')
        queryInfo.set(`inqu_status-0-projectName`, props.projectName)

        myApi.getStoragePositionFromDataDictionary(queryInfo).then(
            res => {
                options.value = res.getBlock('root').getMappedRows().map(item => ({
                    value: item.nodeCode,
                    label: item.nodeName,
                    children:[]
                }))
            }
        )

    } else {
        options.value = [] // 如果没有 projectName，清空节点数据
    }
})
// 定义 elProps 和 lazyLoad 函数
//nodeCode是uuid，nodeName是显示值
const elProps = {
    checkStrictly: true,
    lazy: true,
    multiple: false,
    async lazyLoad(node, resolve) {
        if (!props.projectName) {
            resolve([])
            return;
        }
        if (node.level == 0) {
            const queryInfo = new EiInfo()
            queryInfo.set(`inqu_status-0-node`, 'root')
            queryInfo.set(`inqu_status-0-projectName`, props.projectName)

            const res = await myApi.getStoragePositionFromDataDictionary(queryInfo)

            const nodes = res.getBlock('root').getMappedRows().map(item => ({
                value: item.nodeCode,
                label: item.nodeName,
                leaf:false
            }))
            resolve(nodes)
        }

        else {
            const queryInfo = new EiInfo()
            queryInfo.set(`inqu_status-0-node`, node.value)
            queryInfo.set(`inqu_status-0-projectName`, props.projectName)

            const res = await myApi.getStoragePositionFromDataDictionary(queryInfo)

            const nodes = res.getBlock(node.value).getMappedRows().map((item) => ({
                value: item?.nodeCode,
                label: item?.nodeName,
                leaf:false
            }))

            if (nodes.length == 0) {
                node.data.leaf = true
                resolve([])

            } else {
                resolve(nodes)
                node.data.leaf = false
            }
        }
    }
}



</script>