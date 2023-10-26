import React, { useState, useEffect } from 'react';
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
const BarChart = ({ liganteNames, liganteEnergias, chartKey }) => {
  // Limite máximo para a altura das barras
  const maxBarHeight = 15;

  // Processa os dados para garantir que nenhum valor exceda maxBarHeight
  const processedEnergias = liganteEnergias.map((energia) => Math.min(energia, maxBarHeight));

  // Verifique se há valores de energia negativos em processedEnergias
  const hasNegativeEnergy = processedEnergias.some((energia) => energia < 0);

  // Determine o mínimo com base na presença de valores negativos
  const minY = hasNegativeEnergy
    ? Math.trunc(Math.min(...processedEnergias) - 2)
    : -2;

  // Função para determinar a cor da barra com base no valor da energia
  const getBarColor = (energia) => (energia < 0 ? 'rgb(38, 53, 84,0.8)' : 'rgb(102, 41, 128,0.8)');
 
  const [chartData, setChartData] = useState({
    labels: liganteNames,
    datasets: [
      {
        type: 'bar', // Usar "bar" para o gráfico de barra
        label: 'Energia',
        data: processedEnergias,
        backgroundColor: processedEnergias.map(getBarColor),
      },
      {
        type: 'line', // Usar "line" para o gráfico de linha
        label: 'Linha de Exemplo',
        data: Array(liganteNames.length).fill(-10), // Valores constantes de -10 para o gráfico de linha
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        fill: false,
        pointStyle: false, 
      },
    ],
  });
  
  useEffect(() => {
    setChartData({
      labels: liganteNames,
      datasets: [
        {
          type: 'bar',
          label: 'Energia',
          data: processedEnergias,
          backgroundColor: processedEnergias.map(getBarColor),
        },
        {
          type: 'line',
          label: 'Menor energia Redocking',
          data: Array(liganteNames.length).fill(-10),
          backgroundColor: 'rgb(255, 99, 132, 0.5)', 
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
          fill: false,
          pointStyle: false, // Remover os pontos do gráfico de linha
        },
      ],
    });
  }, [liganteNames, liganteEnergias, chartKey]); 

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
      x: {
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        min: -16, // Defina o valor mínimo no eixo Y com base no cálculo acima
        max: 16,
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
    },
  });



  return (
    <div className='w-full md:col-span-2 relative lg:h-[60vh] h-[50vh] m-auto mt-0 p-4 border rounded-lg bg-white'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
