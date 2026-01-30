<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Card from '~/components/ui/Card.vue';
import SearchBar from '~/components/ui/SearchBar.vue';
import { fetchCardsByDate } from '~/services/api/ygoApi';

const { data } = await fetchCardsByDate(
  '2025-01-01',
  '2025-08-23'
);

const search = ref('');

// Pagination
const currentPage = ref(1);
const pageSize = 20;

// Filtrage par recherche
const filteredCards = computed(() => {
  if (!data.value?.data) return [];

  return data.value.data.filter(card =>
    card.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Découpage pagination
const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredCards.value.slice(start, start + pageSize);
});

// Nombre total de pages
const totalPages = computed(() =>
  Math.ceil(filteredCards.value.length / pageSize)
);

// Reset pagination quand on cherche
watch(search, () => {
  currentPage.value = 1;
});
</script>

<template>
  <div class="flex flex-col">
    <!-- Barre de recherche -->
    <div class="flex justify-center p-4">
      <SearchBar v-model="search" />
    </div>

    <!-- Liste des cartes -->
    <div class="flex flex-wrap gap-4 justify-center items-start p-4">
      <div v-for="card in paginatedCards" :key="card.id">
        <Card :card="card" />
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-4 pb-6">
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="px-4 py-2 border rounded disabled:opacity-50"
      >
        Précédent
      </button>

      <span class="flex items-center">
        Page {{ currentPage }} / {{ totalPages }}
      </span>

      <button
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        class="px-4 py-2 border rounded disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  </div>
</template>
