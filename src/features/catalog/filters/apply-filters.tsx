import { FC } from 'react';
// import { useSearchParams } from 'react-router-dom';

import { Button } from '@mui/material';

import { FilterValues } from './filters';

export const ApplyFilters: FC<{ values: FilterValues }> = ({ values }) => {
  // const [searchParams, setSearchParams] = useSearchParams();

  // parse values, set to url

  const onClick = (): void => {
    // searchParams.set('size', '');
    console.log(values);
    // setSearchParams(searchParams);
  };
  return <Button onClick={onClick}>Apply filters</Button>;
};
