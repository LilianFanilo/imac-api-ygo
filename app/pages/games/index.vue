<template>
  <LayoutsNavbar />
  <LayoutsMain>
    <div class="flex flex-col items-center justify-center col-span-full">
      <H1>Play Games</H1>
      <p class="text-center">
        It's time to dudududuel ! Play exciting games with your favorite
        Yu-Gi-Oh! cards!
      </p>
    </div>
    <div class="flex justify-center col-span-full">
      <H2> Choose your game ! </H2>
    </div>
    <BentoCard
      position="firstHalf"
      title="Higher or lower (ATK)"
      size="big"
      urlLink="/Games/atk"
      bgImage="/img/atkBento.webp"
    >
      Find who has the higher attack between two cards.
    </BentoCard>
    <BentoCard
      position="secondHalf"
      title="Higher or lower (DEF)"
      size="big"
      urlLink="/Games/def"
      bgImage="/img/defBento.jpg"
    >
      Find who has the higher defense between two cards.
    </BentoCard>
    <UiBackground />
  </LayoutsMain>
  <LayoutsFooter />
</template>
