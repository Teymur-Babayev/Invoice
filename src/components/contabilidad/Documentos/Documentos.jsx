import React from "react";
import { Separador } from "../../Separador";
import { FileCheck2 } from "lucide-react";

export const Documentos = ({dataOrdenada}) => {
  return (
    <div className="w-full h-full rounded-md md:mx-[5%]">
      <div className="w-full h-full pt-[2%]">
        <h2 className="text-white text-4xl font-bold">Estados financieros</h2>
        <Separador />
        <div className="grid w-full gap-4  grid-cols-3 grid-flow-row md:grid-cols-6 md:grid-rows-2 lg:grid-rows-4 lg:grid-cols-8 h-[85%] ">
          {dataOrdenada?.map((estFin, index) => (
            <a
              key={index}
              href={estFin.EstadoFinacieroUrl}
              download
              className="hover:bg-white  group transition-all cursor-pointer hover:shadow-lg rounded-md flex gap-2 flex-col p-4 justify-center items-center"
            >
              <FileCheck2
                size={40}
                className="text-white group-hover:text-black"
              />
              <div>
                <h2 className="text-xs text-white text-center group-hover:text-black">
                  {estFin.username}
                </h2>
                <h4 className="text-xs text-white text-center group-hover:text-black">
                  {estFin.name} {estFin.year}
                </h4>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
