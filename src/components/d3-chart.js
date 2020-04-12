import * as d3 from 'd3';

/* Sample Data - tallest men
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

const margin = { top: 10, right: 10, bottom: 60, left: 60 };
const width = 800;
const height = 500;

export default class D3Chart {
  constructor(container, gender) {
    const svg = d3
      .select(container)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g').attr('transform', `translate(${margin.left}, ${margin.right})`);

    this.xAxisGroup = svg.append('g').attr('transform', `translate(0, ${height})`);
    this.yAxisGroup = svg.append('g');

    svg
      .append('text')
        .attr('x', width / 2)
        .attr('y', height + 44)
        .attr('text-anchor', 'middle')
        .text("The world's tallest men"); // TODO

    svg
      .append('text')
        .attr('x', -(height / 2))
        .attr('y', -45)
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text('Height in cm');

    this.svg = svg;

    Promise.all([
      d3.json('http://localhost:4000/tallest-men'),
      d3.json('http://localhost:4000/tallest-women'),
    ]).then(([men, women]) => {
      this.data = { men, women };
      this.update(gender)
    }).catch(error => {
      // TODO
      window.alert('Oops! Failed to retrieve data. Is the database running?')
    });
  }

  update(gender) {
    const { svg, xAxisGroup, yAxisGroup } = this;
    const data = this.data[gender];

    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, d => d.height) * 0.95,
        d3.max(data, d => d.height)
      ])
      .range([height, 0]);

    const xAxisGenerate = d3.axisBottom(xScale).tickSize(0).tickPadding(6);
    const yAxisGenerate = d3.axisLeft(yScale);

    xAxisGroup.transition().duration(500).call(xAxisGenerate);
    yAxisGroup.transition().duration(500).call(yAxisGenerate);

    // data join => update selection
    const rects = svg.selectAll('rect').data(data);

    rects
      .exit() // => exit selection
        .attr('opacity', 1)
      .transition().duration(500)
        .attr('y', height)
        .attr('height', 0)
        .attr('opacity', 0)
        .remove();

    rects
      .transition().duration(500)
      .attr('x', d => xScale(d.name))
      .attr('y', d => yScale(d.height))
      .attr('width', xScale.bandwidth)
      .attr('height', d => height - yScale(d.height));

    rects
      .enter() // => enter selection
      .append('rect')
        .attr('x', d => xScale(d.name))
        .attr('y', height)
        .attr('width', xScale.bandwidth)
        .attr('fill', d => '#aaa')
      .transition().duration(500)
        .attr('y', d => yScale(d.height))
        .attr('height', d => height - yScale(d.height));
  }
}
