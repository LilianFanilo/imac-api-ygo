<script setup lang="ts">
  import type { YgoCard } from "~/types/ygo";

  const props = defineProps({
    card: { type: Object as () => YgoCard, required: true },
    showStat: { type: Boolean, default: true },
    statMode: { type: String as () => "atk" | "def", required: true },
  });

  const emit = defineEmits<{
    (e: "guess", choice: "higher" | "lower"): void;
  }>();
</script>

<template>
  <div
    class="flex flex-col gap-y-20px w-fit md:w-100 bg-white rounded-xl p-20px shadow-lg"
  >
    <div class="flex flex-col gap-y-4px">
      <H3>
        {{ card.name }}
      </H3>
      <img
        v-if="card.card_images?.length"
        :src="card.card_images[0]?.image_url_cropped"
        class="w-full aspect-square rounded"
        alt="Image de la carte"
      />
    </div>

    <div
      v-if="showStat"
      class="mt-auto text-center"
    >
      <p class="font-bold">{{ statMode.toUpperCase() }}</p>
      <p class="text-3xl font-black">{{ card[statMode] }}</p>
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
