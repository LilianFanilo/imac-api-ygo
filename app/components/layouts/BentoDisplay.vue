<template>
  <BentoCard
    position="firstHalf"
    title="Search the recent cards"
    size="full"
    urlLink="/Cards"
    bgImage="/img/searchBento.jpg"
  >
    Search the recent cards
  </BentoCard>
  <div class="flex flex-col gap-6 col-span-full lg:col-start-7 lg:col-end-13">
    <BentoCard
      position="none"
      size="half"
      title="Play Games"
      urlLink="/Games"
      bgImage="/img/gameBento.jpg"
    >
      Try to have the best win streak !
    </BentoCard>
    <BentoCard
      position="none"
      size="half"
      title="About the project"
      urlLink="/About"
      bgImage="/img/aboutBento.jpg"
    >
      Learn more about the project !
    </BentoCard>
  </div>
</template>
