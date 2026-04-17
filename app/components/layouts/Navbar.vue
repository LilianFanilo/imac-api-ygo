<script setup lang="ts">
  const navLinks = [
    { name: "Search Cards", path: "/Cards" },
    { name: "Play Games", path: "/Games" },
  ];
</script>

<template>
  <nav class="grid grid-cols-3 sticky w-full top-0 bg-white z-50 px-7.5 py-4">
    <div class="col-start-1">
      <NuxtLink
        to="/"
        class="hover:text-sky-500 transition-colors"
        >Home</NuxtLink
      >
    </div>

    <ul class="col-start-2 flex justify-center gap-4">
      <li
        v-for="link in navLinks"
        :key="link.path"
        class="hover:text-sky-500 transition-colors"
      >
        <NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
      </li>
    </ul>

    <ul class="flex justify-end">
      <li class="hover:text-sky-500 transition-colors">
        <NuxtLink to="/About">About</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
