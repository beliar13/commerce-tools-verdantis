import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link, Typography } from '@mui/material';

export const UserProfilePage: FC = () => {
  return (
    <div id="error-page">
      <Typography
        component={'h1'}
        sx={{ fontSize: { lg: 50, md: 42, sm: 38 } }}
        textAlign={'center'}
      >
        User Profile
      </Typography>
      <Link className="mx-auto block p-2 text-center" component={RouterLink} to="/">
        <Button>Back to main</Button>
      </Link>
    </div>
  );
};
