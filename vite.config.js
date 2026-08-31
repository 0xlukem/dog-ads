import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const local404Path = fileURLToPath(new URL('./public/404.html', import.meta.url))

function local404Preview() {
  return {
    name: 'local-404-preview',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = request.url?.split('?')[0]
        if (pathname !== '/404' && pathname !== '/404/') return next()
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.end(readFileSync(local404Path, 'utf8'))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), local404Preview()],
})
