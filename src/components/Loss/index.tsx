import React from 'react';
import * as c3 from "c3";
import {chartOptions, networkOptions} from "../../config";

type Props = {
  losses: number[];
}

class LossView extends React.Component<Props> {
  private label: string = 'Loss';
  private selector: string = 'lossView';
  private chart: any = null;

  init () {
    const wrapper = document.getElementById(this.selector);
    const { losses } = this.props;

    if (wrapper) {
      wrapper.innerHTML = '';
    }
    else {
      console.error(`There is no DOM element #${this.selector}`);
    }

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

  componentDidMount () {
    console.log('loss view');
    this.init();
  }

  render () {
    return (
      <div id={this.selector}></div>
    )
  }
}

export default LossView;
