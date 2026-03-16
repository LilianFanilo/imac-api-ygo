<script setup lang="ts">
  import { ref, computed } from "vue";
  import H1 from "~/components/H1.vue";
  import H2 from "~/components/H2.vue";
  import H3 from "~/components/H3.vue";
  import Navbar from "~/components/layouts/Navbar.vue";
  import Background from "~/components/ui/Background.vue";
  // import Card from "~/components/ui/Card.vue"; // You can integrate this later!
  import { fetchCardsByDate } from "~/services/api/ygoApi";
  import type { YgoCard } from "~/types/ygo";

  const { data, pending } = await useAsyncData("cards", () =>
    fetchCardsByDate("2025-01-01", "2025-08-23"),
  );

  // Filter to only include cards that have an ATK value (Monsters)
  const rawCards = computed<YgoCard[]>(() => {
    const cards = data.value?.data ?? [];
    return cards.filter((card) => card.atk !== undefined && card.atk !== null);
  });

  // Game State
  const score = ref(0);
  const gameOver = ref(false);
  const cardLeft = ref<YgoCard | null>(null);
  const cardRight = ref<YgoCard | null>(null);

  // Utility to grab a random card
  function getRandomCard(): YgoCard {
    const cards = rawCards.value;
    return cards[Math.floor(Math.random() * cards.length)];
  }

  // Initialize the game
  function initGame() {
    if (rawCards.value.length < 2) return;

    score.value = 0;
    gameOver.value = false;
    cardLeft.value = getRandomCard();
    cardRight.value = getRandomCard();

    // Make sure they aren't the exact same card
    while (cardRight.value?.id === cardLeft.value?.id) {
      cardRight.value = getRandomCard();
    }
  }

  // Start the game immediately once data is fetched
  if (rawCards.value.length >= 2) {
    initGame();
  }

  // The core game logic
  function guess(choice: "higher" | "lower") {
    if (!cardLeft.value || !cardRight.value) return;

    const leftAtk = cardLeft.value.atk ?? 0;
    const rightAtk = cardRight.value.atk ?? 0;

    // Evaluate if the right card's ATK is higher/equal or lower
    const isHigher = rightAtk >= leftAtk;
    const isCorrect =
      (choice === "higher" && isHigher) || (choice === "lower" && !isHigher);

    if (isCorrect) {
      score.value++;
      // Move the right card to the left, and draw a new right card
      cardLeft.value = cardRight.value;
      cardRight.value = getRandomCard();
    } else {
      gameOver.value = true;
    }
  }
</script>

<template>
  <Navbar />
  <main class="gridBase gap-40px">
    <div class="flex flex-col justify-center items-center col-span-full">
      <H1>Higher or Lower (ATK) ?</H1>
      <H2>
        Score : <span class="font-bold text-sky-400">{{ score }}</span>
      </H2>
    </div>

    <div
      v-if="pending"
      class="text-xl"
    >
      Summoning cards...
    </div>

    <div
      v-else-if="gameOver"
      class="flex flex-col items-center bg-black/70 p-8 rounded-xl border border-red-500"
    >
      <h2 class="text-4xl text-red-500 font-bold mb-4">Game Over!</h2>
      <p class="text-xl mb-6">You scored: {{ score }}</p>
      <button
        @click="initGame"
        class="px-6 py-2 bg-sky-600 hover:bg-sky-500 rounded font-bold transition-colors"
      >
        Play Again
      </button>
    </div>

    <div
      v-else-if="cardLeft && cardRight"
      class="flex items-center col-start-3 col-end-11"
    >
      <div
        class="flex flex-col items-center w-80 h-150 bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20"
      >
        <H3>
          {{ cardLeft.name }}
        </H3>
        <img
          v-if="cardLeft.card_images"
          :src="cardLeft.card_images[0].image_url"
          class="w-64 object-contain mb-4"
        />
        <div class="mt-auto text-center">
          <p class="text-gray-300">ATK</p>
          <p class="text-3xl font-black text-amber-400">{{ cardLeft.atk }}</p>
        </div>
      </div>

      <div
        class="text-4xl font-black text-amber-500 border-4 border-amber-500 rounded-full p-4 bg-black/50"
      >
        VS
      </div>

      <div
        class="flex flex-col items-center justify-between w-80 h-150 bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20"
      >
        <h3 class="text-xl font-bold text-center mb-4 h-14">
          {{ cardRight.name }}
        </h3>
        <img
          v-if="cardRight.card_images"
          :src="cardRight.card_images[0].image_url"
          class="w-64 object-contain mb-4"
        />

        <div class="flex flex-col gap-y-3 w-full mt-auto">
          <button
            @click="guess('higher')"
            class="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded shadow-md transition-all flex justify-center items-center gap-2"
          >
            ▲ Higher
          </button>
          <button
            @click="guess('lower')"
            class="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-md transition-all flex justify-center items-center gap-2"
          >
            ▼ Lower
          </button>
        </div>
      </div>
    </div>
    <Background />
  </main>
</template>
