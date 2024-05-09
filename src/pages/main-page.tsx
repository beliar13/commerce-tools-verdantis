import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button } from '@mui/material';

export default function MainPage(): ReactNode {
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
}
