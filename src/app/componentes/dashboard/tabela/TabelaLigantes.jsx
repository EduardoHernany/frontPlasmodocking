import React from 'react';
import { data } from '../data/data.js';
import { FaShoppingBag } from 'react-icons/fa';
import { TbBrandReact } from "react-icons/tb";
import { RiReactjsFill } from "react-icons/ri";
import Skleton from '../../skeletons/Skletons'
import { CiCircleCheck, CiCircleAlert , CiCircleRemove } from "react-icons/ci";


const TabelaLigantes = ({ligantes}) => {
console.log(ligantes.length)
  return (
    <div className='w-full col-span-1 relative lg:h-[60vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-y-scroll'>
      <span className='text-black border-b-2 border-indigo-900 font-semibold text-xl'>Ligantes: </span>

      {ligantes.length > 0 ?
          
        <ul>
          {ligantes.map((ligante, id) => (
            <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
              <div className='bg-purple-100 rounded-lg p-3'>
                <RiReactjsFill className='text-purple-800' />
              </div>
              <div className='pl-4'>
                <p className='text-gray-800 '> {ligante.ligante_name}</p>
                <p className='text-gray-400 text-sm'>Run: {ligante.run}</p>
              </div>
              <p className='lg:flex md:hidden absolute text-gray-800 right-6 text-sm'>Energia: {ligante.ligante_energia}</p>
            </li>
          ))}
        </ul>
        : <div>
           {Array(5).fill().map((_, index) => (


              <li key={index} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
              <div className='bg-purple-100 rounded-lg p-3'>
                <RiReactjsFill className='text-purple-800' />
              </div>
              <div className=' pl-4'>
                <Skleton/>
                <Skleton/>
              </div>
                
            </li>
            ))}
          </div>
      }

    </div>
  );
};

export default TabelaLigantes;
