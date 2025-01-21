
export const liquidConfig: any = {
  name: 'Builder6:Liquid',
  hideFromInsertMenu: true,
  inputs: [
    {
      name: 'template',
      type: 'string',
      advanced: true,
    },
    {
      name: 'data',
      type: 'javascript',
      required: true,
      defaultValue: `{}`,
      code: true,
    },
  ],
  plugins: {
    amis: {
      type: 'builder6-liquid',
      usage: 'renderer',
      autoVar: true,
      icon: "fa-fw fa fa-list-alt"
    }
  }
}