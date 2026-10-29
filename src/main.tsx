import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Build version: 2026-10-28 cache bust — forces fresh bundle hashes
const BUILD_VERSION = '2026-10-28-cache-bust';
if (typeof window !== 'undefined') {
  (window as any).__BUILD_VERSION = BUILD_VERSION;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);

