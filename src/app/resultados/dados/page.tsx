'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import BarChart from '../../componentes/graficos/BarChart'
import Dashboard from '../../componentes/dashboard/Dashboard'

export default function Home() {
  const { data: session } = useSession({
    required: true,
  });

  const [id, setId] = useState<string>('');
  const [item, setItem] = useState<any>(null);
  const [resultadoFinal, setResultadoFinal] = useState<any>(null);

  useEffect(() => {
    if (session) {
      const urlParams = new URLSearchParams(window.location.search);
      const idFromUrl = urlParams.get('id');

      setId(idFromUrl ?? '');

      // Faça a requisição para pegar o objeto com base no id
      if (idFromUrl) {
        axios.get(`http://127.0.0.1:8000/api/get_resultado/${idFromUrl}/`)
          .then((response) => {
            setItem(response.data.dados); // Use response.data.dados para acessar os dados do item
            try {
              const json = JSON.parse(response.data.dados.resultado_final);
              setResultadoFinal(json);
            } catch (error) {
              console.error('Erro ao analisar JSON:', error);
            }

            
          })
          .catch((error) => {
            console.error('Erro ao buscar o item:', error);
          });
      }
    }
  }, [session]);

  return (
    <div>
      <Dashboard resultadoFinal= {resultadoFinal}/>

     
      <h1>Dados do Item</h1>
      <p>ID: {id}</p>
      {item && (
        <div>
          {/* Renderize os dados do item aqui */}
          <p>Nome: {item.nome}</p>
          <p>User: {item.user}</p>
          {/* Adicione mais campos conforme necessário */}
        </div>
      )}
      
        
              
      
    </div>
  );
}
