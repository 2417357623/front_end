<template>
    <section class="destination">
        <h1>{{ destination.name }}</h1>
        <div class="destination-details">
            <img :src="`/images/${destination.image}`" alt="" />
            <p>{{ destination.description }}</p>
        </div>
    </section>
    <section class="experiences">
        <h2>Top Experiences in {{ destination.name }}</h2>
        <div class="cards">
            <RouterLink v-for="experience in experiences" :key="experience.slug"
                :to="{ name: 'Experience.show', params: { experienceSlug: experience.slug } }">
                <ExperienceCard :experience="experience" />
            </RouterLink>
        </div>
        <RouterView />
    </section>
</template>

<script setup>
import sourceData from '@/data.json';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ExperienceCard from '@/components/ExperienceCard.vue';

// const route = useRoute(); // 获取当前路由
// const destinationId = computed(() => parseInt(route.params.id))

const props = defineProps({
    id: { type: Number, required: true }
})

const destinationId = computed(() => props.id)

const destination = computed(() => sourceData.destinations.find(destination => destination.id === destinationId.value))

const experiences = computed(() => destination.value.experiences)

</script>

<style scoped></style>
