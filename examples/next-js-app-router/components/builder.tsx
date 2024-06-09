/*
 * @LastEditTime: 2024-06-09 22:52:15
 * @LastEditors: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @customMade: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';
import { BuilderComponent, useIsPreviewing, builder, Builder } from '@builder6/react';
import DefaultErrorPage from 'next/error';

interface BuilderPageProps {
  content: any;
  entry: string;
}

// Replace with your Public API Key
builder.init('666171e7481f3605ac061b50');
Builder.overrideHost = "https://cdn.builder6.com";

export function RenderBuilderContent({ content, entry }: BuilderPageProps) {
  const isPreviewing = useIsPreviewing();

  if (content || isPreviewing) {
    return <BuilderComponent 
      content={content} 
      model="page" 
    />;
  } else if (entry) {
    return <BuilderComponent 
      entry={entry}
      model="page" 
    />;
  }

  return <DefaultErrorPage statusCode={404} />;
}
