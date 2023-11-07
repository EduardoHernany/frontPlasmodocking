import LoginForm from '@/app/componentes/forms/login/LoginForm'
import PlasmoDockingForm from '@/app/componentes/forms/plasmodocking/plasmodockingComRedocking/PlasmoDockingForm'
import { options } from '@/service/options'
import { getServerSession } from 'next-auth'


export default async function Home(){
  
    const session = await getServerSession(options)
    
    return (
        <>
        
        {
       
        session? <PlasmoDockingForm emailUser={session.user?.email} userName={session.user?.username} /> : <LoginForm/>
        }
          
        </>
      )
}

