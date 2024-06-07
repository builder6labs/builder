import React from 'react';
import { Builder, builder } from '@builder6/sdk';
import Head from 'next/head';
import { RenderBuilderContent } from '@/components/builder';

// Replace with your Public API Key
builder.init('66617374707ad9064621afb4');
Builder.overrideHost = "https://cdn-dev.builder6.com";

interface PageProps {
  params: {
    page_id: string;
  };
}

export default async function Page(props: PageProps) {
  console.log('hello page', props?.params?.page_id)
  const content = await builder
    .get('page', {
      options: {
        entry: props?.params?.page_id,
      },
      prerender: false,
    })
    .toPromise();

  return (
    <>
      <Head>
        <title>{content?.data?.title}</title>
      </Head>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content}/>
    </>
  );
}