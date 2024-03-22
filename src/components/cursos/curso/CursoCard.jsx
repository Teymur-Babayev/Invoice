import React from "react";
import { Link } from "react-router-dom";
import { formatDateToCustomString } from "../../../utils/funcs";

export const CursoCard = ({ video, cursoId }) => {

  const Fecha = formatDateToCustomString(video?.fecha);
  return (
   
    <div className="w-[250px] min-w-[300px] mr-4  flex flex-col items-center h-fit bg-white rounded-xl shadow-md">
      {/* Imagen Blog */}
      <div className="w-full h-fit relative">
        <img
          src={video?.modulo_img}
          className="h-[200px] w-full shadow-lg rounded-xl"
          alt=""
        />
      </div>
      <Link
        to={`/curso/${cursoId}/video/${video?.id}`}
        className="w-full pb-5 h-fit px-[5%]"
      >
        <p className="mt-3 text-[14px] font-semibold text-gray-400">{Fecha}</p>

        <h3 className="mt-2 font-bold line-clamp-2">{video?.Titulo}</h3>

        <h4 className="mt-2 line-clamp-2">{video?.Descripcion}</h4>

        <div className="w-1/2 mx-auto mt-5">
          <button className="w-full py-1 bg-gradient-to-r shadow-lg shadow-LogoBlue text-white rounded-md from-LogoBlue  to-LogoBlueDark">
            Ver más
          </button>
        </div>
      </Link>
    </div>
  );
};
