/*
 * @LastEditTime: 2024-06-10 10:34:52
 * @LastEditors: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @customMade: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use client"
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
  
  const content = {
    "id": "5ed5677f-269c-4ad6-9a78-da2cd03371e2",
    "data": {
        "cssCode": "\n  ",
        "blocks": [
            {
                "@type": "@builder.io/sdk:Element",
                "@version": 2,
                "layerName": "Page",
                "id": "builder-a5af50fd-a95f-44e5-aeb3-96800e549083",
                "component": {
                    "name": "Builder6:Amis",
                    "options": {
                        "schema": {
                            "type": "page",
                            "body": {
                                "type": "tpl",
                                "tpl": "[b6amis] hi, ${mobile}"
                            }
                        },
                        "data": {}
                    }
                },
                "responsiveStyles": {
                    "large": {
                        "display": "flex",
                        "flexDirection": "column",
                        "position": "relative",
                        "flexShrink": "0",
                        "boxSizing": "border-box"
                    }
                }
            },
            {
                "id": "builder-pixel-vfrqx2uffhe",
                "@type": "@builder.io/sdk:Element",
                "tagName": "img",
                "properties": {
                    "role": "presentation",
                    "aria-hidden": "true",
                    "src": "https://cdn.builder6.com/api/v1/pixel?apiKey=null"
                },
                "responsiveStyles": {
                    "large": {
                        "height": "0",
                        "width": "0",
                        "display": "inline-block",
                        "opacity": "0",
                        "overflow": "hidden",
                        "pointerEvents": "none"
                    }
                }
            }
        ]
    },
    "name": "home22211122"
  }

  const data = {
    mobile: '18102958888'
  }

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} data={data} />
    </>
  );
}