// components/Modal.js

import React from 'react';
import { useEffect, useState } from 'react';
import './styles.css'

function Modal({ resultadoFinal, isOpen, onClose }) {

    const [objetoJson, setObjetoJson] = useState(null);

    // Use o useEffect para fazer a conversão quando o componente for montado
    useEffect(() => {
      try {
        const json = JSON.parse(resultadoFinal);
        setObjetoJson(json);
      } catch (error) {
        console.error('Erro ao analisar JSON:', error);
      }
    }, [resultadoFinal]);
  


    const handleClickOutside = (e) => {
        if (e.target === e.currentTarget) {
        onClose();
        }
    };

    if (!isOpen) {
        return null;
    }



    

    return (
      <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed  inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClickOutside}></div>
    
      <div className="fixed inset-0 mt-20 z-50 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl" style={{ width: '80%' }}>
            <div className="bg-white px-4 pb-4  pt-5 sm:p-6 sm:pb-4">
              <div className="fixed top-5 left-5">  
                <button  onClick={onClose}>Fechar Modal</button>
              </div>
              <div className='mt-20'>
                {/* inicio da tabela */}
                {objetoJson.map((item, index) => (
                  <div key={index}>
                    <ul>
                      <li className='border-b-2 border-indigo-900 rounded-t-lg bg-indigo-100 p-0.5'>Receptor: {item.receptor_name} | Ligante: {item.ligante_original} | 
                            RMSD Redocking: {item.rmsd_redocking} A | Energia: {item.energia_original} 
                            kcal/mol | Gridsize: {item.grid_size} | Gridcenter: {item.grid_center} 
                      </li>
                      <div className='flex justify-center'>
                        <table className='mt-5'>
                          <tr>
                            <th>ligante</th>
                            <th>Energia encontrada</th>
                            <th>Run</th>
                          </tr>

                          {item.ligantes.map((ligante, innerIndex) => (
                            <tr key={innerIndex}>
                              <td>{ligante.ligante_name}</td>
                              <td>{ligante.ligante_energia}</td>
                              <td>{ligante.run}</td>
                            </tr>
                          ))}

                        </table>
                      </div>

                      
                    </ul>
                    
                    <br/><br/><br/>
                  </div>
                ))}
                {/* fim da tabela */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    );
}

export default Modal;
