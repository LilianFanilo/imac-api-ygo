<script setup lang="ts">
  const modelValue = defineModel<string>();
</script>

<template>
  <input
    v-model="modelValue"
    type="search"
    placeholder="Rechercher une carte…"
    class="rounded-full border-3 text-white bg-black focus:border-sky-500 px-4 py-2 w-2xl"
  />
</template>
