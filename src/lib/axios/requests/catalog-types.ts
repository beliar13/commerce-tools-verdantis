type ProductVariant = { id: string; key?: string };

type CategoryReference = {
  id: string;
  typeId: string;
};

type ProductData = {
  categories: Array<CategoryReference>;
  masterVariant: ProductVariant;
  name: string;
  searchKeywords: string;
  slug: Record<string, string>;
  variants: Array<unknown>;
};

type ProductCatalogData = {
  current: ProductData;
  hasStagedChanges: boolean;
  published: boolean;
  staged: ProductData;
};
type Product = {
  createdAt: string;
  id: string;
  lastModifiedAt: string;
  masterData: ProductCatalogData;
  productType: {
    id: string;
    typeId: string;
  };
  taxCategory: {
    id: string;
    typeId: string;
  };
  version: number;
};
export type ProductsResponse = {
  count: number;
  limit: number;
  offset: number;
  results: Array<Product>;
  total: number;
};

export type ProductsRequestArguments = {
  expand?: unknown;
  limit?: number;
  offset?: number;
  priceCurrency?: string;
  sort?: unknown;
  where?: unknown;
  withTotal?: boolean;
};
