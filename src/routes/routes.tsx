import ErrorPage from '@/pages/error-page';
import LoginPage from '@/pages/login-page';
import MainPage from '@/pages/main-page';
export const routes = [
  {
    element: <MainPage />,
    errorElement: <ErrorPage />,
    path: '/',
  },
  {
    element: <LoginPage />,
    path: '/login',
  },
];
