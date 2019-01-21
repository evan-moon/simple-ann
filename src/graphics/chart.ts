import * as c3 from 'c3';
import { chartOptions } from 'config';
import { Dataset } from 'types';

export class Chart {
  private readonly selector: string;
  private chart: any;
  private datasets: string[] = [];

  constructor (selector: string) {
    this.selector = selector;
  }

  public render () {
    this.chart = c3.generate({
      bindto: this.selector,
      data: {
        columns: [],
      },
      size: {
        height: 300,
      },
      axis: {
        x: {
          type: 'indexed',
          tick: {
            count: 10,
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

  public drawLine (dataset: Dataset, color: string) {
    this.datasets.push(dataset.label);

    const data: any[] = [dataset.label, ...dataset.data];
    this.chart.load({
      columns: [data],
      colors: {
        [dataset.label]: color,
      },
    });
  }
}
