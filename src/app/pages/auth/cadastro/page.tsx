import CadastroForm from '@/app/componentes/forms/cadastro/CadastroForm'
import { options } from '@/service/options'
import { getServerSession } from 'next-auth'


export default async function Home(){
  
    const session = await getServerSession(options)
    return (
        <>
       <CadastroForm/>
        </>
      )
}

