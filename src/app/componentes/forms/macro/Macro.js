'use client'
import Link  from "next/link"
import { useState } from "react"
import './styles.css'



export default function Example({ userName }) {

  const [formData, setFormData] = useState({
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
  const [ligantepdb, setLigantepdb] = useState(null);

  const handleReceptorpdb = (event) => {
    const selectedFile = event.target.files[0];
    setReceptorpdb(selectedFile);
  };

  const handleReceptorpdbqt = (event) => {
    const selectedFile = event.target.files[0];
    setReceptorpdbqt(selectedFile);
  };

  const handleLigantepdb = (event) => {
    const selectedFile = event.target.files[0];
    setLigantepdb(selectedFile);
  };


 


  const handleSubmit = async (event) => {
    event.preventDefault();
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const formDataObject = new FormData();
    formDataObject.append('nome', formData.nome);
    formDataObject.append('rec', formData.rec);
    formDataObject.append('sizex', formData.sizex);
    formDataObject.append('sizey', formData.sizey);
    formDataObject.append('sizez', formData.sizez);
    formDataObject.append('centerx', formData.centerx);
    formDataObject.append('centery', formData.centery);
    formDataObject.append('centerz', formData.centerz);
    formDataObject.append('receptorpdb', receptorpdb);
    formDataObject.append('receptorpdbqt', receptorpdbqt);
    formDataObject.append('ligantepdb', ligantepdb);
  
    // Now you can use formDataObject to send your data to the API
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
    window.addEventListener('pageshow', function(event) {
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
    });

    return (
      <>
        {}
        <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <span className='text-black flex justify-center mx-80 py-5 border-b-2 border-indigo-500'><b>Macro</b></span>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
              
              <div>
                <label htmlFor="nome_processo" className="block text-sm font-medium leading-6 text-gray-900">
                  Nome da macromolecula :
                </label>
                <div className="mt-2">
                  <input required id="nome_processo" name="nome_processo" placeholder=" plasmodocking"
                    type="text" value={formData.nome}  onChange={(e) => {handleFormEdit(e,'nome')}}
                    className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              <div>
                <label htmlFor="nome_processo" className="block text-sm font-medium leading-6 text-gray-900">
                  Rec :
                </label>
                <div className="mt-2">
                  <input required id="nome_processo" name="nome_processo" placeholder=" plasmodocking"
                    type="text" value={formData.rec}  onChange={(e) => {handleFormEdit(e,'rec')}}
                    className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="file_processo" className="block text-sm font-medium leading-6 text-gray-900">Receptor pdb:</label>
                </div>  
                <div className="mt-2 ">
                  <input 
                    className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="file_processo" name="file_processo" type="file" onChange={handleReceptorpdb} accept=".pdb"
                  />
                </div>
              </div>


              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="file_processo" className="block text-sm font-medium leading-6 text-gray-900">Receptor pdbqt:</label>
                </div>  
                <div className="mt-2 ">
                  <input 
                    className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="file_processo" name="file_processo" type="file" onChange={handleReceptorpdbqt} accept=".pdbqt"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="file_processo" className="block text-sm font-medium leading-6 text-gray-900">Ligante pdb:</label>
                </div>  
                <div className="mt-2 ">
                  <input 
                    className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="file_processo" name="file_processo" type="file" onChange={handleLigantepdb} accept=".pdb"
                  />
                </div>
              </div>


            
              <div className="gidboxpar"><span> GridBox parâmetros </span><br/><br/>
                <label for="sizeX">Size X:</label>
                <input type="number" id="sizeX" name="sizeX" step="any"  required
                  onChange={(e) => {handleFormEdit(e,'sizex')}}/>

                <label for="sizeY">Y:</label>
                <input type="number" id="sizeY" name="sizeY" step="any"  required
                  onChange={(e) => {handleFormEdit(e,'sizey')}}/>

                <label for="sizeZ">Z:</label>
                <input type="number" id="sizeZ" name="sizeZ" step="any"  required
                  onChange={(e) => {handleFormEdit(e,'sizez')}}/>

                <br/><br/>

                <label for="centerX">Center X:</label>
                <input type="number" id="sizeX" name="centerX" step="any"  required
                  onChange={(e) => {handleFormEdit(e,'centerx')}}/>

                <label for="centerY">Y:</label>
                <input type="number" id="sizeY" name="centerY" step="any"  required
                  onChange={(e) => {handleFormEdit(e,'centery')}}/>

                <label for="centerZ">Z:</label>
                <input type="number" id="sizeZ" name="centerZ" step="any"  required
                  onChange={(e) => {handleFormEdit(e,'centerz')}}/>

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
  