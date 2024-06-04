import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@mui/material';

import { FilterValues } from './filters';
import { formatFilters } from './format-filters';

export const ApplyFilters: FC<{ values: FilterValues }> = ({ values }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = (): void => {
    const filters = formatFilters(values);
    searchParams.set('color', filters.color);
    searchParams.set('size', filters.size);
    setSearchParams(searchParams);
  };
  return <Button onClick={onClick}>Apply filters</Button>;
};
