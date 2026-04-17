<script setup lang="ts">
  import { ref, computed, onMounted } from "vue";
  import H1 from "~/components/H1.vue";
  import H2 from "~/components/H2.vue";
  import H3 from "~/components/H3.vue";
  import Footer from "~/components/layouts/Footer.vue";
  import Main from "~/components/layouts/Main.vue";
  import Navbar from "~/components/layouts/Navbar.vue";
  import Background from "~/components/ui/Background.vue";
  import CardGuess from "~/components/ui/CardGuess.vue";
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

  // Start the game only on the client side after mounting
  onMounted(() => {
    if (rawCards.value.length >= 2) {
      initGame();
    }
  });

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
  <Main>
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
      class="flex flex-col gap-y-20px items-center bg-red-500 p-20px rounded-xl col-span-full lg:col-start-5 lg:col-end-9"
    >
      <div class="text-white flex flex-col items-center">
        <H2>Game Over!</H2>
        <p class="text-xl">You scored: {{ score }}</p>
      </div>
      <button
        @click="initGame"
        class="px-6 py-2 bg-black hover:bg-gray-900 text-white rounded-full font-bold transition-colors"
      >
        Play Again
      </button>
    </div>

    <div
      v-else-if="cardLeft && cardRight"
      class="flex flex-col md:flex-row justify-center gap-20px lg:justify-between items-center col-span-full lg:col-start-3 lg:col-end-11"
    >
      <CardGuess
        :card="cardLeft"
        :show-atk="true"
      />

      <div
        class="text-3xl font-bold text-white bg-black px-16px py-16px rounded-full"
      >
        VS
      </div>

      <CardGuess
        :card="cardRight"
        :show-atk="false"
        @guess="guess"
      />
    </div>
    <Background />
  </Main>
  <Footer />
</template>
