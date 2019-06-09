import React from 'react';
import * as c3 from "c3";
import {chartOptions, networkOptions} from "../../config/index";

interface Props {
  outputs: number[][];
}

class OutputView extends React.Component<Props> {
  private label: string = 'Output';
  private selector: string = 'outputView';
  private chart: any = null;

  componentDidMount () {
    const { outputs } = this.props;

    this.chart = c3.generate({
      bindto: `#${this.selector}`,
      data: {
        columns: [],
      },
      size: {
        height: chartOptions.height,
      },
      axis: {
        x: {
          type: 'indexed',
          tick: {
            count: networkOptions.learningLimit,
          },
        },
        y: {
          min: 0,
        },
      },
      point: {
        show: false,
      },
    });

    const columns: any[] = outputs.map((data: number[], index: number) => {
      return [`${this.label}${index}`, ...data];
    });
    this.chart.load({ columns });
  }

  render () {
    const { outputs } = this.props;

    return (
      <div id="outputView">결과: {outputs}</div>
    )
  }
}

export default OutputView;
