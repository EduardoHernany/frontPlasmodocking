'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdowns from '../dropdowns/Dropdowns'
import Modal from '../modals/Modal'

function YourComponent({ userName }) {
  const [data, setData] = useState([]);



  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    fetchData(); // Chama a função fetchData para buscar os dados atualizados
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dropdownOptions = [
    { label: 'Deletar', fun: 'delete' },
    { label: 'Baixar', fun: 'baixar' },
    
  ];


  return (
    <div className='bg-white rounded-lg border border-slate-100 mx-80 my-10'>
      <span className='text-black flex justify-center py-5 border-b-2 border-indigo-900'><b>PlasmoDocking - Resultados</b></span>

      <ul role="list" className="divide-y  py-5 px-20 divide-gray-100">
      <li className="flex justify-between gap-x-6 py-5" key={0}>
            <div className="flex min-w-0 gap-x-4 border-b-2 border-indigo-900">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">Processos</p>               
              </div>
            </div>

            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">Status </p>
            </div>
          </li>
        {data.map((item, index) => (
         <li
         className={` flex rounded-lg px-2 my-2 justify-between  gap-x-6 py-2 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-slate-100'}`} key={index}>
            <div className="flex min-w-0 gap-x-4 border-b-2 border-indigo-900">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{item.nome}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.data}</p>
                <p className="text-sm leading-6 text-gray-900">
                
              </p>
              </div>
            </div>
            
            <div className={`hidden shrink-0 sm:flex sm:flex-col sm:items-end border-r-8 rounded-md pr-5 ${item.status ? 'border-green-600' : 'border-red-600'} `}>
              <Dropdowns  options={dropdownOptions} idItem= {item.id} onDeleteSuccess={handleDeleteSuccess} />

              <div>
                <button className="mt-1 w-50 justify-center rounded-md bg-slate-800 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleOpenModal}>Ver Dados</button>

                <Modal resultadoFinal={item.resultado_final} isOpen={isModalOpen} onClose={handleCloseModal} />
              </div>  
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default YourComponent;