import { FC, MouseEvent } from 'react';

import { Button, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getProductById } from '@/lib/axios/requests/get-product-by-id';
import { useTokenStore } from '@/stores/token-store';

export const MainPromoCodes: FC = () => {
  const { token } = useTokenStore();

  const { data: bouquet } = useQuery({
    queryFn: () => getProductById('85e1f1ea-d573-4c2a-881e-21529403f62d', token),
    queryKey: ['product', '85e1f1ea-d573-4c2a-881e-21529403f62d', token],
    throwOnError: true,
  });
  const { data: forEverything } = useQuery({
    queryFn: () => getProductById('2848d327-31bf-4ce0-86d7-a5259d464e5a', token),
    queryKey: ['product', '2848d327-31bf-4ce0-86d7-a5259d464e5a', token],
    throwOnError: true,
  });
  async function writeClipboardText(event: MouseEvent): Promise<void> {
    const eventTarget = event?.target;
    if (!eventTarget || !(eventTarget instanceof HTMLButtonElement)) {
      throw new Error('Target expected');
    }
    const value = eventTarget.value;
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  }
  return (
    <>
      <Typography className="text-center" component="h2" variant="h3">
        Promo codes
      </Typography>

      <Stack className="flex flex-row flex-wrap gap-4 p-5">
        <Stack className="al flex w-96 flex-col items-center gap-2 ">
          <Typography className="text-center" component="h3" variant="h4">
            BLOOMING20
          </Typography>

          <Typography className="text-center" component="h4" variant="h6">
            - 20% discount on bouquets
          </Typography>
          <Button onClick={(e) => void writeClipboardText(e)} value="BLOOMING20" variant="contained">
            Copy code
          </Button>
          <img alt={'bouquet'} className={'align-self-start w-3/4 '} src={bouquet?.images[1].url} />
        </Stack>
        <Stack className="flex w-96 flex-col items-center gap-2">
          <Typography className="text-center" component="h3" variant="h4">
            PLANTJOY10
          </Typography>
          <Typography className="text-center" component="h4" variant="h6">
            - 10% discount for everyone and everything
          </Typography>
          <Button onClick={(e) => void writeClipboardText(e)} value="PLANTJOY10" variant="contained">
            Copy code
          </Button>
          <img alt={'everything'} className={'align-self-start w-3/4 '} src={forEverything?.images[2].url} />
        </Stack>
      </Stack>
    </>
  );
};
