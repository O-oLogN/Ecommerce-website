// @ts-ignore
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const aliasPaths = ['assets', 'components', 'config', 'constants',
                            'hooks', 'layout', 'pages', 'routes', 'services', 'tools',
                            'types']

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: Object.fromEntries(
            aliasPaths.map((name) => [name, path.resolve(__dirname, `./src/${name}`)])
        )
    }
})
