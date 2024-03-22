import React from "react";
import { useQuery } from "react-query";
import { User } from "../api/fb.user";
import { User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const AutorCtrl = new User();
export const CreatedBy = ({ autor }) => {
  const {
    data: Autor,
    isLoading,
    isError,
  } = useQuery(`${autor}`, () => AutorCtrl.getMe(autor));
  return (
    <p className="mb-3 font-normal text-gray-800 bg-slate-200 flex items-center  rounded-md py-2 px-2">
      <Avatar>
        <AvatarImage src={Autor?.Img_url} />
        <AvatarFallback className="bg-black"><User2 className="text-white"/></AvatarFallback>
      </Avatar>
      <span className="font-semibold ml-2">{Autor?.Username}</span> 
    </p>
  );
};
