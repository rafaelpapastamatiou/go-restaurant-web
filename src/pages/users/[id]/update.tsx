import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading, Text, useColorModeValue } from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { useMutation } from 'react-query';

import { api } from '../../../services/api';
import { queryClient } from '../../../services/queryClient';
import { Card } from '../../../components/Card';
import { UserForm } from '../../../components/Form/User/UserForm';
import { useUser } from '../../../services/hooks/useUser';

type UpdateUserFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const updateUserFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  email: yup.string().required('E-mail required').email('Invalid e-mail'),
  oldPassword: yup.string(),
  password: yup.string().when('oldPassword', {
    is: val => !!val.length,
    then: yup.string().required().min(6, 'At least 6 characters.'),
    otherwise: yup.string(),
  }),
  passwordConfirmation: yup
    .string()
    .when('oldPassword', {
      is: val => !!val.length,
      then: yup.string().required().min(6, 'At least 6 characters.'),
      otherwise: yup.string(),
    })
    .oneOf([yup.ref('password'), undefined], 'Passwords must be the same'),
});

export default function UpdateUser(): JSX.Element {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, isFetching } = useUser(Number(id as string));

  const headingColor = useColorModeValue('gray.700', 'gray.100');
  const subHeadingColor = useColorModeValue('gray.600', 'gray.250');

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(updateUserFormSchema),
    defaultValues: {
      ...data,
    },
  });

  const { isSubmitting, errors, dirtyFields } = formState;

  const updateUser = useMutation(
    async (user: UpdateUserFormData) => {
      const response = await api.put(`/users/${id}`, user);

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    },
  );

  const handleUpdateUser = useCallback<SubmitHandler<UpdateUserFormData>>(
    async data => {
      await updateUser.mutateAsync(data);

      router.push('/users');
    },
    [updateUser, router],
  );

  useEffect(() => {
    if (!isLoading && data) {
      (Object.keys(data) as Array<keyof typeof data>).map(key =>
        setValue(key, data[key]),
      );
    }
  }, [isLoading, data, setValue]);

  return (
    <Card isLoading={isLoading} isRefreshing={isFetching}>
      <Heading size="lg" fontWeight="normal" color={headingColor}>
        {data ? (
          <>
            <Text as="span">{data.name} </Text>
            <Text as="span" fontSize="xl" color={subHeadingColor}>
              {'<'}
              {data.email}
              {'>'}
            </Text>
          </>
        ) : (
          'Update user'
        )}
      </Heading>
      <UserForm
        register={register}
        handleSubmit={handleSubmit}
        dirtyFields={dirtyFields}
        errors={errors}
        onSubmit={handleUpdateUser}
        isSubmitting={isSubmitting}
        type="update"
      />
    </Card>
  );
}
