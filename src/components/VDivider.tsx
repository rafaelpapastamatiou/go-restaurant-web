import React from 'react';

import { Box, Divider, DividerProps } from '@chakra-ui/react';

interface VDividerProps extends DividerProps {
  height?: number;
}

export default function VDivider({
  height = 16,
  ...rest
}: VDividerProps): JSX.Element {
  return (
    <Box height={height} mx="4">
      <Divider orientation="vertical" {...rest} />
    </Box>
  );
}
