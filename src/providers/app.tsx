import type { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes/router';

export const AppProvider = (): JSX.Element => {
  return <RouterProvider router={router} />;
};
