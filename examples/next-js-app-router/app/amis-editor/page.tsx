/*
 * @Author: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @Date: 2024-06-07 08:38:13
 * @LastEditors: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @LastEditTime: 2024-06-10 21:47:42
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { RenderEditor } from '@/components/editor';

interface PageProps {
  params: {
    page: string[];
  };
}
const unpkgUrl = "https://unpkg.steedos.cn"

export default async function Page(props: PageProps) {
    
    return (
        <>
        <link type="text/css" rel="stylesheet" href={`${unpkgUrl}/amis-editor-core@6.3.0/lib/style.css`} />
        <link type="text/css" rel="stylesheet" title="cxd" href={`${unpkgUrl}/amis@6.3.0/lib/themes/default.css`} />
        <link type="text/css" rel="stylesheet" title="cxd" href={`${unpkgUrl}/amis@6.3.0/lib/themes/antd.css`} />
        <link type="text/css" rel="stylesheet" title="cxd" href={`${unpkgUrl}/amis@6.3.0/lib/helper.css`} />

        <link rel="stylesheet" href={`${unpkgUrl}/@fortawesome/fontawesome-free@6.2.0/css/all.min.css`} />
        
        <RenderEditor/>
        </>
    )
}