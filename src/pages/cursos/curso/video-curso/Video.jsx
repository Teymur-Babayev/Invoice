import React, { useEffect } from "react";
import { MainLayout } from "../../../../layouts/MainLayout";
import { MainLayoutDg } from "../../../../layouts/MainLayoutDg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { CursosCtrl } from "../../../../api/fb.cursos";
import { CornerDownLeft } from "lucide-react";
import ReactPlayer from "react-player";
import { AutorCard } from "../../../../components/AutorCard";
import { useAuth } from "../../../../hooks/useAuth";
import { FormContainer } from "../../../../components/ui/FormContainer";
import { Skeleton } from "../../../../components/ui/skeleton";
import { ComentarioForm } from "../../../../components/comentarios/ComentarioForm";
import { ComentarioField } from "../../../../components/cursos/curso/components/ComentarioField";

const VideoCtrl = new CursosCtrl();
export const Video = () => {
  const { id, cursoId } = useParams();
  const { User } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!User) return navigate("/Login", { replace: true });
  }, [User]);

  const {
    data: video,
    isError,
    isLoading,
  } = useQuery(`${id}`, () => VideoCtrl.getVideo(id));

  const { data: curso } = useQuery(`${cursoId}`, () =>
    VideoCtrl.getCurso(cursoId)
  );

  if (isLoading)
    return (
      <MainLayoutDg>
        <FormContainer>
          <div className="w-full h-full pb-5 px-[3%] lg:px-0">
            <Skeleton className="w-[30%] h-6" />
            <Skeleton className="w-[100%] mt-7 h-[60vh]" />
            <Skeleton className="w-[50%] mt-7 h-[10vh]" />
            <h2 className="text-3xl mt-3 text-white font-bold">Descripcion</h2>
            <Skeleton className="w-[100%] my-3 h-[5vh]" />
          </div>
        </FormContainer>
      </MainLayoutDg>
    );

  if (isError)
    return (
      <MainLayout>
        <h2>Ocurrio un error buscando la informacion.</h2>
      </MainLayout>
    );
  return (
    <MainLayoutDg isblack={true}>
      <FormContainer>
        <div className="h-full md:h-full md:px-[2%] md:pt-5">
          <Link
            className="flex text-white items-end font-bold text-xl"
            to={`/curso/${cursoId}`}
          >
            <CornerDownLeft />
            Volver
          </Link>

          <h1 className="text-3xl text-white my-2 font-bold mb-4 md:mb-5">
            {video.Titulo}
          </h1>

          {/* video player */}
          <div className="aspect-video w-full overflow-hidden  rounded-md">
            <ReactPlayer
              height={"100%"}
              width={"100%"}
              url={video.modulo_url}
            />
          </div>

          <div className="mt-3">
            <AutorCard autor={curso.Autor} />
          </div>

          <div className="py-2">
            <h2 className="text-3xl text-white font-bold">Descripcion</h2>
            <h2 className="text-xl text-white font-semibold mb-4 md:mb-5">
              {video.Descripcion}
            </h2>
          </div>
          <div className="py-6">
            {User && (
              <>
                <ComentarioForm id={id} zona={"Video"} />
              </>
            )}
            <h2 className="text-3xl text-white font-bold mb-5">Comentarios</h2>
            <ComentarioField id={id} />
          </div>
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
