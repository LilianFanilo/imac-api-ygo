<script setup lang="ts">
import { ref, computed } from 'vue';
import Card from '~/components/ui/Card.vue';
import SearchBar from '~/components/ui/SearchBar.vue';
import { fetchCardsByDate } from '~/services/api/ygoApi';

const { data } = await fetchCardsByDate(
  '2025-01-01',
  '2025-08-23'
);

const search = ref('');

const filteredCards = computed(() => {
  if (!data.value?.data) return [];

  return data.value.data.filter(card =>
    card.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<template>
  <div>
    <SearchBar v-model="search" />
    
    <div class="h-screen flex flex-wrap gap-4 justify-center items-start p-4">
        <div v-for="card in filteredCards" :key="card.id">
            <Card :card="card" />
        </div>
    </div>
  </div>
</template>
