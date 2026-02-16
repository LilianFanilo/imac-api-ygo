<script setup lang="ts">
  import Navbar from "~/components/layouts/Navbar.vue";
  import Card from "~/components/ui/Card.vue";
</script>

<template>
  <Navbar />
  <main
    class="bg-[url(/assets/img/space.gif)] w-screen h-screen pt-14 text-white"
  >
    <div>
      <h1 class="text-3xl">Higher or Lower</h1>
      <h2 class="text-2xl">Score :</h2>
      <div class="flex gap-8">
        <div
          class="flex flex-col justify-between w-80 h-150 bg-white rounded px-4 py-3.5 shadow-md outline-4 outline-transparent hover:outline-sky-500 transition-all duration-100"
        >
          <div class="w-72 h-72 border"></div>
          <div class="flex flex-col gap-y-2.5"></div>
        </div>
        <div
          class="flex flex-col justify-between w-80 h-150 bg-white rounded px-4 py-3.5 shadow-md outline-4 outline-transparent hover:outline-sky-500 transition-all duration-100"
        >
          <div class="flex flex-col gap-y-2.5"></div>
        </div>
        <div></div>
      </div>
    </div>
  </main>
</template>
