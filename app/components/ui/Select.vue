<script setup lang="ts">
  defineProps<{ types: string[]; name: string }>();
  const model = defineModel<string>();
</script>

<template>
  <label class="flex items-center gap-2 bg-black rounded-full pl-4">
    <span class="font-semibold text-white capitalize">{{ name }}</span>
    <select
      v-model="model"
      class="rounded-full bg-white border-3 px-3 py-1 focus:border-sky-500 outline-none capitalize"
    >
      <option value="">All {{ name }}</option>
      <option
        v-for="item in types"
        :key="item"
        :value="item"
      >
        {{ item }}
      </option>
    </select>
  </label>
</template>
