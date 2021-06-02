import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Heading, useColorModeValue } from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { useMutation } from 'react-query';

import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { Card } from '../../components/Card';
import { DishForm } from '../../components/Form/Dish/DishForm';
import { useCategories } from '../../services/hooks/useCategories';

type CreateDishFormData = {
  name: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
};

const createDishFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  price: yup.number().required('Price required').min(0),
  imageUrl: yup.string().url('Image URL must be a valid url'),
  categoryId: yup.number().required('Category required').min(1),
});

export default function CreateDish(): JSX.Element {
  const router = useRouter();

  const headingColor = useColorModeValue('gray.700', 'gray.100');

  const { data: categoriesData, isLoading, isFetching } = useCategories(0);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createDishFormSchema),
  });

  const createDish = useMutation(
    async (dish: CreateDishFormData) => {
      const response = await api.post('/dishes', {
        ...dish,
        price: Number(dish.price),
      });

      return response.data.dish;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dishes']);
      },
    },
  );

  const { isSubmitting, errors, dirtyFields } = formState;

  const handleCreateDish = useCallback<SubmitHandler<CreateDishFormData>>(
    async data => {
      await createDish.mutateAsync(data);

      router.push('/dishes');
    },
    [createDish, router],
  );

  const categoriesOptions = useMemo(() => {
    return categoriesData && categoriesData.categories
      ? categoriesData.categories.map(category => ({
          name: category.name,
          id: category.id,
        }))
      : [];
  }, [categoriesData]);

  return (
    <Card>
      <Heading size="lg" fontWeight="normal" color={headingColor}>
        Create new dish
      </Heading>
      <DishForm
        register={register}
        handleSubmit={handleSubmit}
        dirtyFields={dirtyFields}
        errors={errors}
        onSubmit={handleCreateDish}
        isSubmitting={isSubmitting}
        isLoadingCategories={!!isLoading || !!isFetching}
        categories={categoriesOptions}
      />
    </Card>
  );
}
