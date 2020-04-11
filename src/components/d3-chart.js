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

export default class D3Chart {
  constructor(element) {
    const svg = d3.select(element.current).append('svg').attr('width', 800).attr('height', 500);

    d3.json(url).then(data => {
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 100)
        .attr('y', 0)
        .attr('width', 50)
        .attr('height', d => d.height)
        .attr('fill', d => 'grey');
    });
  }
}
