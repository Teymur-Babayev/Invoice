import React from "react";
import { formatDateToCustomString } from "../../../../utils/funcs";
import { User } from "../../../../api/fb.user";
import { ComentCtrl } from "../../../../api/comentarios/fb.comentarios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Trash, UserIcon } from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";

const UserCtrl = new User();
const ComentsCtrl = new ComentCtrl();
export const ComentarioCard = ({ Autor, Comentario }) => {
  const { User } = useAuth();
  const qc = useQueryClient();
  const Fecha = formatDateToCustomString(Comentario.fecha);
  const { data: UserData, isLoading } = useQuery(`${Comentario.userId}`, () =>
    UserCtrl.getMe(Comentario.userId)
  );

  const mutation = useMutation(`DeleteComent`, ComentsCtrl.DeleteComent);

  const handleDelete = async () => {
    mutation.mutate(Comentario.id, {
      onSuccess: () => {
        qc.invalidateQueries(`Coments ${Autor}`);
      },
    });
  };
  return (
    <div className="w-[300px] h-fit bg-white rounded-md p-3">
      <div className="flex w-full items-center gap-x-3">
        <div className="flex items-center gap-x-3">
          <Avatar className="">
            <AvatarImage src={UserData?.Img_url} />
            <AvatarFallback className="bg-black">
              <UserIcon className="text-white" />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-base font-semibold">{UserData?.Username}</h2>

          {User?.uid === Comentario.userId && (
            <div className="w-full  p-2">
              <Trash
                className="cursor-pointer"
                onClick={handleDelete}
                size={20}
              />
            </div>
          )}
        </div>
      </div>
      <p className="line-clamp-5 flex items-center h-[100px] mt-3">
        {Comentario.comentario}
      </p>

      <p className=" text-[14px] mt-2 font-semibold text-gray-400">{Fecha}</p>
    </div>
  );
};
