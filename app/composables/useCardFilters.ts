// composables/useCardFilters.ts
import { ref, computed, watch, type Ref } from "vue";
import type { YgoCard } from "~/types/ygo";

export const useCardFilters = (initialCards: Ref<YgoCard[]>) => {
  const search = ref("");
  const selectedTypes = ref<string[]>([]);

  const filters = ref({ cardType: "", level: "", attribute: "", race: "" });

  const currentPage = ref(1);
  const pageSize = 20;

  // Helpers pour extraire les données uniques
  const uniqueAttributes = computed(() =>
    [
      ...new Set(
        initialCards.value.map((c) => c.attribute).filter(Boolean) as string[],
      ),
    ].sort(),
  );

  const uniqueRaces = computed(() =>
    [...new Set(initialCards.value.map((c) => c.race).filter(Boolean))].sort(),
  );

  const uniqueCardTypes = computed(() => {
    const types = new Set<string>();
    const allowed = [
      "Fusion",
      "Synchro",
      "Xyz",
      "Link",
      "Pendulum",
      "Ritual",
      "Continuous",
      "Quick",
      "Normal",
    ];
    initialCards.value.forEach((c) => {
      c.type.split("/").forEach((part) => {
        if (allowed.includes(part.trim())) types.add(part.trim());
      });
    });
    return Array.from(types).sort();
  });

  const uniqueLevels = computed(() => {
    const levels = new Set<string>();
    initialCards.value.forEach((c) => {
      if (c.level) levels.add(String(c.level));
      if (c.linkval) levels.add(`Link/${c.linkval}`);
    });
    return Array.from(levels).sort();
  });

  // Logique de filtrage
  const filteredCards = computed(() => {
    let result = initialCards.value;

    if (search.value) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(search.value.toLowerCase()),
      );
    }

    if (selectedTypes.value.length > 0) {
      result = result.filter((c) =>
        selectedTypes.value.some((t) => c.type.toLowerCase().includes(t)),
      );
    }

    if (filters.value.cardType)
      result = result.filter((c) => c.type.includes(filters.value.cardType));
    if (filters.value.attribute)
      result = result.filter((c) => c.attribute === filters.value.attribute);
    if (filters.value.race)
      result = result.filter((c) => c.race === filters.value.race);

    if (filters.value.level) {
      if (filters.value.level.startsWith("Link/")) {
        result = result.filter(
          (c) => c.linkval === parseInt(filters.value.level.split("/")[1]),
        );
      } else {
        result = result.filter((c) => String(c.level) === filters.value.level);
      }
    }

    return result;
  });

  const paginatedCards = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredCards.value.slice(start, start + pageSize);
  });

  const totalPages = computed(() =>
    Math.ceil(filteredCards.value.length / pageSize),
  );

  watch(
    [search, selectedTypes, filters],
    () => {
      currentPage.value = 1;
    },
    { deep: true },
  );

  return {
    search,
    selectedTypes,
    filters,
    currentPage,
    paginatedCards,
    totalPages,
    options: {
      attributes: uniqueAttributes,
      races: uniqueRaces,
      cardTypes: uniqueCardTypes,
      levels: uniqueLevels,
    },
  };
};
