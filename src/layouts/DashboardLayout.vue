<template>
    <div class="flex justify-center py-10 min-h-screen bg-slate-100">
        <div class="md:max-w-xl">
            <div class="flex flex-col items-center space-x-3 mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
                <p class="text-sm text-gray-600">Manage your KYC applications and verification status</p>
            </div>
            <div class="w-full">
                <slot></slot>
            </div>
        </div>
    </div>
</template>