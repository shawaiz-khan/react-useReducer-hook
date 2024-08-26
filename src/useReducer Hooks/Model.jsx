/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

export default function Model({ modelContent, closeModel }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            closeModel();
        }, 3000);
        return () => clearTimeout(timer);
    }, [closeModel]);

    return (
        <div className="fixed top-4 right-4 w-80 bg-white p-4 rounded-lg shadow-lg border border-gray-300 z-50">
            <div className="flex items-center justify-between">
                <h1 className="text-sm font-medium text-gray-800">{modelContent}</h1>
                <button  onClick={closeModel}  className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
