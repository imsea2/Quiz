import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';      // ← 확장자까지 .jsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
