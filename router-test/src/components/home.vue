<template>
  <div class="home">
    <h1>All Destinations</h1>
    <div class="destinations">
      <router-link v-for="destination in destinations" :key="destination.id" :to="destination.slug">
        {{ destination.name }}
        <img :src="`/images/${destination.image}`" :alt="destination.name" />
      </router-link>
    </div>

  </div>

</template>

<script setup>
import sourceData from '@/data.json';
import { ref } from 'vue';

const destinations = ref(sourceData.destinations)
</script>

<style scoped></style>
