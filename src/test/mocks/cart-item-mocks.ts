import { vi } from 'vitest';

const mockSetterFn = vi.fn();

export const mockSetterForCartRef = {
  current: mockSetterFn,
};

export const mockProduct = {
  description: 'test-description',
  images: [
    {
      dimensions: {
        h: 1400,
        w: 1400,
      },
      url: 'https://commercetools.com/cli/data/253245821_1.jpg',
    },
  ],
  name: 'test-name',
};
