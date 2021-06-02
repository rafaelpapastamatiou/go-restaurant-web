import React, { ReactElement } from 'react';
import { Box, Button, Divider, Flex, HStack, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';

import {
  UseFormRegister,
  FieldValues,
  DeepMap,
  FieldError,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { RiTableFill } from 'react-icons/ri';
import { Input } from '../Input';

type TableFormData = {
  number: string;
};

interface TableFormProps {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  dirtyFields: DeepMap<FieldValues, true>;
  isSubmitting?: boolean;
  onSubmit(data: TableFormData): Promise<void>;
  type?: 'create' | 'update';
}

export function TableForm({
  register,
  handleSubmit,
  errors,
  dirtyFields,
  isSubmitting,
  onSubmit,
}: TableFormProps): ReactElement {
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Divider my="6" borderColor="gray.700" />
      <VStack spacing="8">
        <Input
          name="number"
          label="Number"
          error={errors.number}
          leftIcon={<RiTableFill />}
          dirty={dirtyFields.number}
          {...register('number')}
        />
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <NextLink href="/tables">
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
