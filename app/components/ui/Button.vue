<script setup lang="ts">
    properties: {
        href: {
            type: String  
        }
    }
</script>

<template>
        <a class="rounded-full px-16px py-8px font-medium bg-black text-white" href:="href">
        <slot />
    </a>
</template>