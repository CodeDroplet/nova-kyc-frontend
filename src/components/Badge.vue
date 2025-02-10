<template>
    <span :class="[
        'px-2 py-1 text-xs font-medium rounded-full',
        variantClasses[variant]
    ]">
        {{ text }}
    </span>
</template>

<script setup lang="ts">
interface Props {
    text: string;
    variant?: 'success' | 'warning' | 'error' | 'info';
}

withDefaults(defineProps<Props>(), {
    variant: 'info'
});

const variantClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
};
</script>
