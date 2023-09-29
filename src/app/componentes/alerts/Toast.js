
import React, { useState } from 'react';

import { CiCircleCheck, CiCircleAlert , CiCircleRemove } from "react-icons/ci";

const toastStyles = {
  success: {
    container: "fixed flex items-center w-full mt-14 max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800",
    icon: "bg-green-400 rounded-lg p-2 ",
    message: "ml-3 pl-2 text-sm font-normal",
    closeButton: "ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
  },
  error: {
    container: "fixed flex items-center w-full mt-14 max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800",
    icon: "bg-red-400 rounded-lg p-2 ",
    message: "ml-3 pl-2 text-sm font-normal",
    closeButton: "ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
  },
  warning: {
    container: "fixed flex items-center w-full mt-14 max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800",
    icon: "bg-yellow-400 rounded-lg p-2 ",
    message: "ml-3 pl-2 text-sm font-normal",
    closeButton: "ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
  },
};

export default function Toast({ type, message }) {
  const [closed, setClosed] = useState(false);
  const styles = toastStyles[type];

  if (!styles || closed) {
    return null; // Retorna null se o tipo não for válido ou se o toast estiver fechado
  }

  const handleClose = () => {
    setClosed(true);
  };

  return (
    <div className={styles.container} role="alert">
        <div >
            <div className={styles.icon}>
                { type === 'success' ? <CiCircleCheck className='text-black' /> 
                : type === 'error' ? <CiCircleRemove className='text-black' /> :
                type === 'warning' ? <CiCircleAlert className='text-black' />: <></>}
                
            </div>
            
            
            <span className="sr-only">Check icon</span>
        </div>
        <div className={styles.message}>{message}</div>
        <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close"
        >
            <span className="sr-only">Close</span>
            <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            >
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
            </svg>
        </button>
    </div>
  );
}
