<script setup lang="ts">
    const props = defineProps({
    card: {
        type: Object,
        required: true
    }
    });
</script>

<template>
    <NuxtLink :to="'/Cards/'+ card.id">
        <div class="grid grid-rows-20 w-80 h-160 bg-gray-800 text-white rounded px-4 py-2 outline-4 outline-transparent hover:outline-sky-500 transition-all duration-100">
            <div class="flex items-center row-span-1">{{ card.name }}</div>
            <div class="flex items-center row-span-10">
                <img class="w-72 h-72 rounded" :src="card.card_images[0].image_url_cropped" alt="">
            </div>
            <div class="row-span-1">
                <ul class="text-sm flex gap-x-4">
                    <li>{{ card.type }}</li>
                    <li>{{ card.race }}</li>
                    <li v-if="card.level">Level {{ card.level }}</li>
                </ul>
            </div>
            <div class="row-span-6 text-xs text-justify">{{ card.desc }}</div>
            <div v-if="card.atk && card.def" class="row-start-20 text-end">ATK/{{ card.atk }} DEF/{{ card.def}}</div>
            <div v-else-if="card.atk && card.linkval" class="row-start-20 text-end">ATK/{{ card.atk }} LINK-{{ card.linkval }}</div>
        </div>
    </NuxtLink>
</template>