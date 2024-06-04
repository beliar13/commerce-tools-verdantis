import { Price } from '@/lib/axios/requests/get-product-by-id.types';

export type PriceBlockProps = {
  price?: Price;
  styleDiscount?: Record<number | string, string>;
  stylePrice?: string;
};
