import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { useTokenStore } from '@/stores/token-store';

export const LogoutButton: FC<React.PropsWithChildren> = () => {
  const navigate = useNavigate();
  const { resetStore, type } = useTokenStore();
  const handleLogout = (): void => {
    void resetStore();
    navigate('/');
  };
  if (!type || type === 'anonymous') {
    return null;
  }
  return (
    <Button onClick={handleLogout} variant="contained">
      Logout
    </Button>
  );
};
