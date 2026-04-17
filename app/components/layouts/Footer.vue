<script setup lang="ts">
  const footerSections = [
    {
      title: "Navigation",
      items: [
        { label: "Home", to: "/" },
        { label: "Search card", to: "/cards" },
        { label: "About", to: "/about" },
        { label: "Games", to: "/games" },
      ],
    },
    {
      title: "Contact",
      items: [
        {
          label: "Portfolio",
          to: "https://lilianpeuron.vercel.app/",
          external: true,
        },
        {
          label: "GitHub",
          to: "https://github.com/LilianFanilo",
          external: true,
        },
        {
          label: "LinkedIn",
          to: "https://www.linkedin.com/in/lilian-peuron-a12864221/",
          external: true,
        },
      ],
    },
  ];
</script>

<template>
  <footer
    class="grid grid-cols-4 gap-12px px-12px md:grid-cols-8 md:gap-16px md:px-32px lg:grid-cols-12 lg:gap-20px lg:px-7.5"
  >
    <div
      class="bg-black col-span-full rounded-t-2xl mt-6 p-20 flex flex-wrap gap-40px text-sm"
    >
      <section
        v-for="section in footerSections"
        :key="section.title"
        class="flex flex-col gap-3"
      >
        <span class="text-white font-bold">{{ section.title }}</span>

        <ul class="flex flex-col gap-3">
          <li
            v-for="item in section.items"
            :key="item.label"
          >
            <span
              v-if="item.isText"
              class="text-gray-300"
            >
              {{ item.label }}
            </span>

            <NuxtLink
              v-else
              :to="item.to"
              :target="item.external ? '_blank' : undefined"
              class="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </footer>
</template>
