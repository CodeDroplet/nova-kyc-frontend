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
import Alert from '@/components/Alert.vue';
import { useMutation } from '@tanstack/vue-query';
import AuthService from '@/services/AuthService';
import ApiValidationError from '@/utils/ApiValidationError';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const schema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
});

const { handleSubmit, errors, defineField, setErrors } = useForm({
    validationSchema: schema,
    initialValues: {
        email: '',
        password: ''
    },
});

const { mutate: login, isPending, error: mutationError } = useMutation({
    mutationKey: ['login'],
    mutationFn: AuthService.login
});

const router = useRouter();
const authStore = useAuthStore();

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const submit = handleSubmit((values) => {
    login(values, {
        onError: (error) => {
            if (error instanceof ApiValidationError) {
                setErrors(error.getFormattedErrors());
            }
        },
        onSuccess: (res) => {
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
                <h2 class="text-2xl font-semibold">Login</h2>
                <p class="text-slate-400 text-sm">
                    Welcome back! Please login to your account.
                </p>
            </div>

            <div v-if="mutationError">
                <Alert variant="error" :message="mutationError?.message" class="mb-4" />
            </div>

            <form @submit.prevent="submit">
                <div class="flex flex-col gap-3 mb-5">
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
                <Button type="submit" class="w-full" :is-loading="isPending">Login</Button>
                <div class="text-center mt-4">
                    <p class="text-gray-500">Don't have an account? <RouterLink :to="{ name: 'register' }"
                            class="text-blue-500">
                            Register here
                        </RouterLink>
                    </p>
                </div>
            </form>
        </Card>
    </AuthLayout>
</template>
