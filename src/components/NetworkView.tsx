import React from 'react';

interface Props {
  name: string;
}

class NetworkView extends React.Component<Props> {
  render () {
    const { name } = this.props;

    return (
      <div id="networkView">{name}</div>
    )
  }
}

export default NetworkView;
