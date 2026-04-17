<script setup lang="ts">
    properties: {
        href: {
            type: String  
        }
    }
</script>

<template>
        <a class="rounded-full px-16px py-8px border-3 border-black font-medium bg-black text-white hover:border-sky-500 transition-colors" href:="href">
        <slot />
    </a>
</template>