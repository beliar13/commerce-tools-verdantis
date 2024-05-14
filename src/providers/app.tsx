import type { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { router } from '@/routes/router';

import { ReactQueryProvider } from './react-query';
import { ThemeProvider } from './theme';

export const AppProvider = (): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReactQueryProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ReactQueryProvider>
    </LocalizationProvider>
  );
};
