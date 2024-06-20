/*
 * @Author: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @Date: 2024-06-10 12:14:04
 * @LastEditors: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @LastEditTime: 2024-06-10 12:16:08
 */
import { Builder, Component } from '@builder6/sdk';

interface AmisComponent extends Component {
}

export function withAmis(options: AmisComponent) {
  options.type = 'react';

  return Builder.Component(options);
}
