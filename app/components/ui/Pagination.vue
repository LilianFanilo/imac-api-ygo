<script setup lang="ts">
  const props = defineProps<{ totalPages: number }>();

  const currentPage = defineModel<number>({ default: 1 });

  const next = () => {
    if (currentPage.value < props.totalPages) currentPage.value++;
  };

  const prev = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
</script>

<template>
  <div class="flex justify-center gap-4 rounded-full w-fit h-fit">
    <button
      :disabled="currentPage === 1"
      @click="prev"
      class="px-4 py-2 border-3 border-black rounded-full bg-black text-white disabled:opacity-50 hover:border-sky-500 transition-colors"
    >
      Précédent
    </button>

    <span class="flex items-center font-medium">
      Page {{ currentPage }} / {{ totalPages }}
    </span>

    <button
      :disabled="currentPage === totalPages"
      @click="next"
      class="px-4 py-2 border-3 border-black rounded-full bg-black text-white disabled:opacity-50 hover:border-sky-500 transition-colors"
    >
      Suivant
    </button>
  </div>
</template>
