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
import { TableForm } from '../../components/Form/Table/TableForm';

type CreateTableFormData = {
  number: string;
};

const createTableFormSchema = yup.object().shape({
  number: yup.string().required('Number required'),
});

export default function CreateTable(): JSX.Element {
  const router = useRouter();

  const headingColor = useColorModeValue('gray.700', 'gray.100');

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createTableFormSchema),
  });

  const createTable = useMutation(
    async (table: CreateTableFormData) => {
      const response = await api.post('/tables', table);

      return response.data.table;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tables']);
      },
    },
  );

  const { isSubmitting, errors, dirtyFields } = formState;

  const handleCreateTable = useCallback<SubmitHandler<CreateTableFormData>>(
    async data => {
      await createTable.mutateAsync(data);

      router.push('/tables');
    },
    [createTable, router],
  );

  return (
    <Card>
      <Heading size="lg" fontWeight="normal" color={headingColor}>
        Create new table
      </Heading>
      <TableForm
        register={register}
        handleSubmit={handleSubmit}
        dirtyFields={dirtyFields}
        errors={errors}
        onSubmit={handleCreateTable}
        isSubmitting={isSubmitting}
      />
    </Card>
  );
}
