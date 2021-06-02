import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Heading, useColorModeValue } from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { useMutation } from 'react-query';

import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { Card } from '../../components/Card';
import { UserForm } from '../../components/Form/User/UserForm';

type CreateUserFormData = {
  name: string;
  email: string;
  admin: boolean;
  password: string;
  passwordConfirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  email: yup.string().required('E-mail required').email('Invalid e-mail'),
  admin: yup.boolean(),
  password: yup
    .string()
    .required('Password required')
    .min(6, 'At least 6 characters'),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'Passwords must be the same'),
});

export default function CreateUser(): JSX.Element {
  const router = useRouter();

  const headingColor = useColorModeValue('gray.700', 'gray.100');

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('/users', user);

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    },
  );

  const { isSubmitting, errors, dirtyFields } = formState;

  const handleCreateUser = useCallback<SubmitHandler<CreateUserFormData>>(
    async data => {
      await createUser.mutateAsync(data);

      router.push('/users');
    },
    [createUser, router],
  );

  return (
    <Card>
      <Heading size="lg" fontWeight="normal" color={headingColor}>
        Create new user
      </Heading>
      <UserForm
        register={register}
        handleSubmit={handleSubmit}
        dirtyFields={dirtyFields}
        errors={errors}
        onSubmit={handleCreateUser}
        isSubmitting={isSubmitting}
      />
    </Card>
  );
}
