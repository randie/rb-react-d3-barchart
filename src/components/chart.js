import React, { useEffect, useRef } from 'react';
import D3Chart from './d3-chart';

const Chart = () => {
  const chartRef = useRef();

  useEffect(() => {
    new D3Chart(chartRef);

    // clean up
    return () => {};
  }, []);

  return <div ref={chartRef}></div>;
};

export default Chart;
