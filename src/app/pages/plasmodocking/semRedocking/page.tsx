'use client'
import React from 'react'
import PlasmoDockingForm from '@/app/componentes/forms/plasmodocking/plasmodockingSemRedocking/PlasmoDockingForm'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div className='mb-28'>
      {session ? <PlasmoDockingForm emailUser={session.user?.email} userName={session.user?.username} /> : <></>}
    </div>
  );
}
//session?.user?.name