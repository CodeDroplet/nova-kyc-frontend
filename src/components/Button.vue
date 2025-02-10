<template>
    <button :class="buttonClasses">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { cva } from 'class-variance-authority';

const props = defineProps<{
    variant?: "primary" | "secondary" | "danger";
}>();

const buttonClasses = computed(() => {
    return cva(
        "px-4 py-1.5 cursor-pointer transition-all rounded-md font-regular",
        {
            variants: {
                variant: {
                    primary: "bg-slate-700 text-white hover:bg-slate-900",
                    secondary: "bg-slate-200 text-slate-600 hover:bg-slate-300",
                    danger: "bg-red-500 text-white hover:bg-red-700",
                },
            },
            defaultVariants: {
                variant: "primary",
            },
        }
    )({ variant: props.variant });
});
</script>
