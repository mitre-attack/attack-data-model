import { defineConfig } from 'tsup';

export default defineConfig([
  // Browser build
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: {
      resolve: true,
    },
    outDir: 'dist/browser',
    splitting: true,
    sourcemap: true,
    clean: false,
    platform: 'browser',
    external: ['zod'],
    esbuildOptions(options) {
      // Ensure process.env references are stripped for browser
      options.platform = 'browser';
    },
  },
  // Node.js build (ESM)
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: {
      resolve: true,
    },
    outDir: 'dist/node/esm',
    splitting: true,
    sourcemap: true,
    clean: false,
    platform: 'node',
    external: ['zod'],
  },
  // Node.js build (CJS)
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    dts: {
      resolve: true,
    },
    outDir: 'dist/node/cjs',
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: 'node',
    external: ['zod'],
  },
]);
