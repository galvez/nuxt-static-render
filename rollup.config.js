import path from 'path'
import { readJSONSync } from 'fs-extra'
import commonjsPlugin from 'rollup-plugin-commonjs'
import autoExternalPlugin from 'rollup-plugin-auto-external'
import copyPlugin from 'rollup-plugin-copy'

const rootDir = process.cwd()
const input = 'src/index.js'
const pkg = readJSONSync(path.resolve(rootDir, 'package.json'))

export default {
  input: path.resolve(rootDir, input),
  output: {
    dir: path.resolve(rootDir, 'dist'),
    entryFileNames: `${pkg.name}.js`,
    chunkFileNames: `${pkg.name}-[name].js`,
    format: 'cjs',
    preferConst: true
  },
  plugins: [
    autoExternalPlugin(),
    commonjsPlugin(),
    copyPlugin({
      targets: [
        { src: 'src/component.js', dest: 'dist' },
        { src: 'src/middleware.js', dest: 'dist' },
        { src: 'src/plugin.js', dest: 'dist' }
      ]
    })
  ]
}