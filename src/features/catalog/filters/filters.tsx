import { FC } from 'react';

import { FiltersWrapper } from './filters-wrapper';
import { SizeSelect } from './size-select';

export const Filters: FC = () => {
  return <FiltersWrapper>{<SizeSelect />}</FiltersWrapper>;
};
