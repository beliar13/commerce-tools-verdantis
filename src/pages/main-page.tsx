import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button } from '@mui/material';

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
    </>
  );
};

export default MainPage;
