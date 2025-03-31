import React from 'react'
import {Helmet} from "react-helmet"
import { config } from '@/config';
import type { Env } from '@/config';
import { QueryProvider } from '@/core/hooks/useQueryClient';
import { Theme } from "@radix-ui/themes";

// Variables de configuración
const apiUrl: Env['NEXT_PUBLIC_API_URL'] = config.NEXT_PUBLIC_API_URL;
const isDevelopment = config.NEXT_PUBLIC_ENV === 'development';

const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const inter = Inter({ subsets: ['latin'] })

interface ImportMeta {
  readonly env: {
    MODE: string;
  };
  hot?: {
    accept: (module: string, callback: (newModule: any) => void) => void;
    invalidate: () => void;
  };
}

declare const __INITIAL_DATA__: any;

export const metadata: Metadata = {
  title: 'Mi App con Bun',
  description: 'Aplicación con React SSR y Bun',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Helmet>
      <body className={`${inter.className} antialiased`}>
        <React.StrictMode>
          <QueryProvider>
            <Theme appearance="light" accentColor="indigo">
              {isDevelopment && (
              <div className="p-2 text-sm bg-yellow-100 border-4 border-dashed border-fuchsia-900 text-rose-600">
                API URL: {apiUrl}
              </div>

              )}
              {children}
            </Theme>
          </QueryProvider>
        </React.StrictMode>
      </body>
    </html>
  )
}