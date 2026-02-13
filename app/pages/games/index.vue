<script setup lang="ts">
  import Navbar from "~/components/layouts/Navbar.vue";
</script>

<template>
  <Navbar />
  <main>
    <div
      class="relative h-screen w-full bg-cover bg-[url(/assets/img/ygo_bg_2.webp)]"
    >
      <div class="absolute inset-0 bg-black/60"></div>

      <div
        class="text-white relative z-10 flex flex-col h-full items-center justify-center"
      >
        <h1 class="text-4xl">Choose your game</h1>
        <div class="flex gap-2">
          <div class="w-80 h-120 bg-amber-200">
            <h2>Higher or lower</h2>
            <img
              src=""
              alt=""
            />
            <p>
              Find who has the higher attack between two cards. Try to have the
              better win streak !
            </p>
          </div>
          <div class="w-80 h-120 bg-amber-200">
            <h2>Higher or lower</h2>
            <img
              src=""
              alt=""
            />
            <p>
              Find who has the higher attack between two cards. Try to have the
              better win streak !
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
