/*
 * @LastEditTime: 2024-06-10 10:34:52
 * @LastEditors: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @customMade: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { builder, Builder } from '@builder6/sdk';
import Head from 'next/head';
import { RenderBuilderContent } from '@/components/builder';
import '@builder6/widgets';

// Replace with your Public API Key
builder.init('YJIGb4i01jvw0SRdL5Bt');

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const pageId = (props?.params?.page?.join('/') || '');
  console.log(pageId)
  const content = await builder
    .get('page', {
      entry: pageId,
      query: {
        data: {
          myCustomField: 'someValue',
          someNumber: { $ne: 2 }
        }
      },
      userAttributes: {
        urlPath: '/' + (props?.params?.page?.join('/') || ''),
      },
      prerender: false,
    })
    .toPromise();

  console.log(content)

  return (
    <>
      <Head>
        <title>{content?.data.title}</title>
      </Head>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} />
    </>
  );
}