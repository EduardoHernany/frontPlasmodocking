'use client'
import Link from 'next/link';
import * as React from 'react';
import './styles.css'
import { signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";
import { TbBrandReact } from "react-icons/tb";
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
    <nav className="navbar">
      <div className="logo flex">
      
              <TbBrandReact className='mt-1 text-white' />
            
          <span className='text-white mx-2'>AutodockGPUWeb</span>
      </div>
      <div className="menu">
        <div className="menu-links">
          <Link href="/">Home</Link>
          <Link href="#">About</Link>
          <Link href="/plasmodocking">PlasmoDocking</Link>
          <Link href="/resultados">Resultados</Link>
        </div>
        <button onClick={()=> signOut()} className="log-in">Logout</button>
      </div>
      <div className="menu-btn">
        
      </div>
    </nav>
  );
}
export default ResponsiveAppBar;
