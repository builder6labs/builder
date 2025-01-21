import { Component } from '@builder6/sdk';
import { BuilderBlock } from '../decorators/builder-block.decorator';

export function withBuilder(component: Function, options: Component) {
  BuilderBlock(options)(component as any);
  return component;
}
