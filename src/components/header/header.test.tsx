import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Header } from '.';

describe('Header', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const mainLink = screen.getByRole('link');

    expect(mainLink).toBeInTheDocument();
  });
});
