<script setup lang="ts">
  import CardsDisplay from "~/components/layouts/CardsDisplay.vue";
  import Navbar from "~/components/layouts/Navbar.vue";
  import Background from "~/components/ui/Background.vue";
</script>

<template>
  <Navbar />
  <main class="gridBase">
    <CardsDisplay />
    <Background />
  </main>
</template>
