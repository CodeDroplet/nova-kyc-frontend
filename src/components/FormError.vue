<script setup lang="ts">
defineProps<{
    error?: string;
}>();
</script>

<template>
    <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
</template>
