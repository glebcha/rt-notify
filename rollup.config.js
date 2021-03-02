import fs from 'fs';
import glob from 'glob';
import ts from '@wessberg/rollup-plugin-ts';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss-modules';
import nodeResolve from '@rollup/plugin-node-resolve';
import externals from 'rollup-plugin-node-externals';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from "rollup-plugin-size-snapshot";

const globals = {
  react: 'React',
  clsx: 'clsx',
  'react-dom': 'ReactDOM',
  'ramda/src/equals': 'equals', 
  'ramda/src/findIndex': 'findIndex',
  'react-transition-group': 'reactTransitionGroup',
};

/* initialize CSS files because of a catch-22 situation:
   https://github.com/rollup/rollup/issues/1404 */
glob.sync('src/**/*.css').forEach(css => {  // Use forEach because https://github.com/rollup/rollup/issues/1873
	const definition = `${css}.d.ts`;
	if (!fs.existsSync(definition))
		fs.writeFileSync(definition, 'const mod: { [cls: string]: string }\nexport default mod\n');
});

export default {
  input: './src/index.ts',
  output: [
    {
      name: 'rtNotify',
      file: 'build/index.umd.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    {
      file: 'build/index.esm.js',
      format: 'es',
      sourcemap: true,
    }
  ],
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    externals({
      deps: true,
      exclude: [
        'clsx', 
        'ramda',
        'react-transition-group',
      ],      
    }),
    nodeResolve({
      browser: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    postcss({
      // writeDefinitions: true,
      extract: true,
      minimize: true,
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    }),
    ts({
      browserslist: false,
      tsconfig: "tsconfig.json",
      exclude: ['node_modules/**']
    }),
    commonjs({
      ignoreGlobal: false,
      sourceMap: false,
      include: '**/node_modules/**',
    }),
    sizeSnapshot(),
    terser(),
  ],
};
