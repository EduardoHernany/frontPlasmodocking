'use client'
import Link  from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"; 

export default function Example() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleForm = async (event) => {
    
    try {
      event.preventDefault(); // Evita que o formulário recarregue a página
      //console.log(formData);
      

      const result = await signIn("credentials", {
        //redirect: false,
        name: formData.username,
        password: formData.password,
    });

    } catch (error) {
      console.error(error);
    }

  };
    return (
      <>
        {}
        <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           
            <h2 className="border-t-2 border-x-orange-900 mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Fazer login
            </h2>
          </div>
  
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleForm}>
            <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="nomedeusuario" className="block text-sm font-medium leading-6 text-gray-900">
                    Nome de usuario
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="nomedeusuario"
                    name="nomedeusuario"
                    placeholder=" eduardohernanyunir"
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => {handleFormEdit(e,'username')}}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block  text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                
                </div>  
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder=" ***********"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={(e) => {handleFormEdit(e,'password')}}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex uppercase w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Logar
                </button>
                
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
            
            <Link href="/auth/cadastro"> não possui conta? ir para cadastro.</Link>
          </p>
          { /* 
          <div className="mt-6 flex flex-col items-center">
          <Link href={'/auth/cadastro'}>
            <button className="flex w-44 uppercase justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              cadastrar
            </button>
            </Link>
            
          </div>
          */}
             
          </div>
        </div>
      </>
    )
  }
  