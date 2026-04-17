<template>
  <LayoutsNavbar />
  <LayoutsMain>
    <div class="flex flex-col items-center justify-center col-span-full">
      <H1>Play Games</H1>
      <p>Choose your game !</p>
    </div>
    <div class="flex justify-center col-span-full">
      <H2> Choose your game ! </H2>
    </div>
    <BentoCard
      position="firstHalf"
      title="Higher or lower (ATK)"
      size="big"
      url_link="/Games/atk"
    >
      Find who has the higher attack between two cards. Try to have the better
      win streak !
    </BentoCard>
    <BentoCard
      position="secondHalf"
      title="Higher or lower (DEF)"
      size="big"
      url_link="/Games/def"
    >
      Find who has the higher defense between two cards. Try to have the better
      win streak !
    </BentoCard>
    <UiBackground />
  </LayoutsMain>
  <LayoutsFooter />
</template>
