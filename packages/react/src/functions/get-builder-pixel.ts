import { BuilderElement } from '@builder6/sdk';

export function getBuilderPixel(apiKey: string): BuilderElement {
  return {
    id: 'builder-pixel-' + Math.random().toString(36).split('.')[1],
    '@type': '@builder6/sdk:Element',
    tagName: 'img',
    properties: {
      role: 'presentation',
      'aria-hidden': 'true',
      src: `https://cdn.builder.io/api/v1/pixel?apiKey=${apiKey}`,
    },
    responsiveStyles: {
      large: {
        height: '0',
        width: '0',
        display: 'inline-block',
        opacity: '0',
        overflow: 'hidden',
        pointerEvents: 'none',
      },
    },
  };
}
