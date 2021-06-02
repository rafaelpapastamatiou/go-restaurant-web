/* eslint-disable react/no-children-prop */
import React, { forwardRef, ForwardRefRenderFunction } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

import { FieldError } from 'react-hook-form';

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
  isLoading?: boolean;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
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
    isLoading,
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

      <ChakraSelect
        id={name}
        name={name}
        focusBorderColor="red.500"
        backgroundColor={inputBackgroundColor}
        color={inputTextColor}
        variant="filled"
        size="lg"
        _hover={{ backgroundColor: inputBackgroundColor }}
        ref={ref}
        icon={isLoading ? <Spinner /> : <FiChevronDown />}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
