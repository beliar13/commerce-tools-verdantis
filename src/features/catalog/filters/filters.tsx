import { FC, useState } from 'react';

import { Stack } from '@mui/material';

import { ApplyFilters } from './apply-filters';
import { ColorFilters } from './color-filters';
import { ResetFilters } from './reset-filters';
import { SizeSelect } from './size-select';
import { SortBySelect } from './sort-by-select';

export type ColorFilter = Record<string, boolean>;

export type FilterValues = { color: ColorFilter; size: string; sort: string };

export const Filters: FC = () => {
  const [filtersValues, setFiltersValues] = useState<FilterValues>({
    color: { blue: false, green: false, pink: false, white: false, yellow: false },
    size: '',
    sort: '',
  });

  const setterForSize = (value: string): void => {
    setFiltersValues({ ...filtersValues, size: value });
  };

  const setterForSort = (value: string): void => {
    setFiltersValues({ ...filtersValues, sort: value });
  };

  const setterForColor = (value: ColorFilter): void => {
    setFiltersValues((prevValues) => ({
      ...prevValues,
      color: {
        ...value,
      },
    }));
  };

  return (
    <Stack
      className="flex "
      sx={{
        backgroundColor: 'primary.light',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: 'row',
        padding: '2%',
      }}
    >
      <SizeSelect setter={setterForSize} />
      <ColorFilters setter={setterForColor} />
      <SortBySelect setter={setterForSort} />
      <ApplyFilters values={filtersValues} />
      <ResetFilters />
    </Stack>
  );
};
