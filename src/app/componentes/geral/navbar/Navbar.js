'use client'
import Link from 'next/link';
import * as React from 'react';
import './styles.css'
import { signIn } from "next-auth/react";


function ResponsiveAppBar() {
 

  return (
    <nav className="navbar">
      <div className="logo">
        
        <Link href="/">LOGO</Link>
      </div>
      <div className="menu">
        <div className="menu-links">
          <Link href="/">Home</Link>
          <Link href="#">About</Link>
          
        </div>
        <button onClick={()=> signIn()} className="log-in">Log In</button>
      </div>
      <div className="menu-btn">
        
      </div>
    </nav>
  );
}
export default ResponsiveAppBar;
