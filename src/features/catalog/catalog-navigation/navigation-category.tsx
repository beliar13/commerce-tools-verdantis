import { useSearchParams } from 'react-router-dom';

import { List, ListItemButton } from '@mui/material';

import type { CategoryData } from './catalog-navigation';

export const NavigationCategory = ({ category }: { category: CategoryData }): JSX.Element => {
  const { children, id, name } = category;
  const [_, setSearchParams] = useSearchParams();
  console.log(_);
  const handleClick = (e: unknown, categoryId: string): void => {
    setSearchParams({ category: categoryId });
  };

  return (
    <List
      aria-labelledby="nested-list-subheader"
      component="nav"
      onClick={(e) => handleClick(e, id)}
      subheader={
        <ListItemButton
          onClick={(e) => handleClick(e, id)}
          sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
        >
          {name}
        </ListItemButton>
      }
      sx={{ bgcolor: 'primary.main', width: '100%' }}
    >
      {children.map((childCategory) => {
        const { id, key, name } = childCategory;
        const enName = name['en-US'];
        return (
          <ListItemButton
            key={key}
            onClick={(e) => handleClick(e, id)}
            sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
          >
            {enName}
          </ListItemButton>
        );
      })}
    </List>
  );
};
