<template>
    <div class="card">
        <img :src="`/images/${experience.image}`" alt="experience.name">
        <span class="card_test">
            {{ experience.name }}
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    experience: {type:Object,required:true}
})
</script>

<style scoped ></style>
