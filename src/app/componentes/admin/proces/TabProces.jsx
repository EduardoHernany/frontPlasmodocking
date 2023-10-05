import React, { useEffect } from 'react';

const TabProces = () => {
  var ligantePath = '/ligante.pdb'; // Substitua pelo caminho real do seu ligante
  var receptorPath = '/macro.pdb'; // Substitua pelo caminho real do seu receptor

  useEffect(() => {
    // Verifica se o elemento #viewport existe antes de criar o NGL.Stage
    const viewport = document.getElementById('viewport');
    
    if (viewport) {
      // Carrega o NGL e cria uma instância de NGL.Stage
      import('ngl').then(NGL => {
        const stage = new NGL.Stage(viewport);
        if (stage) {
          console.log('NGL.Stage criado com sucesso');

          // Carrega os arquivos ligante e receptor
          Promise.all([
            stage.loadFile(ligantePath),
            stage.loadFile(receptorPath)
          ]).then(function ([liganteComponent, receptorComponent]) {
            liganteComponent.addRepresentation("ball+stick");
            receptorComponent.addRepresentation("cartoon");
            stage.autoView();
          }).catch(error => {
            console.error('Erro ao carregar arquivos:', error);
          });

          // Use o stage para continuar com suas operações com NGL aqui
        } else {
          console.log('Falha ao criar NGL.Stage');
        }
      });
    } else {
      console.log('Elemento #viewport não encontrado');
    }
  }, []);

  return (
    <div className='min-h-[80vh]'>
      processos
      <div style={{ width: '100%', height: '400px' }} id="viewport"></div>
    </div>
  );
}

export default TabProces;
