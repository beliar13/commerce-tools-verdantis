import { ErrorBoundary } from 'react-error-boundary';

import { RootLayout } from '@/components/root-layout/';
import ErrorPage from '@/pages/error-page';
import LoginPage from '@/pages/login-page';
import MainPage from '@/pages/main-page';
import NotFoundPage from '@/pages/not-found-page';
import RegistrationPage from '@/pages/registration-page';
export const routes = [
  {
    children: [
      {
        element: <MainPage />,
        index: true,
      },
      {
        element: <LoginPage />,
        path: '/login',
      },
      {
        element: <RegistrationPage />,
        path: '/registration',
      },
      { element: <NotFoundPage />, path: '*' },
    ],
    element: (
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <RootLayout />
      </ErrorBoundary>
    ),
    path: '/',
  },
];
