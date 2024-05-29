import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link } from '@mui/material';

export const BackToMain: FC = () => {
  return (
    <Link className="mx-auto block p-2 text-center" component={RouterLink} sx={{ maxWidth: 'auto' }} to="/">
      <Button>Back to main</Button>
    </Link>
  );
};
