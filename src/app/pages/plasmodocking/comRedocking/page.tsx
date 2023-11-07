'use client'
import React from 'react'
import PlasmoDockingForm from '@/app/componentes/forms/plasmodocking/plasmodockingComRedocking/PlasmoDockingForm'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div>
      {session ? <PlasmoDockingForm emailUser={session.user?.email} userName={session.user?.username} /> : <></>}
    </div>
  );
}
//session?.user?.name