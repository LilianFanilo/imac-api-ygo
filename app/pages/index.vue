<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
import Navbar from '../components/layouts/Navbar.vue';
</script>

<template>
  <Navbar/>
  <main class="flex flex-col items-center gap-4">

    <div class="relative h-screen w-full bg-cover bg-[url(/assets/img/ygo_bg.jpg)]">

      <div class="absolute inset-0 bg-black/60"></div>

      <div class="text-white relative z-10 flex gap-4 flex-col h-full items-center justify-center">
            <h1 class="text-4xl">
              YGO Base
            </h1>
            <div class="flex gap-4">
                <Button href="/cards">Explore all cards</Button>
                <Button href="/games">Play a game</Button>
            </div>
      </div>
    </div>
  </main>
</template>