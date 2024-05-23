import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Icon, Link, useScrollTrigger } from '@mui/material';
import { Stack } from '@mui/system';

import logo from '@/assets/img/Verdantis-small.png';

import { Navigation } from './navigation';

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
