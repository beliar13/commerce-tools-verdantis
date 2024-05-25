import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Backdrop, CircularProgress } from '@mui/material';

import { getAllProducts } from '@/lib/axios/requests/get-products';
import { useTokenStore } from '@/stores/token-store';

export const AuthProtectedRoute: FC<PropsWithChildren<{ isForLoggedIn: boolean }>> = ({
  children,
  isForLoggedIn,
}) => {
  const { token, type } = useTokenStore();
  const navigate = useNavigate();
  const isLoggedIn = type === 'password';

  useEffect(() => {
    if (isLoggedIn !== isForLoggedIn) {
      navigate('/');
    }
  }, [isForLoggedIn, isLoggedIn, navigate]);

  useEffect(() => {
    if (token && type === 'anonymous') {
      getAllProducts(1, token).then(
        (result) => {
          console.log('request result:', result);
        },
        (err) => {
          console.log(err);
        },
      );
    }
  });
  if (type === null || type === 'password') {
    return (
      <Backdrop className="bg-transparent" open>
        <CircularProgress />
      </Backdrop>
    );
  }

  return children;
};
