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

// Types filter
const selectedTypes = ref<string[]>([]);

// Pagination
const currentPage = ref(1);
const pageSize = 20;

const filteredCards = computed(() => {
  if (!data.value?.data) return [];

  return data.value.data.filter(card => {
    const matchesSearch = card.name
      .toLowerCase()
      .includes(search.value.toLowerCase());

    const matchesType =
      selectedTypes.value.length === 0 ||
      selectedTypes.value.some(type =>
        card.type.toLowerCase().includes(type)
      );

    return matchesSearch && matchesType;
  });
});

const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredCards.value.slice(start, start + pageSize);
});

const totalPages = computed(() =>
  Math.ceil(filteredCards.value.length / pageSize)
);

watch([search, selectedTypes], () => {
  currentPage.value = 1;
});
</script>

<template>
  <div class="flex flex-col">
    <!-- Search -->
    <div class="flex justify-center p-4">
      <SearchBar v-model="search" />
    </div>

    <!-- Filters -->
    <div class="flex justify-center gap-6 pb-4">
      <label class="flex items-center gap-2">
        <input type="checkbox" value="monster" v-model="selectedTypes" />
        Monster
      </label>

      <label class="flex items-center gap-2">
        <input type="checkbox" value="spell" v-model="selectedTypes" />
        Spell
      </label>

      <label class="flex items-center gap-2">
        <input type="checkbox" value="trap" v-model="selectedTypes" />
        Trap
      </label>
    </div>

    <!-- Cards -->
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
