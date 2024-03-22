import { Bookmark } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CursoAutor } from "./CursoAutor";
import { formatDateToCustomString } from "../../utils/funcs";
import { useAuth } from "../../hooks/useAuth";
import { useMutation, useQueryClient } from "react-query";
import { CursosCtrl } from "../../api/fb.cursos";

const CursoCtrl = new CursosCtrl();
export const VideoCard = ({ blog }) => {
  const client = useQueryClient();
  const [IsFav, setIsFav] = useState(false)
  const {User} = useAuth()
  const Fecha = formatDateToCustomString(blog?.fecha);

  const mutationDarFav = useMutation(CursoCtrl.darFavoritosCursos);
  const mutationDarUnFav = useMutation(CursoCtrl.darUnFavoritosCursos);

  const navigate = useNavigate()

  useEffect(() => {
    const UserId = User?.uid;
    if (blog?.favs?.includes(UserId)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [blog]);

  const handleFav = () => {
    const CursoId = blog?.id;
    const UserId = User?.uid;

    if (!User) {
      navigate("/login", { replace: true });
    } else {
      mutationDarFav.mutate({CursoId,UserId},{
        onSuccess:()=>{
          client.invalidateQueries(['Cursos']);
          client.invalidateQueries(['FavCursos']);
        }
      })
    }
  };

  const handleUnFav = () => {
    const CursoId = blog?.id;
    const UserId = User?.uid;

    mutationDarUnFav.mutate({CursoId,UserId},{
      onSuccess:()=>{
        client.invalidateQueries(['Cursos']);
        client.invalidateQueries(['FavCursos']);
      }
    })
  }

  return (
    <div
      className="w-1/3 min-w-[320px] mr-4  flex flex-col items-center h-fit bg-white rounded-xl shadow-md"
    >
      {/* Imagen Blog */}
      <div to={`/curso/${blog.Slug}`} className="w-full h-fit relative">
        <img
          src={blog?.curso_img}
          className="h-[200px] w-full shadow-lg rounded-xl"
          alt=""
        />
        <div className="absolute z-50 right-[5%] shadow-md -bottom-[10%] bg-white rounded-full flex justify-center p-2 items-center">
          {
            IsFav ? (<Bookmark onClick={handleUnFav} className="text-LogoBlue fill-LogoBlue cursor-pointer" />) : (<Bookmark onClick={handleFav} className="text-LogoBlue cursor-pointer" />)
          }
          
        </div>
      </div>

      <Link to={`/curso/${blog.Slug}`} className="w-full h-fit px-[5%]">
        <p className="mt-3 text-[14px] font-semibold text-gray-400">{Fecha}</p>

        <h3 className="mt-2 font-bold">{blog?.Titulo}</h3>

        <h4 className="mt-2 line-clamp-2">{blog?.Descripcion}</h4>

        <div className="w-1/2 mx-auto mt-5">
          <button className="w-full py-1 bg-gradient-to-r shadow-lg shadow-LogoBlue text-white rounded-md from-LogoBlue  to-LogoBlueDark">
            Ver
          </button>
        </div>
      </Link>

      <div className="px-[5%] w-full h-fit py-2">
        <CursoAutor id={blog?.Autor} blog={blog} />
      </div>
    </div>
  );
};
