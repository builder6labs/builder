'use client';

import React, { useState, useEffect } from 'react';
import { Liquid } from 'liquidjs';

interface LiquidTemplateProps {
  template: string;
  data: Record<string, any>;
  builderState: any
}

export const LiquidComponent: React.FC<LiquidTemplateProps> = ({ template, data, builderState }) => {
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    const renderData = {
      ...builderState.state,
      ...data,
    };
    const engine = new Liquid();
    engine.parseAndRender(template, renderData).then((result) => {
      setHtml(result);
    });
  }, [template, data]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

// import React from 'react';
// import { Liquid } from 'liquidjs';

// interface LiquidTemplateProps {
//   template: string;
//   data: Record<string, any>;
// }

// export class LiquidComponent extends React.Component<LiquidTemplateProps, { template: string, data: any, html: string }> {
//   state: any = {
//     html: "",
//   };

//   componentDidUpdate(prevProps: any){
//     console.log('LiquidComponent componentDidUpdate', prevProps)
//     const engine = new Liquid();
//     engine.parseAndRender(prevProps.template, prevProps.data).then((result) => {
//       console.log('LiquidComponent result', result)
//       this.setState({
//         ...this.state,
//         html: result,
//       });
//     }).catch((error)=>{
//       console.log('LiquidComponent error', error)
//     });
//   }

//   render() {
//     return <div dangerouslySetInnerHTML={{ __html: this.state.html }} />;
//   }
  
// };