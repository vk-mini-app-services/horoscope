import { MantineThemeOverride } from '@mantine/core';
import { themeColors } from '../utils/constants/colors';

export const theme: MantineThemeOverride = {
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 400,
    sizes: {
      h1: {
        fontSize: '32px',
        fontWeight: 600,
        lineHeight: '17px'
      },
      h2: {
        fontSize: '24px',
        fontWeight: 600,
        lineHeight: '24px'
      },
      h3: {
        fontSize: '19px',
        fontWeight: 500,
        lineHeight: '19px'
      },
      h4: {
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '16px'
      },
      h5: {
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: '13px'
      },
      h6: {
        fontSize: '11px',
        fontWeight: 400,
        lineHeight: '11px'
      }
    }
  },
  spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
  colors: themeColors
};
