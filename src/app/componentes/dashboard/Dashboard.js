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

      console.log(ligantes)

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
            {resultadoFinal &&
              <div className='mt-20'>
                {/* inicio da tabela */}
                {resultadoFinal.map((item, index) => (
                  <div key={index}>
                    <ul>
                      <span className='border-b-2 border-indigo-900 py-0.5'>Receptor: {item.receptor_name} | Ligante: {item.ligante_original} | 
                            RMSD Redocking: {item.rmsd_redocking} A | Energia: {item.energia_original} 
                            kcal/mol | Gridsize: {item.grid_size} | Gridcenter: {item.grid_center} 
                      </span>
                    </ul>
                    <div className="text-center  m-auto mt-5">
                      <table className="bordered striped centered gap-2.5">
                        <thead>
                          <tr>
                            <th><b>Ligante</b></th>
                            <th><b>Energia</b></th>
                            <th><b>Run</b></th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.ligantes.map((ligante, innerIndex) => (
                            <tr key={innerIndex}>
                              <td>{ligante.ligante_name}</td>
                              <td>{ligante.ligante_energia}</td>
                              <td>{ligante.run}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <br/><br/><br/>
                  </div>
                ))}
                {/* fim da tabela */}
              </div>
}
      </div>
    </>
  );
}
export default Dashboard;
