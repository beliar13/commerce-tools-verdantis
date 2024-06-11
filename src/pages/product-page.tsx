import { ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { Box, Container, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { AddProductButton } from '@/components/add-product-button/add-product-button';
import { BackTo } from '@/components/back-to/back-to';
import { LoadingBackdrop } from '@/components/backdrop/backdrop';
import { CustomTypography } from '@/components/custom-typography/custom-typography';
import { useDialog } from '@/components/dialog';
import { PricesBlock } from '@/components/prices-block/prices-block';
import { getProductById } from '@/lib/axios/requests/get-product-by-id';
import { updateCart } from '@/lib/axios/requests/update-cart/update-request';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

import {
  boxStyles,
  descStyles,
  discountPriceStyle,
  firstPrice,
  imgStyles,
  sliderSettingsDefaultImage,
  sliderSettingsEnlargedImage,
  stylePrice,
  titleStyles,
} from './product-page.constants';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function ProductPage(): ReactNode {
  const { token } = useTokenStore();
  const { id } = useParams<{ id: string }>();
  const { cart, setCart } = useCartStore();
  const [curImgIdx, setCurImgIdx] = useState(0);
  const { DialogComponent, setOpen } = useDialog();
  const handleImageClick = (index: number): void => {
    setCurImgIdx(index);
    setOpen(true);
  };
  if (!id) {
    throw new Error('No product ID');
  }
  const { data, isPending } = useQuery({
    queryFn: () => getProductById(id, token),
    queryKey: ['product', id, token],
    throwOnError: true,
  });

  const handleAddProduct = async (): Promise<void> => {
    if (!cart || !token) {
      throw new Error('Missing data to add product');
    }
    const response = await updateCart(cart.id, cart.version, [{ action: 'addLineItem', productId: id }], token);
    setCart(response);
  };

  const isDisabled = Boolean(cart?.lineItems.some((item) => item.productId === id));

  return isPending ? (
    <LoadingBackdrop open={isPending} />
  ) : (
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
            <PricesBlock price={data?.prices[firstPrice]} styleDiscount={discountPriceStyle} stylePrice={stylePrice} />
          </Box>
          <AddProductButton isDisabled={isDisabled} onclick={() => void handleAddProduct()} />
        </Paper>
        <DialogComponent>
          <Slider {...sliderSettingsEnlargedImage} afterChange={(i) => setCurImgIdx(i)} initialSlide={curImgIdx}>
            {data?.images.map((image, index) => (
              <Box key={index}>
                <img alt={`big${index}`} src={image.url} style={imgStyles} />
              </Box>
            ))}
          </Slider>
        </DialogComponent>
      </Container>
      <BackTo dest="catalog" path="/catalog" />
    </Container>
  );
}
