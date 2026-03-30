<template>
  <footer
    class="grid grid-cols-4 gap-12px px-12px md:grid-cols-8 md:gap-16px md:px-32px lg:grid-cols-12 lg:gap-20px lg:px-7.5"
  >
    <div
      class="bg-black col-span-full rounded-t-2xl mt-6 p-[80px] flex flex-wrap gap-40px text-sm"
    >
      <!-- Produit -->
      <section class="flex flex-col gap-3">
        <span class="text-white font-bold">Produit</span>
        <p class="text-gray-300 hover:text-white cursor-pointer">
          Fonctionnalités
        </p>
        <p class="text-gray-300 hover:text-white cursor-pointer">Tarifs</p>
        <p class="text-gray-300 hover:text-white cursor-pointer">
          Intégrations
        </p>
        <p class="text-gray-300 hover:text-white cursor-pointer">Roadmap</p>
      </section>

      <!-- Ressources -->
      <section class="flex flex-col gap-3">
        <span class="text-white font-bold">Ressources</span>
        <p class="text-gray-300 hover:text-white cursor-pointer">
          Documentation
        </p>
        <p class="text-gray-300 hover:text-white cursor-pointer">Guides</p>
        <p class="text-gray-300 hover:text-white cursor-pointer">Blog</p>
        <p class="text-gray-300 hover:text-white cursor-pointer">Support</p>
      </section>

      <!-- Entreprise -->
      <section class="flex flex-col gap-3">
        <span class="text-white font-bold">Entreprise</span>
        <p class="text-gray-300 hover:text-white cursor-pointer">À propos</p>
        <p class="text-gray-300 hover:text-white cursor-pointer">Carrières</p>
        <p class="text-gray-300 hover:text-white cursor-pointer">Presse</p>
        <p class="text-gray-300 hover:text-white cursor-pointer">Partenaires</p>
      </section>

      <!-- Contact -->
      <section class="flex flex-col gap-3">
        <span class="text-white font-bold">Contact</span>
        <p class="text-gray-300">contact@exemple.com</p>
        <p class="text-gray-300">+33 6 12 34 56 78</p>
        <p class="text-gray-300">Lyon, France</p>
        <p class="text-gray-300 hover:text-white cursor-pointer">LinkedIn</p>
      </section>
    </div>
  </footer>
</template>
