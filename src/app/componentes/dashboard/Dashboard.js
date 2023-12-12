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
  const [energiaRedocking, setEnergiaRedocking]= useState(0);

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
      setEnergiaRedocking(receptorData?.energia_original)
      // Atualize a chave do componente para forçar a recriação do gráfico
      setChartKey((prevKey) => prevKey + 1);
    }
  }, [selectedReceptor, resultadoFinal, energiaRedocking]);

  const receptorOptions = resultadoFinal?.map((item) => item.receptor_name);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedReceptor(selectedValue);
  };

  return (
    <>
      <div className="">
        <TopCards recOptions={receptorOptions} rec={selectedReceptor} change={handleSelectChange} receptorData={selectedReceptorData} />

        <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-2'> {/* Ajuste para 4 colunas */}
          {resultadoFinal && (
            <div className='md:col-span-3 col-span-1'> {/* Ajuste para 3 colunas */}
              <BarChart key={chartKey} liganteNames={nameObj} liganteEnergias={energiaObj} energiaRedocking={energiaRedocking} style={{ height: '400px' }} /> {/* Defina um estilo para aumentar o tamanho */}
            </div>
          )}
          <div className='md:col-span-1 col-span-1'> {/* Ajuste para 1 coluna */}
            <TabelaLigantes ligantes={ligantesParaReceptor} style={{ height: '400px' }} /> {/* Defina um estilo para aumentar o tamanho */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
