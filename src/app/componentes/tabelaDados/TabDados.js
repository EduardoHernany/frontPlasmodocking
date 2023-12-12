import * as React from 'react';

function Dashboard({ resultadoFinal }) {
  

  return (
    <>
      
      <div className="">

        <div className='px-10 bg-white w-auto mx-16 my-10 lg:h-[80vh] overflow-y-scroll border p-4 rounded-lg'>
            
            {resultadoFinal &&
              <div className=''>
                {/* inicio da tabela */}
                {resultadoFinal.map((item, index) => (
                  <div key={index}>
                    <ul className='border-b-2 border-indigo-900 py-0.5 font-semibold flex flex-col items-center'>
                      {item.rmsd_redocking ? 
                      <li  key={0} className=''>Receptor: {item.receptor_name} | Ligante: {item.ligante_original} | 
                            RMSD Redocking: {item.rmsd_redocking} A | Energia: {item.energia_original} 
                            kcal/mol | Gridsize: {item.grid_size} | Gridcenter: {item.grid_center} 
                      </li >
                      :
                      <li  key={0} className=''>Receptor: {item.receptor_name} | Gridsize: {item.grid_size} | Gridcenter: {item.grid_center} </li >
                      }
                    </ul>
                    <div className="text-center flex flex-col items-center  m-auto mt-5">
                      <table className="w-96 ">
                        <thead className='bg-gray-50 border p-4 rounded-lg'>
                          <tr>
                            <th><b>Ligante</b></th>
                            <th><b>Energia</b></th>
                            <th><b>Run</b></th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.ligantes.map((ligante, innerIndex) => (
                            <tr class="bg-white border-b  " key={innerIndex}>
                              <td class="px-6 py-2">{ligante.ligante_name}</td>
                              <td class="px-6 py-2">{ligante.ligante_energia}</td>
                              <td class="px-6 py-2">{ligante.run}</td>
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
      </div>
    </>
  );
}
export default Dashboard;
