import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function AmisLayout({ children }: { children: React.ReactNode }) {
  

  return (
    <>
      <script src="https://unpkg.steedos.cn/amis@6.5.0/sdk/sdk.js" />
      <link rel="stylesheet" href="https://unpkg.steedos.cn/amis@6.5.0/sdk/antd.css" />
      <link rel="stylesheet" href="https://unpkg.steedos.cn/amis@6.5.0/sdk/helper.css" />
      <link rel="stylesheet" href="https://unpkg.steedos.cn/amis@6.5.0/sdk/iconfont.css" />
      {children }
    </>
  );
}
