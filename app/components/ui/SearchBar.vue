<script setup lang="ts">
  const modelValue = defineModel<string>();
</script>

<template>
  <input
    v-model="modelValue"
    type="search"
    placeholder="Rechercher une carte…"
    class="rounded-full border-2 border-gray-800 px-4 py-2 w-full max-w-md"
  />
</template>
