<script setup lang="ts">
  import BentoCard from "~/components/BentoCard.vue";
  import H1 from "~/components/H1.vue";
  import Footer from "~/components/layouts/Footer.vue";
  import Navbar from "~/components/layouts/Navbar.vue";
  import Background from "~/components/ui/Background.vue";
</script>

<template>
  <Navbar />
  <main class="gridBase gap-40px">
    <div class="flex flex-col items-center justify-center col-span-full">
      <H1>Play a Game</H1>
      <p>Choose your game !</p>
    </div>
    <BentoCard
      position="firstHalf"
      title="Higher or lower (ATK)"
      size="big"
      url_link="/Games/higher_or_lower"
    >
      Find who has the higher attack between two cards. Try to have the better
      win streak !
    </BentoCard>
    <BentoCard
      position="secondHalf"
      title="Higher or lower (ATK)"
      size="big"
      url_link="/Games/higher_or_lower"
    >
      Find who has the higher attack between two cards. Try to have the better
      win streak !
    </BentoCard>
    <Background />
  </main>
  <Footer />
</template>
