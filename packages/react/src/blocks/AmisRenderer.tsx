import React from "react";
import { PropsWithChildren } from "react";

interface AmisRendererProps {
  $schema: object;
  schema: object;
  data: object;
  render: Function; // Amis Render
}


interface AmisRendererState {
  schema: object | null;
}

export class AmisRenderer extends React.Component<PropsWithChildren<AmisRendererProps>, AmisRendererState> {
 
  constructor(props) {

    super(props);
    console.log('props', props)
    this.state = {
      schema: null,
    };
  }

  loadSchema = async () => {
    const { schema } = this.props;
    if (typeof schema === 'function') {
      console.log('loadSchema', schema, this.props);
      const result = await schema(this.props);
      console.log('loadSchema result:', result);
      this.setState({ schema: result });
    } else {
      this.setState({ schema: schema });
    }
  };


  async componentDidMount() {
    await this.loadSchema();
  }


  // async componentDidUpdate(prevProps) {

  //   if (prevProps.schema !== this.props.schema) {
  //     await this.loadSchema();
  //     this.amisScoped.updateSchema(this.state.schema);
  //   }
  //   else if (prevProps.data !== this.props.data) {
  //     await this.loadData();
  //     this.amisScoped.updateProps(this.state.data, () => {
  //       /*更新回调 */
  //     });
  //   }
  // }

  render(): React.ReactNode {
      
    if (!this.state.schema) {
      return <div>Loading Schema...</div>;
    }

    return (
      <>
        {this.props.render('body', this.state.schema)}
      </>
    )
  }
}
