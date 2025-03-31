import { renderToPipeableStream } from 'react-dom/server';
import { createElement } from 'react';
import App from './root';
import { resolveRoute } from './lib/router';
import { setServer, handleHMR } from './lib/hmr';

const isDev = process.env.NODE_ENV === 'development';

// Implementación completa de WritableStream para Bun
class BunWritableStream implements UnderlyingSink<Uint8Array> {
  private controller?: WritableStreamDefaultController;
  private chunks: Uint8Array[] = [];
  private resolve?: () => void;
  private reject?: (reason?: any) => void;

  stream = new ReadableStream({
    start: (controller) => {
      // Consumimos los chunks acumulados
      this.chunks.forEach(chunk => controller.enqueue(chunk));
      this.chunks = [];
    }
  });

  write(chunk: Uint8Array) {
    if (this.controller) {
      this.controller.enqueue(chunk);
    } else {
      this.chunks.push(chunk);
    }
  }

  close() {
    this.controller?.close();
    this.resolve?.();
  }

  abort(reason?: any) {
    this.controller?.error(reason);
    this.reject?.(reason);
  }

  // Implementación de UnderlyingSink
  start(controller: WritableStreamDefaultController) {
    this.controller = controller;
    return Promise.resolve();
  }

  write(chunk: Uint8Array, controller: WritableStreamDefaultController) {
    this.controller = controller;
    this.write(chunk);
    return Promise.resolve();
  }

  close() {
    this.close();
    return Promise.resolve();
  }

  abort(reason?: any) {
    this.abort(reason);
    return Promise.resolve();
  }
}

const server = Bun.serve({
  port: 3000,
  development: isDev,
  websocket: {
    message(ws, message) {
      if (isDev && message === 'hot-reload') {
        ws.send('reload');
      }
    },
    open(ws) {
      if (isDev) {
        ws.subscribe('hmr');
      }
    }
  },
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Manejar HMR en desarrollo
    if (isDev && pathname.startsWith('/hmr')) {
      return handleHMR(request);
    }

    // Servir archivos estáticos
    // if (pathname.startsWith('/static/')) {
    //   const file = Bun.file(`./dist/client/${pathname.slice(8)}`);
    //   return new Response(file);
    // }

    // Servir archivos estáticos
    if (pathname.startsWith('/static/')) {
      const filePath = join(process.cwd(), 'dist', pathname);
      return new Response(Bun.file(filePath));
    }

    // Servir HMR client
    // if (pathname === '/hmr.js')) {
    //   return new Response(`
    //     import { createHotContext } from "/@vite/client";
    //     import.meta.hot = createHotContext("/hmr");
    //   `, {
    //     headers: { 'Content-Type': 'application/javascript' },
    //   });
    // }

    // Resolver la ruta
    const { component } = await resolveRoute(pathname);

    // Crear el árbol React
    const app = createElement(App, {
      path: pathname,
      component
    } as React.ComponentProps<typeof App>);

    // Crear nuestro stream compatible
    const writable = new BunWritableStream();
    const { pipe } = renderToPipeableStream(app, {
      bootstrapModules: ['/static/entry-client.js'],
      onShellReady() {
        pipe(writable as unknown as NodeJS.WritableStream);
      },
      onShellError(error) {
        console.error('Error during shell rendering:', error);
        writable.abort(error);
      }
    });

    return new Response(writable.stream, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
});

// Configurar HMR en desarrollo
if (isDev) {
  setServer(server);
  console.log('Server running in development mode with HMR');
} else {
  console.log(`Server running at http://localhost:${server.port}`);
}