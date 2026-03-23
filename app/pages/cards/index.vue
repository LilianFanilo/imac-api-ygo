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
    <div class="flex flex-col items-center justify-center col-span-full">
      <H1>Search Cards</H1>
      <p>
        (For the good working of the API, the cards has been take between two
        dates)
      </p>
    </div>
    <CardsDisplay />
    <Background />
  </main>
  <Footer />
</template>
