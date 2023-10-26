import React, { useState, useEffect } from 'react';
import { CiCircleCheck, CiCircleAlert , CiCircleRemove } from "react-icons/ci";

const toastStyles = {
  success: {
    container: "fixed flex items-center w-full mt-14 max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800",
    icon: "bg-green-400 rounded-lg p-2",
    message: "ml-3 pl-2 text-sm font-normal",
    closeButton: "ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
    iconComponent: <CiCircleCheck className="text-black" />,
  },
  error: {
    container: "fixed flex items-center w-full mt-14 max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800",
    icon: "bg-red-400 rounded-lg p-2",
    message: "ml-3 pl-2 text-sm font-normal",
    closeButton: "ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
    iconComponent: <CiCircleRemove className="text-black" />,
  },
  warning: {
    container: "fixed flex items-center w-full mt-14 max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800",
    icon: "bg-yellow-400 rounded-lg p-2",
    message: "ml-3 pl-2 text-sm font-normal",
    closeButton: "ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
    iconComponent: <CiCircleAlert className="text-black" />,
  },
};

export default function Toast({ type, message, onClose }) {
  const styles = toastStyles[type];
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return show ? (
    <div className={styles.container} role="alert">
      <div className={styles.icon}>{styles.iconComponent}</div>
      <span className="sr-only">Check icon</span>
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  ) : null;
}
