<script setup lang="ts">
const modelValue = defineModel<string[]>();
const cardType = defineProps<{ type: string }>();

const typeColors: Record<string, string> = {
  monster: 'bg-amber-500',
  spell: 'bg-green-500',
  trap: 'bg-pink-500',
  default: 'bg-grey-200'
};

</script>

<template>
    <label class="flex items-center capitalize rounded px-4 py-2 gap-2" :class="typeColors[cardType.type] || typeColors.default">
        {{ cardType.type }}
        <input class="rounded-full" type="checkbox" :value="cardType.type" v-model="modelValue" />
    </label>
</template>