import React from 'react';
import * as c3 from "c3";
import {chartOptions, networkOptions} from "../../config/index";

type Props = {
  outputs: number[][];
}

class OutputView extends React.Component<Props> {
  private label: string = 'Output';
  private selector: string = 'outputView';
  private chart: any = null;

  init () {
    const wrapper = document.getElementById(this.selector);
    const { outputs } = this.props;

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
        pattern: ['#48cfad', '#7986cb', '#e8eaf6', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
      }
    });

    const columns: any[] = outputs.map((data: number[], index: number) => {
      return [`${this.label}${index}`, ...data];
    });
    this.chart.load({ columns });
  }

  componentDidMount () {
    this.init();
  }

  render () {
    return (
      <div id={this.selector}></div>
    )
  }
}

export default OutputView;
