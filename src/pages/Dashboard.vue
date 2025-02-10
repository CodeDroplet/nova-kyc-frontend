<script setup lang="ts">
import CreateKycRequest from '@/features/CreateKycRequest.vue';
import KycStatus from '@/features/KycStatus.vue';
import UsersList from '@/features/UsersList.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import AuthService from '@/services/AuthService';
import { useQuery } from '@tanstack/vue-query';
import Report from '@/features/Report.vue';
import { Loader } from '@vicons/tabler';


const { data: res, isFetching } = useQuery({
  queryKey: ['me'],
  queryFn: AuthService.me,
});


</script>

<template>
  <DashboardLayout>
    <template v-if="isFetching">
      <div class="py-5 flex items-center justify-center">
        <Loader class="w-6 h-6 animate-spin" />
      </div>
    </template>
    <template v-else>
      <template v-if="res?.data.user.role === 'admin'">
        <Report class="mb-8" />
        <UsersList />
      </template>
      <template v-else>
        <CreateKycRequest v-if="res?.data.user.kycRequestsStatus === null" />
        <KycStatus v-else />
      </template>
    </template>
  </DashboardLayout>
</template>