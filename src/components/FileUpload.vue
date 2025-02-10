<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue';
import { Upload, X } from '@vicons/tabler';

defineProps<{
    id: string;
    description?: string;
}>();

const model = defineModel();

const previewUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
        if (file.type.startsWith('image/')) {
            previewUrl.value = URL.createObjectURL(file);
        }
        model.value = file;
    }
};

const clearFile = () => {
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
        previewUrl.value = null;
    }
    if (fileInput.value) {
        fileInput.value.value = '';
    }
    model.value = null;
};

watch(() => model.value, (newValue) => {
    if (!newValue) {
        clearFile();
    }
});

onUnmounted(() => {
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
    }
});
</script>


<template>
    <div class="flex items-center justify-center w-full">
        <label :for="id"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden">
            <!-- Preview Image -->
            <div v-if="previewUrl" class="absolute inset-0 w-full h-full">
                <img :src="previewUrl" class="w-full h-full object-contain" :alt="description">
                <button @click.prevent="clearFile"
                    class="absolute top-2 right-2 cursor-pointer bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                    <X class="w-4 h-4" />
                </button>
            </div>

            <!-- Upload UI -->
            <div v-else class="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload class="w-8 h-8 mb-4 text-gray-500" />
                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and
                    drop</p>
                <p class="text-xs text-gray-500">{{ description }}</p>
            </div>
            <input ref="fileInput" :id="id" type="file" class="hidden" @change="handleFileChange"
                accept="image/png,image/jpeg,application/pdf" />
        </label>
    </div>
</template>
