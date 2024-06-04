import { ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { Box, Container, Dialog, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { BackTo } from '@/components/back-to/back-to';
import { LoadingBackdrop } from '@/components/backdrop/backdrop';
import { CloseButton } from '@/components/close-button/close-button';
import { CustomTypography } from '@/components/custom-typography/custom-typography';
import { PricesBlock } from '@/components/prices-block/prices-block';
import { getProductById } from '@/lib/axios/requests/get-product-by-id';
import { useTokenStore } from '@/stores/token-store';

import {
  boxStyles,
  descStyles,
  firstPrice,
  iconStyles,
  imgStyles,
  sliderSettingsDefaultImage,
  sliderSettingsEnlargedImage,
  titleStyles,
} from './product-page.constants';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductPage(): ReactNode {
  const { token } = useTokenStore();
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [curImgIdx, setCurImgIdx] = useState(0);
  const handleImageClick = (index: number): void => {
    setCurImgIdx(index);
    setOpen(true);
  };
  const handleModalClose = (): void => setOpen(false);
  if (!id) {
    throw new Error('No product ID');
  }
  const { data, isPending } = useQuery({
    queryFn: () => getProductById(id, token),
    queryKey: ['product', id, token],
    throwOnError: true,
  });

  if (isPending) {
    return <LoadingBackdrop open={isPending} />;
  }

  return (
    <Container>
      <Container maxWidth="md">
        <Paper elevation={24} sx={{ marginTop: 4, padding: 5 }}>
          <CustomTypography styles={titleStyles} tag="h1" text={data?.name} variantField="h4" />
          <Slider {...sliderSettingsDefaultImage}>
            {data?.images.map((image, index) => (
              <Box key={index} onClick={() => handleImageClick(index)} sx={boxStyles}>
                <img alt={`${data.name}${index + 1}`} src={image.url} style={imgStyles} />
              </Box>
            ))}
          </Slider>
          <CustomTypography styles={descStyles} tag="p" text={data?.description} variantField="body1" />
          <Box>
            <PricesBlock price={data?.prices[firstPrice]} />
          </Box>
        </Paper>
        <Dialog maxWidth="lg" onClose={handleModalClose} open={open}>
          <CloseButton callback={handleModalClose} styles={iconStyles} />
          <Box sx={{ padding: '40px' }}>
            <Slider {...sliderSettingsEnlargedImage} afterChange={(i) => setCurImgIdx(i)} initialSlide={curImgIdx}>
              {data?.images.map((image, index) => (
                <Box key={index}>
                  <img alt={`big${index}`} src={image.url} style={imgStyles} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Dialog>
      </Container>
      <BackTo dest="catalog" path="/catalog" />
    </Container>
  );
}
