<script setup lang="ts">
  import { useCardFilters } from "~/composables/useCardFilters";
  import { fetchCardsByDate } from "~/services/api/ygoApi";
  import type { YgoCard } from "~/types/ygo";

  import Card from "~/components/ui/Card.vue";
  import SearchBar from "~/components/ui/SearchBar.vue";
  import Checkbox from "~/components/ui/Checkbox.vue";
  import Pagination from "~/components/ui/Pagination.vue";
  import Select from "~/components/ui/Select.vue";
  import RadioButton from "../ui/RadioButton.vue";

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
    <div class="flex flex-col gap-4 py-4 px-18">
      <div class="flex items-center gap-8">
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

      <div class="flex gap-x-2">
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
      <div class="flex gap-8px">
        Order by :
        <RadioButton
          v-model="sortField"
          name="atk"
          value="atk"
          id="Order1"
        />
        <RadioButton
          v-model="sortField"
          name="def"
          value="def"
          id="Order2"
        />

        <RadioButton
          v-model="sortField"
          name="level"
          value="level"
          id="Order3"
        />

        <RadioButton
          v-model="sortField"
          name="name"
          value="name"
          id="Order4"
        />
      </div>

      <div class="flex gap-8px">
        Direction :
        <RadioButton
          v-model="sortDirection"
          name="A-Z / Low-High"
          value="asc"
          id="DirChoice1"
        />

        <RadioButton
          v-model="sortDirection"
          name="Z-A / High-Low"
          value="desc"
          id="DirChoice2"
        />
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
