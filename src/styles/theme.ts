import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
  colors: {
    gray: {
      '900': '#181818',
      '800': '#1f1f1f',
      '750': '#242424',
      '700': '#353535',
      '600': '#4b4b4b',
      '500': '#616161',
      '450': '#718096',
      '400': '#A0AEC0',
      '300': '#CBD5E0',
      '250': '#d8d8d8',
      '200': '#e2e2e2',
      '150': '#e8e8e8',
      '100': '#ededed',
      '50': '#eeeeee',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
      '*::-webkit-scrollbar-track': {
        bg: 'gray.900',
      },
      '*::-webkit-scrollbar-thumb': {
        bg: 'gray.700',
        borderRadius: '8',
      },
      '*::-webkit-scrollbar': {
        width: 3,
        height: 3,
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          cursor: 'pointer',
          _disabled: {
            cursor: 'not-allowed',
          },
        },
      },
    },
  },
});
