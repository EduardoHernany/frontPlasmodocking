import React, { useEffect, useState } from 'react';
import './styles.css';
import Barchart from '../graficos/BarChart';

function Modal({ resultadoFinal, isOpen, onClose }) {
  const [objetoJson, setObjetoJson] = useState(null);
  const [selectedReceptor, setSelectedReceptor] = useState('');
  const [ligantesParaReceptor, setLigantesParaReceptor] = useState([]);
  const [nameObj, setNameObj] = useState('');
  const [energiaObj, setEnergiaObj] = useState('');

  useEffect(() => {
    if (resultadoFinal) {
      try {
        const json = JSON.parse(resultadoFinal);
        setObjetoJson(json);
      } catch (error) {
        console.error('Erro ao analisar JSON:', error);
      }
    }
  }, [resultadoFinal]);
  

  useEffect(() => {
    // Verifica se objetoJson é nulo ou indefinido antes de continuar
    if (objetoJson) {
      const receptorData = objetoJson.find((item) => item.receptor_name === selectedReceptor);
      const ligantes = receptorData?.ligantes || [];
      setLigantesParaReceptor(ligantes);

      const liganteNames = ligantes.map((ligante) => ligante.ligante_name);
      const liganteEnergias = ligantes.map((ligante) => parseFloat(ligante.ligante_energia));
      setNameObj(liganteNames);
      setEnergiaObj(liganteEnergias);
    }
  }, [selectedReceptor, objetoJson]);

  // Use useEffect para redefinir os estados quando o modal for fechado
  useEffect(() => {
    if (!isOpen) {
      setSelectedReceptor('');
      setLigantesParaReceptor([]);
      setNameObj('');
      setEnergiaObj('');
    }
  }, [isOpen]);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const receptorOptions = objetoJson?.map((item) => item.receptor_name);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedReceptor(selectedValue);
    console.log(objetoJson)
  };

  return isOpen ? (
    <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClickOutside}></div>

      <div className="fixed inset-0 mt-16 z-50 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl"
            style={{ width: '95%' }}
          >
            <div className="bg-white px-4 pb-4  pt-5 sm:p-6 sm:pb-4">
              <div className="fixed top-5 left-5">
                <button onClick={onClose}>Fechar Modal</button>
              </div>
              <div className="mt-6">
                <label htmlFor="receptorSelect">Selecione um receptor:</label>
                <select className="ml-5 mb-5" id="receptorSelect" value={selectedReceptor} onChange={handleSelectChange}>
                  <option value="">Selecione...</option>
                  {receptorOptions &&
                    receptorOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>

              {ligantesParaReceptor.length > 0 && (
                <div>
                  <h2>Ligantes para o receptor selecionado: {selectedReceptor}</h2>
                  <ul>
                    {ligantesParaReceptor.map((ligante, index) => (
                      <li className="my-10" key={index}>
                        {ligante.ligante_name} - Energia: {ligante.ligante_energia}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {objetoJson && <Barchart liganteNames={nameObj} liganteEnergias={energiaObj} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
