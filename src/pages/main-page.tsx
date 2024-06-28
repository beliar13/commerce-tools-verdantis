import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Stack, Typography } from '@mui/material';

import { PromoCodesWrapper } from '@/features/main-content/promo-codes-wrapper';

const joinButtonStyles = {
  transition: '2s',
  width: { lg: '30%', md: '40%', sm: '55%', xs: '75%' },
};

const MainPage: FC = () => {
  return (
    <Stack className="flex-col items-center justify-center p-3">
      <PromoCodesWrapper />
      <Stack
        className="flex-col items-center justify-center gap-1 p-4"
        sx={{ backgroundColor: 'secondary.main', width: '100%' }}
      >
        <Typography className="text-center" sx={{ fontSize: '2em' }}>
          Would like to join us?
        </Typography>
        <Button component={RouterLink} sx={joinButtonStyles} to="/login" variant="outlined">
          login
        </Button>
        <Button component={RouterLink} sx={joinButtonStyles} to="/registration" variant="outlined">
          registration
        </Button>
      </Stack>
    </Stack>
  );
};

export default MainPage;
