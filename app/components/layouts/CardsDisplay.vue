<script setup lang="ts">
  import { ref, computed, watch } from "vue";
  import Card from "~/components/ui/Card.vue";
  import SearchBar from "~/components/ui/SearchBar.vue";
  import { fetchCardsByDate } from "~/services/api/ygoApi";
  import Checkbox from "../ui/Checkbox.vue";
  import Pagination from "../ui/Pagination.vue";
  import Select from "../ui/Select.vue";

  const { data } = await fetchCardsByDate("2025-01-01", "2025-08-23");

  const search = ref("");

  // Types filter
  const selectedTypes = ref<string[]>([]);

  // Select filters
  const selectedCardType = ref<string>("");
  const selectedLevel = ref<string>("");
  const selectedAttribute = ref<string>("");
  const selectedRace = ref<string>("");

  // Pagination
  const currentPage = ref(1);
  const pageSize = 20;

  // Extract unique values from cards
  const uniqueCardTypes = computed(() => {
    if (!data.value?.data) return [];
    const types = new Set<string>();
    data.value.data.forEach((card) => {
      if (card.type) {
        const cardTypeParts = card.type.split("/");
        cardTypeParts.forEach((part) => {
          if (
            [
              "Fusion",
              "Synchro",
              "Xyz",
              "Link",
              "Pendulum",
              "Ritual",
              "Continuous",
              "Quick",
              "Normal",
            ].includes(part.trim())
          ) {
            types.add(part.trim());
          }
        });
      }
    });
    return Array.from(types).sort();
  });

  const uniqueLevels = computed(() => {
    if (!data.value?.data) return [];
    const levels = new Set<string>();
    data.value.data.forEach((card) => {
      if (card.level) {
        levels.add(String(card.level));
      }
      if ((card as any).linkval) {
        levels.add(`Link/${(card as any).linkval}`);
      }
    });
    return Array.from(levels).sort();
  });

  const uniqueAttributes = computed(() => {
    if (!data.value?.data) return [];
    const attributes = new Set<string>();
    data.value.data.forEach((card) => {
      if ((card as any).attribute) {
        attributes.add((card as any).attribute);
      }
    });
    return Array.from(attributes).sort();
  });

  const uniqueRaces = computed(() => {
    if (!data.value?.data) return [];
    const races = new Set<string>();
    data.value.data.forEach((card) => {
      if (card.race) {
        races.add(card.race);
      }
    });
    return Array.from(races).sort();
  });

  const filteredCards = computed(() => {
    if (!data.value?.data) return [];

    return data.value.data.filter((card) => {
      const matchesSearch = card.name
        .toLowerCase()
        .includes(search.value.toLowerCase());

      const matchesType =
        selectedTypes.value.length === 0
        || selectedTypes.value.some((type) =>
          card.type.toLowerCase().includes(type),
        );

      const matchesCardType =
        selectedCardType.value === ""
        || card.type.includes(selectedCardType.value);

      const matchesLevel =
        selectedLevel.value === ""
        || (selectedLevel.value.startsWith("Link/")
          && (card as any).linkval
            === parseInt(selectedLevel.value.split("/")[1]))
        || (selectedLevel.value !== ""
          && !selectedLevel.value.startsWith("Link/")
          && String(card.level) === selectedLevel.value);

      const matchesAttribute =
        selectedAttribute.value === ""
        || (card as any).attribute === selectedAttribute.value;

      const matchesRace =
        selectedRace.value === "" || card.race === selectedRace.value;

      return (
        matchesSearch
        && matchesType
        && matchesCardType
        && matchesLevel
        && matchesAttribute
        && matchesRace
      );
    });
  });

  const paginatedCards = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredCards.value.slice(start, start + pageSize);
  });

  const totalPages = computed(() =>
    Math.ceil(filteredCards.value.length / pageSize),
  );

  watch(
    [
      search,
      selectedTypes,
      selectedCardType,
      selectedLevel,
      selectedAttribute,
      selectedRace,
    ],
    () => {
      currentPage.value = 1;
    },
  );
</script>

<template>
  <div class="flex flex-col">
    <!-- Search -->
    <div class="flex justify-center p-4">
      <SearchBar v-model="search" />
    </div>

    <!-- Checkboxes -->
    <div class="flex justify-center gap-6 pb-4">
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

    <div class="grid grid-cols-2 px-24">
      <div class="flex gap-x-2">
        <Select
          v-model="selectedCardType"
          :types="uniqueCardTypes"
        >
          Type
        </Select>

        <Select
          v-model="selectedLevel"
          :types="uniqueLevels"
        >
          Level/Link
        </Select>

        <Select
          v-model="selectedAttribute"
          :types="uniqueAttributes"
        >
          Attribute
        </Select>

        <Select
          v-model="selectedRace"
          :types="uniqueRaces"
        >
          Race
        </Select>
      </div>
      <div class="flex gap-x-2">
        Order by :
        <label>
          Name
          <input
            type="checkbox"
            name=""
            id=""
          />
        </label>
        <label>
          Level
          <input
            type="checkbox"
            name=""
            id=""
          />
        </label>
        <label>
          Attack
          <input
            type="checkbox"
            name=""
            id=""
          />
        </label>
        <label>
          Defense
          <input
            type="checkbox"
            name=""
            id=""
          />
        </label>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination
      :total-pages="totalPages"
      v-model="currentPage"
    />

    <!-- Cards -->
    <div class="flex flex-wrap gap-4 justify-center items-start px-4">
      <Card
        v-for="card in paginatedCards"
        :key="card.id"
        :card="card"
      />
    </div>

    <!-- Pagination -->
    <Pagination
      :total-pages="totalPages"
      v-model="currentPage"
    />
  </div>
</template>
