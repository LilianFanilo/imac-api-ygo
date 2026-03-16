<script setup lang="ts">
  import BentoCard from "~/components/BentoCard.vue";
  import H1 from "~/components/H1.vue";
  import Footer from "~/components/layouts/Footer.vue";
  import Navbar from "~/components/layouts/Navbar.vue";
  import Background from "~/components/ui/Background.vue";
</script>

<template>
  <Navbar />
  <main class="gridBase">
    <div class="flex justify-center col-span-full">
      <H1>Play a Game</H1>
    </div>
    <div class="h-120 bg-amber-200 col-start-1 col-end-7">
      <h2>Higher or lower</h2>
      <img
        src=""
        alt=""
      />
      <p>
        Find who has the higher attack between two cards. Try to have the better
        win streak !
      </p>
    </div>
    <div class="h-120 bg-amber-200 col-start-7 col-end-13">
      <h2>Higher or lower</h2>
      <img
        src=""
        alt=""
      />
      <p>
        Find who has the higher attack between two cards. Try to have the better
        win streak !
      </p>
    </div>

    <!-- <BentoCard
      position="secondHalf"
      title="Search the recent cards"
      size="full"
      >Test</BentoCard
    >
    <BentoCard
      position="firstHalf"
      title="Search the recent cards"
      size="full"
      >Test</BentoCard
    > -->
    <Background />
  </main>
  <Footer />
</template>
