import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ liganteNames, liganteEnergias }) => {
  // Limite máximo para a altura das barras
  const maxBarHeight = 5;

  // Processa os dados para garantir que nenhum valor exceda maxBarHeight
  const processedEnergias = liganteEnergias.map((energia) => Math.min(energia, maxBarHeight));

  const [chartData, setChartData] = useState({
    labels: liganteNames,
    datasets: [
      {
        label: 'Energia',
        data: processedEnergias, // Use os valores processados
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgb(107, 33, 168)',
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Macromolecula',
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  });

  useEffect(() => {
    setChartData({
      labels: liganteNames,
      datasets: [
        {
          label: 'Energia',
          data: processedEnergias, // Use os valores processados
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgb(107, 33, 168)',
        },
      ],
    });
  }, [liganteNames, liganteEnergias]);

  return (
    <div className='w-full md:col-span-2 relative lg:h-[60vh] h-[50vh] m-auto mt-0 p-4 border rounded-lg bg-white'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;