import React from "react";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="h-screen w-screen bg-slate-200 flex flex-col gap-y-3 items-center justify-center">
      <div className="flex items-end space-x-3">
        <h1 className="text-4xl font-bold">Ups!</h1>
        <h2 className="text-2xl">Esta Pagina no existe.</h2>
      </div>
      <Link className="underline text-slate-700 cursor-pointer" to="/">Vuelve a nuestra pagina principal aqui</Link>
    </div>
  );
};
