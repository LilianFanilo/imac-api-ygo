<script setup lang="ts">
import { computed } from 'vue';
import Navbar from '~/components/layouts/Navbar.vue';

const route = useRoute();
const id = route.params.id as string;

const { data, pending, error } = await useFetch(
  'https://db.ygoprodeck.com/api/v7/cardinfo.php',
  {
    query: { id }
  }
);

const card = computed(() => data.value?.data?.[0]);
</script>


<template>
  <Navbar />

  <main class="p-6 pt-18">
    <div v-if="pending">Chargement…</div>

    <div v-else-if="error">
      Carte introuvable ❌
    </div>

    <div v-else-if="card" class="grid grid-cols-2 gap-8">
      <div class="flex justify-center">
        <img
          class="w-96"
          :src="card.card_images[0].image_url"
          :alt="card.name"
        />
      </div>

      <section class="flex flex-col gap-y-3">
        <h1 class="text-3xl font-bold">
          {{ card.name }}
        </h1>

        <ul class="flex gap-x-3 text-sm text-gray-600">
          <li class="border rounded-full px-2.5 py-1">{{ card.type }}</li>
          <li class="border rounded-full px-2.5 py-1">{{ card.race }}</li>
          <li v-if="card.attribute">{{ card.attribute }}</li>
          <li v-if="card.level">Level {{ card.level }}</li>
        </ul>

        <ul class="flex gap-x-4">
          <li v-if="card.atk">ATK {{ card.atk }}</li>
          <li v-if="card.def">DEF {{ card.def }}</li>
        </ul>

        <p class="max-w-xl">
          {{ card.desc }}
        </p>

        <div v-if="card.card_sets?.length">
          <h2 class="font-semibold">Sets</h2>
          <ul class="list-disc ml-4">
            <li v-for="set in card.card_sets" :key="set.set_code">
              {{ set.set_name }} - {{ set.set_rarity }}
            </li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</template>
