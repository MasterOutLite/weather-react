import React from 'react';
import {Line} from "react-chartjs-2";
import Gradient from 'chartjs-plugin-gradient';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  CategoryScale,
  Chart as ChartJS, ChartData, ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import {ColorSpecification} from "chartjs-plugin-gradient/types/options";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartDataLabels,
  Gradient,
);

export interface TemperatureGraphProps {
  labels: string[],
  values: number[],
  background: ColorSpecification,
}

function TemperatureGraph({values, labels, background}: TemperatureGraphProps) {
  const min = Math.min(...values);
  const add = min < 0 ? Math.abs(min) : 1;
  const adjustedData = values.map(value => value + add);
  const options: ChartOptions<'line'> = {
    plugins: {
      datalabels: {
        anchor: 'center',
        align: 'end',
        offset: -4,
        font: {
          size: 8,
        },
        formatter: (value, context) => {
          const index = context.dataIndex;
          if (context.dataIndex !== 0 && context.dataIndex !== values.length + 1)
            return values[index - 1];
          //return value - add;
          else
            return ''
        },
        display: function (context: any) {
          return context.dataIndex !== 0 && context.dataIndex !== values.length + 1;
        }
      },
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        display: false,
        offset: true,

      },
      x: {
        display: true,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };


  const data: ChartData<'line'> = {
    labels: ['', ...labels, ''],
    datasets: [
      {
        data: [0, ...adjustedData, 0,],
        fill: true,
        tension: 0.4,
        borderColor: 'transparent',
        pointRadius: 0,
        pointHitRadius: 0,
        gradient: {
          backgroundColor: background
        },
      },
    ],
  };

  return <Line data={data} options={options}/>
}

export default TemperatureGraph;
