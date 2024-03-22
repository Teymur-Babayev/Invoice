import React from "react";

export const Input = ({name,type,placeholder,title,className,value,onChange,error}) => {
  return (
    <div className={className}>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-white"
      >
        {title}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${error && 'bg-red-500 placeholder:text-white text-white'} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
      />
    </div>
  );
};
