<script setup lang="ts">
  import type { YgoCard } from "~/types/ygo"; // N'oublie pas d'importer ton type si besoin

  // 1. On ajoute la prop 'showAtk'
  const props = defineProps({
    card: { type: Object as () => YgoCard, required: true },
    showAtk: { type: Boolean, default: true },
  });

  // 2. On déclare l'événement 'guess' que l'on va renvoyer au parent
  const emit = defineEmits<{
    (e: "guess", choice: "higher" | "lower"): void;
  }>();
</script>

<template>
  <div
    class="flex flex-col gap-y-20px w-80 bg-white rounded-xl p-20px shadow-lg borde"
  >
    <div class="flex flex-col gap-y-4px">
      <H3>
        {{ card.name }}
      </H3>
      <img
        v-if="card.card_images?.length"
        :src="card.card_images[0].image_url_cropped"
        class="w-full aspect-square rounded"
        alt="Image de la carte"
      />
    </div>

    <div
      v-if="showAtk"
      class="mt-auto text-center"
    >
      <p class="font-bold">ATK</p>
      <p class="text-3xl font-black">{{ card.atk }}</p>
    </div>

    <div
      v-else
      class="flex flex-col gap-y-3 w-full mt-auto"
    >
      <button
        @click="emit('guess', 'higher')"
        class="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded shadow-md transition-all flex justify-center items-center gap-2"
      >
        ▲ Higher
      </button>
      <button
        @click="emit('guess', 'lower')"
        class="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-md transition-all flex justify-center items-center gap-2"
      >
        ▼ Lower
      </button>
    </div>
  </div>
</template>
