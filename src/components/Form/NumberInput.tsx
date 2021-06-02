/* eslint-disable react/no-children-prop */
import { forwardRef, ForwardRefRenderFunction } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputFieldProps as ChakraNumberInputFieldProps,
  NumberInputStepper,
  useColorModeValue,
} from '@chakra-ui/react';

import { FieldError } from 'react-hook-form';

interface NumberInputProps extends ChakraNumberInputFieldProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const NumberInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  NumberInputProps
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

      <ChakraNumberInput
        size="lg"
        focusBorderColor="red.500"
        variant="filled"
        min={0}
        precision={2}
        step={0.1}
        clampValueOnBlur={false}
      >
        <NumberInputField
          backgroundColor={inputBackgroundColor}
          _hover={{ backgroundColor: inputBackgroundColor }}
          color={inputTextColor}
          ref={ref}
          id={name}
          name={name}
          {...rest}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const NumberInput = forwardRef(NumberInputBase);
