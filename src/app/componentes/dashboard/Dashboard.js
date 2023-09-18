import * as React from 'react';
import { useEffect, useState } from 'react';
import BarChart from '../graficos/BarChart';

function Dashboard({ resultadoFinal }) {
  const [selectedReceptor, setSelectedReceptor] = useState('');
  const [ligantesParaReceptor, setLigantesParaReceptor] = useState([]);
  const [nameObj, setNameObj] = useState([]);
  const [energiaObj, setEnergiaObj] = useState([]);

  useEffect(() => {
    // Verifica se objetoJson é nulo ou indefinido antes de continuar
    if (resultadoFinal) {
      const receptorData = resultadoFinal.find((item) => item.receptor_name === selectedReceptor);
      const ligantes = receptorData?.ligantes || [];
      setLigantesParaReceptor(ligantes);

      const liganteNames = ligantes.map((ligante) => ligante.ligante_name);
      const liganteEnergias = ligantes.map((ligante) => parseFloat(ligante.ligante_energia));

      setNameObj(liganteNames);
      setEnergiaObj(liganteEnergias);
    }
  }, [selectedReceptor, resultadoFinal]);

  const receptorOptions = resultadoFinal?.map((item) => item.receptor_name);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedReceptor(selectedValue);
  };

  return (
    <>
      Dashboard
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

        {resultadoFinal && <BarChart key={selectedReceptor} liganteNames={nameObj} liganteEnergias={energiaObj}  />}

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
      </div>
    </>
  );
}
export default Dashboard;
