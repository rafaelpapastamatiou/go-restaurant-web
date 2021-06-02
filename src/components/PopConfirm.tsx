import React, { ReactElement, ReactNode } from 'react';
import {
  Portal,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Text,
  PopoverFooter,
  Flex,
  Button,
  PopoverTrigger,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiCheck, FiX } from 'react-icons/fi';

interface PopConfirmProps {
  onConfirm: () => Promise<any> | any;
  onCancel: () => Promise<any> | any;
  title?: string;
  message?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  children: ReactNode;
}

export function PopConfirm({
  onConfirm,
  onCancel,
  title,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  message,
  children,
}: PopConfirmProps): ReactElement {
  const titleTextColor = useColorModeValue('gray.500', 'gray.250');
  const messageTextColor = useColorModeValue('gray.700', 'gray.50');

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent rootProps={{ style: { top: 0 } }}>
          <PopoverArrow />
          {title && (
            <PopoverHeader color={titleTextColor}>{title}</PopoverHeader>
          )}
          <PopoverCloseButton />
          {message && (
            <PopoverBody>
              <Text color={messageTextColor}>{message}</Text>
            </PopoverBody>
          )}
          <PopoverFooter>
            <Flex direction="row" align="center">
              <Button
                variant="ghost"
                colorScheme="yellow"
                onClick={onCancel}
                leftIcon={<FiX fontSize="20" />}
              >
                {cancelButtonText}
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={onConfirm}
                ml="4"
                leftIcon={<FiCheck fontSize="20" />}
                verticalAlign="center"
              >
                {confirmButtonText}
              </Button>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
