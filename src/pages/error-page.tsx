import { ReactNode } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { Button, Link, Typography } from '@mui/material';

export default function ErrorPage(): ReactNode {
  const error = useRouteError();
  if (!isRouteErrorResponse(error)) {
    throw new Error('Invalid error');
  }

  return (
    <div id="error-page">
      <Typography
        component={'h1'}
        sx={{ fontSize: { lg: 50, md: 42, sm: 38 } }}
        textAlign={'center'}
      >
        Oops!
      </Typography>
      <Typography component={'h1'} sx={{ fontSize: { lg: 30, sm: 20 } }} textAlign={'center'}>
        Sorry, an unexpected error has occurred.
      </Typography>

      <Typography
        component={'h1'}
        sx={{ fontSize: { lg: 50, md: 42, sm: 38 } }}
        textAlign={'center'}
      >
        <i>{error.status === 404 && `404 - Page ${window.location.pathname} was not found`}</i>
      </Typography>
      <Link href="main">
        <Button>Back to main</Button>
      </Link>
    </div>
  );
}
