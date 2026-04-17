import { ref, computed, watch, reactive, type Ref } from "vue";
import type { YgoCard } from "~/types/ygo";

export const useCardFilters = (initialCards: Ref<YgoCard[]>) => {
  const search = useCookie("ygo-search", { default: () => "" });
  const selectedTypes = useCookie<string[]>("ygo-selected-types", {
    default: () => [],
  });
  const filters = useCookie("ygo-filters", {
    default: () => ({ cardType: "", level: "", attribute: "", race: "" }),
  });
  const sortField = useCookie("ygo-sort-field", { default: () => "name" });
  const sortDirection = useCookie("ygo-sort-dir", { default: () => "asc" });

  const currentPage = ref(1);
  const pageSize = 20;

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
      "Normal",
      "Fusion",
      "Synchro",
      "Xyz",
      "Link",
      "Pendulum",
      "Ritual",
      "Continuous",
      "Quick",
    ];

    initialCards.value.forEach((c) => {
      if (!c.type) return;
      allowed.forEach((allow) => {
        if (c.type.includes(allow)) {
          types.add(allow);
        }
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

    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });

    return Array.from(levels).sort(collator.compare);
  });

  const filteredCards = computed(() => {
    const searchLower = search.value?.toLowerCase() || "";
    const typesLower = selectedTypes.value.map((t) => t.toLowerCase());
    const fType = filters.value.cardType;
    const fAttr = filters.value.attribute;
    const fRace = filters.value.race;
    const fLevel = filters.value.level;

    const isLinkFilter = fLevel?.startsWith("Link/");
    const parsedLinkVal = isLinkFilter ? parseInt(fLevel.split("/")[1]) : null;

    return initialCards.value.filter((c) => {
      if (searchLower && !c.name.toLowerCase().includes(searchLower))
        return false;

      if (
        typesLower.length > 0
        && !typesLower.some((t) => c.type.toLowerCase().includes(t))
      )
        return false;

      if (fType && !c.type.includes(fType)) return false;
      if (fAttr && c.attribute !== fAttr) return false;
      if (fRace && c.race !== fRace) return false;

      if (fLevel) {
        if (isLinkFilter && c.linkval !== parsedLinkVal) return false;
        if (!isLinkFilter && String(c.level) !== fLevel) return false;
      }

      return true;
    });
  });

  const sortedCards = computed(() => {
    let result = [...filteredCards.value];

    if (!sortField.value) return result;

    result.sort((a, b) => {
      let valA = a[sortField.value as keyof YgoCard];
      let valB = b[sortField.value as keyof YgoCard];

      if (valA === undefined || valA === null) valA = -1;
      if (valB === undefined || valB === null) valB = -1;

      if (typeof valA === "string" && typeof valB === "string") {
        const compareResult = valA.localeCompare(valB);
        return sortDirection.value === "asc" ? compareResult : -compareResult;
      }

      if (valA < valB) return sortDirection.value === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection.value === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  });

  const paginatedCards = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return sortedCards.value.slice(start, start + pageSize);
  });

  const totalPages = computed(() =>
    Math.ceil(sortedCards.value.length / pageSize),
  );

  const clearFilters = () => {
    search.value = "";
    selectedTypes.value = [];
    filters.value = { cardType: "", level: "", attribute: "", race: "" };
    sortField.value = "name";
    sortDirection.value = "asc";
    currentPage.value = 1;
  };

  watch(
    [search, selectedTypes, filters, sortField, sortDirection],
    () => {
      currentPage.value = 1;
    },
    { deep: true },
  );

  return {
    search,
    selectedTypes,
    filters,
    sortField,
    sortDirection,
    currentPage,
    paginatedCards,
    totalPages,
    options: reactive({
      attributes: uniqueAttributes,
      races: uniqueRaces,
      cardTypes: uniqueCardTypes,
      levels: uniqueLevels,
    }),
    clearFilters,
  };
};
