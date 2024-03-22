import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";

export const MisDatos = () => {
  const { User } = useAuth();
  const [handleImagen, sethandleImagen] = useState(null);

  return (
    <>
      <h3 className=" text-base text-white md:text-3xl text-center font-semibold mt-4">
        Datos Personales
      </h3>
      <div className="bg-white max-w-xl rounded-md shadow-lg mx-auto mt-5 p-7 flex flex-col gap-5 items-end">
        <div className="flex w-full justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage
              className="object-cover"
              src={User ? User.Img_url : handleImagen}
            />
            <AvatarFallback className="bg-black">
              <User2 className="text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full flex">
          <div className="w-full flex items-start">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nombre:
            </label>
            <p className="text-sm font-semibold text-gray-500 ml-2">
              {User ? User.Nombre : "Debes completar los datos"}
            </p>
          </div>
          <div className="w-full flex items-start">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Apellido:
            </label>
            <p className="text-sm font-semibold text-gray-500 ml-2">
              {User ? User.Apellido : "Debes completar los datos"}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-wrap">
          <div className="w-1/2 md:w-1/3 flex items-start">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Empresa:
            </label>
            <p className="text-sm font-semibold text-gray-500 ml-2">
              {User ? User.Empresa : "Debes completar los datos"}
            </p>
          </div>
          <div className="w-1/2 md:w-1/3 flex items-start">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Username:
            </label>
            <p className="text-sm font-semibold text-gray-500 ml-2">
              {User ? User.Username : "Debes completar los datos"}
            </p>
          </div>
          <div className="w-full mt-5 md:mt-0 md:w-1/3 flex items-start">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Cargo:
            </label>
            <p className="text-sm font-semibold text-gray-500 ml-2">
              {User ? User.Cargo : "Debes completar los datos"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
