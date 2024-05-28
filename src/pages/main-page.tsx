import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button } from '@mui/material';

import { getCategories } from '@/lib/axios/requests/get-categories';
import { useTokenStore } from '@/stores/token-store';

const MainPage: FC<{
  children?: ReactNode;
}> = () => {
  const { token } = useTokenStore();
  if (!token) {
    throw new Error('Token expected');
  }
  getCategories(0, token).then(
    (categoriesResponse) => console.log(categoriesResponse),
    (err) => {
      console.error(err);
    },
  );

  return (
    <>
      <Button component={RouterLink} to="/login">
        login
      </Button>
      <Button component={RouterLink} to="/registration">
        registration
      </Button>
    </>
  );
};

export default MainPage;
