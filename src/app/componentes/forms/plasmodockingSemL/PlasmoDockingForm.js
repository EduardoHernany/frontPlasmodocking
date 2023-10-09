'use client'
import React, { useState } from "react";
import './styles.css';
import Toast from '../../alerts/Toast'


export default function Example({ userName }) {
  const [formData, setFormData] = useState({ nome: '', arquivo: null });
  const [isLoading, setIsLoading] = useState(false);
  const [toastType, setToastType] = useState(null); 

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { nome, arquivo } = formData;
    const data = new FormData();
    data.append('nome', nome);
    data.append('arquivo', arquivo);
    data.append('username', userName);

    try {
      const response = await fetch('http://127.0.0.1:8000/VS_doking/', {
        method: 'POST',
        body: data,
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        // Se a resposta for bem-sucedida, defina o tipo de Toast como "success"
        setToastType('success');
      } else {
        // Se a resposta não for bem-sucedida, defina o tipo de Toast como "error"
        setToastType('error');
      }
    } catch (error) {
      console.error(error);
      setToastType('error');
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white h-[70vh] flex min-h-full flex-1 flex-col px-6 mt-20 lg:px-8">
      <span className='text-black flex justify-center mx-80 py-5 border-b-2 border-indigo-900'><b>PlasmoDocking - {userName}</b></span>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="nome_processo" className="block text-sm font-medium leading-6 text-gray-900">
                Nome do Processo :
              </label>
            </div>
            <div className="mt-2">
              <input
                required
                id="nome_processo"
                name="nome"
                placeholder=" plasmodocking"
                type="text"
                value={formData.nome}
                onChange={handleInputChange}
                className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="file_processo" className="block text-sm font-medium leading-6 text-gray-900">Escolher arquivo:</label>
            </div>

            <div className="mt-2 w-full flex rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <label htmlFor="inputTag" className="cursor-pointer flex w-40 justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <span className="">
                  Selecione o arquivo
                </span>
                <input
                  required
                  className="hidden"
                  id="inputTag"
                  name="arquivo"
                  type="file"
                  onChange={handleInputChange}
                  accept=".sdf"
                />
              </label>
              {formData.arquivo && <p className="text-gray-600 mt-2 ml-2">{formData.arquivo.name}</p>}
            </div>
          </div>

          <div>
            <button
              className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit">Executar docagem.</button>
          </div>

        </form>

        {/* Renderize o Toast com base no tipo (success ou error) */}
        {toastType === 'success' && <Toast type="success" message="Processo concluído com sucesso." />}
        {toastType === 'error' && <Toast type="error" message="Ocorreu um erro durante o processo." />}
        
        {isLoading ? <div className="loader my-10" id="loader"></div> : <></>}
      </div>
    </div>
  );
}
