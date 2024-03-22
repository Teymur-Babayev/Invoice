import React, { useEffect, useState } from "react";
import { MainLayoutDg } from "../../../layouts/MainLayoutDg";
import { useParams } from "react-router-dom";
import { AutorCard } from "../../../components/AutorCard";
import { useQuery } from "react-query";
import { CursosCtrl } from "../../../api/fb.cursos";
import { useAuth } from "../../../hooks/useAuth";
import { Skeleton } from "../../../components/ui/skeleton";
import { FormContainer } from "../../../components/ui/FormContainer";
import { VideosField } from "../../../components/cursos/curso/components/VideosField";
import { Comentarios } from "../../../components/cursos/curso/components/Comentarios";
import { ComentarioField } from "../../../components/cursos/curso/components/ComentarioField";
import { ComentarioForm } from "../../../components/comentarios/ComentarioForm";

const CursosApi = new CursosCtrl();
export const Curso = () => {
  const { User } = useAuth();
  if (!User) return (window.location.href = "/Login");
  const { cursoId } = useParams();
  const [Videos, setVideos] = useState([]);

  const [ButtonOPT, setButtonOPT] = useState("Videos");

  const {
    data: curso,
    isError,
    isLoading,
  } = useQuery(`${cursoId}`, () => CursosApi.getCurso(cursoId));

  useEffect(() => {
    (async () => {
      const resp = await CursosApi.getVideosCurso(cursoId);
      const videoOrdenados = resp.sort((a, b) => {
        return a.fecha - b.fecha;
      });
      setVideos(videoOrdenados);
    })();
  }, [!isLoading]);

  if (isLoading)
    return (
      <MainLayoutDg isblack={true}>
        <FormContainer>
          <div className="h-full md:h-fit md:px-[2%] md:mt-5">
            <div className="flex flex-col md:flex-row gap-x-5 pb-5">
              <Skeleton className="w-full md:w-[500px] h-[350px] bg-slate-200 mx-auto my-5 md:m-0 md:my-0" />
              <div className="w-full space-y-3 pt-5">
                <Skeleton className="w-full h-8 bg-slate-200 md:mx-auto my-5 md:m-0 md:my-0" />
                <Skeleton className="w-[70%] h-8 bg-slate-200 md:mx-auto my-5 md:m-0 md:my-0" />
                <div className="flex h-[70%] items-end flex-grow  md:p-5">
                  <Skeleton className="w-[50%] h-24 bg-slate-200 md:mx-auto my-5 md:m-0 md:my-0" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl text-white font-bold pb-4 md:pb-5">
              Lista de Videos
            </h1>
            <div className="w-full flex flex-row gap-3 ">
              <div className="bg-white w-full p-2 shadow-md rounded-md">
                <Skeleton className="w-full md:w-[200px] bg-slate-200 h-[150px] rounded-md " />

                <Skeleton className="w-full mt-2 bg-slate-200 h-[20px] rounded-md " />
              </div>

              <div className="bg-white w-full p-2 shadow-md rounded-md">
                <Skeleton className="w-full md:w-[200px] bg-slate-200 h-[150px] rounded-md " />

                <Skeleton className="w-full mt-2 bg-slate-200 h-[20px] rounded-md " />
              </div>
            </div>
          </div>
        </FormContainer>
      </MainLayoutDg>
    );

  if (isError)
    return (
      <MainLayoutDg>
        <h2>Ocurrio un error buscando la informacion.</h2>
      </MainLayoutDg>
    );
  return (
    <MainLayoutDg isblack={true}>
      <FormContainer>
        <div className="h-full md:h-fit md:px-[2%] md:mt-5">
          <div className="flex flex-col md:flex-row gap-x-5 mb-5">
            <img
              className="aspect-square w-[300px] mx-auto my-5 md:m-0 md:my-0"
              src={curso?.curso_img}
              alt="curso_img"
            />
            <div className="w-full">
              <h1 className="text-3xl text-white font-bold mb-4 md:mb-5">
                Curso: {curso?.Titulo}
              </h1>
              <p className="text-2xl text-white font-semibold mb-4 md:mb-10">
                {curso?.Descripcion}
              </p>
              <AutorCard autor={curso?.Autor} cargo={curso?.Cargo} />
            </div>
          </div>

          <div className="w-full h-fit py-4 flex justify-between md:justify-start gap-x-4">
            <button
              onClick={() => setButtonOPT("Videos")}
              className={`${
                ButtonOPT === "Videos"
                  ? "bg-white"
                  : " border border-white text-white"
              } font-bold hover:bg-white hover:text-black transition-all rounded-md px-6 py-2`}
            >
              Videos
            </button>
            <button
              onClick={() => setButtonOPT("Comentarios")}
              className={`${
                ButtonOPT === "Comentarios"
                  ? "bg-white"
                  : " border border-white text-white"
              } font-bold hover:bg-white hover:text-black transition-all rounded-md px-6 py-2`}
            >
              Comentarios
            </button>
          </div>
          {ButtonOPT === "Videos" && (
            <>
              <h2 className="text-white font-bold text-2xl my-3">
                Lista de Videos
              </h2>
              <VideosField cursoId={cursoId} array={Videos} />
            </>
          )}
          {ButtonOPT === "Comentarios" && (
            <>
              {User && (
                <>
                  <ComentarioForm id={cursoId} zona={"Curso"} />
                </>
              )}
              <h2 className="text-white font-bold text-2xl my-3">
                Comentarios
              </h2>
              <ComentarioField id={cursoId} />
            </>
          )}

          <div className="pb-10"></div>
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
