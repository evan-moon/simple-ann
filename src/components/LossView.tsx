import React from 'react';

interface Props {
  losses: number[];
}

class LossView extends React.Component<Props> {
  render () {
    const { losses } = this.props;

    return (
      <div id="lossView">로스: {losses}</div>
    )
  }
}

export default LossView;
