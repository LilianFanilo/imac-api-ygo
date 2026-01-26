<script setup lang="ts">
    const route = useRoute();
    const id = route.params.id;

    const { data, pending, error } = await useFetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);

    import { computed } from 'vue';
import Navbar from '~/components/layouts/Navbar.vue';

    const card = computed(() => data.value?.data[0]);


</script>

<template>
    <Navbar/>
    <main>
        <div class="grid grid-cols-2">
            <div class="flex w-full h-full justify-center">
                <img class="w-100" :src="card.card_images[0].image_url" alt="">
            </div>
            <div>
                <section class="flex flex-col gap-y-2">
                    <h1 class="text-3xl">
                        {{ card.name }}
                    </h1>
                    <ul class="flex gap-x-2">
                        <li>{{ card.type }}</li>
                        <li>{{ card.race }}</li>
                        <li>{{ card.attribute }}</li>
                        <li>Level {{ card.level }}</li>
                    </ul>
                    <ul class="flex gap-x-2">
                        <li>Attack : {{ card.atk }}</li>
                        <li>Defense : {{ card.def }}</li>
                    </ul>
                    <p class="w-160">
                        {{ card.desc }}
                    </p>
                    <div>
                        <h2>
                            Sets
                        </h2>
                        <ul>
                            <li v-for="set in card.card_sets">{{ set.set_name }}</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    </main>
</template>