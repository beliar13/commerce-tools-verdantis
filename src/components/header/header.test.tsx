import { MemoryRouter } from 'react-router-dom';

import { useScrollTrigger } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';

import { Header } from '.';

vi.mock('@mui/material', async (importOriginal): Promise<unknown> => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useScrollTrigger: vi.fn(),
  };
});

describe('Header', () => {
  it('should contain logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByAltText(/logo/i)).toBeTruthy();
  });
  it('should render green color for header when useScrollTrigger is true', () => {
    (useScrollTrigger as unknown as Mock).mockReturnValue(true);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const footer = screen.getByTestId('header');
    expect(getComputedStyle(footer).backgroundColor).toBe('rgb(0, 128, 0)');
  });
  it('should render grey color for header when useScrollTrigger is false', () => {
    (useScrollTrigger as unknown as Mock).mockReturnValue(false);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const footer = screen.getByTestId('header');
    expect(getComputedStyle(footer).backgroundColor).toBe('rgb(128, 128, 128)');
  });
});
