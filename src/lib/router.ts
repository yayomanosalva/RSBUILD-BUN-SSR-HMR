import { createElement } from 'react';
import path from 'path';
import { glob } from 'glob';

const pagesDir = path.join(process.cwd(), 'src/app');

export async function resolveRoute(requestPath: string) {
  const cleanPath = requestPath.replace(/^\/|\/$/g, '') || '/';
  const pagePath = cleanPath === '/' ? 'page' : `${cleanPath}/page`;
  
  try {
    // Intentar importar la ruta directamente (con HMR)
    const module = await import(`@/app/${pagePath}.tsx`);
    return { component: createElement(module.default) };
  } catch (error) {
    // Fallback a 404
    const notFound = await import('@/app/not-found/page');
    return { component: createElement(notFound.default) };
  }
}