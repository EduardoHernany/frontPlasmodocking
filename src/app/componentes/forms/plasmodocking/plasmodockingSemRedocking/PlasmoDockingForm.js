'use client'
import React, { useState } from "react";
import './styles.css';
import Toast from '../../../alerts/Toast'
import Alert from '../../../alerts/Alert'

const Example = ({ emailUser, userName }) => {
  const [formData, setFormData] = useState({ nome: '', arquivo: null });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  

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
    data.append('type', "Sem Redocking");
    data.append('email_user', emailUser);

    try {
      const response = await fetch('http://127.0.0.1:8000/VS_doking/', {
        method: 'POST',
        body: data,
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        showAlert('success', responseData.message)
      } else {
        showAlert('error', responseData.message)
      }
    } catch (error) {
      console.error(error);
      showAlert('error', error)
    }
    setIsLoading(false);
  };


  return (
    <div className="bg-white h-[70vh] flex min-h-full flex-1 flex-col px-6 mb-5 m-16 lg:px-8">
      <span className="text-black flex justify-center mx-80 py-5 border-b-2 border-indigo-900">
        <b>PlasmoDocking - {userName}</b>
      </span>


      <div className="m-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <Alert
          type={"success"}
          message={"As macromoleculas do processo não tiveram verificação Redocking."}
          onClose={hideAlert}
          btnClose={false}
        />
        <form onSubmit={handleSubmit} className="space-y-6 " action="#" method="POST">
          {/* Input de Nome do Processo */}
          <div>

            <label htmlFor="nome_processo" className="flex justify-between text-sm font-medium leading-6 text-gray-900">
              Nome do Processo:
            </label>

            <div className="mt-2">
              <input
                required
                id="nome_processo"
                name="nome"
                placeholder="plasmodocking"
                type="text"
                value={formData.nome}
                onChange={handleInputChange}
                className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Input de Arquivo */}
          <div>

            <label htmlFor="file_processo" className="flex justify-between text-sm font-medium leading-6 text-gray-900">
              Escolher arquivo:
            </label>

            <div className="mt-2 w-full flex rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <label htmlFor="inputTag" className="cursor-pointer flex w-40 justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <span>Selecione o arquivo</span>
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
              {formData.arquivo && (
                <p className="text-gray-600 mt-2 ml-2">{formData.arquivo.name}</p>
              )}
            </div>
          </div>

          {/* Botão de Submissão */}
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Executar docagem.
            </button>
          </div>
        </form>

        {/* Renderize o Toast com base no tipo (success ou error) */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={hideAlert}
          />
        )}
        {isLoading ? <div className="loader my-10" id="loader"></div> : <></>}
      </div>
    </div>
  );
};

export default Example;