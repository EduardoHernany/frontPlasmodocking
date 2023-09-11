import LoginForm from '../../componentes/forms/login/LoginForm'
import { options } from '../../options'
import { getServerSession } from 'next-auth'


export default async function Home(){
  
    const session = await getServerSession(options)
    return (
        <>
        
        {
       
        session? <span>logado {session?.user?.name}</span> : <LoginForm/>
        }
          
        </>
      )
}

