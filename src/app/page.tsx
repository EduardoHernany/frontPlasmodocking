import Image from 'next/image'
import Atom from '@/app/componentes/atom/Atom'
import Link from 'next/link';

export default function Home() {
  return (
    <main className="mt-10">
      <img
        className="mx-auto h-16 w-auto"
        src="/logos/labioquim.png"
        alt="Your Company"
      />

      <div className="text-center    ">
        <div className='w-1/2 mx-auto pt-2 border-t-2 border-indigo-900'>
          <p className="text-2xl font-semibold ">
            Uma nova abordagem de docagem molecular utizando AutodockGPU para trazer mais eficiencia pro proceso.
          </p>
        </div>

        <div className='rounded-lg border border-slate-100 mx-80 py-7 my-6 '>
          <p className='px-20 opacity-60 pb-3  text-left'>
            Bem vindo.
          </p>
          <p className='px-20 opacity-60 text-left'>
            É com grande entusiasmo que damos as boas-vindas a você neste projeto que visa revolucionar
            a área de docagem molecular. A docagem molecular é uma técnica essencial na pesquisa de
            desenvolvimento de medicamentos e na compreensão das interações entre moléculas biológicas,
            como proteínas e ligantes. Nosso objetivo é simplificar e aprimorar significativamente esse
            processo crucial por meio da automação e apresentar uma nova proposta chamada "PlasmoDockig".
          </p>
        </div>
      </div>





      <div className='flex  flex-col items-center justify-between py-10 px-24'>
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Link
            href="/plasmodocking"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              PlasmoDockig Gama{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Execução de docagem molecular com Macromoleculas com validação de redocking com ligantes originais
            </p>
          </Link>

          <Link
            href=""
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              PlasmoDockig Alfa{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Execução de docagem molecular com Macromoleculas sem validação de redocking.
            </p>
          </Link>

          <Link
            href=""
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Docking{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Docagem molecular atraves de receptor, ligante e paramentros de gridbox passados pelo usuario.
            </p>
          </Link>

          <Link
            href="/resultados"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Resultados{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Visualização de resultados atraves de Dashboard ou Tabela.
            </p>
          </Link>
        </div>
      </div>
    </main>
  )
}
