import * as d3 from 'd3';

const url = 'http://localhost:4000/tallestMen';

/* Sample Data from the above url
[
  {
    "height": "272",
    "name": "Robert Wadlow"
  },
  {
    "height": "267",
    "name": "John Rogan"
  },
  {
    "height": "263.5",
    "name": "John Carroll"
  },
  {
    "height": "257",
    "name": "Leonid Stadnyk"
  },
  {
    "height": "251.4",
    "name": "Väinö Myllyrinne"
  }
]]
*/

const WIDTH = 800;
const HEIGHT = 500;

export default class D3Chart {
  constructor(element) {
    const svg = d3
      .select(element.current)
      .append('svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

    d3.json(url).then(data => {
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.height)])
        .range([0, HEIGHT]);

      const xScale = d3
        .scaleBand()
        .domain(data.map(d => d.name))
        .range([0, WIDTH])
        .padding(0.4);

      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.name))
        .attr('y', d => HEIGHT - yScale(d.height))
        .attr('width', xScale.bandwidth)
        .attr('height', d => yScale(d.height))
        .attr('fill', d => 'grey');
    });
  }
}
