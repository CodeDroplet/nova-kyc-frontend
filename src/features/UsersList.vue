<script setup lang="ts">
import { Table, TableHead, TableRow, TableCell, TableBody } from '@/components/table';
import Badge from '@/components/Badge.vue';
import { useQuery } from '@tanstack/vue-query';
import UserService from '@/services/UserService';


const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: UserService.getUsers,
});



const getKycStatusBadgeProps = (status: string | undefined) => {
    switch (status) {
        case 'accepted':
            return { variant: 'success' as const, text: 'Accepted' };
        case 'rejected':
            return { variant: 'error' as const, text: 'Rejected' };
        case 'pending':
            return { variant: 'warning' as const, text: 'Pending' };
        default:
            return { variant: 'info' as const, text: 'Not Started' };
    }
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
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow v-for="user in users" :key="user.email">
                <TableCell>{{ user.firstName }}</TableCell>
                <TableCell>{{ user.lastName }}</TableCell>
                <TableCell>{{ user.email }}</TableCell>
                <TableCell>
                    <Badge v-bind="getKycStatusBadgeProps(user.kycRequestsStatus)" />
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>
