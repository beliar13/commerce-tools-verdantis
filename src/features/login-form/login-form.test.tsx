import { FC, PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LoginForm } from './login-form';

const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe('login form component', () => {
  it('renders form without errors', () => {
    expect(() =>
      render(
        <ReactQueryProvider>
          <LoginForm />
        </ReactQueryProvider>,
      ),
    ).not.toThrow();
  });
});
