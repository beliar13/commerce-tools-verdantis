import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Button, Icon, Link, useScrollTrigger } from '@mui/material';
import { Stack } from '@mui/system';

import logo from '@/assets/img/Verdantis.png';

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
        <Stack
          alignItems="center"
          borderRadius={20}
          justifyContent="center"
          width={{ lg: '20%', md: '20%', sm: '30%', xs: '40%' }}
        >
          <Link component={RouterLink} to="/main">
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
  return (
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
