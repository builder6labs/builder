import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from 'rollup-plugin-json';
import regexReplace from 'rollup-plugin-re';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json' assert { type: 'json' };

const libraryName = 'builder-amis';

const resolvePlugin = resolve();

const externalDependencies = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.optionalDependencies || {}))
  .concat(Object.keys(pkg.peerDependencies || {}))
  .filter(name => !name.startsWith('lodash'));

const options = {
  input: `src/${libraryName}.ts`,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  watch: {
    include: 'src/**',
  },
  external: ['vm2'],
  plugins: [
    typescript({
     
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      
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
      file: 'dist/builder-amis.umd.js',
      name: 'Builder6Widgets',
      sourcemap: true,
      amd: {
        id: '@builder6/amis',
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
  // {
  //   ...options,
  //   input: 'src/builder-amis-async.tsx',
  //   output: [{ dir: './dist/lib', format: 'es', sourcemap: true }],
  //   // Do not resolve for es module build
  //   // TODO: should really do a cjs build too (probably for the default build instead of umd...)
  //   external: externalDependencies,
  //   plugins: options.plugins
  //     .filter(plugin => plugin !== resolvePlugin)
  //     .concat([
  //       resolve({
  //         only: [/^\.{0,2}\//, /lodash\-es/],
  //       }),
  //     ]),
  // },
  // React 15
  {
    ...options,
    output: [
      { file: './dist/15.esm.js', format: 'es', sourcemap: true },
      { file: './dist/15.js', format: 'cjs', sourcemap: true },
    ],
    external: externalDependencies.filter(name => !name.startsWith('lodash')),
    plugins: options.plugins
      .filter(plugin => plugin !== resolvePlugin)
      .concat([
        resolve({
          only: [/^\.{0,2}\//, /lodash\-es/],
        }),
        replace({
          'React.Fragment': '"span"',
        }),
        regexReplace({
          // ... do replace before commonjs
          patterns: [
            {
              test: /\/\/\/REACT15ONLY/g,
              replace: '',
            },
            {
              test: /\/\*\*\*REACT15ONLY([^\*]+)\*\//g,
              replace: '$1',
            },
          ],
        }),
      ]),
  },
  // Preact
  // TODO: may have to do react 15 modifications for support (no fragment/context?)
  // {
  //   ...options,
  //   output: [
  //     { file: './dist/preact.esm.js', format: 'es', sourcemap: true },
  //     { file: './dist/preact.js', format: 'cjs', sourcemap: true },
  //   ],
  //   external: externalDependencies.filter(name => !name.startsWith('lodash')),
  //   plugins: options.plugins
  //     .filter(plugin => plugin !== resolvePlugin)
  //     .concat([
  //       regexReplace({
  //         // ... do replace before commonjs
  //         patterns: [
  //           {
  //             // regexp match with resolved path
  //             // match: /formidable(\/|\\)lib/,
  //             // string or regexp
  //             test: /require\(['"]react(-dom)?['"]\)/g,
  //             replace: 'require("preact/compat")',
  //           },
  //           {
  //             // regexp match with resolved path
  //             // match: /formidable(\/|\\)lib/,
  //             // string or regexp
  //             test: /from ['"]react(-dom)?['"]/g,
  //             replace: 'from "preact/compat"',
  //           },
  //         ],
  //       }),
  //       resolve({
  //         only: [/^\.{0,2}\//, /lodash\-es/],
  //       }),
  //     ]),
  // },
  {
    ...options,
    output: {
      file: pkg.unpkg,
      format: 'iife',
      name: 'Builder6React',
      sourcemap: true,
    },
  },
  {
    ...options,
    output: {
      format: 'iife',
      file: pkg.unpkg,
      name: 'Builder6Widgets',
      sourcemap: true,
    },
  },
];
