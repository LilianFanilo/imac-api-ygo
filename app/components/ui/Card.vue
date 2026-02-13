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
        <div class="flex flex-col justify-between w-80 h-150 bg-white rounded px-4 py-3.5 outline-4 outline-transparent hover:outline-sky-500 transition-all duration-100">
            <div class="flex flex-col gap-y-2.5">
                <div class="text-lg font-bold flex items-center">{{ card.name }}</div>
                <div class="w-72 h-72 bg-cover bg-center rounded" :style="{ backgroundImage: `url(${card.card_images[0].image_url_cropped})` }">
                </div>
                <ul class="text-xs flex flex-wrap gap-1">
                    <li class="flex w-fit h-fit items-center border rounded-full px-2 py-1">{{ card.type }}</li>
                    <li class="flex w-fit h-fit items-center border rounded-full px-2 py-1">{{ card.race }}</li>
                    <li class="flex w-fit h-fit items-center border rounded-full px-2 py-1" v-if="card.level">Level {{ card.level }}</li>
                </ul>
                <p class="max-h-36 text-xs text-justify line-clamp-9">{{ card.desc }}</p>
            </div>
            <div v-if="card.atk && card.def" class="row-start-20 text-end">ATK/{{ card.atk }} DEF/{{ card.def}}</div>
            <div v-else-if="card.atk && card.linkval" class="row-start-20 text-end">ATK/{{ card.atk }} LINK-{{ card.linkval }}</div>
        </div>
    </NuxtLink>
</template>