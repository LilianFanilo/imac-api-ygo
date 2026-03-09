<script setup lang="ts">
  import CardsDisplay from "~/components/layouts/CardsDisplay.vue";
  import Navbar from "~/components/layouts/Navbar.vue";
</script>

<template>
  <Navbar />
  <main>
    <CardsDisplay />
    <div
      class="fixed top-0 left-0 -z-20 w-screen h-screen bg-gray-800 bg-[url(/assets/img/space.gif)]"
    ></div>
  </main>
</template>
