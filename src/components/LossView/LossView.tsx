import React from 'react';
import * as c3 from "c3";
import {chartOptions, networkOptions} from "../../config";

interface Props {
  losses: number[];
}

class LossView extends React.Component<Props> {
  private label: string = 'Loss';
  private selector: string = 'lossView';
  private chart: any = null;

  componentDidMount () {
    const { losses } = this.props;

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
            count: networkOptions.learningLimit / 50,
            format: function (x) {
              const number = Number(x);
              return Math.round(number);
            },
          },
        },
      },
      point: {
        show: false,
      },
      color: {
        pattern: ['#ffffff']
      }
    });

    const columns: any[] = [
      [this.label, ...losses]
    ];
    this.chart.load({ columns });
  }

  render () {
    return (
      <div id="lossView"></div>
    )
  }
}

export default LossView;
