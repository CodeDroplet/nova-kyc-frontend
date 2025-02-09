<template>
    <input class="px-4 py-1.5 border border-slate-200 rounded-md focus:outline-blue-500 w-full" v-model="model" />
</template>

<script setup lang="ts">
const model = defineModel();
</script>