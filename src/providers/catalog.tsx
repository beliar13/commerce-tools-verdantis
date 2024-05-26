import { type FC, type PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { getAllProducts } from '@/lib/axios/requests/get-products';
import { useTokenStore } from '@/stores/token-store';

export const CatalogProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token, type } = useTokenStore();
  const location = window.location.pathname;
  useEffect(() => {
    if (token && type === 'anonymous' && location === '/catalog') {
      getAllProducts(1, token).then(
        (result) => {
          console.log('request result:', result);
        },
        (err) => {
          console.log(err);
        },
      );
    }
  });
  return children;
};
