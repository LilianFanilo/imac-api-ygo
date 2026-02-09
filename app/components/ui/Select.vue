<script setup lang="ts">
// On définit la prop 'types' (mieux au pluriel si c'est une liste)
const props = defineProps<{ 
  types: string[] 
}>();

// On définit un modèle pour récupérer la sélection du parent
const model = defineModel<string>();
</script>

<template>
  <label class="flex flex-col gap-1">
    <span class="font-semibold"><slot /></span>
    
    <select 
      v-model="model"
      class="rounded-full border-2 border-gray-300 px-3 py-1 focus:border-amber-400 outline-none"
    >
      <option value="" disabled>Choisir un type...</option>
      <option v-for="item in props.types" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </label>
</template>