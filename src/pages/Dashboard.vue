<script setup lang="ts">
import UsersList from '@/features/UsersList.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import AuthService from '@/services/AuthService';
import { useAuthStore } from '@/stores/authStore';
import { useQuery } from '@tanstack/vue-query';


const authStore = useAuthStore();

const { data: res, isFetching } = useQuery({
  queryKey: ['me'],
  queryFn: AuthService.me,
});


</script>

<template>
  <DashboardLayout>
    <template v-if="isFetching">
      <div class="py-5 text-center">Loading please wait.</div>
    </template>
    <template v-else>
      <UsersList v-if="res?.data.user.role === 'admin'" />
    </template>
  </DashboardLayout>
</template>