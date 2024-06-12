export type TotalPriceProps = {
  totalPrice?: TotalPrice;
};

type TotalPrice = {
  centAmount: number;
  currencyCode: string;
  fractionDigits: number;
  type: string;
};
