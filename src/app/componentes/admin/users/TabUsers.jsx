'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';
import { data } from './data.js';

const TabUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fazer a requisição GET para a API /api/getusers
        fetch('/api/getusers')
        .then((response) => response.json())
        .then((data) => {
            console.log(data.users)
            setUsers(data.users);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Erro ao buscar usuários:', error);
            setLoading(false);
        });
    }, []);

    
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between p-4'>
        <h2>Usuarios</h2>
        <h2>Welcome Back, Clint</h2>
      </div>
      <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <span className='sm:text-left'>Name</span>
            <span className='sm:text-left '>Username</span>
            <span className='sm:text-left hidden md:grid'>Status</span>
            <span className='sm:text-left hidden sm:grid'>Role usuario</span>
          </div>
          <ul>

            {users.map((user, id) => (
                <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                    <div className='sm:text-left flex items-center'>
                        <div className='bg-purple-100 p-3 rounded-lg'>
                            <BsPersonFill className='text-purple-800' />
                        </div>
                        <div className='flex flex-col'>
                            <p className='pl-4'>{user.name}</p>
                            <p className='pl-4 text-gray-600'>{user.email}</p>
                        </div>
                    </div>
                    <p className='text-gray-600 sm:text-left text-right'>{user.username}</p>
                    <p className='hidden md:flex'>{user.active === true ? 'Ativo' : 'Em espera'}</p>
                    <div className='sm:flex hidden justify-between items-center'>
                        <p>{user.role}</p>
                        <BsThreeDotsVertical />
                    </div>
                </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  )
}

export default TabUsers