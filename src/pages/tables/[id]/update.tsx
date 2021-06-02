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
import { TableForm } from '../../../components/Form/Table/TableForm';
import { useTable } from '../../../services/hooks/useTable';

type UpdateTableFormData = {
  number: string;
};

const updateTableFormSchema = yup.object().shape({
  number: yup.string().required('number required'),
});

export default function UpdateTable(): JSX.Element {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, isFetching } = useTable(Number(id as string));

  const headingColor = useColorModeValue('gray.700', 'gray.100');

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(updateTableFormSchema),
    defaultValues: {
      ...data,
    },
  });

  const { isSubmitting, errors, dirtyFields } = formState;

  const updateTable = useMutation(
    async (table: UpdateTableFormData) => {
      const response = await api.put(`/tables/${id}`, table);

      return response.data.table;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tables']);
      },
    },
  );

  const handleUpdateTable = useCallback<SubmitHandler<UpdateTableFormData>>(
    async data => {
      await updateTable.mutateAsync(data);

      router.push('/tables');
    },
    [updateTable, router],
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
            <Text as="span">{data.number} </Text>
          </>
        ) : (
          'Update table'
        )}
      </Heading>
      <TableForm
        register={register}
        handleSubmit={handleSubmit}
        dirtyFields={dirtyFields}
        errors={errors}
        onSubmit={handleUpdateTable}
        isSubmitting={isSubmitting}
        type="update"
      />
    </Card>
  );
}
