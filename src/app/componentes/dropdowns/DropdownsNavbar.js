import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Dropdown = ({ options, title }) => {

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button className="flex items-center gap-x-1  text-sm leading-6 font-medium text-white px-4 py-2"
        id="menu-button" aria-expanded={isOpen ? 'true' : 'false'} aria-haspopup="true" onClick={toggleDropdown} type="button">
        {title}
        <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      <div className={`absolute -left-8 top-full z-10 mt-3 w-screen max-w-sm p-1 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 ${isOpen ? '' : 'hidden'}`}>
        <div className="">

          {options.map((option, index) => (
            <Link  href={option.link} role="menuitem" tabIndex="-1" key={index} className="text-blackfont-semibold">
              <div key={index} className=" group relative flex items-center rounded-lg px-4 text-sm leading-6 hover:bg-gray-50">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <svg className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                  </svg>
                </div>

                <div className="">
                  <div className='flex pl-2 flex-col items-start'>
                    <span className=' text-black'>{option.label} </span>
                    <p className=" text-gray-600">{option.descricao}</p>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
