<script setup lang="ts">
import { ref } from 'vue';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@/components/table';
import Badge from '@/components/Badge.vue';
import Button from '@/components/Button.vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import UserService from '@/services/UserService';
import KycService from '@/services/KycService';
import { ChevronDown, ChevronRight } from '@vicons/tabler';
import type { User } from '@/types/user';
import KycStatus from './KycStatus.vue';


const expandedUserId = ref<number | null>(null);

const toggleExpand = (userId: number) => {
    expandedUserId.value = expandedUserId.value === userId ? null : userId;
};

const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: UserService.getUsers,
});

const queryClient = useQueryClient();

const updateKycMutation = useMutation({
    mutationFn: (params: { userId: number; status: 'approved' | 'rejected' }) =>
        KycService.updateRequestStatus(params.userId, params.status),
    onSuccess: (_res, values) => {
        // Invalidate and refetch users list
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['kyc', values.userId] });
    },
});

const getKycStatusBadgeProps = (status: string | undefined) => {
    switch (status) {
        case 'approved':
            return { variant: 'success' as const, text: 'Approved' };
        case 'rejected':
            return { variant: 'error' as const, text: 'Rejected' };
        case 'pending':
            return { variant: 'warning' as const, text: 'Pending' };
        default:
            return { variant: 'info' as const, text: 'Not Started' };
    }
};

const handleApprove = async (userId: number) => {
    console.log('Approving KYC request for user:', userId);
    await updateKycMutation.mutateAsync({ userId, status: 'approved' });
};

const handleReject = async (userId: number) => {
    await updateKycMutation.mutateAsync({ userId, status: 'rejected' });
};
</script>

<template>
    <Table v-if="users">
        <TableHead>
            <TableRow>
                <TableCell isHeader>First Name</TableCell>
                <TableCell isHeader>Last Name</TableCell>
                <TableCell isHeader>Email</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Actions</TableCell>
                <TableCell isHeader></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <template v-for="user in users" :key="user.email">
                <TableRow>
                    <TableCell>{{ user.firstName }}</TableCell>
                    <TableCell>{{ user.lastName }}</TableCell>
                    <TableCell>{{ user.email }}</TableCell>
                    <TableCell>
                        <Badge v-bind="getKycStatusBadgeProps(user.kycRequestsStatus)" />
                    </TableCell>
                    <TableCell>
                        <div class="flex gap-2">
                            <Button variant="primary" size="sm" @click="handleApprove(user.id)">
                                Approve
                            </Button>
                            <Button variant="danger" size="sm" @click="handleReject(user.id)">
                                Reject
                            </Button>
                        </div>
                    </TableCell>
                    <TableCell>
                        <button @click="toggleExpand(user.id)" class="p-1 text-gray-600 hover:text-gray-900">
                            <component :is="expandedUserId === user.id ? ChevronDown : ChevronRight" class="w-5 h-5" />
                        </button>
                    </TableCell>
                </TableRow>
                <TableRow v-if="expandedUserId === user.id">
                    <TableCell :colspan="6" class="bg-gray-50">
                        <KycStatus :userId="user.id" />
                    </TableCell>
                </TableRow>
            </template>
        </TableBody>
    </Table>
</template>
