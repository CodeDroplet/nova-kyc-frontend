<script setup lang="ts">
defineProps<{
    isHeader?: boolean
}>();
</script>

<template>
    <th v-if="isHeader" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        <slot></slot>
    </th>
    <td v-else class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <slot></slot>
    </td>
</template>
