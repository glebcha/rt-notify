import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import ts from '@wessberg/rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'

const externalRegExp = /^(?:[./\\]|(?:[a-zA-Z]:)).*$/

export default {
  input: './src/index.tsx',
  output: [
    {
      file: 'build/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'build/index.esm.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  external: id => !externalRegExp.test(id),
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    ts({
      transpiler: 'babel'
    }),
    terser(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}
