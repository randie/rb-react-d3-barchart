import React, { useEffect, useRef } from 'react';
import D3Chart from './d3-chart';

const Chart = ({ gender }) => {
  const chartRef = useRef();
  let chart = null;

  useEffect(() => {
    // FIXME: Assignments to 'chart' will be lost after each render.
    // To preserve the value over time, store it in a useRef hook
    // and keep the mutable value in the '.current' property.
    if (!chart) {
      chart = new D3Chart(chartRef, gender);
    } else {
      chart.update(gender);
    }

    // clean up
    return () => {
      /* TODO */
    };
  }, [gender]);

  console.log({ gender }); // TODO: remove

  // FIXME: How do you make React not rerender this svg?
  return <svg ref={chartRef}>{/* D3 will render chart here */}</svg>;
};

export default Chart;
