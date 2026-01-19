<script setup lang="ts">
import CardsDisplay from '~/components/layouts/CardsDisplay.vue';
import FilterBoard from '~/components/layouts/FilterBoard.vue';
import Navbar from '~/components/layouts/Navbar.vue';

</script>

<template>
    <Navbar />
    <main>
        <FilterBoard />
        <CardsDisplay />
    </main>
</template>