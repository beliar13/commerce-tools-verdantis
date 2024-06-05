import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@mui/material';

export const ResetFilters: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onClick = (): void => {
    searchParams.set('size', '');
    searchParams.set('color', '');
    searchParams.set('sort', '');

    setSearchParams(searchParams);
  };
  return <Button onClick={onClick}>Reset filters</Button>;
};
