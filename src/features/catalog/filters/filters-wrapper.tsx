import { FC, ReactNode } from 'react';

import { Stack } from '@mui/material';

export const FiltersWrapper: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return <Stack className="flex ">{children}</Stack>;
};
