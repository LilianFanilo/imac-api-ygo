<script setup lang="ts">
  const modelValue = defineModel<string>();
</script>

<template>
  <input
    v-model="modelValue"
    type="search"
    placeholder="Search for card's name… (ex: Blue-eyes white dragon)"
    class="rounded-full border-3 text-white bg-black focus:border-sky-500 px-4 py-2 max-w-2xl"
  />
</template>
