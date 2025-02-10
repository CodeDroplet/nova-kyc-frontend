<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import KycService from '@/services/KycService';
import Card from '@/components/Card.vue';
import Badge from '@/components/Badge.vue';
import getUploadUrl from '@/utils/getUploadUrl';


const props = withDefaults(defineProps<{
    userId?: number;
}>(), {
});

const { data: kycData, isLoading } = useQuery({
    queryKey: ['kyc', props.userId],
    queryFn: props.userId ? () => KycService.getUserRequest(props.userId!) : KycService.getMyRequest
});

const getStatusBadge = (status: string | undefined) => {
    switch (status) {
        case 'approved':
            return { variant: 'success' as const, text: 'Approved' };
        case 'rejected':
            return { variant: 'error' as const, text: 'Rejected' };
        case 'pending':
            return { variant: 'warning' as const, text: 'Pending Review' };
        default:
            return { variant: 'info' as const, text: 'Not Submitted' };
    }
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

</script>

<template>
    <Card v-if="!isLoading">
        <div v-if="kycData?.data.kycRequest">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 class="text-xl font-semibold">KYC Status</h2>
                    <p class="text-sm text-gray-500">Last updated: {{ formatDate(kycData.data.kycRequest.updatedAt) }}
                    </p>
                </div>
                <Badge v-bind="getStatusBadge(kycData.data.kycRequest.status)" />
            </div>

            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Full Name</p>
                        <p class="mt-1">{{ kycData.data.kycRequest.name }}</p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Email</p>
                        <p class="mt-1">{{ kycData.data.kycRequest.email }}</p>
                    </div>
                </div>

                <div>
                    <p class="text-sm font-medium text-gray-500 mb-2">Submitted Documents</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="border border-slate-200 rounded-lg p-4">
                            <p class="text-sm text-gray-500 mb-2">Front Document</p>
                            <img :src="getUploadUrl(kycData.data.kycRequest.documentFront)" alt="Front Document"
                                class="w-full h-40 object-cover rounded-lg" />
                        </div>
                        <div class="border border-slate-200 rounded-lg p-4">
                            <p class="text-sm text-gray-500 mb-2">Back Document</p>
                            <img :src="getUploadUrl(kycData.data.kycRequest.documentBack)" alt="Back Document"
                                class="w-full h-40 object-cover rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-8">
            <p class="text-gray-500">No KYC request found. Please submit your documents.</p>
        </div>
    </Card>
</template>
