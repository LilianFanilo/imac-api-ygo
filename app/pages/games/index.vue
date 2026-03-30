<script setup lang="ts">
  import BentoCard from "~/components/BentoCard.vue";
  import H1 from "~/components/H1.vue";
  import H2 from "~/components/H2.vue";
  import Footer from "~/components/layouts/Footer.vue";
  import Main from "~/components/layouts/Main.vue";
  import Navbar from "~/components/layouts/Navbar.vue";
  import Background from "~/components/ui/Background.vue";
</script>

<template>
  <Navbar />
  <Main>
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
      url_link="/Games/higher_or_lower_atk"
    >
      Find who has the higher attack between two cards. Try to have the better
      win streak !
    </BentoCard>
    <BentoCard
      position="secondHalf"
      title="Higher or lower (DEF)"
      size="big"
      url_link="/Games/higher_or_lower_atk"
    >
      Find who has the higher defense between two cards. Try to have the better
      win streak !
    </BentoCard>
    <Background />
  </Main>
  <Footer />
</template>
