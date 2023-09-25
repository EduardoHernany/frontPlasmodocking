'use client'
import React from 'react'
import TabelaResultados from '../componentes/resultados/TabelaResultados'
import { useSession } from 'next-auth/react'

export default  function Home(){

  const {data: session}  =  useSession({
    required:true,
  });

    return (
      <div className='bg-white'>
      {session? <TabelaResultados userName={session.user?.username} /> : <></>}
      </div>
      )
}