'use client';

import React from 'react';
import { Builder, builder, BuilderComponent } from '@builder6/react';
import Head from 'next/head';

// Replace with your Public API Key
builder.init('YJIGb4i01jvw0SRdL5Bt');

interface PageProps {
  params: { 
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  
  const content =
        {
            "lastUpdatedBy": "agZ9n5CUKRfbL9t6CaJOyVSK4Es2",
            "folders": [],
            "data": {
                "hidden": "hello",
                "title": "my-builder-app",
                "blocks": [
                    {
                        "@type": "@builder6/sdk:Element",
                        "@version": 2,
                        "layerName": "Page",
                        "id": "builder-362931f17c9c4d6195f5bec2749348bc",
                        "meta": {
                            "previousId": "builder-b030b5cf048f4f6d8f255ea635c6b06a"
                        },
                        "component": {
                            "name": "Core:Amis",
                            "options": {
                                "schema": {
                                  "type": "page",
                                  "title": "Welcome to Steedos",
                                  "body":  [
                                    {
                                      "id": "u:28f76ca888bb",
                                      "type": "form",
                                      "title": "表单",
                                      "mode": "horizontal",
                                      "dsType": "api",
                                      "feat": "Insert",
                                      "body": [
                                        {
                                          "type": "input-text",
                                          "label": "文本",
                                          "name": "text",
                                          "id": "u:5af483118e92"
                                        }
                                      ],
                                      "actions": [
                                        {
                                          "type": "button",
                                          "label": "提交",
                                          "onEvent": {
                                            "click": {
                                              "actions": [
                                                {
                                                  "actionType": "submit",
                                                  "componentId": "u:28f76ca888bb"
                                                }
                                              ]
                                            }
                                          },
                                          "level": "primary",
                                          "id": "u:170b29f61a39"
                                        }
                                      ],
                                      "resetAfterSubmit": true
                                    }
                                  ],
                                  "regions": [
                                    "body",
                                    "header",
                                    "toolbar",
                                    "aside"
                                  ],
                                  "id": "u:2275f3beaa71",
                                  "asideResizor": false,
                                  "pullRefresh": {
                                    "disabled": true
                                  }
                                },
                                "data": {
                                  "objectName": "space_users",
                                  "recordId": "",
                                  "initialValues": {},
                                  "appId": "builder",
                                  "title": "",
                                  "context": {}
                                },
                            }
                        },
                    }
                ],
                "url": "/",
                "state": {
                    "deviceSize": "large",
                    "location": {
                        "pathname": "/",
                        "path": [
                            ""
                        ],
                        "query": {}
                    }
                }
            },
            "modelId": "38834b40eced4c24947a3909cb42be3e",
            "query": [
                {
                    "@type": "@builder.io/core:Query",
                    "property": "urlPath",
                    "value": "/",
                    "operator": "is"
                }
            ],
            "published": "published",
            "screenshot": "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F1e58bace9af44a5fada9a89fa21298af",
            "firstPublished": 1690313327733,
            "testRatio": 1,
            "lastUpdated": 1690313327760,
            "createdDate": 1687758962208,
            "createdBy": "MuQNEu4yBXOCbPCtULbBdJXHa973",
            "meta": {
                "lastPreviewUrl": "https://builder-test-pages.builder.codes/?apiKey=YJIGb4i01jvw0SRdL5Bt&builder.space=YJIGb4i01jvw0SRdL5Bt&builder.cachebust=true&builder.preview=page&builder.noCache=true&__builder_editing__=true&builder.overrides.page=05e38813a45c414cb2f543e9e4521775&builder.overrides.05e38813a45c414cb2f543e9e4521775=05e38813a45c414cb2f543e9e4521775&builder.options.locale=Default",
                "kind": "page",
                "hasLinks": true,
                "shopifyDomain": "builderio.myshopify.com",
                "needsHydration": true
            },
            "variations": {},
            "name": "my-builder-app",
            "id": "05e38813a45c414cb2f543e9e4521775",
            "startDate": 1691177318000,
            "rev": "tn32xzc3xno"
        }
  return (
    <>
      <Head>
        <title>{content?.data.title}</title>
      </Head>
      {/* Render the Builder page */}
      <BuilderComponent content={content} model="page" />
    </>
  );
}
