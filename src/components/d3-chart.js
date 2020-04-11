import * as d3 from 'd3';

const url = 'http://localhost:4000/ages';

export default class D3Chart {
  constructor(element) {
    const svg = d3.select(element.current).append('svg').attr('width', 500).attr('height', 500);

    d3.json(url).then(data => {
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 100)
        .attr('y', 50)
        .attr('width', 50)
        .attr('height', d => d.age * 10)
        .attr('fill', d => (d.age > 10 ? 'red' : 'green'));
    });
  }
}
