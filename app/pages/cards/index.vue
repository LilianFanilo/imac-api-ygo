<script setup lang="ts">
  useHead({
    title: "Search Cards",
    meta: [
      {
        name: "description",
        content:
          "Find any card you want, check its stats, its price, and play games !",
      },
    ],
  });
</script>

<template>
  <LayoutsNavbar />
  <LayoutsMain>
    <div class="flex flex-col items-center justify-center col-span-full">
      <H1>Search Cards</H1>
      <p class="text-center">
        For the good working of the API, the cards has been take between two to
        limit the number of cards dates.
      </p>
    </div>
    <LayoutsCardsDisplay />
    <UiBackground />
  </LayoutsMain>
  <LayoutsFooter />
</template>
