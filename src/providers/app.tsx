import type { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes/router';

import { ThemeProvider } from './theme';

export const AppProvider = (): JSX.Element => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
