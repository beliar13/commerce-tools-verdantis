import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link, Typography } from '@mui/material';

import { RegistrationForm } from '@/components/registration-form/';

const RegistrationPage: FC<{
  children?: ReactNode;
}> = () => {
  return (
    <div id="registration-page">
      <Typography
        component={'h1'}
        sx={{ fontSize: { lg: 50, md: 42, sm: 38 } }}
        textAlign={'center'}
      >
        Registration
      </Typography>
      <RegistrationForm />
      <Link component={RouterLink} to="/main">
        <Button>Back to main</Button>
      </Link>
    </div>
  );
};

export default RegistrationPage;
