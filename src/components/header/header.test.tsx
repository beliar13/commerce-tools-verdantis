import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { userEvent as userAction } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Header } from '.';

describe('Header', () => {
  it('should contain menu and register and login buttons', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const menu = screen.getByRole('button', { name: /menu/i });
    await userAction.click(menu);
    await screen.findByText(/login/i);

    const loginLink = screen.getByText(/login/i);
    const registrationLink = screen.getByText(/registration/i);

    expect(loginLink).toBeInTheDocument();
    expect(registrationLink).toBeInTheDocument();
  });
});
