import React, { useCallback } from 'react';
import {
  Flex,
  Button,
  Stack,
  Icon,
  useToast,
  Divider,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FiBriefcase,
  FiLink,
  FiLock,
  FiLogIn,
  FiPackage,
  FiUser,
} from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { Input } from '../components/Form/Input';
import { api } from '../services/api';
import { Logo } from '../components/Header/Logo';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  accountUrl: string;
  tradeName: string;
};

const signUpFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  tradeName: yup.string().required('Nome fantasia é obrigatório'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatóŕia'),
  accountUrl: yup.string().required('Url da conta é obrigatória'),
});

export default function SignUp(): JSX.Element {
  const router = useRouter();
  const toast = useToast();

  const isMobile = useBreakpointValue({
    base: true,
    xs: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  });

  const logoSize = useBreakpointValue({
    base: 42,
    xs: 42,
    sm: 52,
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const { isSubmitting, errors, dirtyFields } = formState;

  const signUp = useMutation(async (data: SignUpFormData) => {
    const response = await api.post('/signup', data);

    return response.data;
  });

  const handleSignUp = useCallback<SubmitHandler<SignUpFormData>>(
    async data => {
      await signUp.mutateAsync(data);

      toast({
        title: 'Account created successfully',
        duration: 2000,
        isClosable: true,
        status: 'success',
      });

      router.push('/signin');
    },
    [router, signUp, toast],
  );

  const handleGoToSignIn = useCallback(() => {
    router.push('/signin');
  }, [router]);

  return (
    <Flex
      width="100vw"
      align="center"
      justify="center"
      {...(isMobile ? { minHeight: '100vh' } : { height: '100vh' })}
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={660}
        bg="gray.800"
        padding="8"
        borderRadius={8}
        direction="column"
        onSubmit={handleSubmit(handleSignUp)}
        shadow="sm"
        {...(isMobile
          ? {
              minHeight: '100vh',
              height: 'auto',
              maxWidth: 'auto',
              justify: 'center',
              borderRadius: 0,
            }
          : {})}
      >
        <Flex justify="center" mb="8">
          <Logo fontSize={logoSize} />
        </Flex>

        <Stack spacing={4}>
          <Input
            name="name"
            type="text"
            label="Account name"
            leftIcon={<Icon as={FiBriefcase} />}
            error={errors.name}
            dirty={dirtyFields.name}
            {...register('name')}
          />

          <Stack direction={['column', 'row']} spacing={4}>
            <Input
              name="tradeName"
              type="text"
              label="Account Trade name"
              leftIcon={<Icon as={FiPackage} />}
              error={errors.tradeName}
              dirty={dirtyFields.tradeName}
              {...register('tradeName')}
            />
            <Input
              name="accountUrl"
              type="text"
              label="Account URL"
              leftIcon={<Icon as={FiLink} />}
              error={errors.accountUrl}
              dirty={dirtyFields.accountUrl}
              {...register('accountUrl')}
            />
          </Stack>
        </Stack>
        <Divider my={8} />
        <Stack spacing={4}>
          <Input
            name="email"
            type="email"
            label="E-mail"
            leftIcon={<Icon as={FiUser} />}
            error={errors.email}
            dirty={dirtyFields.email}
            {...register('email')}
          />

          <Input
            name="password"
            type="password"
            label="Password"
            leftIcon={<Icon as={FiLock} />}
            error={errors.password}
            dirty={dirtyFields.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          colorScheme="yellow"
          marginTop="8"
          size="lg"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        >
          Sign up
        </Button>

        <Flex direction="row" align="center" my="4">
          <Divider />
          <Text mx="4">Or</Text>
          <Divider />
        </Flex>

        <Flex justify="center">
          <Button
            variant="link"
            rightIcon={<FiLogIn />}
            colorScheme="red"
            onClick={handleGoToSignIn}
          >
            Go to Sign In
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
