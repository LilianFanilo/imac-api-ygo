<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
import Navbar from '../components/layouts/Navbar.vue';
</script>

<template>
  <Navbar/>
  <main class="flex flex-col items-center gap-4">
      <h1 class="text-4xl">
        YGO Base
      </h1>
      <div class="flex gap-2">
          <Button>Explore all cards</Button>
          <Button>Play a game</Button>
      </div>
  </main>
</template>