// composables/useCardFilters.ts
import { ref, computed, watch, reactive, type Ref } from "vue";
import type { YgoCard } from "~/types/ygo";

export const useCardFilters = (initialCards: Ref<YgoCard[]>) => {
  const search = ref("");
  const selectedTypes = ref<string[]>([]);
  const filters = ref({ cardType: "", level: "", attribute: "", race: "" });

  // 1. Nouveaux états pour gérer le tri
  const sortField = ref("name");
  const sortDirection = ref("asc");

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
      // Si c.type n'existe pas, on passe à la suite
      if (!c.type) return;

      // On parcourt nos types autorisés pour voir si le type de la carte le contient
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

  // 2. Nouvelle logique de tri
  const sortedCards = computed(() => {
    // Créer une copie pour ne pas muter le tableau d'origine
    let result = [...filteredCards.value];

    if (!sortField.value) return result;

    result.sort((a, b) => {
      let valA = a[sortField.value as keyof YgoCard];
      let valB = b[sortField.value as keyof YgoCard];

      // Sécurité : Gérer les cartes sans Atk/Def/Level (Magies, Pièges)
      if (valA === undefined || valA === null) valA = -1;
      if (valB === undefined || valB === null) valB = -1;

      // Tri des chaînes de caractères (ex: nom de la carte)
      if (typeof valA === "string" && typeof valB === "string") {
        const compareResult = valA.localeCompare(valB);
        return sortDirection.value === "asc" ? compareResult : -compareResult;
      }

      // Tri des nombres (Atk, Def, Level)
      if (valA < valB) return sortDirection.value === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection.value === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  });

  // 3. La pagination utilise maintenant sortedCards au lieu de filteredCards
  const paginatedCards = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return sortedCards.value.slice(start, start + pageSize);
  });

  const totalPages = computed(() =>
    Math.ceil(sortedCards.value.length / pageSize),
  );

  // Remise à la page 1 si on filtre ou qu'on trie
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
    sortField, // Exposé pour le template
    sortDirection, // Exposé pour le template
    currentPage,
    paginatedCards,
    totalPages,
    // 4. Reactive() rend l'objet réactif dans ton template (plus besoin de .value)
    options: reactive({
      attributes: uniqueAttributes,
      races: uniqueRaces,
      cardTypes: uniqueCardTypes,
      levels: uniqueLevels,
    }),
  };
};
