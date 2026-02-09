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
      <label class="flex items-center bg-amber-400 rounded px-4 py-2 gap-2">
        Monster
        <input class="rounded-full" type="checkbox" value="monster" v-model="selectedTypes" />
      </label>

      <label class="flex items-center bg-green-400 rounded px-4 py-2 gap-2">
        Spell
        <input class="" type="checkbox" value="spell" v-model="selectedTypes" />
      </label>

      <label class="flex items-center bg-purple-400 rounded px-4 py-2 gap-2">
        Trap
        <input class="" type="checkbox" value="trap" v-model="selectedTypes" />
      </label>
    </div>
    <div class="grid grid-cols-2 px-24">
      <div class="flex gap-x-2">
        <label>
          Type
          <select name="Type" id="">
            <option value=""></option>
            <option value="">Fusion</option>
            <option value="">Continuous</option>
            <option value="">Quick</option>
          </select>
        </label>

        <label>
          Level/Link
          <select name="Type" id="">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">Link/1</option>
            <option value="">Link/2</option>
          </select>
        </label>

        <label>
          Attribute
          <select name="Type" id="">
            <option value="">Fire</option>
            <option value="">Water</option>
            <option value="">Dark</option>
          </select>
        </label>
        
        <label>
          Race
          <select name="Type" id="">
            <option value="">Warrior</option>
            <option value="">Dragon</option>
            <option value="">Fiend</option>
          </select>
        </label>
      </div>
      <div class="flex gap-x-2">
        Order by :
        <label>
          Name
          <input type="checkbox" name="" id="">
        </label>
        <label>
          Level
          <input type="checkbox" name="" id="">
        </label>
        <label>
          Attack
          <input type="checkbox" name="" id="">
        </label>
        <label>
          Defense
          <input type="checkbox" name="" id="">
        </label>
      </div>
    </div>

        <!-- Pagination -->
    <div class="flex justify-center gap-4 py-6">
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

    <!-- Cards -->
    <div class="flex flex-wrap gap-4 justify-center items-start px-4">
        <Card v-for="card in paginatedCards" :key="card.id" :card="card" />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-4 py-6">
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
