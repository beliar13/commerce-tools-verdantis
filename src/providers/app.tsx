import type { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes/router';

import { ReactQueryProvider } from './react-query';
import { ThemeProvider } from './theme';
import { TokenStoreProvider } from './token-store';

export const AppProvider = (): JSX.Element => {
  return (
    <TokenStoreProvider>
      <ReactQueryProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ReactQueryProvider>
    </TokenStoreProvider>
  );
};
