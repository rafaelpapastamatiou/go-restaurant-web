import { ElementType } from 'react';
import { Link as ChakraLink, Icon, Text, LinkProps } from '@chakra-ui/react';
import { ActiveLink } from '../ActiveLink';

interface NavLinkProps extends LinkProps {
  icon?: ElementType;
  href: string;
  children: string;
  shouldMatchExactHref?: boolean;
}

export function NavLink({
  icon,
  children,
  href,
  shouldMatchExactHref = false,
  ...rest
}: NavLinkProps): JSX.Element {
  return (
    <ActiveLink
      href={href}
      passHref
      shouldMatchExactHref={shouldMatchExactHref}
    >
      <ChakraLink display="flex" align="center" {...rest}>
        {!!icon && <Icon as={icon} fontSize="20" mr="4" />}
        <Text fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}
