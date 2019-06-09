import React from 'react';
import { GraphNode, GraphLink } from '../../types/index';
import { chartOptions } from '../../config/index';
import * as d3 from "d3";

interface Props {
  nodes: GraphNode[];
  links: GraphLink[];
}

class NetworkView extends React.Component<Props> {
  private selector: string = 'networkView';

  componentDidMount () {
    const { nodes, links } = this.props;

    let { height } = chartOptions;
    const width = document.getElementById(this.selector)!.offsetWidth;
    height += 200;

    const svg = d3.select(`#${this.selector}`)
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
      .data(links)
      .enter()
      .append('line');
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle');
    const label = g.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .text((d: GraphNode) => d.name);

    links.forEach(link => {
      nodes.forEach(n => {
        if (n.id === link.source) {
          link.sourceNode = n;
        } else if (n.id === link.target) {
          link.targetNode = n;
        }
      });
    });

    simulation.nodes(nodes).on('tick', () => {
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

  componentWillUnmount () {
    d3.select(`#${this.selector}>div[data-name="chart"]`).select('svg').remove();
  }

  render () {
    return (
      <div id="networkView"></div>
    )
  }
}

export default NetworkView;
