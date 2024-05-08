import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link } from '@mui/material';

export default function MainPage(): ReactNode {
  return (
    <>
      <Link component={RouterLink} to="/login">
        <Button>{'login'}</Button>
      </Link>
      <Link component={RouterLink} to="/registration">
        <Button>{'registration'}</Button>
      </Link>
    </>
  );
}
