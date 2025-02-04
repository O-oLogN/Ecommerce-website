import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import * as path from 'path'

const aliasPaths = ['assets', 'components', 'config', 'constants',
    'hooks', 'layout', 'pages', 'routes', 'services', 'tools',
    'types']

export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
    },
    resolve: {
        alias: Object.fromEntries(
            aliasPaths.map((name) => [name, path.resolve(__dirname, `./src/${name}`)])
        )
    },
    define: {
        'process.env': {}
    }
});
