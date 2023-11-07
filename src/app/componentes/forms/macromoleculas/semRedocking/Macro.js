'use client'
import Link from "next/link"
import { useState } from "react"
import './styles.css'

import Alert from '../../../alerts/Alert'

export default function Example({ userName }) {
  const [alert, setAlert] = useState(true);
  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const [formData, setFormData] = useState({
    processo_name: '',
    nome: '',
    rec: '',
    sizex: '',
    sizey: '',
    sizez: '',
    centerx: '',
    centery: '',
    centerz: '',

  });
  const handleFormEdit = (event, name) => {

    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const [receptorpdb, setReceptorpdb] = useState(null);
  const [receptorpdbqt, setReceptorpdbqt] = useState(null);


  const handleReceptorpdb = (event) => {
    const selectedFile = event.target.files[0];
    setReceptorpdb(selectedFile);
  };

  const handleReceptorpdbqt = (event) => {
    const selectedFile = event.target.files[0];
    setReceptorpdbqt(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    const formDataObject = new FormData();

    const gridcenter = `${formData.centerx},${formData.centery},${formData.centerz}`;
    const gridsize = `${formData.sizex},${formData.sizey},${formData.sizez}`;

    formDataObject.append('processo_name', formData.processo_name);
    formDataObject.append('nome', formData.nome);
    formDataObject.append('rec', formData.rec);
    formDataObject.append('gridcenter', gridcenter);
    formDataObject.append('gridsize', gridsize);
    formDataObject.append('receptorpdb', receptorpdb);
    formDataObject.append('receptorpdbqt', receptorpdbqt);

    console.log(formDataObject);

    try {

      const response = await fetch('http://127.0.0.1:8000/macro/', {
        method: 'POST',
        body: formDataObject,
      });

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error(error);
    }


    loader.style.display = 'none';
  };

  // Esconde o indicador de carregamento ao carregar a página novamente
  window.addEventListener('pageshow', function (event) {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
  });

  return (
    <>
      { }
      <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <span className='text-black flex justify-center mx-80 py-5 border-b-2 border-indigo-500'><b>Preparação de Macromoleculas sem Redocking</b></span>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">

          <div>
              <label htmlFor="nome_processo" className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                Nome do processo :
              </label>
              <div className="mt-2">
                <input required id="nome_processo" name="nome_processo" placeholder=" plasmodocking"
                  type="text" value={formData.nome} onChange={(e) => { handleFormEdit(e, 'processo_name') }}
                  className="flex justify-between w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <label htmlFor="nome_processo" className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                Nome da macromolecula :
              </label>
              <div className="mt-2">
                <input required id="nome_processo" name="nome_processo" placeholder=" plasmodocking"
                  type="text" value={formData.nome} onChange={(e) => { handleFormEdit(e, 'nome') }}
                  className="flex justify-between w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <label htmlFor="nome_processo" className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                Rec :
              </label>
              <div className="mt-2">
                <input required id="nome_processo" name="nome_processo" placeholder=" plasmodocking"
                  type="text" value={formData.rec} onChange={(e) => { handleFormEdit(e, 'rec') }}
                  className="flex justify-between w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="file_processo" className="flex justify-between text-sm font-medium leading-6 text-gray-900">Receptor pdb:</label>
              </div>
              <div className="mt-2 ">
                <input
                  className=" flex justify-between w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="file_processo" name="file_processo" type="file" onChange={handleReceptorpdb} accept=".pdb"
                />
              </div>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="file_processo" className="flex justify-between text-sm font-medium leading-6 text-gray-900">Receptor pdbqt:</label>
              </div>
              <div className="mt-2 ">
                <input
                  className=" flex justify-between w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="file_processo" name="file_processo" type="file" onChange={handleReceptorpdbqt} accept=".pdbqt"
                />
              </div>
            </div>





            <div className="gidboxpar"><span> GridBox parâmetros </span><br /><br />
              <label htmlFor="sizeX">Size X:</label>
              <input type="number" id="sizeX" name="sizeX" step="any" required
                onChange={(e) => { handleFormEdit(e, 'sizex') }} />

              <label htmlFor="sizeY">Y:</label>
              <input type="number" id="sizeY" name="sizeY" step="any" required
                onChange={(e) => { handleFormEdit(e, 'sizey') }} />

              <label htmlFor="sizeZ">Z:</label>
              <input type="number" id="sizeZ" name="sizeZ" step="any" required
                onChange={(e) => { handleFormEdit(e, 'sizez') }} />

              <br /><br />

              <label htmlFor="centerX">Center X:</label>
              <input type="number" id="sizeX" name="centerX" step="any" required
                onChange={(e) => { handleFormEdit(e, 'centerx') }} />

              <label htmlFor="centerY">Y:</label>
              <input type="number" id="sizeY" name="centerY" step="any" required
                onChange={(e) => { handleFormEdit(e, 'centery') }} />

              <label htmlFor="centerZ">Z:</label>
              <input type="number" id="sizeZ" name="centerZ" step="any" required
                onChange={(e) => { handleFormEdit(e, 'centerz') }} />

            </div>




            <div>
              <button
                className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit">Executar docagem.</button>
            </div>

          </form>

          {alert && (
          <Alert
            type={"error"}
            message={"alert.message"}
            onClose={hideAlert}
          />
        )}

          <div className="loader my-10" id="loader"></div>

        </div>
      </div>
    </>
  )
}
