'use client'
import React from 'react'
import Macro from '../componentes/forms/macro/Macro'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div>
      {session ? <Macro userName={session.user?.name} /> : <></>}
    </div>
  );
}
//session?.user?.name