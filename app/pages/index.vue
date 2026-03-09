<script setup lang="ts">
  import Button from "~/components/ui/Button.vue";
  import Navbar from "../components/layouts/Navbar.vue";
  import BentoCard from "~/components/BentoCard.vue";
  import BentoDisplay from "~/components/layouts/BentoDisplay.vue";
  import Background from "~/components/ui/Background.vue";
</script>

<template>
  <Navbar />
  <main class="gridBase">
    <div
      class="col-span-full relative w-full h-155.75 bg-cover bg-center bg-[url(/assets/img/ygo_bg.jpg)] rounded-2xl overflow-hidden"
    >
      <div class="absolute inset-0 bg-black/60"></div>

      <div
        class="text-white relative gap-40px z-10 flex flex-col h-full items-center justify-center"
      >
        <div class="flex flex-col items-center">
          <H1>A Database of Yu-Gi-Oh Cards !</H1>
          <p>
            Get ready for a new world, I’m writing everything I can because I
            suck !
          </p>
        </div>
        <div class="flex gap-20px">
          <Button href="/cards">Explore all cards</Button>
          <Button href="/games">Play a game</Button>
        </div>
      </div>
    </div>
    <div class="col-start-4 col-end-10 my-6 flex flex-col items-center gap-8px">
      <H2>What's the project about ?</H2>
      <p>
        The project is about the power of friendship (no joke) and I’m very
        excited to present it to you !
      </p>
    </div>

    <BentoDisplay />
    <Background />
  </main>
  <footer class="gridBase">
    <div
      class="bg-black col-span-full h-[380px] rounded-t-2xl mt-6 p-[80px] flex gap-40px text-sm"
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
