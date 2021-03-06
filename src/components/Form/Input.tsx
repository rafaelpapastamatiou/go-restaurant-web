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
  useColorModeValue,
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
  const inputBackgroundColor = useColorModeValue('gray.250', 'gray.900');
  const inputTextColor = useColorModeValue('gray.800', 'gray.100');

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
          backgroundColor={inputBackgroundColor}
          color={inputTextColor}
          variant="filled"
          size="lg"
          _hover={{ backgroundColor: inputBackgroundColor }}
          ref={ref}
          {...rest}
        />
        {rightIcon && (
          <InputRightElement
            pointerEvents="none"
            color={!dirty ? 'gray.500' : 'red.500'}
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
