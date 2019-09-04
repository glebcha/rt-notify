import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

const externalRegExp = /^(?:[./\\]|(?:[a-zA-Z]:)).*$/

export default {
  input: './src/index.js',
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
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/*',
    }),
  ],
}
