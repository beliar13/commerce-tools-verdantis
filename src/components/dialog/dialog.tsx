import { Dispatch, FC, PropsWithChildren, SetStateAction, useState } from 'react';

import { Box, Dialog } from '@mui/material';

import { iconStyles } from '@/pages/product-page.constants';

import { CloseButton } from '../close-button/close-button';

export const useDialog = (): {
  DialogComponent: FC<PropsWithChildren>;
  setOpen: Dispatch<SetStateAction<boolean>>;
} => {
  const [open, setOpen] = useState(false);
  const handleModalClose = (): void => setOpen(false);
  return {
    DialogComponent: ({ children }: PropsWithChildren) => (
      <Dialog maxWidth="lg" onClose={handleModalClose} open={open}>
        <CloseButton callback={handleModalClose} styles={iconStyles} />
        <Box sx={{ padding: '40px' }}>{children}</Box>
      </Dialog>
    ),
    setOpen,
  };
};
