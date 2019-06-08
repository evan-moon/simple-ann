import React from 'react';

interface Props {
  outputs: number[];
}

class OutputView extends React.Component<Props> {
  render () {
    const { outputs } = this.props;

    return (
      <div id="outputView">결과: {outputs}</div>
    )
  }
}

export default OutputView;
