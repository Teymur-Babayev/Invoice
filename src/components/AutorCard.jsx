import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { User } from "../api/fb.user";
import { User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const AutorCtrl = new User();
export const AutorCard = ({ autor, mxauto }) => {
  const {
    data: Autor,
    isLoading,
    isError,
  } = useQuery(`${autor}`, () => AutorCtrl.getMe(autor));

  return (
    <div
      className={`${
        mxauto ? "mx-auto" : ""
      } bg-white rounded-md w-full md:max-w-md items-center shadow-lg flex p-5`}
    >
      <Avatar className="mr-5 w-16 h-16">
        <AvatarImage src={Autor?.Img_url} />
        <AvatarFallback className="bg-black"><User2 className="text-white"/></AvatarFallback>
      </Avatar>

      <div className="w-[70%]">
        <h4 className="text-xl font-semibold">Author:</h4>
        <div className="flex gap-x-1 md:gap-x-4">
          <h3>{Autor?.Username}</h3>-<h5>{Autor?.Cargo}</h5>
        </div>
      </div>
    </div>
  );
};
