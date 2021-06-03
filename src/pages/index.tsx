import { useCallback, useEffect, useState } from 'react';
import { Flex, useBreakpointValue } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import { Logo } from '../components/Header/Logo';

export default function SignIn(): JSX.Element {
  const router = useRouter();
  const [session] = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      router.push('/users');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [router, session]);

  const logoSize = useBreakpointValue({
    base: 56,
    xs: 56,
    sm: 64,
    md: 72,
    lg: 80,
    xl: 88,
  });

  const handleGoToSignIn = useCallback(() => {
    router.push('/signin');
  }, [router]);

  return (
    <Flex width="100vw" height="100vh" align="center" justify="center">
      <Logo
        transition="all .2s ease-in-out"
        fontSize={logoSize}
        _hover={{
          cursor: 'pointer',
          transform: 'scale(1.1)',
        }}
        onClick={handleGoToSignIn}
      />
    </Flex>
  );
}
