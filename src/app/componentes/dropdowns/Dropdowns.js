import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Dropdown = ({ options, idItem, onDeleteSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAction = async (action) => {
    if (action === 'delete') {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api_delete/${idItem}/`);
        if (response.status === 200) {
          console.log('Arquivo apagado com sucesso!');
          onDeleteSuccess();
        } else {
          console.error('Erro ao excluir:', response.data.message);
        }
      } catch (error) {
        console.error('Erro ao excluir:', error);
      }
    } else if (action === 'download') {

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api_download/${idItem}`, {
          responseType: 'blob', // Indica que estamos esperando uma resposta binária (o arquivo zip)
        });
    
        // Verifique se a resposta tem um status de sucesso (código 200)
        if (response.status === 200) {
          // Crie um objeto URL para o blob recebido
          const blob = new Blob([response.data], { type: 'application/zip' });
          const url = window.URL.createObjectURL(blob);
    
          // Crie um link para iniciar o download
          const a = document.createElement('a');
          a.href = url;
          a.download = `${idItem}.zip`; // Nome do arquivo para download
          document.body.appendChild(a);
          a.click();
    
          // Limpe o objeto URL e remova o link
          window.URL.revokeObjectURL(url);
          a.remove();
        } else {
          console.error('Erro ao baixar o arquivo.');
        }
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }
      
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-haspopup="true"
          onClick={toggleDropdown}
          type="button"
        >
          Ações
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isOpen ? '' : 'hidden'}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
        id="dropdown-menu"
      >
        <div className="py-1" role="none">
        <ul>
          {options.map((option, index) => (
            
            option.link ? (
              <li className="" key={index}>
                <Link href={`${option.link}${idItem}`}>
                    <button
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      
                    >
                      {option.label}
                    </button>
                  </Link>
                </li>
            ) : (
              <li className="" key={index}>
                <button
                  
                  onClick={() => handleAction(option.action)}
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                >
                  {option.label}
                </button>
              </li>
            )
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
