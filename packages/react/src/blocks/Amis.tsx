/*
 * @LastEditTime: 2025-02-15 19:58:46
 * @LastEditors: baozhoutao@steedos.com
 * @customMade: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';
import React, { PropsWithChildren } from 'react';
import { BuilderElement, Builder } from '@builder6/sdk';

import { withBuilder } from '../functions/with-builder';
import { BuilderStore } from '../store/builder-store';

import { AmisRenderer } from './AmisRenderer';

interface AmisProps {
  schema: object;
  data: object;
  env: object;
  builderState: BuilderStore;
  builderBlock: BuilderElement;
}

export class AmisComponent extends React.Component<PropsWithChildren<AmisProps>> {
  amis: any = null;
  amisLib: any = null;

  ref: any = null;
  amisScoped: any = null;

  componentWillUnmount() {
    if (this.amisScoped) {
      this.amisScoped.unmount();
    }
  }

  constructor(props) {

    super(props);
    this.ref = React.createRef<HTMLDivElement>();
  }

  registerComponents() {

    Builder.components.forEach((component:any) => {
      let componentClass = component.class
      const meta = component.meta

      if (componentClass && meta && meta.amis && meta.amis.render && !meta.amis.isRegisterd) {
          console.log(`Register amis component: ${meta.amis.render.type}`, meta.amis.render);
          //注册自定义组件，请参考后续对工作原理的介绍
          if (meta.componentType === 'amisSchema') {
            componentClass = (props) => (
              <AmisRenderer {...props} schema={component.class}/>
            )
          }
          this.amisLib.Renderer({
            autoVar: true,
            ...meta.amis.render
          })(componentClass);
          meta.amis.isRegisterd = true;
      }
    });
  }
  
  async componentDidMount() {

    if (Builder.isServer){
      return
    }
    this.amis = Builder.isBrowser && window['amisRequire'] && window['amisRequire']('amis/embed');
    this.amisLib = (window as any)['amisRequire'] && (window as any)['amisRequire']('amis');

    if (!this.amis) {
      console.error('Amis is not loaded');
      return;
    }
    await this.registerComponents();

    const { builderState } = this.props;
    const { context } = builderState;
    const data = {
      ...builderState.state,
      ...this.props.data,
    };
    const env = {
      theme: 'antd',
      requestAdaptor: (config: any)=>{
        if(config.allowCredentials != true){
          config.withCredentials = false;
          delete config.allowCredentials
        }
        return config;
      },
      ...Builder.settings.env,
      ...context.env,
      ...this.props.env
    };
    console.log('render amis', this.props, data, env);
    this.amisScoped = this.amis.embed(this.ref.current, this.props.schema, {data}, env);
  }

  async componentDidUpdate(prevProps) {

    if (prevProps.schema !== this.props.schema) {
      this.amisScoped.updateSchema(this.props.schema);
    }
    else if (prevProps.data !== this.props.data) {
      this.amisScoped.updateProps(this.props.data, () => {
        /*更新回调 */
      });
    }
  }


  render() {
    return (
      <div ref={this.ref}>
      </div>
    );
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
    {
      name: 'env',
      type: 'javascript',
      required: true,
      defaultValue: ``,
      code: true,
    },
  ],
  canHaveChildren: false,
});
