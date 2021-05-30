import { useCallback } from 'react';

import { Flex, Button, Stack } from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatóŕia'),
});

export default function Home(): JSX.Element {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { isSubmitting, errors } = formState;

  const handleSignin = useCallback<SubmitHandler<SignInFormData>>(
    async data => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    },
    [],
  );

  return (
    <Flex width="100vw" height="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        padding="8"
        borderRadius={8}
        direction="column"
        onSubmit={handleSubmit(handleSignin)}
      >
        <Stack spacing={4}>
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          colorScheme="pink"
          marginTop="8"
          size="lg"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
