import type { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes/router';

import { ReactQueryProvider } from './react-query';
import { ThemeProvider } from './theme';

export const AppProvider = (): JSX.Element => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReactQueryProvider>
  );
};
