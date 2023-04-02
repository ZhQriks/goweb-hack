import { MantineThemeOverride, Tuple, DefaultMantineColor } from '@mantine/core';

type ExtendColors = 'primaryGreen' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendColors, Tuple<string, 10>>;
  }
}

const primaryGreen: Tuple<string, 10> = [
  '#f0fdf4',
  '#dcfce7',
  '#bbf7d0',
  '#86efac',
  '#4ade80',
  '#22c55e',
  '#00ac4f',
  '#15803d',
  '#166534',
  '#14532d',
];

// https://github.com/mantinedev/mantine/blob/master/src/mantine-styles/src/theme/default-theme.ts

export const mantineTheme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    primaryGreen,
  },
  primaryColor: 'primaryGreen',

  other: {
    fontWeights: {
      medium: 500,
      semibold: 600,
    },
  },

  fontFamily: 'Roboto, sans-serif',
  fontFamilyMonospace: 'Roboto, sans-serif',
  headings: { fontFamily: 'Roboto, sans-serif', fontWeight: 600 },
};
