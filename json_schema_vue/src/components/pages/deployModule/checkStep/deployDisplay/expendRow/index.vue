<template>
    <div class="expendRow">
        <div class="productList">
            <div class="productItem">
                <div>导入模块</div>
                <div>{{item }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    value: Object
})

const items = ref([
    {
        
    },
    {}
])

</script>

<style scoped>
.expendRow {
    padding: 24px;
    margin: 24px;
}

.productInfo {
    width: 60px;
    display: flex;
}
</style>
