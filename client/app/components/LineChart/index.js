/**
 *
 * LineChart
 *
 */

import React from 'react';
import {Line} from 'react-chartjs-2';

function LineChart({data, label, xAxisLabel, style}) {
  const inputData = {datasets: [{
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: data
  }]};

  return <Line data={inputData} options={{
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom',
                  scaleLabel: {
                    display: true,
                    labelString: xAxisLabel
                  }
              }]
          },
          title: {
              display: true,
              text: label
          },
          legend: {
             display: false
          },
      }}
      height={60}
      style={style}
      />;
}

LineChart.propTypes = {};

export default LineChart;
