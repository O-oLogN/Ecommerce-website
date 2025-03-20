import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import * as path from 'path'

const aliasPaths = ['assets', 'components', 'config', 'constants',
    'hooks', 'layout', 'pages', 'routes', 'services', 'tools',
    'types', 'utils']

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env.VITE_PORT': JSON.stringify(process.env.VITE_PORT),
        'process.env.VITE_BASE_DOMAIN': JSON.stringify(process.env.VITE_BASE_DOMAIN),
    },
    server: {
        port: 5173,
        strictPort: true,
        watch: {
            usePolling: true,
        },
        allowedHosts: [
            "48dmukhyc0o8.share.zrok.io",
        ],
    },
    resolve: {
        alias: Object.fromEntries(
            aliasPaths.map((name) => [name, path.resolve(__dirname, `./src/${name}`)])
        )
    },
});
