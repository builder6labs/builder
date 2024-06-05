/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { PropsWithChildren } from 'react';
import { BuilderElement, Builder } from '@builder.io/sdk';

import { withBuilder } from '../functions/with-builder';

interface AmisProps {
  schema: string;
  data: string;
}

class AmisComponent extends React.Component<PropsWithChildren<AmisProps>, {}> {
  ref: any = null;
  amisScoped: any = null;

  firstLoad = true;
  amis = Builder.isBrowser && window['amisRequire'] && window['amisRequire']('amis/embed');

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (this.firstLoad) {
      this.firstLoad = false;
      this.amisScoped = this.amis.embed(this.ref.current, this.props.schema, this.props.data);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.schema !== this.props.schema) {
      this.amisScoped.updateSchema(this.props.schema);
    } else if (prevProps.data !== this.props.data) {
      this.amisScoped.updateProps(this.props.data, () => {
        /*更新回调 */
      });
    }
  }

  componentWillUnmount() {
    if (this.amisScoped) {
      this.amisScoped.unmount();
    }
  }

  render() {
    return <div ref={this.ref}></div>;
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
