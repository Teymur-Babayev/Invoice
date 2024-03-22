import React from "react";
import { motion } from "framer-motion";
import { servicioData } from "../../../assets/serviciosData";
import declaracion from "../../../assets/ServicioImpuestos.svg";
import nomina from "../../../assets/ServicioNomina.svg";
import aseFiscal from "../../../assets/ServicioAsesoriaFiscal.svg";
import facElec from "../../../assets/ServicioFacturación.svg";

export const Servicios = ({ selection }) => {
  return (
    <div
      id="servicios"
      className={`w-full h-full ${selection === "Mision" && "md:pt-[1vh]"}  ${selection === "Vision" && "pt-[0vh]"
        } ${selection === "Valores" && "pt-[0vh]"} md:pt-0 py-[5%] bg-esatLight`}
    >
      <div className="md:px-[5%] lg:px-[15%]">
        <div className="space-y-1">
          <h2 className="text-esatDark pt-[7%] text-5xl font-bold uppercase text-center">
            servicios
          </h2>
          <h4 className="text-esatDark text-xl text-center font-semibold">
            Expertos en simplificar tus impuestos y maximizar tus beneficios.
          </h4>
        </div>
        <div className="w-full flex space-x-3 px-4 pt-5 md:pt-0  gap-3 mt-10">
          <div className="bg-[#eaf3f6] pl-[3%] w-full shadow-md rounded-md p-4">
            <img src={aseFiscal } className="w-20 h-20" alt="" />
            <h2 className="text-esatDark text-xl">{servicioData[0].title}</h2>
            <p className="text-black/50 text-[14px]">{servicioData[0].description}</p>
          </div>
          <div className="bg-[#eaf3f6] pl-[3%] w-full shadow-md rounded-md p-4">
            <img src={facElec} className="w-20 h-20" alt="" />
            <h2 className="text-esatDark text-xl">{servicioData[1].title}</h2>
            <p className="text-black/50 text-[14px]">{servicioData[1].description}</p>
          </div>
          <div className="bg-[#eaf3f6] pl-[3%] w-full shadow-md rounded-md p-4">
            <img src={declaracion } className="w-20 h-20" alt="" />
            <h2 className="text-esatDark text-xl">{servicioData[2].title}</h2>
            <p className="text-black/50 text-[14px]">{servicioData[2].description}</p>
          </div>
        </div>
        <div className="w-full flex space-x-3 px-4 pt-5 md:pt-0  gap-3 mt-4">
        <div className="bg-[#eaf3f6] pl-[3%] w-full shadow-md rounded-md p-4">
            <img src={declaracion } className="w-20 h-20" alt="" />
            <h2 className="text-esatDark text-xl">{servicioData[3].title}</h2>
            <p className="text-black/50 text-[14px]">{servicioData[3].description}</p>
          </div>
          <div className="bg-[#eaf3f6] pl-[3%] w-full shadow-md rounded-md p-4">
            <img src={nomina} className="w-20 h-20" alt="" />
            <h2 className="text-esatDark text-xl">{servicioData[4].title}</h2>
            <p className="text-black/50 text-[14px]">{servicioData[4].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
