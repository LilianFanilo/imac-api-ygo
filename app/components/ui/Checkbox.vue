<script setup lang="ts">
  type CardType = "monster" | "spell" | "trap" | string;

  const props = defineProps<{ type: CardType }>();
  const modelValue = defineModel<string[]>();

  const typeColors: Record<string, string> = {
    monster: "bg-amber-500",
    spell: "bg-green-500",
    trap: "bg-pink-500",
    default: "bg-gray-200", // 3. "gray" au lieu de "grey"
  };
</script>

<template>
  <label
    class="flex items-center capitalize rounded-full px-4 py-2 gap-2 cursor-pointer select-none transition-opacity hover:opacity-80"
    :class="typeColors[props.type] || typeColors.default"
  >
    {{ props.type }}
    <input
      class="rounded- cursor-pointer"
      type="checkbox"
      :value="props.type"
      v-model="modelValue"
    />
  </label>
</template>
