import React from 'react';

interface Props {
  logs: string;
}

class LogView extends React.Component<Props> {
  render () {
    const { logs } = this.props;

    return (
      <div id="logView">{logs}</div>
    )
  }
}

export default LogView;
