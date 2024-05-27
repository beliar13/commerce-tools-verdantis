export type ProductImages = ProductImage[];

type ProductImage = {
  dimensions: {
    h: number;
    w: number;
  };
  label?: string;
  url: string;
};
