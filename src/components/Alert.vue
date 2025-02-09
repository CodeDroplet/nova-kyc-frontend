<script setup lang="ts">
interface Props {
    variant?: 'primary' | 'warning' | 'error';
    message: string;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary'
});

const variantClasses = {
    primary: 'bg-slate-100 text-slate-700 border-slate-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200'
};
</script>

<template>
    <div :class="[
        'px-4 py-2 rounded-lg border',
        variantClasses[variant]
    ]">
        {{ message }}
    </div>
</template>
