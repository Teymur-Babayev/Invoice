import React, { useState } from "react";
import ChartComponent from "../../graficas/ChartComponent";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { ordenarPorMes } from "../../../assets/adminData";

export const IngresosGastos = ({ FirmaDigital, ContaEstFin }) => {
  const [Mes, setMes] = useState("enero");

  const dataNueva = ContaEstFin?.map((data) => {
    return {
      ...data,
      name: data.month,
    };
  });
  const dataOrdenada = ordenarPorMes(dataNueva);

  return (
    <>
      {FirmaDigital ? (
        <>
          
          <div className="w-full overflow-hidden lg:w-1/2 pt-10 md:pt-0 p-2 md:p-8 h-full ">
            <select
              onChange={(data) => setMes(data.target.value)}
              className={` bg-gray-50 border mb-5 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
            >
              <option value={"all"}>
                <span>Todos</span>
              </option>
              <option value={"weekly"}>
                <span>Semanal</span>
              </option>
              <option value={"monthly"}>
                <span>Mensual</span>
              </option>
              <option value={"yearly"}>
                <span>Anual</span>
              </option>
            </select>
            <ChartComponent  mes={Mes} estFinData={ContaEstFin} />
          </div>
        </>
      ) : (
        <div className="w-full md:mx-[5%] mt-[5%] md:mt-0 h-full">
          <div className="w-full flex items-center px-[5%] h-[20%] bg-red-400  rounded-md">
            <AlertCircle size={40} className="text-white" />
            <span className="font-semibold text-xl text-white ml-6">
              Para poder ver tu contabilidad debes ingresar tu firma digital{" "}
              <Link
                to={`/Perfil/Solicitudes/Crear`}
                className="pl-4 underline "
              >
                haz click aqui para ingresarla
              </Link>
            </span>
          </div>
        </div>
      )}
    </>
  );
};
