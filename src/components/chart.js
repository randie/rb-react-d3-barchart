//import React, { useEffect, useRef } from 'react';
import React, { Component, createRef } from 'react';
import D3Chart from './d3-chart';

// const Chart = ({ gender }) => {
//   const chartRef = useRef();
//   let chart = null;

//   useEffect(() => {
//     // FIXME: Assignments to 'chart' will be lost after each render.
//     // To preserve the value over time, store it in a useRef hook
//     // and keep the mutable value in the '.current' property.
//     if (!chart) {
//       chart = new D3Chart(chartRef, gender);
//     } else {
//       chart.update(gender);
//     }

//     return () => {
//       // TODO: clean up
//     };
//   }, [gender]);

//   console.log({ gender }); // TODO: remove

//   // FIXME: How do you make React not rerender this svg?
//   return <svg ref={chartRef}>{/* D3 will render chart here */}</svg>;
// };

class Chart extends Component {
  state = { chart: null };
  svgRef = createRef();

  componentDidMount() {
    this.setState({
      chart: new D3Chart(this.svgRef.current, this.props.gender),
    });
  }

  // FIXME: See https://fb.me/react-unsafe-component-lifecycles
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.state.chart.update(nextProps.gender);
  }

  // FIXME: Is this ok to use?
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <svg ref={this.svgRef}>{/* D3 will render chart here */}</svg>;
  }
}

export default Chart;
