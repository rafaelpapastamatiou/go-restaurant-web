import React, { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Heading, Text, useColorModeValue } from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { useMutation } from 'react-query';

import { api } from '../../../services/api';
import { queryClient } from '../../../services/queryClient';
import { Card } from '../../../components/Card';
import { DishForm } from '../../../components/Form/Dish/DishForm';
import { useDish } from '../../../services/hooks/useDish';
import { useCategories } from '../../../services/hooks/useCategories';

type UpdateDishFormData = {
  name: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
};

const updateDishFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  price: yup.number().required('Price required').min(0),
  imageUrl: yup.string().url('Image URL must be a valid url'),
  categoryId: yup.number().required('Category required').min(1),
});

export default function UpdateDish(): JSX.Element {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, isFetching } = useDish(Number(id as string));

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useCategories(0);

  const headingColor = useColorModeValue('gray.700', 'gray.100');

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(updateDishFormSchema),
    defaultValues: {
      ...data,
    },
  });

  const { isSubmitting, errors, dirtyFields } = formState;

  const updateDish = useMutation(
    async (dish: UpdateDishFormData) => {
      const response = await api.put(`/dishes/${id}`, {
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

  const handleUpdateDish = useCallback<SubmitHandler<UpdateDishFormData>>(
    async data => {
      await updateDish.mutateAsync(data);

      router.push('/dishes');
    },
    [updateDish, router],
  );

  useEffect(() => {
    if (!isLoading && data) {
      (Object.keys(data) as Array<keyof typeof data>).map(key =>
        setValue(key, data[key]),
      );
    }
  }, [isLoading, data, setValue]);

  const categoriesOptions = useMemo(() => {
    return categoriesData && categoriesData.categories
      ? categoriesData.categories.map(category => ({
          name: category.name,
          id: category.id,
        }))
      : [];
  }, [categoriesData]);

  return (
    <Card isLoading={isLoading} isRefreshing={isFetching}>
      <Heading size="lg" fontWeight="normal" color={headingColor}>
        {data ? (
          <>
            <Text as="span">{data.name} </Text>
          </>
        ) : (
          'Update dish'
        )}
      </Heading>
      <DishForm
        register={register}
        handleSubmit={handleSubmit}
        dirtyFields={dirtyFields}
        errors={errors}
        onSubmit={handleUpdateDish}
        isSubmitting={isSubmitting}
        type="update"
        isLoadingCategories={!!isLoadingCategories || !!isFetchingCategories}
        categories={categoriesOptions}
      />
    </Card>
  );
}
