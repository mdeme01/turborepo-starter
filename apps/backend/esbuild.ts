import { build } from 'esbuild'
import glob from 'tiny-glob'

const buildApp = async () => {
    const entryPoints = await glob('src/**/*.ts')

    await build({
        entryPoints,
        outdir: 'dist',
        platform: 'node',
        bundle: true,
    })
}

buildApp()
