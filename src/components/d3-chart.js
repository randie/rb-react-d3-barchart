import * as d3 from 'd3';

const data = [20, 12, 16, 25, 10];

export default class D3Chart {
  constructor(element) {
    const svg = d3
      .select(element.current)
      .append('svg')
      .attr('width', 500)
      .attr('height', 500);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 100)
      .attr('y', 50)
      .attr('width', 50)
      .attr('height', d => d * 10)
      .attr('fill', 'lightgrey');
  }
}
