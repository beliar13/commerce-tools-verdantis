import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link, Typography } from '@mui/material';

export default function RegistrationPage(): ReactNode {
  return (
    <div id="error-page">
      <Typography
        component={'h1'}
        sx={{ fontSize: { lg: 50, md: 42, sm: 38 } }}
        textAlign={'center'}
      >
        Registration
      </Typography>

      <Link component={RouterLink} to="/">
        <Button>Back to main</Button>
      </Link>
    </div>
  );
}
