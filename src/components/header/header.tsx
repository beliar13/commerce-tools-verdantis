import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Link, useScrollTrigger } from '@mui/material';
import { Stack } from '@mui/system';

export function Header(): ReactNode {
  return (
    <>
      <AppBar
        sx={{
          alignItems: 'center',
          backgroundColor: useScrollTrigger() ? 'background.paper' : 'primary.main',
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
          width={'100%'}
        >
          <Stack
            alignItems="center"
            borderRadius={20}
            justifyContent="center"
            width={{ lg: '10%', md: '10%', sm: '30%', xs: '40%' }}
          >
            <Link component={RouterLink} to="/">
              {/* <Icon href=logo></Icon> */}
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
