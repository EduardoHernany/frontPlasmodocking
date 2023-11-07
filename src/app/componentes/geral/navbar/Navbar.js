'use client'
import Link from 'next/link';

import React, { useState } from 'react';
import './styles.css'
import { signOut, signIn } from 'next-auth/react';
import { useSession } from "next-auth/react";
import { TbBrandReact } from "react-icons/tb";
import { RiReactjsFill } from "react-icons/ri";
import Atom from '../../atom/Atom'
import DropdownsNavbar from '../../dropdowns/DropdownsNavbar'
import LofinFormModal from '../../forms/login/LoginFormModal'

function ResponsiveAppBar() {
  const { data: session } = useSession();

  if (session) {
    if (session.user.role === "ADMIN") {
      console.log('adm')
    } else if (session.user.role === "USER") {
      console.log('user')
    }
  }

  const dropdownOptionsP = [
    { label: 'Plasmodeocking Gama', descricao: 'Com validação redocking' ,link: '/pages/plasmodocking/comRedocking' },
    { label: 'Plasmodeocking Alfa', descricao: 'Sem validação redocking' ,link: '/pages/plasmodocking/semRedocking' },
  ];

  const dropdownOptionsM = [
    { label: 'Macromolecula com redocking', descricao: 'Preparação Macromolecula com redocking' ,link: '/pages/macro_prepare/com_redocking' },
    { label: 'Macromolecula sem redocking', descricao: 'Preparação Macromolecula sem redocking' ,link: '/pages/macro_prepare/sem_redocking' },
  ];

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  return (
    <nav className="navbar border-b-2 border-black">
      <div className="logo flex">
      
        <Atom />     
        <span className='text-white mt-6 mx-2'>AutodockGPUWeb</span>
        
      </div>
      <div className="menu">
        <div className="menu-links">
        {session?.user.role === "ADMIN" ? <DropdownsNavbar title='Macromoleculas P' options={dropdownOptionsM}/> : <></>}
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          { session?
          <>
            <DropdownsNavbar title='Plasmodocking' options={dropdownOptionsP}/>
            <Link href="/pages/resultados">Resultados</Link>
          </> 
          : 
          <></>
          }
        </div>
        { session 
          ? <button onClick={()=> signOut()} className="log-in">Logout</button> 
          : <LofinFormModal />
        }
        
      </div>
      
    </nav>
  );
}
export default ResponsiveAppBar;
