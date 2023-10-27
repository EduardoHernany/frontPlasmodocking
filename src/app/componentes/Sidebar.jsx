"use client"
import React , {useState}from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RxSketchLogo, RxDashboard, RxPerson } from 'react-icons/rx';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FiSettings, FiAlignJustify } from 'react-icons/fi';

const Sidebar = ({ children }) => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex">
      <div className={`fixed items-start ${isSidebarExpanded ? 'w-64' : 'w-16'} h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between`}>
        <div className='flex flex-col justify-start items-center pt-16'>
          <button type="button"  onClick={toggleSidebar} 
          className='ml-0'>
              <FiAlignJustify size={20} />
            </button>
          
          <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
          <Link href='/adm/users'>
            <div className='flex flex-row items-center'>
              <div className='bg-gray-100  hover:bg-gray-200 cursor-pointer my-4 p-2 rounded-lg inline-block'>
                <RxPerson size={18} />
              </div>
              {isSidebarExpanded && <span className='ml-2' >teste</span>}
            </div>
          </Link>
          <Link href='/adm/proces'>
          <div className='flex flex-row items-center'>
            <div className='bg-gray-100  hover:bg-gray-200 cursor-pointer my-4 p-2 rounded-lg inline-block'>
              <RxDashboard size={18} />
            </div>
            {isSidebarExpanded && <span className='ml-2' >teste</span>}
            </div>
          </Link>
          
          <Link href='/'>
            <div className='flex flex-row items-center'>
            <div className='bg-gray-100  hover:bg-gray-200 cursor-pointer my-4 p-2 rounded-lg inline-block'>
              <FiSettings size={18} />
            </div>
              {isSidebarExpanded && <span className='ml-2' >teste</span>}
              </div>
          </Link>
        </div>
      </div>
      <main className='ml-12 w-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
