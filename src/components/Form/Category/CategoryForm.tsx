import React, { ReactElement } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  UseFormRegister,
  FieldValues,
  DeepMap,
  FieldError,
  UseFormHandleSubmit,
} from 'react-hook-form';

import { Input } from '../Input';

type CategoryFormData = {
  name: string;
};

interface CategoryFormProps {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  dirtyFields: DeepMap<FieldValues, true>;
  isSubmitting?: boolean;
  onSubmit(data: CategoryFormData): Promise<void>;
  type?: 'create' | 'update';
}

export function CategoryForm({
  register,
  handleSubmit,
  errors,
  dirtyFields,
  isSubmitting,
  onSubmit,
}: CategoryFormProps): ReactElement {
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Divider my="6" borderColor="gray.700" />
      <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
        <Input
          name="name"
          label="Name"
          error={errors.name}
          dirty={dirtyFields.name}
          {...register('name')}
        />
      </SimpleGrid>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <NextLink href="/categories">
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
