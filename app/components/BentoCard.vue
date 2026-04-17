<script setup lang="ts">
  const positionClasses: Record<string, string> = {
    none: "",
    full: "col-span-full",
    firstHalf: "col-span-full lg:col-start-1 lg:col-end-7",
    secondHalf: "col-span-full lg:col-start-7 lg:col-end-13",
  };

  const sizeClasses: Record<string, string> = {
    fit: "h-[293px] lg:h-fit",
    full: "h-[293px] lg:h-full",
    half: "h-[293px]",
    big: "h-[293px] lg:h-[500px]",
  };

  // 1. On ajoute bgImage en prop optionnelle
  const { position, title, size, urlLink, bgImage } = defineProps<{
    title: string;
    position: keyof typeof positionClasses;
    size: keyof typeof sizeClasses;
    urlLink: string;
    bgImage?: string;
  }>();
</script>

<template>
  <NuxtLink
    :to="urlLink"
    :class="positionClasses[position]"
  >
    <div
      class="rounded-2xl p-40px flex flex-col justify-end outline-4 outline-transparent hover:outline-sky-500 transition-all duration-100 bg-cover bg-center bg-no-repeat text-white"
      :class="[sizeClasses[size], !bgImage ? 'bg-black' : '']"
      :style="bgImage ? { backgroundImage: `url(${bgImage})` } : {}"
    >
      <H3>{{ title }}</H3>
      <p><slot /></p>
    </div>
  </NuxtLink>
</template>
