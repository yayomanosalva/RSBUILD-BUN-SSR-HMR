import type { Server } from 'bun';

let server: Server | null = null;

export function setServer(s: Server) {
  server = s;
}

export async function handleHMR(request: Request): Promise<Response> {
  if (!server) return new Response('HMR not initialized', { status: 500 });

  const url = new URL(request.url);
  const pathname = url.pathname;

  // Aquí puedes agregar lógica específica de HMR
  // Por ejemplo, recargar módulos cuando cambian
  if (pathname === '/hmr/ping') {
    return new Response('pong');
  }

  if (url.pathname === '/hmr/reload') {
    server.publish('hmr', 'reload');
    return new Response('OK');
  }

  return new Response('Not found', { status: 404 });
}