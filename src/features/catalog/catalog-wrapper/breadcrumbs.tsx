import { FC, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation, useSearchParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { getCategoryByKey } from '@/lib/axios/requests/catalog/get-category-by-key';
import { useTokenStore } from '@/stores/token-store';

import { notSelectedCategoryValue } from '../constants';
import { formatCategoryKey } from './helper';

const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
  event.preventDefault();
};

export const BasicBreadcrumbs: FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchParamsRef = useRef(setSearchParams);
  const { token } = useTokenStore();
  if (!token) {
    throw new Error('Token expected');
  }

  const pathArray = location.pathname.split('/');
  const lastPath = pathArray[pathArray.length - 1];
  useEffect(() => {
    const setSearchParams = setSearchParamsRef.current;
    const startPathOfCatalog = 'catalog';
    if (lastPath === startPathOfCatalog) {
      setSearchParams({ category: notSelectedCategoryValue });
      return;
    }
    const decodedPath = decodeURIComponent(lastPath);
    const correctKey = formatCategoryKey(decodedPath);
    getCategoryByKey(correctKey, token).then(
      (res) => {
        const indexOfReceivedCategory = 0;
        const { id } = res[indexOfReceivedCategory];
        searchParams.set('category', id);
        setSearchParams(searchParams);
      },

      (err) => console.error(err),
    );
  }, [lastPath, token, searchParams]);
  const crumbs = pathArray.map((path, index) => {
    const currentCategoryPath = index === path.length - 1;
    const pathSegment = pathArray.slice(1, index + 1).join('/');
    const linkForBreadcrumb = `/${pathSegment}${location.search}`;

    return currentCategoryPath ? (
      <Typography color="inherit" component={'h3'} key={path}>
        {path}
      </Typography>
    ) : (
      <div key={path} onClick={handleClick} role="presentation">
        <Link color="inherit" component={RouterLink} key={path} to={linkForBreadcrumb} underline="hover">
          {decodeURIComponent(path)}
        </Link>
      </div>
    );
  });

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      className="m-3"
      sx={{ fontSize: { lg: '22px', md: '22px', sm: '18px', xs: '15px' } }}
    >
      {...crumbs}
    </Breadcrumbs>
  );
};
