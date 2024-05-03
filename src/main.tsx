import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import type { ReactNode } from 'react';

export function App(): ReactNode {
  return <h1 className="bg-black text-center text-red-400">Final task - Verdantis</h1>;
}
