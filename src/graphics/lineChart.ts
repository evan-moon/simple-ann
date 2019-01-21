import { Chart } from 'graphics/chart';
import { Dataset } from 'types';
import * as d3 from 'd3';

export class LineChart extends Chart {
  constructor (selector) {
    super(selector);
  }

  public render (dataset: Dataset, color: string) {
    const chart = this.initRenderer();
    const x = chart.x;
    const y = chart.y;
    const g = chart.wrapperGroup;
    const height = chart.size.h;

    const line = d3.line()
      .x((d: any) => x(d.count))
      .y((d: any) => y(d.value));

    x.domain(d3.extent(dataset.values, d => d.count));
    y.domain(d3.extent(dataset.values, d => d.value));

    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .append('text')
      .attr('fill', '#000')
      .attr('x', -10)
      .attr('y', 10)
      .attr('text-anchor', 'end')
      .text(dataset.label.x);

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text(dataset.label.y);

    g.append('path')
      .datum(dataset.values)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }
}
