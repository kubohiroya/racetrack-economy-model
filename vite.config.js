import { fileURLToPath, URL } from 'node:url'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default {
    base: './',
    build: {
        outDir: './docs'
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    plugins: [
        wasm(),
        topLevelAwait()
    ]
}