import React from "react";
import { User } from "../api/fb.user";
import { File } from "lucide-react";

const UserCtrl = new User();
export const SolicitudCard = ({ uid,info }) => {

  return <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
    <File/>
    <h2 className="text-xs text-center">{info?.email}</h2>
    <h2 className="text-xs text-center">{info?.Plan}</h2>
    <h2 className="text-xs text-center">{info.Telefono}</h2>
    
  </div>;
};
