import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button } from '@mui/material';

import { useTokenStore } from '@/stores/token-store';

const MainPage: FC<{
  children?: ReactNode;
}> = () => {
  const { token } = useTokenStore();
  if (!token) {
    throw new Error('no token in store');
  }

  return (
    <>
      <Button component={RouterLink} to="/login">
        login
      </Button>
      <Button component={RouterLink} to="/registration">
        registration
      </Button>
    </>
  );
};

export default MainPage;
