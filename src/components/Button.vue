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
        "px-4 py-1.5 cursor-pointer transition-color rounded-md font-medium",
        {
            variants: {
                variant: {
                    primary: "bg-slate-800 text-white hover:bg-slate-900",
                    secondary: "bg-gray-500 ",
                    danger: "bg-red-500 text-white",
                },
            },
            defaultVariants: {
                variant: "primary",
            },
        }
    )({ variant: props.variant });
});
</script>
