import React, { useState } from "react";

export const SearchBar = ({ searchTerm, handleSearch,placeholder }) => {

  return (
    <div className="my-3">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search  
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>

        <input 
          type="search"
          id="default-search"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          // placeholder={placeholder} 
          required
          value={searchTerm}
          onChange={handleSearch} 
        />
      </div>
    </div>
  );
};
