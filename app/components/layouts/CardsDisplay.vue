<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Card from '~/components/ui/Card.vue';
import SearchBar from '~/components/ui/SearchBar.vue';
import { fetchCardsByDate } from '~/services/api/ygoApi';
import Checkbox from '../ui/Checkbox.vue';
import Pagination from '../ui/Pagination.vue';
import Select from '../ui/Select.vue';

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

    <!-- Checkboxes -->
    <div class="flex justify-center gap-6 pb-4">
      <Checkbox type="monster" v-model="selectedTypes" />
      <Checkbox type="spell" v-model="selectedTypes" />
      <Checkbox type="trap" v-model="selectedTypes" />
    </div>

    <div class="grid grid-cols-2 px-24">
      <div class="flex gap-x-2">

      <Select :types="['Fusion', 'Continuous','Quick']">
        Type
      </Select>

      <Select :types="['1', '2','3','4','5','6','7','8','Link/1','Link/2']">
        Level/Link
      </Select>

      <Select :types="['Fire', 'Water','Earth','Light','Dark']">
        Attribute
      </Select>
        
      <Select :types="['Warrior', 'Dragon','Fiend']">
        Race
      </Select>

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
    <Pagination :total-pages="totalPages" v-model="currentPage"/>

    <!-- Cards -->
    <div class="flex flex-wrap gap-4 justify-center items-start px-4">
        <Card v-for="card in paginatedCards" :key="card.id" :card="card" />
    </div>

    <!-- Pagination -->
    <Pagination :total-pages="totalPages" v-model="currentPage"/>
  </div>
</template>
