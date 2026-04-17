<script setup lang="ts">
  import { fetchCardsByDate } from "~/services/api/ygoApi";
  import type { YgoCard } from "~/types/ygo";

  const cardsDateRange = { from: "2025-01-01", to: "2025-08-23" } as const;

  const { data, pending, error } = await useAsyncData("cards", () =>
    fetchCardsByDate(cardsDateRange.from, cardsDateRange.to),
  );
  if (error.value) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load cards",
      fatal: true,
    });
  }

  const route = useRoute();
  const mode = computed(() => {
    const m = route.params.mode;
    return m === "def" ? "def" : "atk";
  });

  const rawCards = computed<YgoCard[]>(() => {
    const cards = data.value?.data ?? [];
    return cards.filter((card) => card[mode.value] != null);
  });

  const score = ref(0);
  const gameOver = ref(false);
  const cardLeft = ref<YgoCard | null>(null);
  const cardRight = ref<YgoCard | null>(null);
  const nextCard = ref<YgoCard | null>(null);

  function getRandomCard(): YgoCard | undefined {
    const cards = rawCards.value;
    return cards[Math.floor(Math.random() * cards.length)];
  }

  function preloadImage(card: YgoCard) {
    if (!import.meta.client) return;

    const imageUrl = card.card_images?.[0]?.image_url;
    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;
  }

  function getUniqueCard(...excludedIds: number[]): YgoCard | undefined {
    const cards = rawCards.value.filter((c) => !excludedIds.includes(c.id));
    return cards[Math.floor(Math.random() * cards.length)];
  }

  function initGame() {
    if (rawCards.value.length < 3) return;

    score.value = 0;
    gameOver.value = false;

    cardLeft.value = getRandomCard() ?? null;
    cardRight.value = getUniqueCard(cardLeft.value!.id) ?? null;
    nextCard.value =
      getUniqueCard(cardLeft.value!.id, cardRight.value!.id) ?? null;

    while (
      nextCard.value?.id === cardRight.value?.id
      || nextCard.value?.id === cardLeft.value?.id
    ) {
      nextCard.value = getRandomCard() ?? null;
    }

    if (nextCard.value) {
      preloadImage(nextCard.value);
    }
  }

  onMounted(() => {
    if (rawCards.value.length >= 2) {
      initGame();
    }
  });

  function guess(choice: "higher" | "lower") {
    if (!cardLeft.value || !cardRight.value || !nextCard.value) return;

    const leftStat = cardLeft.value[mode.value] ?? 0;
    const rightStat = cardRight.value[mode.value] ?? 0;

    const isHigher = rightStat >= leftStat;
    const isCorrect =
      (choice === "higher" && isHigher) || (choice === "lower" && !isHigher);

    if (isCorrect) {
      score.value++;
      cardLeft.value = cardRight.value;
      cardRight.value = nextCard.value;
      nextCard.value =
        getUniqueCard(cardLeft.value.id, cardRight.value.id) ?? null;
      if (nextCard.value) preloadImage(nextCard.value);
    } else {
      gameOver.value = true;
    }
  }

  useHead({
    title: `Higher or Lower (${mode.value.toUpperCase()}) - Yu-Gi-Oh Game`,
    meta: [
      {
        name: "description",
        content: `Play the Higher or Lower game with ${mode.value.toUpperCase()} stats!`,
      },
    ],
  });
</script>

<template>
  <LayoutsNavbar />
  <LayoutsMain>
    <div class="flex flex-col justify-center items-center col-span-full h-fit">
      <H1>Higher or Lower ({{ mode.toUpperCase() }}) ?</H1>
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
      class="flex flex-col gap-y-20px h-fit items-center bg-red-500 p-20px rounded-xl col-span-full lg:col-start-5 lg:col-end-9"
    >
      <div class="text-white flex flex-col items-center">
        <H2>Game Over!</H2>
        <p class="text-xl">You scored: {{ score }}</p>
      </div>
      <button
        @click="initGame"
        class="px-6 py-2 bg-black border-3 border-black hover:border-sky-500 text-white rounded-full font-bold transition-colors"
      >
        Play Again
      </button>
    </div>

    <div
      v-else-if="cardLeft && cardRight"
      class="flex flex-col md:flex-row justify-center gap-20px lg:justify-between items-center col-span-full lg:col-start-3 lg:col-end-11"
    >
      <UiCardGuess
        :key="'left-' + cardLeft.id"
        :card="cardLeft"
        :stat-mode="mode"
        :show-stat="true"
      />

      <div
        class="text-3xl font-bold text-white bg-black px-16px py-16px rounded-full"
      >
        VS
      </div>

      <UiCardGuess
        :key="'right-' + cardRight.id"
        :card="cardRight"
        :stat-mode="mode"
        :show-stat="false"
        @guess="guess"
      />
    </div>
    <UiBackground />
  </LayoutsMain>
  <LayoutsFooter />
</template>
