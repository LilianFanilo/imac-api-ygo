<script setup lang="ts">
    properties: {
        href: {
            type: String  
        }
    }
</script>

<template>
    <a class="rounded-full px-4 py-2 outline-4 outline-gray-300 font-medium bg-black text-white hover:outline-sky-500 transition-all duration-100" href:="href">
        <slot />
    </a>
</template>