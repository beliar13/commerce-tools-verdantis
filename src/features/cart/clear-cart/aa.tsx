import { FC, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';

export interface ConfirmationDialogRawProps {
  keepMounted: boolean;
  onClose: (value?: string) => void;
  open: boolean;
}

const ConfirmationDialogRaw: FC<ConfirmationDialogRawProps> = (props: ConfirmationDialogRawProps) => {
  const { onClose, open, ...other } = props;

  const handleCancel = (): void => {
    onClose();
  };

  const handleOk = (): void => {
    onClose();
  };

  return (
    <Dialog maxWidth="xs" open={open} sx={{ '& .MuiDialog-paper': { maxHeight: 435, width: '80%' } }} {...other}>
      <DialogTitle>Confirm clear</DialogTitle>
      <DialogContent dividers>Are you sure, that you want to clear cart?</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>Yes, clear</Button>
      </DialogActions>
    </Dialog>
  );
};

export const ConfirmationDialog: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', maxWidth: 360, width: '100%' }}>
      <List component="div" role="group">
        <ConfirmationDialogRaw keepMounted onClose={handleClose} open={open} />
      </List>
    </Box>
  );
};
