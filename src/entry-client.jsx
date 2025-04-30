import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

function renderApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  hydrateRoot(
    rootElement,
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

renderApp();