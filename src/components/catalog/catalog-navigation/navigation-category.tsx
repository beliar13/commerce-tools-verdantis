import { useSearchParams } from 'react-router-dom';

import { Button } from '@mui/material';

import type { CategoryData } from './catalog-navigation';

export const NavigationCategory = ({ category }: { category: CategoryData }): JSX.Element => {
  const { id, name } = category;
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const handleClick = (): void => {
    setSearchParams({ category: id });
  };
  return <Button onClick={handleClick}>{name}</Button>;
};
