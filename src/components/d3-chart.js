import * as d3 from 'd3';

export default class D3Chart {
  constructor(element) {
    const svg = d3
      .select(element.current)
      .append('svg')
      .attr('width', 500)
      .attr('height', 500);
  }
}
