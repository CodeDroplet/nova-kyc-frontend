<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import ReportService from '@/services/ReportService';
import { Users, Check, X, Clock } from '@vicons/tabler';
import StatCard from '@/components/StatCard.vue';

const { data: report, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: ReportService.read,
});

const stats = [
    {
        name: 'Total Users',
        value: () => report?.value?.data.totalUsers ?? 0,
        icon: Users,
        variant: 'primary',
    },
    {
        name: 'Approved KYC',
        value: () => report?.value?.data.approvedKYC ?? 0,
        icon: Check,
        variant: 'success',
    },
    {
        name: 'Rejected KYC',
        value: () => report?.value?.data.rejectedKYC ?? 0,
        icon: X,
        variant: 'danger',
    },
    {
        name: 'Pending KYC',
        value: () => report?.value?.data.pendingKYC ?? 0,
        icon: Clock,
        variant: 'warning',
    },
] as const;
</script>

<template>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard v-for="stat in stats" :key="stat.name" :name="stat.name" :value="stat.value()" :variant="stat.variant"
            :loading="isLoading">
            <template #icon>
                <component :is="stat.icon" class="h-6 w-6" />
            </template>
        </StatCard>
    </div>
</template>
