import type { PropsWithChildren, ReactNode } from 'react';

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import { theme } from '@/config/theme';

export const ThemeProvider = ({ children }: PropsWithChildren): ReactNode => {
  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};
