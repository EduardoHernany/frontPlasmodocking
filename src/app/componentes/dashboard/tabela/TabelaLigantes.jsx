import React from 'react';
import { data } from '../data/data.js';
import { FaShoppingBag } from 'react-icons/fa';
import { TbBrandReact } from "react-icons/tb";

const TabelaLigantes = ({ligantes}) => {

  return (
    <div className='w-full col-span-1 relative lg:h-[60vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
      
      <ul>
        {ligantes.map((ligante, id) => (
          <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
            <div className='bg-purple-100 rounded-lg p-3'>
              <TbBrandReact className='text-purple-800' />
            </div>
            <div className='pl-4'>
              <p className='text-gray-800 '>Ligante: {ligante.ligante_name}</p>
              <p className='text-gray-400 text-sm'>Run: {ligante.run}</p>
            </div>
            <p className='lg:flex md:hidden absolute right-6 text-sm'>Energia: {ligante.ligante_energia}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabelaLigantes;
