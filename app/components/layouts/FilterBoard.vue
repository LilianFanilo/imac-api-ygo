<script setup lang="ts">
import Button from '../ui/Button.vue';
import SearchBar from '../ui/SearchBar.vue';
import Select from '../ui/Select.vue';

</script>

<template>
    <div class="bg-red-200">
        <div class="flex p-4">
            <SearchBar />
            <Button>Monster</Button>
            <Button>Spell</Button>
            <Button>Trap</Button>
        </div>
        <div class="bg-sky-50 p-4">
            <Select />
        </div>
    </div>

</template>