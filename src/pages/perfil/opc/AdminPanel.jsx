import { FilePlus2, PenLine, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { SubAdminData, AdminData} from "../../../assets/adminData";

export const AdminPanel = () => {
  const { User } = useAuth();

  const getIcon = (iconName) => {
    if (iconName === "FilePlus2")
      return <FilePlus2 className="absolute group-hover:text-white bottom-[10%] right-[5%]" />;
    if (iconName === "PenLine")
      return <PenLine className="absolute group-hover:text-white bottom-[10%] right-[5%]" />;
    if (iconName === "Trash2")
      return <Trash2 className="absolute group-hover:text-white bottom-[10%] right-[5%]" />;
  };

  return (
    <div className="w-full h-full bg-DgyaDark/30 p-8 rounded-md shadow-md mt-5 mb-10 space-y-5">
      <div className="w-full">
        <h2 className="font-bold text-white text-base md:text-3xl">
          Opciones de Sub administrador
        </h2>
      </div>
      <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-3 ">
        {SubAdminData.map((data, index) => (
          <Link
            key={index}
            to={`${data.path}`}
            className="relative w-full h-[200px] cursor-pointer group hover:bg-LogoBlue transition-colors flex justify-between p-3 bg-slate-100 rounded-md shadow-md"
          >
            <h1 className="text-2xl group-hover:text-white font-bold">{data.title}</h1>
            {getIcon(data.icon)}
          </Link>
        ))}
      </div>

      {User?.UserRole?.toLowerCase().trim() === "admin" ? (
        <>
          {/* opciones de administrador */}
          <div className="w-full">
            <h2 className="font-bold text-white text-base md:text-3xl">
              Opciones de administrador
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-3 ">
            {AdminData.map((data, index) => (
              <Link
                key={index}
                to={`/admin${data.path}`}
                className="relative w-full h-[200px] cursor-pointer group hover:bg-DgyaLight transition-colors flex justify-between p-3 bg-slate-100 rounded-md shadow-md"
              >
                <h1 className="text-2xl group-hover:text-white font-bold">{data.title}</h1>
                {getIcon(data.icon)}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
