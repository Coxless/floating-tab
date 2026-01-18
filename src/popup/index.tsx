import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// This file is used for the popup.html entry point (action popup)
// For content script injection, see content.ts which handles Shadow DOM
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App onClose={() => window.close()} />
    </StrictMode>
  );
}
