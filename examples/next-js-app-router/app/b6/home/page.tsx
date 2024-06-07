
import React from 'react';
import { Builder, builder } from '@builder6/sdk';
import Head from 'next/head';
import { RenderBuilderContent } from '@/components/builder';

// Replace with your Public API Key
builder.init('66617374707ad9064621afb4');
Builder.overrideHost = "https://cdn-dev.builder6.com";

interface PageProps {
  params: {
    page: string[];
  };
}



export default async function Page(props: PageProps) {
  const content = 
        {
            "lastUpdatedBy": "sS0KmlUBZ5XdP2RIwzgqCYNJu9e2",
            "folders": [],
            "data": {
                "inputs": [],
                "themeId": false,
                "title": "test",
                "blocks": [
                  {
                    "@type": "@builder.io/sdk:Element",
                    "@version": 2,
                    "layerName": "Page",
                    "id": "builder-64640d05a3544a43a3b4795fb20234bc",
                    "component": {
                        "name": "Core:Amis",
                        "options": {
                            "schema": {
                                "type": "page",
                                "body": {
                                    "type": "crud",
                                    "api": "https://aisuda.bce.baidu.com/amis/api/mock2/sample",
                                    "syncLocation": false,
                                    "columns": [
                                        {
                                            "name": "id",
                                            "label": "ID"
                                        },
                                        {
                                            "name": "engine",
                                            "label": "Rendering engine"
                                        },
                                        {
                                            "name": "browser",
                                            "label": "Browser"
                                        },
                                        {
                                            "name": "platform",
                                            "label": "Platform(s)"
                                        },
                                        {
                                            "name": "version",
                                            "label": "Engine version"
                                        },
                                        {
                                            "name": "grade",
                                            "label": "CSS grade"
                                        },
                                        {
                                            "type": "operation",
                                            "label": "操作",
                                            "buttons": [
                                                {
                                                    "label": "详情",
                                                    "type": "button",
                                                    "level": "link",
                                                    "actionType": "dialog",
                                                    "dialog": {
                                                        "title": "查看详情",
                                                        "body": {
                                                            "type": "form",
                                                            "body": [
                                                                {
                                                                    "type": "input-text",
                                                                    "name": "engine",
                                                                    "label": "Engine"
                                                                },
                                                                {
                                                                    "type": "input-text",
                                                                    "name": "browser",
                                                                    "label": "Browser"
                                                                },
                                                                {
                                                                    "type": "input-text",
                                                                    "name": "platform",
                                                                    "label": "platform"
                                                                },
                                                                {
                                                                    "type": "input-text",
                                                                    "name": "version",
                                                                    "label": "version"
                                                                },
                                                                {
                                                                    "type": "control",
                                                                    "label": "grade",
                                                                    "body": {
                                                                        "type": "tag",
                                                                        "label": "${grade}",
                                                                        "displayMode": "normal",
                                                                        "color": "active"
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                },
                                                {
                                                    "label": "删除",
                                                    "type": "button",
                                                    "level": "link",
                                                    "className": "text-danger",
                                                    "disabledOn": "this.grade === 'A'"
                                                }
                                            ]
                                        }
                                    ]
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
                            "boxSizing": "border-box",
                            "marginTop": "20px",
                            "lineHeight": "normal",
                            "height": "auto"
                        }
                    }
                },
                    {
                        "@type": "@builder.io/sdk:Element",
                        "@version": 2,
                        "id": "builder-64640d05a3544a43a3b4795fb20234bb",
                        "component": {
                            "name": "Text",
                            "options": {
                                "text": "Enter some text..."
                            }
                        },
                        "responsiveStyles": {
                            "large": {
                                "display": "flex",
                                "flexDirection": "column",
                                "position": "relative",
                                "flexShrink": "0",
                                "boxSizing": "border-box",
                                "marginTop": "20px",
                                "lineHeight": "normal",
                                "height": "auto"
                            }
                        }
                    },
                ],
                "state": {
                    "deviceSize": "large",
                    "location": {
                        "pathname": "/react",
                        "path": [
                            "react"
                        ],
                        "query": {}
                    }
                }
            },
            "modelId": "522cbd114cf948be89847c277a4f8ead",
            "query": [
                {
                    "@type": "@builder.io/core:Query",
                    "property": "urlPath",
                    "value": "/",
                    "operator": "startsWith"
                },
                {
                    "@type": "@builder.io/core:Query",
                    "property": null,
                    "value": null,
                    "operator": "is"
                }
            ],
            "published": "published",
            "screenshot": "https://cdn.builder.io/api/v1/image/assets%2F97cb1aafe8a74105bdb3783644ea77ce%2F56423a7dd01e43389a5b7cb8e8586d7e",
            "firstPublished": 1717580743364,
            "testRatio": 1,
            "lastUpdated": 1717729569902,
            "createdDate": 1717580261421,
            "createdBy": "sS0KmlUBZ5XdP2RIwzgqCYNJu9e2",
            "meta": {
                "lastPreviewUrl": "",
                "kind": "page",
                "hasLinks": false
            },
            "variations": {},
            "name": "test",
            "id": "8d893777ee0f4010aa91e3d0db58d08a",
            "rev": "2rl4e24rr6f"
        }

  return (
    <>
      <Head>
        <title>{content?.data.title}</title>
      </Head>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content}/>
    </>
  );
}