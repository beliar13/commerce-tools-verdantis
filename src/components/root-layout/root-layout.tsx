import type { JSX } from 'react';

import { Box } from '@mui/material';

import { Header } from '../header';
import { PageContent } from '../page-content';

export const RootLayout = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '90vh',
      }}
    >
      <Header />
      <PageContent />
    </Box>
  );
};
