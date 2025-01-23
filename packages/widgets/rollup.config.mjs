import commonjs from '@rollup/plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import regexReplace from 'rollup-plugin-re';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';

import pkg from './package.json' assert { type: 'json' };

const libraryName = 'builder-widgets';

const resolvePlugin = resolve();

const SERVE = process.env.SERVE === 'true';

const externalDependencies = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.optionalDependencies || {}))
  .concat(Object.keys(pkg.peerDependencies || {}))
  .filter(name => !name.startsWith('lodash'));

  const globals = { 
    react: 'React',
    'react-dom': 'ReactDOM',
  }
  
  const options = {
  input: `src/${libraryName}.ts`,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  watch: {
    include: 'src/**',
  },
  external: ['vm2', 'react', 'react-dom'],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      // TODO: remove me!
      check: false,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      exclude: ['node_modules/vm2/**'],
     
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolvePlugin,

    // Resolve source maps to the original source
    // sourceMaps(),
  ],
};

export default [
  {
    ...options,
    output: {
      format: 'umd',
      file: 'dist/builder-widgets.umd.js',
      name: 'BuilderWidgets',
      sourcemap: true,
      globals,
      amd: {
        id: '@builder6/widgets',
      },
    },
  },
  {
    ...options,
    output: [
      { file: pkg.module, format: 'es', sourcemap: true },
      { file: pkg.main, format: 'cjs', sourcemap: true },
    ],
    // Do not resolve for es module build
    // TODO: should really do a cjs build too (probably for the default build instead of umd...)
    external: externalDependencies,
    plugins: options.plugins
      .filter(plugin => plugin !== resolvePlugin)
      .concat([
        resolve({
          only: [/^\.{0,2}\//, /lodash\-es/],
        }),
      ]),
  },
  {
    ...options,
    input: 'src/builder-widgets-async.tsx',
    output: [{ dir: 'dist/builder-widgets-async', format: 'es', sourcemap: true }],
    // Do not resolve for es module build
    // TODO: should really do a cjs build too (probably for the default build instead of umd...)
    external: externalDependencies,
    plugins: options.plugins
      .filter(plugin => plugin !== resolvePlugin)
      .concat([
        resolve({
          only: [/^\.{0,2}\//, /lodash\-es/],
        }),
      ]),
  },
  {
    ...options,
    output: {
      format: 'iife',
      file: pkg.unpkg,
      name: 'BuilderWidgets',
      globals,
      sourcemap: true,
    },
  },
];
