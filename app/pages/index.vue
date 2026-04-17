<script setup lang="ts">
  useHead({
    title: "Yu-Gi-Oh Cards Database",
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
    <div
      class="col-span-full relative w-full h-155.75 bg-cover bg-center bg-[url(/assets/img/heroImg.jpg)] rounded-2xl overflow-hidden px-16px"
    >
      <div class="absolute inset-0 bg-black/60"></div>

      <div
        class="text-white relative gap-40px z-10 flex flex-col h-full items-center justify-center"
      >
        <div class="flex flex-col items-center">
          <H1>A Database of Yu-Gi-Oh Cards !</H1>
          <p class="text-center">
            Find any card you want, check its stats, its price, and play games !
          </p>
        </div>
        <div class="flex gap-20px flex-wrap justify-center">
          <UiButton href="/cards">Explore all cards</UiButton>
          <UiButton href="/games">Play a game</UiButton>
        </div>
      </div>
    </div>
    <div
      class="col-span-full lg:col-start-4 lg:col-end-10 my-6 flex flex-col items-center gap-8px"
    >
      <H2>What's the project about ?</H2>
      <p class="text-center">
        A web programming course designed to teach the fundamental concepts of
        <br />
        front-end web development using a modern JavaScript framework.
      </p>
    </div>

    <LayoutsBentoDisplay />
    <UiBackground />
  </LayoutsMain>
  <LayoutsFooter />
</template>
