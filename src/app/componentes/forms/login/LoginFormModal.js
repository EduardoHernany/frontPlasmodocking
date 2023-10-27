import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from "next/link"

export default function Example() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


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
      <button
        onClick={openModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative m-auto mt-14  w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="px-6 py-6 lg:px-8">
                <button onClick={closeModal} type='button' className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover-text-white" >X</button>
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Login para Plasmodocking</h3>

                <form
                  onSubmit={handleForm}
                  className="space-y-6"
                >
                  <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome de usuario</label>
                    <input
                      id="nomedeusuario"
                      name="nomedeusuario"
                      placeholder=" eduardohernanyunir"
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => { handleFormEdit(e, 'username') }}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                  </div>


                  <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder=" ***********"
                      autoComplete="current-password"

                      value={formData.password}
                      onChange={(e) => { handleFormEdit(e, 'password') }}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                  </div>


                  <button
                    type="submit"
                    className="flex uppercase w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Logar
                  </button>

                  <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    <Link onClick={closeModal} href="/auth/cadastro"> não possui conta? ir para cadastro.</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
