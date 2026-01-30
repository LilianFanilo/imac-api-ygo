<script setup lang="ts">
    const props = defineProps({
    card: {
        type: Object,
        required: true
    }
    });
</script>


<template>
    <NuxtLink :to="'/Cards/'+ card.id ">
        <div class="flex flex-col gap-y-2 w-80 h-150 bg-red-300 p-4 rounded border border-red-300 hover:border hover:border-black">
            <div>{{ card.name }}</div>
            <img class="rounded" :src="card.card_images[0].image_url_cropped" alt="">
            <div>
                <ul class="flex gap-x-4">
                    <li>{{ card.type }}</li>
                    <li>{{ card.race }}</li>
                    <li>Level {{ card.level }}</li>
                </ul>
            </div>
            <div>
                <div class="text-xs text-justify">{{ card.desc }}</div>
            </div>
            <div v-if="card.atk && card.def" class="text-end">ATK/{{ card.atk }} DEF/{{ card.def}}</div>
            <div v-else-if="card.atk" class="text-end">ATK/{{ card.atk }} </div>
        </div>
    </NuxtLink>
</template>