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
      .style('stroke', '#ffffff')
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

      node.attr('r', 12)
        .style('fill', 'transparent')
        .style('stroke', '#ffffff')
        .style('stroke-width', '1px')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      label.attr('x', d => d.x - 15)
        .attr('y', d => d.y - 17)
        .style('font-size', '12px')
        .style('fill', '#ffffff');
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
