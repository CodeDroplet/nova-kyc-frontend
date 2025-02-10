<template>
    <button :class="buttonClasses" :disabled="isLoading">

        <div v-if="isLoading" class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <Loader class="w-4 h-4 animate-spin" />
        </div>
        <div :class="isLoading ? 'opacity-0' : 'opacity-100'">
            <slot></slot>
        </div>

    </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { cva } from 'class-variance-authority';
import { Loader } from "@vicons/tabler";

const props = defineProps<{
    variant?: "primary" | "secondary" | "danger";
    isLoading?: boolean;
}>();

const buttonClasses = computed(() => {
    return cva(
        "px-4 py-1.5 cursor-pointer relative flex items-center justify-center transition-all rounded-md font-regular disabled:opacity-70 disabled:cursor-not-allowed",
        {
            variants: {
                variant: {
                    primary: "bg-slate-700 text-white hover:bg-slate-900 disabled:hover:bg-slate-700",
                    secondary: "bg-slate-200 text-slate-600 hover:bg-slate-300 disabled:hover:bg-slate-200",
                    danger: "bg-red-500 text-white hover:bg-red-700 disabled:hover:bg-red-500",
                },
            },
            defaultVariants: {
                variant: "primary",
            },
        }
    )({ variant: props.variant });
});
</script>
