import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { useMutation } from 'react-query';

import { Input } from '../../components/Form/Input';

import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { Card } from '../../components/Card';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatóŕia')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export default function CreateUser(): JSX.Element {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

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
      <Box as="form" onSubmit={handleSubmit(handleCreateUser)}>
        <Heading size="lg" fontWeight="normal">
          Create user
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
            <Input
              name="name"
              label="Name"
              error={errors.name}
              leftIcon={<FiUser />}
              dirty={dirtyFields.name}
              {...register('name')}
            />

            <Input
              name="email"
              label="E-mail"
              error={errors.email}
              leftIcon={<FiMail />}
              dirty={dirtyFields.email}
              {...register('email')}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
            <Input
              name="password"
              label="Password"
              type="password"
              error={errors.password}
              dirty={dirtyFields.password}
              leftIcon={<FiLock />}
              {...register('password')}
            />

            <Input
              name="password_confirmation"
              label="Confirm password"
              type="password"
              error={errors.password_confirmation}
              dirty={dirtyFields.password_confirmation}
              leftIcon={<FiLock />}
              {...register('password_confirmation')}
            />
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link href="/users">
              <Button as="a" colorScheme="whiteAlpha">
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              colorScheme="pink"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Salvar
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Card>
  );
}
