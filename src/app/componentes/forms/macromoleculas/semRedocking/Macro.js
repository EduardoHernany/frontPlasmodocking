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
  
  

  const handleReceptorpdb = (event) => {
    const selectedFile = event.target.files[0];
    setReceptorpdb(selectedFile);
  };

  //sucesso
  const [sucessoFormData, setSucessoFormData] = useState({
    nome: 'null',
    rec: '',
    gridcenter: '',
    gridsize: '',
    fld_name: '',
    arquivo_fld: '',
  });
  
  const handleSucessoFormEdit = (event, name) => {

    console.log(name + " : "+event.target.value)
    setSucessoFormData({
      ...sucessoFormData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loader = document.getElementById('loader');
    loader.style.display = 'flex justify-between';
    const formDataObject = new FormData();

    const gridcenter = `${formData.centerx},${formData.centery},${formData.centerz}`;
    const gridsize = `${formData.sizex},${formData.sizey},${formData.sizez}`;

    formDataObject.append('processo_name', formData.processo_name);
    formDataObject.append('nome', formData.nome);
    formDataObject.append('rec', formData.rec);
    formDataObject.append('gridcenter', gridcenter);
    formDataObject.append('gridsize', gridsize);
    formDataObject.append('receptorpdb', receptorpdb);
    

    console.log(formDataObject);

    try {

      const response = await fetch('http://127.0.0.1:8000/macro_SR/', {
        method: 'POST',
        body: formDataObject,
      });

      const data = await response.json();

      setSucessoFormData({
        nome: data.nome,
        rec: data.rec,
        gridcenter: data.gridcenter,
        gridsize: data.gridsize,
        fld_name: data.fld_name,
        arquivo_fld: data.arquivo_fld,
      })

      console.log(data);

    } catch (error) {
      console.error(error);
    }


    loader.style.display = 'none';
  };

  const handleSalvarSubmit = async (event) => {
    event.preventDefault();
    
    const formDataObject = new FormData();

    formDataObject.append('processo_name', formData.processo_name);
    formDataObject.append('nome', sucessoFormData.nome);
    formDataObject.append('rec', sucessoFormData.rec);
    formDataObject.append('gridcenter', sucessoFormData.gridcenter);
    formDataObject.append('gridsize', sucessoFormData.gridsize);
    formDataObject.append('fld_name', sucessoFormData.fld_name);

    console.log(formDataObject);

    try {

      const response = await fetch('http://127.0.0.1:8000/macro_SemRedocking_save/', {
        method: 'POST',
        body: formDataObject,
      });

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error(error);
    }
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
        <span className='text-black flex justify-center mx-80 py-5 border-b-2 border-indigo-500'><b>Preparação de Macromoleculas Sem Redocking</b></span>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">


            <div>
              <label className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                Nome do processo :
              </label>
              <div className="mt-2">
                <input required id="nome_processo" name="nome_processo" placeholder=" plasmodocking"
                  type="text" value={formData.processo_name} onChange={(e) => { handleFormEdit(e, 'processo_name') }}
                  className="flex justify-between w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <label className="flex justify-between text-sm font-medium leading-6 text-gray-900">
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
              <label className="flex justify-between text-sm font-medium leading-6 text-gray-900">
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
                  className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="file_processo" name="file_processo" type="file" onChange={handleReceptorpdb} accept=".pdb"
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

          {/* sucesso */}
          {sucessoFormData.nome &&

            <form onSubmit={handleSalvarSubmit} className="space-y-6 mt-10 border-y-2 py-6 border-black" action="#" method="POST">


              <div>
                <label  className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                  Nome da macromolecula :
                </label>
                <div className="mt-2">
                  <input required  placeholder=" plasmodocking"
                    type="text" value={sucessoFormData.nome} onChange={(e) => { handleSucessoFormEdit(e, 'nome') }}
                    className="flex justify-between w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label  className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                  rec :
                </label>
                <div className="mt-2">
                  <input required  placeholder=" plasmodocking"
                    type="text" value={sucessoFormData.rec} onChange={(e) => { handleSucessoFormEdit(e, 'rec') }}
                    className="flex justify-between w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label  className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                  gridcenter :
                </label>
                <div className="mt-2">
                  <input required  placeholder=" plasmodocking"
                    type="text" value={sucessoFormData.gridcenter} onChange={(e) => { handleSucessoFormEdit(e, 'gridcenter') }}
                    className="flex justify-between w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label  className="flex justify-between text-sm font-medium leading-6 text-gray-900">
                  gridsize :
                </label>
                <div className="mt-2">
                  <input required  placeholder=" plasmodocking"
                    type="text" value={sucessoFormData.gridsize} onChange={(e) => { handleSucessoFormEdit(e, 'gridsize') }}
                    className="flex justify-between w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              


              <div>
                <button
                  className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="submit">Salvar macromolecula.</button>
              </div>

            </form>

}
          

        </div>
      </div>
    </>
  )
}
