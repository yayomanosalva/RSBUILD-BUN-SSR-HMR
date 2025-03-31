import { hydrateRoot } from 'react-dom/client';
import App from './root';

// 1. Solución para el non-null assertion y TypeScript
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

// 2. Solución para process.env en JavaScript
const isDev = import.meta.env.MODE === 'development';

// Hydratación inicial
const initialData = window.__INITIAL_DATA__ || {};
hydrateRoot(container, <App {...initialData} />);

// Configuración HMR para desarrollo
if (isDev && import.meta.hot) {
  import.meta.hot.accept('./root', async (newModule) => {
    try {
      const { App: NewApp } = await newModule;
      hydrateRoot(container, <NewApp {...initialData} />);
      console.log('HMR update received');
    } catch (error) {
      console.error('HMR error:', error);
    }
  });

  // 3. Configuración WebSocket mejorada
  const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${wsProtocol}//${window.location.host}`;
  
  const ws = new WebSocket(wsUrl);
  
  ws.addEventListener('open', () => {
    console.log('HMR WebSocket connected');
  });
  
  ws.addEventListener('message', (event) => {
    if (event.data === 'reload') {
      import.meta.hot?.invalidate();
    }
  });
  
  ws.addEventListener('error', (error) => {
    console.error('HMR WebSocket error:', error);
  });
  
  ws.addEventListener('close', () => {
    console.log('HMR WebSocket disconnected');
  });
}