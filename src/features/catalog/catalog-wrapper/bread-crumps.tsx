import { FC } from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export const BasicBreadcrumbs: FC = () => {
  const path = window.location.pathname;
  const pathArray = path.split('/');
  pathArray.map((path) => {
    return (
      <div key={path} onClick={handleClick} role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="`${path}`" underline="hover">
            {path}
          </Link>
        </Breadcrumbs>
      </div>
    );
  });
  return pathArray;
};
{
  /* <Typography color="text.primary">Plants</Typography> */
}
