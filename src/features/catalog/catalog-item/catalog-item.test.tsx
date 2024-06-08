import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockProduct } from '@/test/mocks/mock-product';

import { CatalogItem } from './catalog-item';
describe('CatalogItem', () => {
  it('should render', () => {
    render(<CatalogItem product={mockProduct} />);

    const itemName = screen.getByText(/some product/i);

    expect(itemName).toBeInTheDocument();
  });
});
