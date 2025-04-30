import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

export function render(url) {
  // Make sure we handle any URL format
  const location = url.startsWith('/') ? url : `/${url}`;

  const html = renderToString(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  );

  return { html };
}