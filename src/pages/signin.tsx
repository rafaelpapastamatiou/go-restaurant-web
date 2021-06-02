import { useCallback, useEffect, useState } from 'react';
import { signIn } from 'next-auth/client';
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
import { FiLink, FiLock, FiLogIn, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import { Input } from '../components/Form/Input';
import { Logo } from '../components/Header/Logo';

type SignInFormData = {
  email: string;
  password: string;
  accountUrl: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatóŕia'),
  accountUrl: yup.string().required('Url da conta é obrigatória'),
});

export default function SignIn(): JSX.Element {
  const router = useRouter();
  const toast = useToast();
  const [session] = useSession();

  const [signInError, setSignInError] = useState('');

  const isMobile = useBreakpointValue({
    base: true,
    xs: true,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  });

  console.log(isMobile);

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [router, session]);

  useEffect(() => {
    if (router.query.error) {
      setSignInError(router.query.error as string);
    }
  }, [router.query.email, router.query.error]);

  useEffect(() => {
    if (signInError) {
      toast({
        title: 'Invalid credentials.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      router.replace('/signin', undefined, { shallow: true });

      setSignInError(undefined);
    }
  }, [router, signInError, toast]);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { isSubmitting, errors, dirtyFields } = formState;

  const handleSignin = useCallback<SubmitHandler<SignInFormData>>(
    async ({ email, password, accountUrl }) => {
      await signIn('credentials', {
        email,
        password,
        accountUrl,
        callbackUrl: 'http://localhost:3000/dashboard',
      });
    },
    [],
  );

  const handleGoToSignUp = useCallback(() => {
    router.push('/signup');
  }, [router]);

  return (
    <Flex width="100vw" height="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={420}
        bg="gray.800"
        padding="8"
        borderRadius={8}
        direction="column"
        onSubmit={handleSubmit(handleSignin)}
        shadow="sm"
        {...(isMobile
          ? {
              height: '100%',
              maxWidth: 'auto',
              justify: 'center',
              borderRadius: 0,
            }
          : {})}
      >
        <Flex justify="center" mb="8">
          <Logo fontSize="42" />
        </Flex>
        <Input
          name="accountUrl"
          type="text"
          label="Account URL"
          leftIcon={<Icon as={FiLink} />}
          error={errors.accountUrl}
          dirty={dirtyFields.accountUrl}
          {...register('accountUrl')}
        />

        <Divider my="4" />

        <Stack spacing={2}>
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
          colorScheme="red"
          marginTop="8"
          size="lg"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          rightIcon={<Icon as={FiLogIn} fontSize={20} />}
        >
          Sign in
        </Button>

        <Flex direction="row" align="center" my="4">
          <Divider />
          <Text mx="4">Or</Text>
          <Divider />
        </Flex>

        <Button variant="link" colorScheme="yellow" onClick={handleGoToSignUp}>
          Create a new account
        </Button>
      </Flex>
    </Flex>
  );
}
