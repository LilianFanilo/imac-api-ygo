<template>
  <nav
    class="grid grid-cols-3 sticky w-full top-0 bg-white z-50 px-[30px] py-4"
  >
    <div class="col-start-1"><NuxtLink to="/">Home</NuxtLink></div>
    <ul class="col-start-2 flex justify-center gap-4">
      <li><NuxtLink to="/Cards">Search Cards</NuxtLink></li>
      <li><NuxtLink to="/Games">Play Games</NuxtLink></li>
    </ul>
    <ul class="flex justify-end">
      <li><NuxtLink to="/">À propos</NuxtLink></li>
    </ul>
  </nav>
</template>
