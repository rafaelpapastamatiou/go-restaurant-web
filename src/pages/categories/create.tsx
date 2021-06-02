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
import { CategoryForm } from '../../components/Form/Category/CategoryForm';

type CreateCategoryFormData = {
  name: string;
};

const createCategoryFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
});

export default function CreateCategory(): JSX.Element {
  const router = useRouter();

  const headingColor = useColorModeValue('gray.700', 'gray.100');

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createCategoryFormSchema),
  });

  const createCategory = useMutation(
    async (category: CreateCategoryFormData) => {
      const response = await api.post('/categories', category);

      return response.data.category;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
      },
    },
  );

  const { isSubmitting, errors, dirtyFields } = formState;

  const handleCreateCategory = useCallback<
    SubmitHandler<CreateCategoryFormData>
  >(
    async data => {
      await createCategory.mutateAsync(data);

      router.push('/categories');
    },
    [createCategory, router],
  );

  return (
    <Card>
      <Heading size="lg" fontWeight="normal" color={headingColor}>
        Create new category
      </Heading>
      <CategoryForm
        register={register}
        handleSubmit={handleSubmit}
        dirtyFields={dirtyFields}
        errors={errors}
        onSubmit={handleCreateCategory}
        isSubmitting={isSubmitting}
      />
    </Card>
  );
}
