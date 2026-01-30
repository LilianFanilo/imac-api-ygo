<script setup lang="ts">
import Card from '../ui/Card.vue';
import { fetchCardsByDate } from '~/services/api/ygoApi';

const { data, pending, error } = await fetchCardsByDate(
  '2025-01-01',
  '2025-08-23'
);

</script>

<template>
    <div>
        <div class="h-screen flex flex-wrap gap-4 justify-center items-start p-4">
            <div v-if="pending">Chargement…</div>

            <div v-else-if="error">
            Erreur lors du chargement ❌
            </div>

            <div v-else v-for="card in data?.data" :key="card.id">
                <Card :card="card" />
            </div>
        </div>
    </div>
</template>