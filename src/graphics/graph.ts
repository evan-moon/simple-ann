import { GraphNode, GraphLink } from '../types';
import { chartOptions } from '../config';
import * as d3 from 'd3';

export class Graph {
  private selector: string;
  private nodes: GraphNode[];
  private links: GraphLink[];

  constructor (selector: string, nodes: GraphNode[], links: GraphLink[]) {
    this.selector = selector;
    this.nodes = nodes;
    this.links = links;
  }

  public render () {
    let { height } = chartOptions;
    const width = document.getElementById(this.selector)!.offsetWidth;
    height += 200;

    const svg = d3.select(`#${this.selector}>div[data-name="chart"]`)
      .append('svg:svg')
      .attr('width', width)
      .attr('height', height);
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX())
      .force('y', d3.forceY());
    const g = svg.append('g');
    // .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const link = g.append('g')
      .style('stroke', '#aaa')
      .selectAll('line')
      .data(this.links)
      .enter()
      .append('line');
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(this.nodes)
      .enter()
      .append('circle');
    const label = g.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(this.nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .text((d: GraphNode) => d.name);

    this.links.forEach(link => {
      this.nodes.forEach(n => {
        if (n.id === link.source) {
          link.sourceNode = n;
        } else if (n.id === link.target) {
          link.targetNode = n;
        }
      });
    });

    simulation.nodes(this.nodes).on('tick', () => {
      link.attr('x1', d => d.sourceNode.x)
        .attr('y1', d => d.sourceNode.y)
        .attr('x2', d => d.targetNode.x)
        .attr('y2', d => d.targetNode.y);

      node.attr('r', 15)
        .style('fill', '#d9d9d9')
        .style('stroke', '#969696')
        .style('stroke-width', '1px')
        .attr('cx', d => d.x + 6)
        .attr('cy', d => d.y - 6);

      label.attr('x', d => d.x)
        .attr('y', d => d.y)
        .style('font-size', '14px')
        .style('fill', '#4393c3');
    });
  }

  public destroy () {
    d3.select(`#${this.selector}>div[data-name="chart"]`).select('svg').remove();
  }
};
