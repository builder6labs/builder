import React from "react";
import { PropsWithChildren } from "react";

interface AmisRendererProps {
  $schema: object;
  schema: object;
  data: object;
  defaultData: object;
  render: Function; // Amis Render
}


interface AmisRendererState {
  schema: object | null;
}

export class AmisRenderer extends React.Component<PropsWithChildren<AmisRendererProps>, AmisRendererState> {
 
  constructor(props) {

    super(props);
    this.state = {
      schema: null,
    };
  }

  loadSchema = async () => {
    let { schema } = this.props;
    let props = this.props
    if(props.defaultData){
      (props as any).data = Object.assign({}, props.data, this.props.defaultData)
    }
    if (typeof schema === 'function') {
      const result = await schema(props);
      console.log(`AmisRenderer loadSchema result`, result)
      this.setState({ schema: result });
    } else {
      console.log(`AmisRenderer loadSchema schema`, schema)
      this.setState({ schema: schema });
    }
  };


  async componentDidMount() {
    await this.loadSchema();
  }

  async componentDidUpdate(prevProps) {
    // console.log(`AmisRenderer componentDidUpdate`, prevProps, this.props);
    if (JSON.stringify(prevProps.$schema) !== JSON.stringify(this.props.$schema)) {
      console.log(`AmisRenderer componentDidUpdate schema`)
      await this.loadSchema();
      // this.amisScoped.updateSchema(this.state.schema);
    }
    else if (prevProps.data !== this.props.data) {
      console.log(`AmisRenderer componentDidUpdate data`)
      await this.loadSchema();
      // await this.loadData();
      // this.amisScoped.updateProps(this.state.data, () => {
      //   /*更新回调 */
      // });
    }
  }

  render(): React.ReactNode {
      
    if (!this.state.schema) {
      return <div className='loading'></div>;
    }
    console.log(`AmisRenderer render`, this.state.schema)
    return (
      <>
        {this.props.render('body', this.state.schema)}
      </>
    )
  }
}
