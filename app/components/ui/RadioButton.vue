<script setup lang="ts">
  defineProps<{ name: string; id: string; value: string }>();
  const model = defineModel<string>();
</script>

<template>
  <div class="flex items-center gap-4px">
    <input
      type="radio"
      :id="id"
      :value="value"
      v-model="model"
    />
    <label
      for="filterChoice1"
      class="capitalize"
      >{{ name }}</label
    >
  </div>
</template>
