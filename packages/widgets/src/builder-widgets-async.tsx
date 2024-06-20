/*
 * @Author: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @Date: 2024-06-05 17:44:19
 * @LastEditors: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @LastEditTime: 2024-06-10 09:53:06
 */
import dynamic from 'next/dynamic';
import { Builder } from '@builder6/react';

import { carouselConfig } from './components/Carousel.config';
import { tabsConfig } from './components/Tabs.config';
import { accordionConfig } from './components/Accordion.config';
import { masonryConfig } from './components/Masonry.config';

import { amisConfig } from './components/Amis.config';
import { liquidConfig } from './components/Liquid.config';

Builder.registerComponent(
  dynamic(() => import('./components/Carousel').then(mod => mod.CarouselComponent as any)),
  carouselConfig
);
Builder.registerComponent(
  dynamic(() => import('./components/Tabs').then(mod => mod.TabsComponent as any)),
  tabsConfig
);
Builder.registerComponent(
  dynamic(() => import('./components/Accordion').then(mod => mod.AccordionComponent as any)),
  accordionConfig
);
Builder.registerComponent(
  dynamic(() => import('./components/Masonry').then(mod => mod.MasonryComponent as any)),
  masonryConfig
);

Builder.registerComponent(
  dynamic(() => import('./components/Amis').then(mod => mod.AmisComponent as any)),
  amisConfig
);

Builder.registerComponent(
  dynamic(() => import('./components/Liquid').then(mod => mod.LiquidComponent as any)),
  liquidConfig
);