import { cloneElement, ReactElement, useEffect, useState } from 'react';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { useColorModeValue } from '@chakra-ui/color-mode';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps): JSX.Element {
  const { asPath } = useRouter();

  const [isActive, setIsActive] = useState(false);

  const inactiveLinkColor = useColorModeValue('gray.600', 'gray.50');
  const activeLinkColor = useColorModeValue('red.500', 'red.500');

  useEffect(() => {
    if (shouldMatchExactHref) {
      setIsActive(asPath === rest.href || asPath === rest.as);
    } else {
      setIsActive(
        asPath.startsWith(rest.href.toString()) || asPath === rest.as,
      );
    }
  }, [asPath, rest.as, rest.href, shouldMatchExactHref]);

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? activeLinkColor : inactiveLinkColor,
      })}
    </Link>
  );
}
