import { FC } from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export const BasicBreadcrumbs: FC = () => {
  return (
    <div onClick={handleClick} role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" underline="hover">
          some category
        </Link>
        <Typography color="text.primary">Plants</Typography>
      </Breadcrumbs>
    </div>
  );
};
