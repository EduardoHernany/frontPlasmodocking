import React from 'react'
import Skleton from '../../skeletons/Skletons'

const TopCards = ({recOptions ,rec ,change, receptorData}) => {
    
  return (
    <div className='grid lg:grid-cols-5 gap-4 p-4 '>
        <div className='bg-white  w-full border p-4 rounded-lg'>
            <label htmlFor="receptorSelect" className="block ml-2 font-semibold">Selecione um receptor:</label>
            <select
            className="block ml-2 py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            id="receptorSelect"
            value={rec}
            onChange={change}
            >
            <option value="">Selecione...</option>
            {recOptions &&
                recOptions.map((option, index) => (
                <option className='p-3' key={index} value={option}>
                    {option}
                </option>
                ))}
            </select>
        </div>
        <div className='lg:col-span-2 col-span-2 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                { receptorData ? 
                    <div>
                        <p className='text-left border-b-2 border-indigo-900  text-xl font-semibold'>Macrolmolecula: { receptorData.receptor_name }</p>
                        {receptorData.ligante_original ?
                        <>
                            <p className='text-left pt-2 text-gray-600'>Ligante Redocking: { receptorData.ligante_original }</p>
                            <p className='text-left text-gray-600'>Energia Redocking: { receptorData.energia_original }</p>
                            </>
                            : <p className='text-left pt-2 text-gray-600'> Processo sem validação Redocking.</p>
                        }
                    </div>
                
                : <div>
                    <span className='text-black font-semibold text-lg'>Macrolmolecula</span>
                    <Skleton/>
                    <Skleton/>
                </div>  
                }
            </div>
            
        </div>
        <div className='lg:col-span-2 col-span-2 bg-white flex justify-between w-full border p-4 rounded-lg'>
            
            { receptorData ?
                <div className='flex flex-col w-full pb-4'>
                    <span className='text-left text-black border-b-2 border-indigo-900 font-semibold text-xl'>GriBox Parametros</span>
                    <span className='text-left text-gray-600 pt-2 text-lg'>Size: {receptorData ? receptorData.grid_size : 'teste'} </span>
                    <span className='text-left text-gray-600 text-lg'>center: {receptorData ? receptorData.grid_center : 'teste'}</span>
                </div>
            :   <div>
                <span className='text-black font-semibold text-lg'>Macrolmolecula</span>
                    <Skleton/>
                    <Skleton/>
                </div>  

            }
            
           
        </div>
        
    </div>
  )
}

export default TopCards