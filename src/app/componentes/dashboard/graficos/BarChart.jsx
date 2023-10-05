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

  // Processa os dados para garantir que todos estejam no intervalo entre -5 e 5
  const processedEnergias = liganteEnergias.map((energia) =>
    Math.min(Math.max(energia, -maxBarHeight), maxBarHeight)
  );

  // Função para determinar a cor da barra com base no valor da energia
  const getBarColor = (energia) => (energia < 0 ? 'rgb(38, 53, 84,0.9)' : 'rgb(102, 41, 128,0.8)');

  const [chartData, setChartData] = useState({
    labels: liganteNames,
    datasets: [
      {
        label: 'Energia',
        data: processedEnergias, // Use os valores processados
        backgroundColor: processedEnergias.map(getBarColor), // Use a função para definir as cores
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
    scales: {
      x:{ticks: {
        font: {
          weight: 'bold', // Aplica negrito aos números do eixo Y
        },
      },
    },
      y: {
        beginAtZero: true,
        max: maxBarHeight, // Defina o valor máximo no eixo Y
        ticks: {
          font: {
            weight: 'bold', // Aplica negrito aos números do eixo Y
          },
        },
      },
    },
  });

  useEffect(() => {
    setChartData({
      labels: liganteNames,
      datasets: [
        {
          label: 'Energia',
          data: processedEnergias, // Use os valores processados
          backgroundColor: processedEnergias.map(getBarColor), // Use a função para definir as cores
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
