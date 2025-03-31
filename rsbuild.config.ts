import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer';

export default defineConfig({
  plugins: [pluginReact(), pluginCssMinimizer()],
  // html: {
  //   template: './src/index.html',
  // },
  server: {
    // La propiedad 'ssr' no existe en Rsbuild, se maneja diferente
    // En su lugar, usamos environments para configuraciones separadas
    hmr: true,
  },
  output: {
    // 'targets' no es una propiedad válida, usamos 'target' o configuramos por environment
    cssModules: {
      namedExport: true,
    },
    minify: {
      jsOptions: {
        exclude: /foo\/bar/,
      },
    },
    distPath: {
      root: 'dist',
      js: 'static/js',
      css: 'static/css',
    },
  },
  tools: {
    bundlerChain(chain, { target }) {
      chain.target(target === 'node' ? 'node' : 'web');
    },
    swc: {
      jsc: {
        experimental: {
          plugins: [
            ['@swc/plugin-styled-components', {}],
            ['@swc/plugin-emotion', {}],
          ],
        },
      },
    },
  },
  source: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  },
  environments: {
    // Configuración para el cliente (CSR)
    client: {
      output: {
        target: 'web',
      },
      source: {
        entry: {
          index: './src/index.tsx', // Punto de entrada del cliente
        },
      },
    },
    // Configuración para el servidor (SSR)
    server: {
      output: {
        target: 'node',
      },
      source: {
        entry: {
          server: './src/server.ts', // Punto de entrada del servidor
        },
      },
    },
  },
});