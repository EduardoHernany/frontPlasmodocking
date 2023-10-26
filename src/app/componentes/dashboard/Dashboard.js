import * as React from 'react';
import { useEffect, useState } from 'react';
import BarChart from './graficos/BarChart';
import TabelaLigantes from './tabela/TabelaLigantes'
import TopCards from './cards/TopCards'

function Dashboard({ resultadoFinal }) {
  const [selectedReceptor, setSelectedReceptor] = useState('');
  const [ligantesParaReceptor, setLigantesParaReceptor] = useState([]);
  const [nameObj, setNameObj] = useState([]);
  const [energiaObj, setEnergiaObj] = useState([]);
  const [selectedReceptorData, setSelectedReceptorData] = useState(null);
  const [chartKey, setChartKey] = useState(0); // Adicione uma chave de componente

  useEffect(() => {
    if (resultadoFinal) {
      const receptorData = resultadoFinal.find((item) => item.receptor_name === selectedReceptor);
      const ligantes = receptorData?.ligantes || [];
      setLigantesParaReceptor(ligantes);

      const liganteNames = ligantes.map((ligante) => ligante.ligante_name);
      const liganteEnergias = ligantes.map((ligante) => parseFloat(ligante.ligante_energia));

      setNameObj(liganteNames);
      setEnergiaObj(liganteEnergias);

      setSelectedReceptorData(receptorData);

      // Atualize a chave do componente para forçar a recriação do gráfico
      setChartKey((prevKey) => prevKey + 1);
    }
  }, [selectedReceptor, resultadoFinal]);

  const receptorOptions = resultadoFinal?.map((item) => item.receptor_name);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedReceptor(selectedValue);
  };

  return (
    <>
      <div className="">
        <TopCards recOptions={receptorOptions} rec={selectedReceptor} change={handleSelectChange} receptorData={selectedReceptorData} />

        <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
          {resultadoFinal && (
            <BarChart key={chartKey} liganteNames={nameObj} liganteEnergias={energiaObj} />
          )}
          <TabelaLigantes ligantes={ligantesParaReceptor} />
        </div>
      </div>
    </>
  );
}
export default Dashboard;
