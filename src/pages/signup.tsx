import { useCallback } from 'react';
import {
  Flex,
  Button,
  Stack,
  Icon,
  useToast,
  HStack,
  Divider,
  Text,
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
    <Flex width="100vw" height="100vh" align="center" justify="center">
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
      >
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

          <HStack spacing={4}>
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
          </HStack>
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
          colorScheme="pink"
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

        <Flex flex={1} justify="center">
          <Button
            variant="link"
            rightIcon={<FiLogIn />}
            colorScheme="pink"
            onClick={handleGoToSignIn}
          >
            Go to Sign In
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
