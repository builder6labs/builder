import { Builder, BuilderElement } from '@builder6/sdk';
import { withBuilder } from '../functions/with-builder';
import React, { Component } from 'react';
import { BuilderBlock as BuilderBlockComponent } from '../components/builder-block.component';

type AssetPackage = {
  package: string;
  urls: string[];
  library: string;
};

type AssetComponent = {
  url: string;
  exportName?: string;
  npm?: {
    package: string;
    exportName: string;
  };
};

type AssetConfig = {
  packages?: AssetPackage[];
  components?: AssetComponent[];
};

export class AssetsLoaderClass {
  static remoteAssets: Record<string, string> = {};
  static packages: Record<string, AssetPackage> = {};
  static unpkgUrl: string;
  static componentWrapper: Function;

  static loadPromise: Promise<void> | null = null;

  static async registerRemoteAssets(assetUrls: string[], unpkgUrl): Promise<void> {

    if (this.loadPromise) {
      // 如果已有加载过程正在进行，返回现有的 Promise
      return this.loadPromise;
    }

    this.unpkgUrl = unpkgUrl;
    this.loadPromise = (async () => {
      for await (let assetUrl of assetUrls) {
        assetUrl = assetUrl.replace('https://unpkg.com', this.unpkgUrl);
        if (this.remoteAssets[assetUrl]) {
          console.log(`已经在加载: ${assetUrl}`);
          continue;
        }

        this.remoteAssets[assetUrl] = 'loading';

        try {
          const response = await fetch(assetUrl, { mode: 'cors' });
          if (!response.ok) {
            throw new Error(`无法获取资产: ${response.statusText}`);
          }
          const assets: AssetConfig = await response.json();
          await this.registerAssets(assets);
          console.log(`资产已加载: ${assetUrl}`);
        } catch (error) {
          console.error(`从 ${assetUrl} 加载资产时出错:`, error);
        } finally {
          this.remoteAssets[assetUrl] = 'loaded';
        }
      }
    })();

    try {
      await this.loadPromise;
    } finally {
      // 加载完成后重置 Promise
      this.loadPromise = null;
    }
  }

  static async registerAssets(assets: AssetConfig): Promise<void> {
    const { packages, components } = assets;

    // Load packages
    for (const pkg of packages || []) {
      if (pkg.urls && pkg.library) {
        for (const url of pkg.urls) {
          if (url.endsWith('.js')) {
            await this.injectScript(url);
          } else if (url.endsWith('.css')) {
            this.injectCSS(url);
          }
        }
        this.packages[pkg.package] = pkg;
      }
    }

    // Load components
    for (const component of components || []) {
      if (component.url) {
        await this.injectScript(component.url);
        if (component.exportName && typeof window[component.exportName as any] !== "undefined") {
          this.registerMeta(window[component.exportName as any]); 
        }
      }
    }
  }

  static registerMeta = (meta: any) => {

    if (meta.components) {
      meta.components.forEach(async (comp: any, index: number) => {
        if (comp.npm?.package && comp.npm?.exportName) {
          const library = this.packages[comp.npm.package]?.library
          if (library) {
            const pkg = (window as any)[library]
            if (pkg && pkg[comp.npm.exportName]){
              const component = pkg[comp.npm.exportName];
              // 判断 Builder6.components 中name是否存在，如果不存在则创建
              if (!Builder.components.find((item: any) => item.name === comp.componentName)) {
                Builder.registerComponent(
                  component,
                  { name: comp.componentName, meta: comp}
                );
              }
            } else {
              console.error(`Component ${comp.npm.exportName} not found in package ${comp.npm.package}`);
            }
          }
        }
      });
    }
  };

  static injectScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src.replace('https://unpkg.com', this.unpkgUrl);
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  static injectCSS(href: string): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href.replace('https://unpkg.com', this.unpkgUrl);
    document.head.appendChild(link);
  }
}



type AssetsLoaderComponentProps = {
    builderBlock?: BuilderElement;
    urls: string[];
    unpkgUrl: string,
    children?: React.ReactNode;
    loading?: React.ReactNode;
  };
  
  type AssetsLoaderComponentState = {
    assetsLoaded: boolean;
  };
  
  export class AssetsLoaderComponent extends Component<AssetsLoaderComponentProps, AssetsLoaderComponentState> {
    constructor(props: AssetsLoaderComponentProps) {
      super(props);
      this.state = {
        assetsLoaded: false
      };
    }
  
    async componentDidMount() {
      await this.loadAssets();
    }
  
    async componentDidUpdate(prevProps: AssetsLoaderComponentProps) {
      if (prevProps.urls !== this.props.urls) {
        this.setState({ assetsLoaded: false }); // Reset state before loading new assets
        await this.loadAssets();
      }
    }
  
    async loadAssets() {
      const { urls = Builder.settings.assetUrls || [], unpkgUrl = Builder.settings.unpkgUrl || 'https://unpkg.com' } = this.props;
      await AssetsLoaderClass.registerRemoteAssets(urls, unpkgUrl);
      this.setState({ assetsLoaded: true });
    }
  
    render() {
      const { assetsLoaded } = this.state;
      const { loading } = this.props;
  
      if (!assetsLoaded) {
        // Check if a loading component is passed via props
        if (loading) {
          // If so, use that loading component
          return loading;
        }
        return <div className='builder-loading'></div>;
      }
  
      return (
        <React.Fragment>
            {this.props.children}
            {this.props.builderBlock &&
            this.props.builderBlock.children &&
            this.props.builderBlock.children.map((block, index) => (
                <BuilderBlockComponent key={block.id} block={block} />
            ))}
        </React.Fragment>
      );
    }
  }
  
  
export const AssetsLoader = withBuilder(AssetsLoaderComponent, {
  name: 'Core:AssetsLoader',
  static: true,
  image:
    'https://cdn.builder.io/api/v1/image/assets%2FIsxPKMo2gPRRKeakUztj1D6uqed2%2F682efef23ace49afac61748dd305c70a',
  inputs: [
    {
      name: 'urls',
      type: 'javascript',
      required: true,
      defaultValue: '',
      code: true,
    },
  ],
  canHaveChildren: true,
});
  