<script setup lang="ts">
  import { useCardFilters } from "~/composables/useCardFilters";
  import { fetchCardsByDate } from "~/services/api/ygoApi";
  import type { YgoCard } from "~/types/ygo";

  const cardsDateRange = { from: "2025-01-01", to: "2025-08-23" } as const;

  const { data, error } = await useAsyncData("cards", () =>
    fetchCardsByDate(cardsDateRange.from, cardsDateRange.to),
  );

  if (error.value) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load cards",
      fatal: true,
    });
  }

  const rawCards = computed<YgoCard[]>(() => data.value?.data ?? []);

  const {
    search,
    selectedTypes,
    filters,
    sortField,
    sortDirection,
    options,
    paginatedCards,
    currentPage,
    totalPages,
    clearFilters,
  } = useCardFilters(rawCards);

  const sortFields = [
    { name: "atk", value: "atk", id: "Order1" },
    { name: "def", value: "def", id: "Order2" },
    { name: "level", value: "level", id: "Order3" },
    { name: "name", value: "name", id: "Order4" },
  ] as const;

  const sortDirections = [
    { name: "A-Z / Low-High", value: "asc", id: "DirChoice1" },
    { name: "Z-A / High-Low", value: "desc", id: "DirChoice2" },
  ] as const;
</script>

<template>
  <div
    class="flex flex-col items-center gap-20px col-span-full lg:col-start-2 lg:col-end-12"
  >
    <div class="flex flex-wrap items-center gap-16px w-full">
      <UiSearchBar v-model="search" />
      <div class="flex flex-wrap w-1/2 items-center gap-8px">
        <UiCheckbox
          type="monster"
          v-model="selectedTypes"
        />
        <UiCheckbox
          type="spell"
          v-model="selectedTypes"
        />
        <UiCheckbox
          type="trap"
          v-model="selectedTypes"
        />
      </div>

      <button
        @click="clearFilters"
        class="px-16px py-8px bg-red-100 text-red-600 font-bold rounded-lg hover:bg-red-200 transition-colors ml-auto"
      >
        Clear Filters
      </button>
    </div>

    <div class="flex flex-wrap gap-8px">
      <UiSelect
        v-model="filters.race"
        :types="options.races"
        name="Card Type"
      />
      <UiSelect
        v-model="filters.attribute"
        :types="options.attributes"
        name="Attribute"
      />
      <UiSelect
        v-model="filters.level"
        :types="options.levels"
        name="Level/Link"
      />
      <UiSelect
        v-model="filters.cardType"
        :types="options.cardTypes"
        name="Monster type"
      />
    </div>
    <div class="flex flex-wrap gap-20px bg-white rounded-lg p-16px w-fit">
      <div class="flex flex-wrap gap-8px">
        <span class="font-bold">Order by :</span>
        <UiRadioButton
          v-for="field in sortFields"
          :key="field.id"
          v-model="sortField"
          v-bind="field"
        />
      </div>

      <div class="flex flex-wrap gap-8px">
        <span class="font-bold">Direction :</span>
        <UiRadioButton
          v-for="direction in sortDirections"
          :key="direction.id"
          v-model="sortDirection"
          v-bind="direction"
        />
      </div>
    </div>
  </div>

  <div class="flex justify-center col-span-full">
    <UiPagination
      :total-pages="totalPages"
      v-model="currentPage"
    />
  </div>

  <div
    class="flex flex-wrap col-span-full gap-4 justify-center items-start px-4"
  >
    <UiCard
      v-for="card in paginatedCards"
      :key="card.id"
      :card="card"
    />
  </div>

  <div class="flex justify-center col-span-full">
    <UiPagination
      :total-pages="totalPages"
      v-model="currentPage"
    />
  </div>
</template>
