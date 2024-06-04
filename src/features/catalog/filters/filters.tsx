import { FC, useState } from 'react';

import { Stack } from '@mui/material';

import { ApplyFilters } from './apply-filters';
import { ColorFilters } from './color-filters';
import { ResetFilters } from './reset-filters';
import { SizeSelect } from './size-select';

export type ColorFilter = {
  blue: boolean;
  green: boolean;
  pink: boolean;
  white: boolean;
  yellow: boolean;
};

export type FilterValues = { color: ColorFilter; size: string };

export const Filters: FC = () => {
  const [filtersValues, setFiltersValues] = useState<FilterValues>({
    color: { blue: false, green: false, pink: false, white: false, yellow: false },
    size: '',
  });
  const setterForSize = (value: string): void => {
    setFiltersValues({ ...filtersValues, size: value });
  };
  const setterForColor = (value: ColorFilter): void => {
    setFiltersValues({ ...filtersValues, color: value });
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
      <ApplyFilters values={filtersValues} />
      <ResetFilters />
    </Stack>
  );
};
