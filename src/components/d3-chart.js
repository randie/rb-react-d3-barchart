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
  constructor(element) {
    const svg = d3
      .select(element.current)
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.right})`);

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

    this.xAxisGroup = svg.append('g').attr('transform', `translate(0, ${height})`);
    this.yAxisGroup = svg.append('g');

    this.svg = svg;

    Promise.all([
      d3.json('http://localhost:4000/tallest-men'),
      d3.json('http://localhost:4000/tallest-women'),
    ]).then(data => {
      let i = 0;
      this.update(data[i]);
      d3.interval(() => {
        // i will alternate between 0 and 1, alternating the
        // data between tallest men and tallest women
        i = (i + 1) % 2;
        this.update(data[i]);
      }, 1000);
    });
  }

  update(data) {
    const { svg, xAxisGroup, yAxisGroup } = this;

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
        .attr('fill', d => 'grey')
      .transition().duration(500)
        .attr('y', d => yScale(d.height))
        .attr('height', d => height - yScale(d.height));
  }
}
