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

  const { position, title, size, url_link } = defineProps<{
    title: string;
    position: keyof typeof positionClasses;
    size: keyof typeof sizeClasses;
    url_link: string;
  }>();
</script>

<template>
  <NuxtLink
    :to="url_link"
    :class="positionClasses[position]"
  >
    <div
      class="bg-gray-300 rounded-2xl p-40px flex flex-col justify-end outline-4 outline-transparent hover:outline-sky-500 transition-all duration-100"
      :class="sizeClasses[size]"
    >
      <H3>{{ title }}</H3>
      <p><slot /></p>
    </div>
  </NuxtLink>
</template>
