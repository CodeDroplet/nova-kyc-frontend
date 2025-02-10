<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import Input from '@/components/Input.vue';
import Card from '@/components/Card.vue';
import Label from '@/components/Label.vue';
import FormGroup from '@/components/FormGroup.vue';
import Button from '@/components/Button.vue';
import FormError from '@/components/FormError.vue';
import FileUpload from '@/components/FileUpload.vue';
import Alert from '@/components/Alert.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import ApiValidationError from '@/utils/ApiValidationError';
import KycService from '@/services/KycService';
import { useAuthStore } from '@/stores/authStore';


const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    documentFront: yup
        .mixed()
        .required('Front document is required'),

    documentBack: yup
        .mixed()
        .required('Back document is required')

});

const authStore = useAuthStore();

const { handleSubmit, errors, defineField, setErrors } = useForm<
    {
        name: string;
        email: string;
        documentFront: File;
        documentBack: File;
    }
>({
    validationSchema: schema,
    initialValues: {
        name: authStore.user?.firstName + ' ' + authStore.user?.lastName,
        email: authStore.user?.email,
        documentFront: new File([], ''),
        documentBack: new File([], ''),
    }
});

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [documentFront, _documentFrontAttrs] = defineField('documentFront');
const [documentBack, _documentBackAttrs] = defineField('documentBack');

const queryClient = useQueryClient();

const mutation = useMutation({
    mutationKey: ['createKyc'],
    mutationFn: KycService.request,
    onError: (error) => {
        if (error instanceof ApiValidationError) {
            setErrors(error.getFormattedErrors());
        }
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['me'] });

    }
});

const submit = handleSubmit((values) => mutation.mutate(values));
</script>

<template>
    <Card>
        <div class="mb-3">
            <h2 class="text-2xl font-semibold">Create KYC Request</h2>
            <p class="text-slate-400 text-sm">
                Please provide your information and upload your documents.
            </p>
        </div>

        <div v-if="mutation.error.value">
            <Alert variant="error" :message="mutation.error.value.message" class="mb-4" />
        </div>

        <form @submit.prevent="submit">
            <div class="flex flex-col gap-3 mb-5">
                <div class="flex gap-3">
                    <FormGroup class="flex-1">
                        <Label>Full Name</Label>
                        <Input v-model="name" v-bind="nameAttrs" />
                        <FormError :error="errors.name" />
                    </FormGroup>

                    <FormGroup class="flex-1">
                        <Label>Email</Label>
                        <Input v-model="email" v-bind="emailAttrs" />
                        <FormError :error="errors.email" />
                    </FormGroup>
                </div>

                <FormGroup>
                    <Label>Document Front</Label>
                    <FileUpload id="documentFront" v-model="documentFront"
                        description="Upload the front side of your ID (PNG, JPG up to 10MB)" />
                    <FormError :error="errors.documentFront" />
                </FormGroup>

                <FormGroup>
                    <Label>Document Back</Label>
                    <FileUpload id="documentBack" v-model="documentBack"
                        description="Upload the back side of your ID (PNG, JPG up to 10MB)" />
                    <FormError :error="errors.documentBack" />
                </FormGroup>
            </div>

            <Button type="submit" :disabled="mutation.isPending.value" class="w-full">
                {{ mutation.isPending.value ? 'Submitting...' : 'Submit' }}
            </Button>
        </form>
    </Card>
</template>
