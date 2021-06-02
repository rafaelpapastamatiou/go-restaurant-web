/* eslint-disable react/no-children-prop */
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
} from '@chakra-ui/react';

import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  dirty?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    label,
    error = null,
    leftIcon,
    rightIcon,
    dirty,
    margin,
    m,
    my,
    mx,
    marginY,
    marginX,
    mt,
    marginTop,
    mr,
    marginRight,
    mb,
    marginBottom,
    ml,
    marginLeft,
    padding,
    p,
    py,
    px,
    paddingY,
    paddingX,
    pt,
    paddingTop,
    pr,
    paddingRight,
    pb,
    paddingBottom,
    pl,
    paddingLeft,
    ...rest
  },
  ref,
): JSX.Element => {
  return (
    <FormControl
      isInvalid={!!error}
      {...{
        margin,
        m,
        my,
        mx,
        marginY,
        marginX,
        mt,
        marginTop,
        mr,
        marginRight,
        mb,
        marginBottom,
        ml,
        marginLeft,
        padding,
        p,
        py,
        px,
        paddingY,
        paddingX,
        pt,
        paddingTop,
        pr,
        paddingRight,
        pb,
        paddingBottom,
        pl,
        paddingLeft,
      }}
    >
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <InputGroup alignItems="center">
        {leftIcon && (
          <InputLeftElement
            pointerEvents="none"
            color={!dirty ? 'gray.500' : 'red.500'}
            _focus={{
              color: 'red.900',
            }}
            children={leftIcon}
            top="auto"
            fontSize="xl"
            pl="1"
          />
        )}
        <ChakraInput
          id={name}
          name={name}
          focusBorderColor="red.500"
          backgroundColor="gray.900"
          variant="filled"
          size="lg"
          _hover={{ backgroundColor: 'gray.900' }}
          ref={ref}
          {...rest}
        />
        {rightIcon && (
          <InputRightElement
            pointerEvents="none"
            color={!dirty ? 'gray.500' : 'red.500'}
            _focus={{
              color: 'red.900',
            }}
            children={rightIcon}
            top="auto"
            pr="1"
          />
        )}
      </InputGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
