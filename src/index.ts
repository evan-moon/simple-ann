import 'src/styles';
import { networkOption } from 'config';
import { Network } from 'lib/network';
import * as d3 from 'd3';

function init () {
  console.log('Network leaning Start');
  // generate randomic inputs
  const inputs: number[] = [];
  const targets: number[] = networkOption.targets;
  for (let i = 0; i < targets.length; i++) {
    inputs.push(Math.random() + targets[i]);
  }

  // generate network
  const network = new Network(targets, inputs);
  network.createNodes(networkOption.layerCount, networkOption.nodePerLayer);
  network.setLearningRate(networkOption.learningRate);

  // chart dataset
  const errors = [];
  const results = [];

  for (let i = 0; i < networkOption.learningLimit; i++) {
    network.forwardPropagation();
    network.backPropagation();
    errors.push({ index: i, error: network.getError() });
    results.push({ index: i, result: network.getResults() });
    console.log(`[${i}] Error: ${network.getError()}`);
  }
  console.log(results);

  console.log('============================== Result ==================================');
  console.log('Loss: ', network.getError());
  console.log('Inputs: ', inputs);
  console.log('Outputs: ', network.getResults());
  console.log('Targets: ', targets);
  console.log('========================================================================');

  // Render chart
  function draw () {
    const svgWidth = 600;
    const svgHeight = 600;
    const margin = { top: 10, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select('#loss-rate')
      .append('svg:svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.right})`);

    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const line = d3.line()
      .x((d: any) => x(d.index))
      .y((d: any) => y(d.error));

    x.domain(d3.extent(errors, d => d.index));
    y.domain(d3.extent(errors, d => d.error));

    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Loss');

    g.append('path')
      .datum(errors)
      .attr('fill', 'none')
      .attr('stroke', '#fa5963')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }
  draw();
}

init();
