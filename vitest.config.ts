import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        include: ['test/**/*.test.ts'],
        setupFiles: ['./test/vitest.setup.ts'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
});