<script setup lang="ts">
import Card from '../ui/Card.vue';

// /* This call is performed before hydration */
// const articles = await useFetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Tornado%20Dragon');

// import { computed } from 'vue';

// const { data } = await useFetch(
//   'https://db.ygoprodeck.com/api/v7/cardinfo.php?startdate=2000-01-01&enddate=2002-08-23&dateregion=tcg'
// );

// const cardNames = computed(() =>
//   data.value?.data.map(card => card.name) ?? []
// );

const { data } = await useFetch(
  'https://db.ygoprodeck.com/api/v7/cardinfo.php?startdate=2025-01-01&enddate=2025-08-23&dateregion=tcg'
);



</script>

<template>
    <div>
        <div class="h-screen flex flex-wrap gap-4 justify-center items-start p-4">
            <div v-for="card in data?.data" :key="card.id">
                <Card :card="card" />
            </div>
        </div>
    </div>
</template>