import * as c3 from 'c3';
import { chartOptions, networkOptions } from '../config';
import { Dataset } from '../types';

export class Chart {
  private readonly selector: string;
  private chart: any;
  private datasets: string[] = [];

  constructor (selector: string) {
    this.selector = selector;
  }

  public render () {
    this.chart = c3.generate({
      bindto: `#${this.selector} > div[data-name="chart"]`,
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
  }

  public drawLine (datasets: Dataset[]) {
    datasets.forEach(d => this.datasets.push(d.label));
    const columns = datasets.map(d => {
      return [d.label, ...d.data];
    });
    this.chart.load({
      columns,
    });
  }
}
