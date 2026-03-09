<script setup lang="ts">
  import { useCardFilters } from "~/composables/useCardFilters";
  import { fetchCardsByDate } from "~/services/api/ygoApi";
  import type { YgoCard } from "~/types/ygo";

  import Card from "~/components/ui/Card.vue";
  import SearchBar from "~/components/ui/SearchBar.vue";
  import Checkbox from "~/components/ui/Checkbox.vue";
  import Pagination from "~/components/ui/Pagination.vue";
  import Select from "~/components/ui/Select.vue";

  const { data } = await useAsyncData("cards", () =>
    fetchCardsByDate("2025-01-01", "2025-08-23"),
  );

  const rawCards = computed<YgoCard[]>(() => {
    return data.value?.data ?? [];
  });

  const {
    search,
    selectedTypes,
    filters,
    sortField, // Exposé pour le template
    sortDirection, // Exposé pour le template
    options,
    paginatedCards,
    currentPage,
    totalPages,
  } = useCardFilters(rawCards);
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col gap-4 py-4 px-18 bg-white/30">
      <div class="flex items-center gap-8 px-4">
        <SearchBar v-model="search" />
        <div class="flex w-1/2 items-center gap-6">
          <Checkbox
            type="monster"
            v-model="selectedTypes"
          />
          <Checkbox
            type="spell"
            v-model="selectedTypes"
          />
          <Checkbox
            type="trap"
            v-model="selectedTypes"
          />
        </div>
      </div>

      <div class="flex gap-x-2 px-4">
        <Select
          v-model="filters.race"
          :types="options.races"
          name="Card Type"
        />
        <Select
          v-model="filters.attribute"
          :types="options.attributes"
          name="Attribute"
        />
        <Select
          v-model="filters.level"
          :types="options.levels"
          name="Level/Link"
        />
        <!-- Not working -->
        <Select
          v-model="filters.cardType"
          :types="options.cardTypes"
          name="Monster type"
        />
      </div>
      <div>
        Order by :
        <input
          type="radio"
          id="filterChoice1"
          value="atk"
          v-model="sortField"
        />
        <label for="filterChoice1">Atk</label>

        <input
          type="radio"
          id="filterChoice2"
          value="def"
          v-model="sortField"
        />
        <label for="filterChoice2">Def</label>

        <input
          type="radio"
          id="filterChoice3"
          value="level"
          v-model="sortField"
        />
        <label for="filterChoice3">Level</label>

        <input
          type="radio"
          id="filterChoice4"
          value="name"
          v-model="sortField"
        />
        <label for="filterChoice4">Name</label>
      </div>

      <div>
        Direction :
        <input
          type="radio"
          id="dirChoice1"
          value="asc"
          v-model="sortDirection"
        />
        <label for="dirChoice1">A-Z / Low-High</label>

        <input
          type="radio"
          id="dirChoice2"
          value="desc"
          v-model="sortDirection"
        />
        <label for="dirChoice2">Z-A / High-Low</label>
      </div>
    </div>

    <Pagination
      :total-pages="totalPages"
      v-model="currentPage"
    />

    <div class="flex flex-wrap gap-4 justify-center items-start px-4">
      <Card
        v-for="card in paginatedCards"
        :key="card.id"
        :card="card"
      />
    </div>

    <Pagination
      :total-pages="totalPages"
      v-model="currentPage"
    />
  </div>
</template>
