import fs from 'fs'
import glob from 'glob'
import ts from '@wessberg/rollup-plugin-ts'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss-modules'
import nodeResolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

/* initialize CSS files because of a catch-22 situation:
   https://github.com/rollup/rollup/issues/1404 */
glob.sync('src/**/*.css').forEach(css => {  // Use forEach because https://github.com/rollup/rollup/issues/1873
	const definition = `${css}.d.ts`
	if (!fs.existsSync(definition))
		fs.writeFileSync(definition, 'const mod: { [cls: string]: string }\nexport default mod\n')
})

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
  external: (id) => !externalRegExp.test(id),
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    postcss({
			// writeDefinitions: true,
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    }),
    ts({
      transpiler: 'babel',
    }),
    commonjs(),
    terser(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}
