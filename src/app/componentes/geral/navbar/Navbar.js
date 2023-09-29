'use client'
import Link from 'next/link';
import * as React from 'react';
import './styles.css'
import { signOut, signIn } from 'next-auth/react';
import { useSession } from "next-auth/react";
import { TbBrandReact } from "react-icons/tb";
import { RiReactjsFill } from "react-icons/ri";


function ResponsiveAppBar() {
  const { data: session } = useSession();

  if (session) {
    if (session.user.role === "ADMIN") {
      console.log('adm')
    } else if (session.user.role === "USER") {
      console.log('user')
    }
  }

  return (
    <nav className="navbar border-b-2 border-black">
      <div className="logo flex">
      
        <RiReactjsFill className=' w-6 h-6 text-white scale-500' />    
        <span className='text-white mx-2'>AutodockGPUWeb</span>
        
      </div>
      <div className="menu">
        <div className="menu-links">
        {session?.user.role === "ADMIN" ? <Link href="/plasmodocking">Administrador</Link> : <></>}
          <Link href="/">Home</Link>
          <Link href="#">About</Link>
          { session?
          <>
            <Link href="/plasmodocking">PlasmoDocking</Link>
            <Link href="/resultados">Resultados</Link>
          </> 
          : 
          <></>
          }
        </div>
        { session 
          ? <button onClick={()=> signOut()} className="log-in">Logout</button> 
          : <button onClick={()=> signIn()} className="log-in">Log In</button>
        }
        
      </div>
      <div className="menu-btn">
        
      </div>
    </nav>
  );
}
export default ResponsiveAppBar;
