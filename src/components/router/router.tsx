import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '@/pages/error-page';
import MainPage from '@/pages/main-page';

export const routes = [
  {
    element: <MainPage />,
    errorElement: <ErrorPage />,
    path: '/',
  },
];
export const router = createBrowserRouter(routes);
