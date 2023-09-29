import LoginForm from '../../componentes/forms/login/LoginForm'
import PlasmoDockingForm from '../../componentes/forms/plasmodocking/PlasmoDockingForm'
import { options } from '../../../service/options'
import { getServerSession } from 'next-auth'


export default async function Home(){
  
    const session = await getServerSession(options)
    
    return (
        <>
        
        {
       
        session? <PlasmoDockingForm userName={session.user?.username} /> : <LoginForm/>
        }
          
        </>
      )
}

