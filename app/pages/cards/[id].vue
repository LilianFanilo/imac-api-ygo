<script setup lang="ts">
  import { computed } from "vue";
  import H1 from "~/components/H1.vue";
  import H2 from "~/components/H2.vue";
  import Navbar from "~/components/layouts/Navbar.vue";
  import Background from "~/components/ui/Background.vue";

  const route = useRoute();
  const id = route.params.id as string;

  const { data, pending, error } = await useFetch(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php",
    { query: { id } },
  );

  const card = computed(() => data.value?.data?.[0]);
</script>

<template>
  <Navbar />

  <main class="gridBase">
    <!-- <div v-if="pending">Chargement…</div>
    <div v-else-if="error">Carte introuvable ❌</div> -->

    <div
      class="flex flex-col justify-center items-center col-start-2 col-end-12 py-20px"
    >
      <H1>
        {{ card.name }}
      </H1>
      <ul class="flex gap-x-3 text-sm text-gray-600">
        <li class="border rounded-full px-2.5 py-1">{{ card.type }}</li>
        <li class="border rounded-full px-2.5 py-1">{{ card.race }}</li>
        <li
          v-if="card.attribute"
          class="border rounded-full px-2.5 py-1"
        >
          {{ card.attribute }}
        </li>
      </ul>
    </div>

    <div class="flex justify-center col-start-2 col-end-6">
      <img
        class="w-full aspect-auto shadow-md"
        :src="card.card_images[0].image_url"
        :alt="card.name"
      />
    </div>

    <section
      class="flex flex-col gap-y-8px col-start-6 col-end-12 w-full max-h-[500px]"
    >
      <ul class="flex gap-8px">
        <li
          v-if="card.atk"
          class="bg-red-300 px-40px py-20px text-xl text-center font-bold rounded-xl shadow-md"
        >
          ATK {{ card.atk }}
        </li>
        <li
          v-if="card.def"
          class="bg-blue-300 px-40px py-20px text-xl text-center font-bold rounded-xl shadow-md"
        >
          DEF {{ card.def }}
        </li>
        <li
          v-if="card.level"
          class="bg-yellow-300 px-40px py-20px text-xl text-center font-bold rounded-xl shadow-md"
        >
          Level {{ card.level }}
        </li>
      </ul>

      <div class="flex flex-col gap-y-8px bg-white p-40px rounded-xl shadow-md">
        <H2>Card Description</H2>
        <p>
          {{ card.desc }}
        </p>
      </div>

      <div
        v-if="card.card_sets?.length"
        class="flex flex-col gap-y-8px bg-white p-40px rounded-xl shadow-md"
      >
        <H2>Sets</H2>
        <ul class="list-disc ml-4">
          <li
            v-for="set in card.card_sets"
            :key="set.set_code"
          >
            {{ set.set_name }} - {{ set.set_rarity }}
          </li>
        </ul>
      </div>
    </section>
    <Background />
  </main>
</template>
