import { FC, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useTokenStore } from '@/stores/token-store';

const sectionsLabels = ['about', 'catalog', 'cart', 'profile'];
const buttonsLabels = ['registration', 'login'];

export const Navigation: FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  return matches ? (
    <Stack direction={'row'}>
      <Sections />
      <ManagedNavigationButtons />
    </Stack>
  ) : (
    <BurgerMenu />
  );
};

const Sections: FC = () => {
  return (
    <Stack direction={'row'}>
      {sectionsLabels.map((label) => (
        <Button component={RouterLink} key={label} to={label}>
          {label}
        </Button>
      ))}
    </Stack>
  );
};

const RegisterLoginButtons: FC = () => {
  return (
    <Stack direction={'row'}>
      {buttonsLabels.map((label) => (
        <Button component={RouterLink} key={label} to={label}>
          {label}
        </Button>
      ))}
    </Stack>
  );
};

const LogoutButton: FC = () => {
  const navigate = useNavigate();
  const { resetStore } = useTokenStore();
  const handleLogout = (): void => {
    void resetStore();
    navigate('/');
  };
  return (
    <Button onClick={handleLogout} variant="contained">
      Logout
    </Button>
  );
};

const ManagedNavigationButtons: FC = () => {
  const { type } = useTokenStore();
  const isLoggedIn = type === 'password';
  return isLoggedIn ? <LogoutButton /> : <RegisterLoginButtons />;
};

const BurgerMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Menu</Button>
      <Drawer anchor="right" onClose={toggleDrawer(false)} open={open}>
        <Box onClick={toggleDrawer(false)} role="presentation" sx={{ width: 250 }}>
          <List>
            {sectionsLabels.map((text) => (
              <ListItem disablePadding key={text}>
                <ListItemButton component={RouterLink} to={text}>
                  <ListItemText primary={text.toUpperCase()} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <ManagedList />
        </Box>
      </Drawer>
    </div>
  );
};

const ManagedList: FC = () => {
  const navigate = useNavigate();
  const { resetStore, type } = useTokenStore();
  const isLoggedIn = type === 'password';
  const handleLogout = (): void => {
    void resetStore();
    navigate('/');
  };
  return isLoggedIn ? (
    <List>
      <ListItem disablePadding key={'LOGOUT'}>
        <ListItemButton onClick={handleLogout}>
          <ListItemText primary={'LOGOUT'} />
        </ListItemButton>
      </ListItem>
    </List>
  ) : (
    <List>
      {buttonsLabels.map((text) => (
        <ListItem disablePadding key={text}>
          <ListItemButton component={RouterLink} to={text}>
            <ListItemText primary={text.toUpperCase()} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
