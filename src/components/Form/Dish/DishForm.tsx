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

import { Input } from '../Input';
import { Select } from '../Select';
import { NumberInput } from '../NumberInput';
import { FiLink } from 'react-icons/fi';

type Category = {
  id: number;
  name: string;
};

type DishFormData = {
  name: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
};

interface DishFormProps {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  dirtyFields: DeepMap<FieldValues, true>;
  isSubmitting?: boolean;
  onSubmit(data: DishFormData): Promise<void>;
  type?: 'create' | 'update';
  categories: Category[];
  isLoadingCategories?: boolean;
}

export function DishForm({
  register,
  handleSubmit,
  errors,
  dirtyFields,
  isSubmitting,
  onSubmit,
  categories,
  isLoadingCategories,
}: DishFormProps): ReactElement {
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Divider my="6" borderColor="gray.700" />
      <VStack spacing="8">
        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input
            name="name"
            label="Name"
            error={errors.name}
            dirty={dirtyFields.name}
            {...register('name')}
          />

          <NumberInput
            name="price"
            label="Price"
            error={errors.price}
            {...register('price')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Select
            name="categoryId"
            label="Category"
            placeholder="Select a category"
            isLoading={isLoadingCategories}
            error={errors.categoryId}
            {...register('categoryId')}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <Input
            name="imageUrl"
            label="Image URL"
            error={errors.imageUrl}
            dirty={dirtyFields.imageUrl}
            leftIcon={<FiLink />}
            {...register('imageUrl')}
          />
        </SimpleGrid>
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <NextLink href="/dishes">
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
