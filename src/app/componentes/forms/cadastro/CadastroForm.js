'use client'
import Link  from "next/link"
import { emit } from "process"
import { useState } from "react"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function Example() {
  
  const [mensagem, setMensagem] = useState({
    texto: 'Ja tem uma conta? Ir para login.'
  });
  

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    nome_usuario: '',
    password: '',
  });

  const handleFormEdit = (event, name) => {
    
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleForm = async (event) => {
    event.preventDefault(); // Evita que o formulário recarregue a página

    

    try {
      const response = await fetch('http://127.0.0.1:8000/api_cadastro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envie o objeto formData como JSON
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMensagem({
          texto: 'Usuario cadastrado com sucesso. Ir para o login'
        });
      }

      } catch (error) {
        console.error(error);
        setMensagem({
          texto: 'Ja existe um Usuario com esse Username ou email.'
        });
        setFormData({
          ...formData,
          nome: '',
          email: '',
          nome_usuario: '',
          password: '',
        });
    }

  };

  return (
      <>
        {}
        <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src="labioquim.png"
              alt="Your Company"
            />
            <h2 className="border-t-2 border-x-orange-900 mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Cadastro
            </h2>
          </div>
  
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleForm} >
              
              <div>
                <label htmlFor="nomedeusuario" className="block text-sm font-medium leading-6 text-gray-900">
                  Nome de usuario
                </label>
                <div className="mt-2">
                  <input
                    id="nomedeusuario"
                    name="nomedeusuario"
                    placeholder=" eduardohernanyunir"
                    type="text"
                    required
                    value={formData.nome_usuario}
                    onChange={(e) => {handleFormEdit(e,'nome_usuario')}}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>



              <div>
                <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                  Nome
                </label>
                <div className="mt-2">
                  <input
                    id="nome"
                    name="nome"
                    placeholder=" Eduardo Hernany"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => {handleFormEdit(e,'nome')}}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    placeholder=" usuario@unir.br"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => {handleFormEdit(e,'email')}}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
            
            <Link href="/auth/login"> {mensagem.texto}</Link>
          </p>
          </div>
        </div>
      </>
    )
  }
  