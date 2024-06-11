import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockProduct, mockSetterForCartRef } from '@/test/mocks/cart-item-mocks';

import { CartItem } from './cart-item';

describe('CartItem', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <CartItem lineItemId="test-id" product={mockProduct} quantity={1} setterForCartRef={mockSetterForCartRef} />
      </MemoryRouter>,
    );

    const productName = screen.getByText('test-name');
    const productQuantity = screen.getByText('1');

    expect(productName).toBeInTheDocument();
    expect(productQuantity).toBeInTheDocument();
  });
});
