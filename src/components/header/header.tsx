import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Button, Icon, Link, useScrollTrigger } from '@mui/material';
import { Stack } from '@mui/system';

import logo from '@/assets/img/Verdantis-small.png';
import { useTokenStore } from '@/stores/token-store';

import { LogoutButton } from '../logout-button/logout-button';

export const Header: FC<{
  children?: ReactNode;
}> = () => {
  return (
    <AppBar
      sx={{
        alignItems: 'center',
        backgroundColor: useScrollTrigger() ? 'green' : 'grey',
        justifyContent: 'center',
        minHeight: '5vh',
        padding: 1,
        position: 'sticky',
        top: 0,
      }}
    >
      <Stack
        direction="row"
        justifyContent={'space-between'}
        padding={{ lg: '0 10%', md: '0 7%', sm: '0 4%', xs: '0 2%' }}
      >
        <Stack alignItems="center" borderRadius={20} justifyContent="center" width={'100%'}>
          <Link component={RouterLink} to="/">
            <Icon component={'img'} src={logo} />
          </Link>
        </Stack>
        <Navigation />
      </Stack>
    </AppBar>
  );
};

const Navigation: FC<{
  children?: ReactNode;
}> = () => {
  const { type } = useTokenStore();
  const isLoggedIn = type === 'password';
  return isLoggedIn ? (
    <LogoutButton />
  ) : (
    <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
      <Button component={RouterLink} to="/login">
        login
      </Button>
      <Button component={RouterLink} to="/registration">
        registration
      </Button>
    </Stack>
  );
};
