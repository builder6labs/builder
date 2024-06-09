/*
 * @Author: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @Date: 2024-06-07 17:00:37
 * @LastEditors: Jack Zhuang 50353452+hotlong@users.noreply.github.com
 * @LastEditTime: 2024-06-09 23:51:34
 * @FilePath: /builder/examples/next-js-app-router/app/b6/layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function AmisLayout({ children }: { children: React.ReactNode }) {
  

  return (
    <>
      {children }
    </>
  );
}
