import { RootLayout } from '@/components/root-layout/';
import ErrorPage from '@/pages/error-page';
import LoginPage from '@/pages/login-page';
import MainPage from '@/pages/main-page';
import RegistrationPage from '@/pages/registration-page';

export const routes = [
  {
    children: [
      {
        element: <MainPage />,
        path: '/main',
      },
      {
        element: <LoginPage />,
        path: '/login',
      },
      {
        element: <RegistrationPage />,
        path: '/registration',
      },
    ],
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    path: '/',
  },
];
