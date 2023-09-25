import React from 'react'

const TopCards = ({recOptions ,rec ,change, receptorData}) => {
    console.log(receptorData)
  return (
    <div className='grid lg:grid-cols-5 gap-4 p-4'>
        <div className='bg-white  w-full border p-4 rounded-lg'>
            <label htmlFor="receptorSelect" className="block ml-5 font-semibold">Selecione um receptor:</label>
            <select
            className="ml-5 mb-5 mt-1 border rounded px-3 py-2 w-48"
            id="receptorSelect"
            value={rec}
            onChange={change}
            >
            <option value="">Selecione...</option>
            {recOptions &&
                recOptions.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
                ))}
            </select>
        </div>
        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                
                <p className='text-2xl font-bold'>{receptorData ? receptorData.receptor_name : 'teste'}</p>
                <p className='text-gray-600'>Ligante original: {receptorData ? receptorData.ligante_original : 'teste'}</p>
                <p className='text-gray-600'>Energia original: {receptorData ? receptorData.energia_original : 'teste'}</p>
            </div>
            <p className='bg-green-200 flex flex-col justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>GriBoxparametros</span>
                <span className='text-green-700 text-lg'>Size: {receptorData ? receptorData.grid_size : 'teste'} </span>
                <span className='text-green-700 text-lg'>center: {receptorData ? receptorData.grid_center : 'teste'}</span>
            </p>
        </div>
        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>$1,437,876</p>
                <p className='text-gray-600'>YTD Revenue</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+11%</span>
            </p>
        </div>
        
    </div>
  )
}

export default TopCards