/*
 * @Author: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @Date: 2024-06-05 17:44:19
 * @LastEditors: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @LastEditTime: 2024-06-10 09:53:02
 */
import { Builder } from '@builder6/react';

import { CarouselComponent } from './components/Carousel';
import { TabsComponent } from './components/Tabs';
import { AccordionComponent } from './components/Accordion';
import { MasonryComponent } from './components/Masonry';
import { carouselConfig } from './components/Carousel.config';
import { tabsConfig } from './components/Tabs.config';
import { accordionConfig } from './components/Accordion.config';
import { masonryConfig } from './components/Masonry.config';

Builder.registerComponent(CarouselComponent, carouselConfig);
Builder.registerComponent(TabsComponent, tabsConfig);
Builder.registerComponent(AccordionComponent, accordionConfig);
Builder.registerComponent(MasonryComponent, masonryConfig);
