import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Header } from '.';

describe('Header', () => {
  it('should contain logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByAltText(/logo/i)).toBeTruthy();
  });
});
