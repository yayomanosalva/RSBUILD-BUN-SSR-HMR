import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import '@/styles/globals.css';

const queryClient = new QueryClient();

export default function App({ children }: { children?: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="es">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>React SSR Frontend</title>
        </head>
        <body className="min-h-screen bg-gray-50">
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}