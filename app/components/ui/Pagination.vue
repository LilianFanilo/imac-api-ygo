<script setup lang="ts">
  // On définit les props nécessaires
  const props = defineProps<{ totalPages: number }>();

  // On utilise defineModel pour currentPage pour permettre la modification
  // Cela crée un lien bidirectionnel avec le parent
  const currentPage = defineModel<number>({ default: 1 });

  // Fonctions pour changer de page (plus propre que de mettre la logique dans le template)
  const next = () => {
    if (currentPage.value < props.totalPages) currentPage.value++;
  };

  const prev = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
</script>

<template>
  <div
    class="flex justify-center gap-4 p-4 rounded-full text-white bg-black w-fit h-fit mx-auto my-8"
  >
    <button
      :disabled="currentPage === 1"
      @click="prev"
      class="px-4 py-2 border-3 rounded-full disabled:opacity-50 hover:border-sky-500 transition-colors"
    >
      Précédent
    </button>

    <span class="flex items-center font-medium">
      Page {{ currentPage }} / {{ totalPages }}
    </span>

    <button
      :disabled="currentPage === totalPages"
      @click="next"
      class="px-4 py-2 border-3 rounded-full disabled:opacity-50 hover:border-sky-500 transition-colors"
    >
      Suivant
    </button>
  </div>
</template>
