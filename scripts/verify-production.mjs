import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const distDir = join(projectRoot, 'dist')
const sourceFile = join(projectRoot, 'src', 'main.jsx')

const errors = []

function walk(directory) {
  if (!existsSync(directory)) return []
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  })
}

if (!existsSync(join(distDir, 'index.html'))) {
  errors.push('No se encontró dist/index.html. Ejecutá npm run build antes de verificar.')
} else {
  const outputFiles = walk(distDir)
  const forbidden = outputFiles.filter((path) => /\.(blend1?|glb)$/i.test(path))

  if (forbidden.length > 0) {
    errors.push(`El build incluye assets no públicos: ${forbidden.map((path) => relative(distDir, path)).join(', ')}`)
  }

  const outputText = outputFiles
    .filter((path) => /\.(html|css|js)$/i.test(path))
    .map((path) => readFileSync(path, 'utf8'))
    .join('\n')

  const hashLinks = [...outputText.matchAll(/(?:href|to)\s*[:=]\s*["']#([\w-]+)["']/g)].map((match) => match[1])
  const ids = new Set([...outputText.matchAll(/\bid\s*[:=]\s*["']([\w-]+)["']/g)].map((match) => match[1]))
  for (const target of new Set(hashLinks)) {
    if (!ids.has(target)) errors.push(`El enlace interno #${target} no tiene un destino con id correspondiente.`)
  }

  if (existsSync(sourceFile)) {
    const source = readFileSync(sourceFile, 'utf8')
    const referencedAssets = [...source.matchAll(/(?:src|poster|useGLTF\.preload\()\s*[:=(]\s*["']\/assets\/([^"']+)["']/g)]
      .map((match) => match[1])
    for (const asset of new Set(referencedAssets)) {
      if (!existsSync(join(distDir, 'assets', asset))) {
        errors.push(`Falta en dist el asset referenciado por la app: /assets/${asset}`)
      }
    }
  }
}

if (errors.length > 0) {
  console.error('Verificación de producción fallida:')
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log('Verificación de producción OK: build presente, assets esenciales disponibles y sin fuentes Blender/GLB públicos.')
}
