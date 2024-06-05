/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { PropsWithChildren } from 'react';
import { BuilderElement } from '@builder.io/sdk';
import { BuilderBlock as BuilderBlockComponent } from '../components/builder-block.component';
import { withBuilder } from '../functions/with-builder';

interface AmisProps {
  schema: string;
  data: string;
}

class AmisComponent extends React.Component<PropsWithChildren<AmisProps>, { inView?: boolean }> {
  ref: HTMLElement | null = null;

  state = {
    inView: false,
  };

  render() {
    return <div ref={ref => (this.ref = ref)}></div>;
  }
}

export const Amis = withBuilder(AmisComponent, {
  name: 'Core:Amis',
  static: true,
  image:
    'https://cdn.builder.io/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2F682efef23ace49afac61748dd305c70a',
  inputs: [
    {
      name: 'schema',
      type: 'javascript',
      required: true,
      defaultValue: `{
        "type": "page",
        "title": "标题",
        "body": "Hello World!"
      }`,
      code: true,
    },
    {
      name: 'data',
      type: 'javascript',
      required: true,
      defaultValue: `{}`,
      code: true,
    },
  ],
  canHaveChildren: false,
});
