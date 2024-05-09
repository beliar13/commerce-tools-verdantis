import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Icon, Link, useScrollTrigger } from '@mui/material';
import { Stack } from '@mui/system';

import logo from '@/assets/img/Verdantis.png';

export function Header(): ReactNode {
  return (
    <>
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

          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            width={{ lg: '30%', md: '35%', sm: '50%', xl: '25%', xs: '65%' }}
          ></Stack>
        </Stack>
      </AppBar>
    </>
  );
}
