<script setup lang="ts">
  import H1 from "~/components/H1.vue";
  import CardsDisplay from "~/components/layouts/CardsDisplay.vue";
  import Footer from "~/components/layouts/Footer.vue";
  import Navbar from "~/components/layouts/Navbar.vue";
  import Background from "~/components/ui/Background.vue";
</script>

<template>
  <Navbar />
  <main class="gridBase gap-y-40px pt-20px">
    <div class="flex justify-center col-span-full">
      <H1>Search Cards</H1>
    </div>
    <CardsDisplay />
    <Background />
  </main>
  <Footer />
</template>
