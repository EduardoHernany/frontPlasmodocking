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
  const [selectedReceptorData, setSelectedReceptorData] = useState(null); // Adicione esta variável

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

       // Defina a variável selectedReceptorData com o objeto correspondente
       setSelectedReceptorData(receptorData);
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
          
          {resultadoFinal && 
            <BarChart key={selectedReceptor} liganteNames={nameObj} liganteEnergias={energiaObj}  />}
            <TabelaLigantes ligantes={ligantesParaReceptor} />
        </div>
      </div>
    </>
  );
}
export default Dashboard;
