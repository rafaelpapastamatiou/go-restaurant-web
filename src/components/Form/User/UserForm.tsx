import React, { ReactElement } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import {
  UseFormRegister,
  FieldValues,
  DeepMap,
  FieldError,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';

type UserFormData = {
  name: string;
  email: string;
  oldPassword?: string;
  password: string;
  passwordConfirmation: string;
  admin: boolean;
};

interface UserFormProps {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  dirtyFields: DeepMap<FieldValues, true>;
  isSubmitting?: boolean;
  onSubmit(data: UserFormData): Promise<void>;
  type?: 'create' | 'update';
}

export function UserForm({
  register,
  handleSubmit,
  errors,
  dirtyFields,
  isSubmitting,
  onSubmit,
  type = 'create',
}: UserFormProps): ReactElement {
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Divider my="6" borderColor="gray.700" />
      <VStack spacing="8">
        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Checkbox
            name="admin"
            label="Is admin"
            error={errors.admin}
            {...register('admin')}
          />
          <span />
        </SimpleGrid>
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
        {type === 'update' && (
          <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
            <Input
              name="oldPassword"
              label="Current password"
              type="password"
              error={errors.oldPassword}
              dirty={dirtyFields.oldPassword}
              leftIcon={<FiLock />}
              {...register('oldPassword')}
            />
            <span />
          </SimpleGrid>
        )}

        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            name="password"
            label={type === 'create' ? 'Password' : 'New Password'}
            type="password"
            error={errors.password}
            dirty={dirtyFields.password}
            leftIcon={<FiLock />}
            {...register('password')}
          />

          <Input
            name="passwordConfirmation"
            label={
              type === 'create' ? 'Confirm password' : 'Confirm new password'
            }
            type="password"
            error={errors.passwordConfirmation}
            dirty={dirtyFields.passwordConfirmation}
            leftIcon={<FiLock />}
            {...register('passwordConfirmation')}
          />
        </SimpleGrid>
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <NextLink href="/users">
            <Button colorScheme="red" variant="ghost">
              Cancelar
            </Button>
          </NextLink>
          <Button
            type="submit"
            colorScheme="yellow"
            isLoading={!!isSubmitting}
            disabled={!!isSubmitting}
          >
            Salvar
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
