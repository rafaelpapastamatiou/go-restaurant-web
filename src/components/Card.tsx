import React, { ReactNode } from 'react';

import {
  Box,
  Divider,
  Spinner,
  Heading,
  SkeletonText,
  SkeletonTextProps,
  Flex,
  FlexProps,
  useColorModeValue,
} from '@chakra-ui/react';

interface CardProps extends FlexProps {
  cardTitle?: 'string' | ReactNode;
  children: ReactNode;
  titleSize?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  skeleton?: SkeletonTextProps;
  isRefreshing?: boolean;
  extra?: ReactNode;
  loadingIndicator?: 'spinner' | 'skeleton';
  fixChartBottomPadding?: boolean;
}

const defaultSkeleton: SkeletonTextProps = {
  noOfLines: 6,
  spacing: '5',
};

export function Card({
  cardTitle,
  children,
  titleSize = 'md',
  isLoading = false,
  isRefreshing = false,
  skeleton = defaultSkeleton,
  extra,
  loadingIndicator = 'spinner',
  fixChartBottomPadding = false,
  ...rest
}: CardProps): JSX.Element {
  const cardBackgroundColor = useColorModeValue('gray.100', 'gray.800');
  const dividerColor = useColorModeValue('gray.200', 'gray.900');
  const titleColor = useColorModeValue('gray.600', 'gray.50');
  const skeletonStartColor = useColorModeValue('gray.200', 'gray.500');
  const skeletonEndColor = useColorModeValue('gray.400', 'gray.700');

  return (
    <Flex
      bg={cardBackgroundColor}
      borderRadius="8"
      direction="column"
      flex="1"
      boxShadow="md"
      {...rest}
    >
      {cardTitle && (
        <>
          <Flex
            direction="row"
            align="center"
            px={['4', '6']}
            py={['2', '4']}
            h={65}
          >
            <Heading size={titleSize} fontWeight="normal" color={titleColor}>
              {cardTitle}
              {isRefreshing && <Spinner size="sm" color="pink.500" ml="4" />}
            </Heading>
            {extra && (
              <Flex ml="auto" align="center" h={65}>
                {extra}
              </Flex>
            )}
          </Flex>
          <Divider borderColor={dividerColor} borderBottomWidth={3} />
        </>
      )}
      <Flex
        flex="1"
        direction="column"
        justify="center"
        p={['6', '8']}
        {...(fixChartBottomPadding
          ? {
              pb: ['4', '6'],
            }
          : {})}
      >
        {isLoading ? (
          loadingIndicator === 'spinner' ? (
            <Flex justify="center" align="center" flex="1">
              <Spinner size="xl" color="pink.500" />
            </Flex>
          ) : (
            <Box>
              <SkeletonText
                noOfLines={skeleton.noOfLines}
                startColor={skeleton.startColor || skeletonStartColor}
                endColor={skeleton.endColor || skeletonEndColor}
                spacing={skeleton.spacing}
              />
            </Box>
          )
        ) : (
          children
        )}
      </Flex>
    </Flex>
  );
}
