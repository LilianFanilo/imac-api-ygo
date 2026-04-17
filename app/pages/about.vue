<script setup lang="ts">
  import H1 from "~/components/H1.vue";
  import Footer from "~/components/layouts/Footer.vue";
  import Main from "~/components/layouts/Main.vue";
  import Navbar from "~/components/layouts/Navbar.vue";
</script>

<template>
  <Navbar />
  <Main>
    <div class="col-span-full">
      <H1>About the project</H1>
    </div>
    <div
      class="col-span-full md:col-start-1 md:col-end-7 h-[500px] bg-gray-100"
    ></div>
    <p>vznznjkl</p>
  </Main>
  <Footer />
</template>
