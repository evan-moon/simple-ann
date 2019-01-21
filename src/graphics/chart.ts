import * as d3 from 'd3';
import { chartOptions } from 'config';

export class Chart {
  private selector: any;

  constructor (selector) {
    this.selector = d3.select(selector);
  }

  protected initRenderer () {
    const svgSize = { w: chartOptions.width, h: chartOptions.height };
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const size = {
      w: svgSize.w - margin.left - margin.right,
      h: svgSize.h - margin.top - margin.bottom,
    };
    console.log(svgSize, size);

    const svg = this.selector.append('svg:svg')
      .attr('width', svgSize.w)
      .attr('height', svgSize.h);
    const wrapperGroup = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.right})`);
    const x = d3.scaleLinear().rangeRound([0, size.w]);
    const y = d3.scaleLinear().rangeRound([size.h, 0]);

    return { svg, wrapperGroup, x, y, size };
  }
}
