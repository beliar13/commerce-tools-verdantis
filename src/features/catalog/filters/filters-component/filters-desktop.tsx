import { FC } from 'react';

import { Stack, Typography } from '@mui/material';

import { ApplyFilters } from '../apply-filters';
import { ColorFilters } from '../color-filters';
import { ColorFilter, FilterValues } from '../filters';
import { ResetFilters } from '../reset-filters';
import { SizeSelect } from '../size-select';
import { SortBySelect } from '../sort';

export const FiltersDesktop: FC<{
  setters: {
    setterForColor: (value: ColorFilter) => void;
    setterForSize: (value: string) => void;
    setterForSort: (value: string) => void;
  };
  values: FilterValues;
}> = ({ setters, values }) => {
  const { setterForColor, setterForSize, setterForSort } = setters;
  return (
    <Stack className="flex-column items-center gap-2 p-2">
      <Typography className="mx-5 my-auto text-center" color="background.paper" component="h4" variant="h5">
        Filters
      </Typography>
      <Stack
        className="gap-2"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack className="flex-row justify-between">
          <SizeSelect setter={setterForSize} />
          <ColorFilters setter={setterForColor} />
          <SortBySelect setter={setterForSort} />
        </Stack>

        <Stack className="gap-2">
          <ApplyFilters values={values} />
          <ResetFilters />
        </Stack>
      </Stack>
    </Stack>
  );
};
