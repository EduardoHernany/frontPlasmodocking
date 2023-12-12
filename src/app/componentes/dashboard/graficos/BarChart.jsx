import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  Tooltip,
  Legend,
  PointElement
);

const MAX_BAR_HEIGHT = 14.5;
const MIN_Y_VALUE = -15;
const MAX_Y_VALUE = 15;

const chartOptions = {
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Macromolecula' },
  },
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: { ticks: { font: { weight: 'bold' } } },
    y: {
      beginAtZero: true,
      min: MIN_Y_VALUE,
      max: MAX_Y_VALUE,
      ticks: { font: { weight: 'bold' } },
      grid: {
        drawBorder: false,
        color: function(context) {
          if (context.tick.value === 0) {
            return 'rgba(0, 0, 0, 0.5)'; // Cor para a linha do valor 0
          } else {
            return 'rgba(0, 0, 0, 0.1)'; // Cor para as outras linhas
          }
        },
        lineWidth: function(context) {
          return context.tick.value === 0 ? 2 : 1; // Largura da linha para o valor 0
        },
      },
    },
  },
};


const BarChart = ({ liganteNames, liganteEnergias, chartKey, energiaRedocking }) => {
  const chartData = useMemo(() => {
    const datasets = [];
  
    const positiveEnergias = liganteEnergias.map(energia => energia > 0 ? energia : null);
    const negativeEnergias = liganteEnergias.map(energia => energia < 0 ? energia : null);
  
    if (positiveEnergias.some(energia => energia !== null)) {
      datasets.push({
        type: 'bar',
        label: 'Energia Positiva',
        data: positiveEnergias,
        backgroundColor: 'rgba(0, 0, 255, 0.8)',
      });
    }
  
    if (negativeEnergias.some(energia => energia !== null)) {
      datasets.push({
        type: 'bar',
        label: 'Energia Negativa',
        data: negativeEnergias,
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
      });
    }
  
    if (energiaRedocking !== undefined) {
      datasets.push({
        type: 'line',
        label: `Menor energia Redocking: ${energiaRedocking}`,
        data: Array(liganteNames.length).fill(energiaRedocking),
        backgroundColor: 'rgba(0, 0, 0, 1)',
        fill: false,
        borderColor: 'rgb(0,0,0)',
        borderWidth: 3,
        borderDash: [3, 5],
        pointStyle: false,
      });
    }
  
    return {
      labels: liganteNames,
      datasets,
    };
  }, [liganteNames, liganteEnergias, energiaRedocking]);
  

  return (
    <div className='w-full md:col-span-2 relative lg:h-[60vh] h-[50vh] m-auto mt-0 p-4 border rounded-lg bg-white'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

BarChart.propTypes = {
  liganteNames: PropTypes.array.isRequired,
  liganteEnergias: PropTypes.array.isRequired,
  chartKey: PropTypes.any,
  energiaRedocking: PropTypes.number,
};

export default BarChart;
