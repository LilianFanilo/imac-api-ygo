<script setup lang="ts">
  // On définit la prop 'types' (mieux au pluriel si c'est une liste)
  const props = defineProps<{ types: string[] }>();

  // On définit un modèle pour récupérer la sélection du parent
  const model = defineModel<string>();
</script>

<template>
  <label class="flex items-center gap-2 bg-black rounded-full pl-4">
    <span class="font-semibold text-white"><slot /></span>

    <select
      v-model="model"
      class="rounded-full bg-white border-3 px-3 py-1 focus:border-sky-500 outline-none"
    >
      <option
        value=""
        disabled
      >
        Choisir un type...
      </option>
      <option
        v-for="item in props.types"
        :key="item"
        :value="item"
      >
        {{ item }}
      </option>
    </select>
  </label>
</template>
