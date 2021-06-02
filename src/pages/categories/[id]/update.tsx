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
import { CategoryForm } from '../../../components/Form/Category/CategoryForm';
import { useCategory } from '../../../services/hooks/useCategory';

type UpdateCategoryFormData = {
  name: string;
};

const updateCategoryFormSchema = yup.object().shape({
  name: yup.string().required('Name required'),
});

export default function UpdateCategory(): JSX.Element {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, isFetching } = useCategory(Number(id as string));

  const headingColor = useColorModeValue('gray.700', 'gray.100');

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(updateCategoryFormSchema),
    defaultValues: {
      ...data,
    },
  });

  const { isSubmitting, errors, dirtyFields } = formState;

  const updateCategory = useMutation(
    async (category: UpdateCategoryFormData) => {
      const response = await api.put(`/categories/${id}`, category);

      return response.data.category;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
      },
    },
  );

  const handleUpdateCategory = useCallback<
    SubmitHandler<UpdateCategoryFormData>
  >(
    async data => {
      await updateCategory.mutateAsync(data);

      router.push('/categories');
    },
    [updateCategory, router],
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
          </>
        ) : (
          'Update category'
        )}
      </Heading>
      <CategoryForm
        register={register}
        handleSubmit={handleSubmit}
        dirtyFields={dirtyFields}
        errors={errors}
        onSubmit={handleUpdateCategory}
        isSubmitting={isSubmitting}
        type="update"
      />
    </Card>
  );
}
