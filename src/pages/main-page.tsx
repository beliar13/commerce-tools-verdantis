import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, List, ListItem, ListItemText } from '@mui/material';

const MainPage: FC<{
  children?: ReactNode;
}> = () => {
  return (
    <>
      <Button component={RouterLink} to="/login">
        login
      </Button>
      <Button component={RouterLink} to="/registration">
        registration
      </Button>
      <List className="flex flex-col">
        <ListItem>
          <ListItemText>BLOOMING20 - 20% discount on bouquets</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>PLANTJOY10 - 10% discount for everyone and everything</ListItemText>
        </ListItem>
      </List>
    </>
  );
};

export default MainPage;
