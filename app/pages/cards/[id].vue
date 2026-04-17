<script setup lang="ts">
  import { fetchCardById } from "~/services/api/ygoApi";

  const route = useRoute();
  const id = route.params.id as string;

  const { data, error } = await useAsyncData(`card-${id}`, () =>
    fetchCardById(id),
  );

  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Card not found",
      fatal: true,
    });
  }

  const cardStats = computed(() => [
    { label: "ATK", value: card.value?.atk, class: "bg-red-300" },
    { label: "DEF", value: card.value?.def, class: "bg-blue-300" },
    { label: "Level", value: card.value?.level, class: "bg-yellow-300" },
  ]);

  const card = computed(() => data.value?.data?.[0]);

  useHead({
    title: card.value ? `${card.value.name} - Yu-Gi-Oh Card` : "Card Not Found",
    meta: [
      {
        name: "description",
        content:
          card.value?.desc ||
          "Card description not available.",
      },
    ],
  });
</script>

<template>
  <LayoutsNavbar />

  <LayoutsMain>
    <div
      class="flex flex-col justify-center items-center col-span-full lg:col-start-2 lg:col-end-12"
    >
      <H1>
        {{ card?.name }}
      </H1>
      <ul class="flex gap-x-3 text-sm text-gray-600">
        <li class="border rounded-full px-2.5 py-1">{{ card?.type }}</li>
        <li class="border rounded-full px-2.5 py-1">{{ card?.race }}</li>
        <li
          v-if="card?.attribute"
          class="border rounded-full px-2.5 py-1"
        >
          {{ card?.attribute }}
        </li>
      </ul>
    </div>

    <div class="flex justify-center col-span-full lg:col-start-2 lg:col-end-6">
      <img
        class="w-full aspect-auto shadow-md"
        :src="card?.card_images?.[0]?.image_url"
        :alt="card?.name"
      />
    </div>

    <section
      class="flex flex-col gap-y-8px col-span-full lg:col-start-6 lg:col-end-12 w-full lg:max-h-125"
    >
      <ul class="flex flex-wrap gap-8px">
        <template
          v-for="stat in cardStats"
          :key="stat.label"
        >
          <li
            v-if="stat.value"
            :class="[
              stat.class,
              'px-40px py-20px text-xl text-center font-bold rounded-xl shadow-md w-full lg:w-fit',
            ]"
          >
            {{ stat.label }} {{ stat.value }}
          </li>
        </template>
      </ul>

      <div class="flex flex-col gap-y-8px bg-white p-40px rounded-xl shadow-md">
        <H2>Card Description</H2>
        <p>
          {{ card?.desc }}
        </p>
      </div>

      <div
        v-if="card?.card_sets?.length"
        class="flex flex-col gap-y-8px bg-white p-40px rounded-xl shadow-md"
      >
        <H2>Sets</H2>
        <ul class="list-disc ml-4">
          <li
            v-for="set in card?.card_sets"
            :key="set.set_code"
          >
            {{ set.set_name }} - {{ set.set_rarity }}
          </li>
        </ul>
      </div>
    </section>
    <UiBackground />
  </LayoutsMain>
  <LayoutsFooter />
</template>
