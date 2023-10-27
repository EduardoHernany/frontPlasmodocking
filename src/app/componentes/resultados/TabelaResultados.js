'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdowns from '../dropdowns/Dropdowns'
import Modal from '../modals/Modal'
import Skleton from '../skeletons/Skletons'
import Toast from '../alerts/Toast'

function YourComponent({ userName }) {
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]); // Estado para armazenar os alertas

  // Função para adicionar um alerta à lista de alertas
  const addAlert = (type, message) => {
    const newAlerts = [...alerts, { type, message }];

    // Limite a lista de alertas a, por exemplo, 3 alertas para evitar sobrecarga
    if (newAlerts.length > 3) {
      newAlerts.shift();
    }

    setAlerts(newAlerts);
  };

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/VS_doking2/?username=${userName}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDeleteSuccess = () => {
    addAlert('success', 'Operação bem-sucedida!')
    fetchData(); // Chama a função fetchData para buscar os dados atualizados
    setIsModalOpen(false);

  };

  useEffect(() => {
    fetchData();
  }, []);
  const dropdownOptions = [
    { label: 'Deletar', action: 'delete' },
    { label: 'Baixar', action: 'download' },
    { label: 'Ver Dashboard', link: '/resultados/dados?id=' },
    { label: 'Ver Tabela', link: '/resultados/tabela?id=' },
  ];



  return (
    <div className='bg-white rounded-lg border border-slate-100 mx-80 my-10 min-h-[70vh]'>

      <span className='text-black flex justify-center py-5 border-b-2 border-indigo-900'><b>PlasmoDocking - Resultados</b></span>

      <ul role="list" className="divide-y  py-5 px-20 divide-gray-100">
        <li className="flex justify-between gap-x-6 py-5" key={0}>
          <div className="flex min-w-0 gap-x-4 border-b-2 border-indigo-900">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">Processos: {data.length === 0 ? 'Sem processos executados' : ''}</p>
            </div>
          </div>

          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">Status </p>
          </div>
        </li>

        {data.length > 0 ?
          data.map((item, index) => (
            <li
              className={` flex rounded-lg px-2 my-2 justify-between  gap-x-6 py-2 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-slate-100'}`} key={index}>
              <div className="flex min-w-0 gap-x-4 border-b-2 border-indigo-900">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm flex font-semibold leading-6 text-gray-900">{item.nome}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item?.formatted_data}</p>
                  <p className="text-sm leading-6 text-gray-900">

                  </p>
                </div>
              </div>

              <div className={`hidden shrink-0 sm:flex sm:flex-col sm:items-end border-r-8 rounded-md pr-5 ${item.status ? 'border-green-600' : 'border-red-600'} `}>
                <Dropdowns options={dropdownOptions} idItem={item.id} onDeleteSuccess={handleDeleteSuccess} />
                <p className="mt-1 truncate text-xs leading-5 text-gray-500" >{item?.type}</p>
              </div>
            </li>
          )) :
          <div>
            {Array(3).fill().map((_, index) => (
              <li
                className={` flex rounded-lg px-2 my-2 justify-between  gap-x-6 py-2 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-slate-100'}`} key={index}>
                <div className="flex min-w-0 gap-x-4 border-b-2 border-indigo-900">
                  <div className="min-w-0 flex-auto">
                    <Skleton />
                    <Skleton />
                    <p className="text-sm leading-6 text-gray-900">

                    </p>
                  </div>
                </div>

                <div className={`hidden shrink-0 sm:flex sm:flex-col sm:items-end border-r-8 rounded-md pr-5 `}>

                </div>
              </li>
            ))}
          </div>

        }
      </ul>

      {/* Renderize os alertas */}
      {alerts.map((alert, index) => (
        <Toast
          key={index}
          type={alert.type}
          message={alert.message}
          onClose={() => {
            const newAlerts = [...alerts];
            newAlerts.splice(index, 1);
            setAlerts(newAlerts);
          }}
        />
      ))}

    </div>
  );
}

export default YourComponent;