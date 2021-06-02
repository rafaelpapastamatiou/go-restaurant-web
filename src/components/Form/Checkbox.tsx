/* eslint-disable react/no-children-prop */
import { forwardRef, ForwardRefRenderFunction } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
  useColorModeValue,
} from '@chakra-ui/react';

import { FieldError } from 'react-hook-form';

interface CheckboxProps extends ChakraCheckboxProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const CheckboxBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = (
  {
    name,
    label,
    error = null,
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

      <ChakraCheckbox
        id={name}
        name={name}
        focusBorderColor="red.500"
        colorScheme="red"
        backgroundColor={inputBackgroundColor}
        color={inputTextColor}
        variant="filled"
        size="lg"
        _hover={{ backgroundColor: inputBackgroundColor }}
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Checkbox = forwardRef(CheckboxBase);
