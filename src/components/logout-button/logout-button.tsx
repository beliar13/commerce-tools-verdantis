import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { logoutUser } from '@/lib/axios/requests/logout-user';

export const LogoutButton = (): JSX.Element => {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // clear local storage
      navigate('/');
    },
  });
  const handleLogout = (): void => {
    logoutMutation.mutate();
  };
  return (
    <Button onClick={handleLogout} variant="contained">
      Logout
    </Button>
  );
};
