import { File } from "lucide-react";
import { FileCheck } from "lucide-react";
import React from "react";

export const FileInput = ({Doc,setDoc}) => {
  return (
    <div className="flex  items-center justify-center w-full">
      <label className={`flex flex-col bg-slate-100 hover:bg-DgyaLight transition-colors group cursor-pointer rounded-lg border-4 ${Doc ? "border-green-200 " : ""} border-dashed w-full h-60 p-10 group text-center`}>
        <div className="h-full w-full text-center flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="mx-auto -mt-10 mb-5">
            {Doc ? (
              <FileCheck className="fill-gray-100 mx-auto" size={56} />
            ) : (
              <File className="fill-gray-100 mx-auto" size={56} />
            )}
          </div>
          <p className="pointer-none group-hover:text-white text-gray-500 ">
            {Doc
              ? Doc.name
              : "Agrega el documento haciendo click aqui"}
          </p>
        </div>
        <input
          type="File"
          onChange={(event) => {
            setDoc(event.currentTarget.files[0]);
          }}
          className="hidden"
        />
      </label>
    </div>
  );
};
