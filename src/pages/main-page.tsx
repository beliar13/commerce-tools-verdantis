import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button } from '@mui/material';

import { MainPromoCodes } from '@/features/main-content/main-promo-codes';

const MainPage: FC<{
  children?: ReactNode;
}> = () => {
  return (
    <>
      <Button component={RouterLink} to="/login">
        login
      </Button>
      <Button component={RouterLink} to="/registration">
        registration
      </Button>
      <MainPromoCodes />
    </>
  );
};

export default MainPage;
