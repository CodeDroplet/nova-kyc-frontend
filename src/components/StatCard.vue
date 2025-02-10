<script setup lang="ts">
import { cva } from 'class-variance-authority';

const iconWrapper = cva(
    "flex items-center justify-center rounded-md w-12 h-12 transition-all duration-200",
    {
        variants: {
            variant: {
                primary: "bg-blue-50 text-blue-600",
                success: "bg-green-50 text-green-600",
                warning: "bg-yellow-50 text-yellow-600",
                danger: "bg-red-50 text-red-600"
            },
        },
        defaultVariants: {
            variant: "primary"
        }
    }
);

const valueStyle = cva(
    "text-2xl font-medium text-gray-900",
    {
        variants: {
            variant: {
                primary: "",
                success: "",
                warning: "",
                danger: ""
            },
        },
        defaultVariants: {
            variant: "primary"
        }
    }
);

interface Props {
    name: string;
    value: number | string;
    variant?: "primary" | "success" | "warning" | "danger";
    loading?: boolean;
}

defineProps<Props>();
</script>

<template>
    <div
        class="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-gray-300">
        <div :class="iconWrapper({ variant })">
            <slot name="icon" class="h-6 w-6" />
        </div>
        <div class="flex flex-col">
            <p class="text-sm font-medium text-slate-500">{{ name }}</p>
            <p :class="valueStyle({ variant })">
                <span v-if="loading" class="animate-pulse">...</span>
                <span v-else>{{ value }}</span>
            </p>
            <p v-if="$slots.description" class="mt-1 text-sm text-gray-500">
                <slot name="description" />
            </p>
        </div>
    </div>
</template>
