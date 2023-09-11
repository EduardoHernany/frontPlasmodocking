'use client'
import Link  from "next/link"
import { useState } from "react"
import './styles.css'



export default function Example({ userName }) {

  const [nome, setNome] = useState('');
  const [arquivo, setArquivo] = useState(null);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleArquivoChange = (event) => {
    const selectedFile = event.target.files[0];
    setArquivo(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('arquivo', arquivo);
    formData.append('username', userName);
    try {
      
      const response = await fetch('http://127.0.0.1:8000/VS_doking/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.error(error);
    }
    loader.style.display = 'none';
  };
  
    // Esconde o indicador de carregamento ao carregar a página novamente
    window.addEventListener('pageshow', function(event) {
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
    });

    return (
      <>
        {}
        <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <span className='text-black flex justify-center mx-80 py-5 border-b-2 border-indigo-500'><b>PlasmoDocking - {userName}</b></span>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
              
              <div>
                <label htmlFor="nome_processo" className="block text-sm font-medium leading-6 text-gray-900">
                  Nome do Processo :
                </label>
                <div className="mt-2">
                  <input
                    id="nome_processo"
                    name="nome_processo"
                    placeholder=" plasmodocking"
                    type="text"
                    value={nome} 
                    onChange={handleNomeChange}
                    required
                    className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="file_processo" className="block text-sm font-medium leading-6 text-gray-900">Escolher arquivo:</label>
                </div>  
                <div className="mt-2 ">
                  <input
                    className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="file_processo"
                    name="file_processo"
                    type="file"
                    onChange={handleArquivoChange}
                    accept=".sdf"
                  />
                </div>
              </div>
  
              <div>
                <button
                  className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="submit">Executar docagem.</button>  
              </div>

            </form>
            
            <div className="loader my-10" id="loader"></div>
             
          </div>
        </div>
      </>
    )
  }
  