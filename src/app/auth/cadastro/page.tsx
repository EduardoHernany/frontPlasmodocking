import CadastroForm from '../../componentes/forms/cadastro/CadastroForm'
import { options } from '../../options'
import { getServerSession } from 'next-auth'


export default async function Home(){
  
    const session = await getServerSession(options)
    return (
        <>
       <CadastroForm/>
        </>
      )
}

