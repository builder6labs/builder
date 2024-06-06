declare module '*.json';

declare module 'preact/debug' {}

declare module '@builder6/react/dist/preact' {
  const react = require('@builder6/react');
  export = react;
}
declare module '@builder.io/widgets/dist/preact' {
  const react = require('@builder.io/widgets');
  export = react;
}
