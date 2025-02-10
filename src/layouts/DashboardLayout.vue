<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import Button from '@/components/Button.vue';

const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    auth.logout();
    router.push({ name: 'login' });
};
</script>

<template>
    <div class="flex justify-center py-10 min-h-screen bg-slate-100">
        <div class="md:max-w-2xl w-full px-4">
            <div class="flex justify-between items-center mb-6">
                <div class="flex flex-col">
                    <h1 class="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
                    <p class="text-sm text-gray-600">{{
                        auth.user?.role === 'admin'
                            ? "Manage your users and their KYC applications"
                            : "Manage your KYC application and verification status" }}
                    </p>
                </div>
                <Button @click="handleLogout" variant="danger">
                    Logout
                </Button>
            </div>
            <div class="w-full">
                <slot></slot>
            </div>
        </div>
    </div>
</template>