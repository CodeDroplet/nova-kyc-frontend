<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import AuthLayout from '@/layouts/AuthLayout.vue';
import Input from '@/components/Input.vue';
import Card from '@/components/Card.vue';
import Label from '@/components/Label.vue';
import FormGroup from '@/components/FormGroup.vue';
import Button from '@/components/Button.vue';
import FormError from '@/components/FormError.vue';
import { useMutation } from '@tanstack/vue-query';
import AuthService from '@/services/AuthService';
import Alert from '@/components/Alert.vue';
import ApiValidationError from '@/utils/ApiValidationError';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
});

const { handleSubmit, errors, defineField, setErrors } = useForm({
  validationSchema: schema,
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  },
});


const { mutate: register, error: registerError, isPending } = useMutation({
  mutationKey: ['register'],
  mutationFn: AuthService.register
});

const router = useRouter();
const authStore = useAuthStore();


const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');



const submit = handleSubmit((values) => {
  register(values, {
    onError: (error) => {
      if (error instanceof ApiValidationError) {
        setErrors(error.getFormattedErrors());
      }
    },

    onSuccess: (res) => {
      // Redirect to login page
      authStore.setToken(res.data.token);
      authStore.setUser(res.data.user);
      router.push({ name: 'dashboard' });

    }
  });
});
</script>

<template>
  <AuthLayout>
    <Card class="w-full">
      <div class="mb-3">
        <h2 class="text-2xl font-semibold">Register</h2>
        <p class="text-slate-400 text-sm">
          Enter your details to create an account.
        </p>
      </div>

      <div v-if="registerError">
        <Alert variant="error" :message="registerError.message" class="mb-4" />
      </div>

      <form @submit.prevent="submit">
        <div class="flex flex-col gap-3 mb-5">
          <FormGroup>
            <Label>First Name</Label>
            <Input v-model="firstName" v-bind="firstNameAttrs" />
            <FormError :error="errors.firstName" />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input v-model="lastName" v-bind="lastNameAttrs" />
            <FormError :error="errors.lastName" />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input v-model="email" v-bind="emailAttrs" />
            <FormError :error="errors.email" />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" v-model="password" v-bind="passwordAttrs" />
            <FormError :error="errors.password" />
          </FormGroup>
        </div>
        <Button type="submit" class="w-full" :is-loading="isPending">Register</Button>
        <div class="text-center mt-4">
          <p class="text-gray-500">Already have an account? <RouterLink :to="{ name: 'login' }" class="text-blue-500">
              Login here
            </RouterLink>
          </p>
        </div>
      </form>
    </Card>
  </AuthLayout>
</template>