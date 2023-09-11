'use client'
import React from 'react'
import PlasmoDockingForm from '../componentes/forms/plasmodocking/PlasmoDockingForm'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div>
      {session ? <PlasmoDockingForm userName={session.user?.name} /> : <></>}
    </div>
  );
}
//session?.user?.name