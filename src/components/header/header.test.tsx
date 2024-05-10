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

    const loginLink = screen.getByText('login');
    const registrationLink = screen.getByText('registration');

    expect(loginLink).toBeInTheDocument();
    expect(registrationLink).toBeInTheDocument();
  });
});
