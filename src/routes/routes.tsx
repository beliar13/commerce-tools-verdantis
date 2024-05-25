import { ErrorBoundary } from 'react-error-boundary';

import { RootLayout } from '@/components/root-layout/';
import { AuthProtectedRoute } from '@/components/route/auth-protected-route';
import CatalogPage from '@/pages/catalog-page';
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
        element: (
          <AuthProtectedRoute isForLoggedIn={false}>
            <LoginPage />
          </AuthProtectedRoute>
        ),
        path: '/login',
      },
      {
        element: (
          <AuthProtectedRoute isForLoggedIn={false}>
            <RegistrationPage />
          </AuthProtectedRoute>
        ),
        path: '/registration',
      },
      {
        element: <CatalogPage />,
        path: '/catalog',
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
