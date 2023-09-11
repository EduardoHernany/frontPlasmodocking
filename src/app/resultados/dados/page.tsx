'use client'
import React from 'react'

import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div>
      teste
    </div>
  );
}
//session?.user?.name