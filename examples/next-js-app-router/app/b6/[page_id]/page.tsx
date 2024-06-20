/*
 * @Author: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @Date: 2024-06-07 21:03:35
 * @LastEditors: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @LastEditTime: 2024-06-09 23:58:27
 * @FilePath: /builder/examples/next-js-app-router/app/b6/page/[page_id]/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react';
import { Builder, builder } from '@builder6/sdk';
import Head from 'next/head';
import { RenderBuilderContent } from '@/components/builder';

// Replace with your Public API Key
builder.init('666171e7481f3605ac061b50');
Builder.overrideHost = "https://cdn.builder6.com";

interface PageProps {
  params: {
    page_id: string;
  };
}

export default async function Page(props: PageProps) {
  const content = await builder
    .get('page', {
        entry: props?.params?.page_id,
      prerender: false,
    })
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      {/* <RenderBuilderContent content={content}/> */}
      <RenderBuilderContent entry={props.params.page_id}/>
    </>
  );
}