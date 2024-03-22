import React, { useEffect, useState } from "react";
import { MainLayoutDg } from "../../../layouts/MainLayoutDg";
import { FormContainer } from "../../../components/ui/FormContainer";
import { useAuth } from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { CursosCtrl } from "../../../api/fb.cursos";
import { useQuery } from "react-query";
import { SearchBar } from "../../../components/SearchBar";
import { MainLayout } from "../../../layouts/MainLayout";
import { Skeleton } from "../../../components/ui/skeleton";
import CursoCarousel from "../../../components/cursos/CursosCarousel";

const CursoCtrl = new CursosCtrl();
export const CursosFav = () => {
  const { User } = useAuth();

  const navigate = useNavigate();

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery("FavCursos", () => CursoCtrl.getFavCursos(User?.uid));



  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const blogsNormalized = blogs?.map((blog) => ({
    ...blog,
    tituloNormalized: blog?.Titulo?.toLowerCase()?.replace(
      /[^a-zA-Z0-9 ]/g,
      ""
    ),
  }));

  const filteredBlogs =
    blogsNormalized?.filter((blog) =>
      blog?.tituloNormalized?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading)
    return (
      <MainLayoutDg isblack={true}>
        <FormContainer>
          <div className="max-w-6xl w-full h-full min-h-screen overflow-hidden px-[3%] lg:px-0 mt-4 md:mt-10 ">
            <h1 className="text-3xl text-white font-bold mb-4 md:mb-10">
              Cursos Favoritos
            </h1>

            <div className="w-full h-fit py-5 ">
              <div className="w-full flex gap-5">
                <div className="flex flex-col items-center w-[250px] bg-white rounded-md shadow-md">
                  <Skeleton className="w-[90%] mt-2 mx-auto h-[150px]" />

                  <div className="flex w-full flex-col justify-between p-4 leading-normal">
                    <Skeleton className=" bg-slate-200 w-full h-5 rounded-full" />

                    <Skeleton className=" bg-slate-200 w-full h-10 mt-5 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-col items-center w-[250px] bg-white rounded-md shadow-md">
                  <Skeleton className="w-[90%] mt-2 mx-auto h-[150px]" />

                  <div className="flex w-full flex-col justify-between p-4 leading-normal">
                    <Skeleton className=" bg-slate-200 w-full h-5 rounded-full" />

                    <Skeleton className=" bg-slate-200 w-full h-10 mt-5 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-col items-center w-[250px] bg-white rounded-md shadow-md">
                  <Skeleton className="w-[90%] mt-2 mx-auto h-[150px]" />

                  <div className="flex w-full flex-col justify-between p-4 leading-normal">
                    <Skeleton className=" bg-slate-200 w-full h-5 rounded-full" />

                    <Skeleton className=" bg-slate-200 w-full h-10 mt-5 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
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
        <div className={`w-full min-h-screen h-full flex flex-1`}>
          <div className="max-w-6xl px-[3%] lg:px-0 w-full mt-4 md:mt-10 ">
            <div className="w-full h-fit flex items-center justify-between  p-4">
              <div className="w-full flex items-center  md:w-1/2">
                {User && (
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center w-fit gap-x-3 hover:bg-black/80 group hover:text-white transition-all bg-white px-4 py-2 rounded-md cursor-pointer"
                  >
                    Volver
                  </button>
                )}
              </div>
              <div className="w-full  md:w-1/2">
                <SearchBar
                  placeholder="Busca un blog aqui"
                  handleSearch={handleSearch}
                  searchTerm={searchTerm}
                />
              </div>
            </div>

            {filteredBlogs.length > 0 ? (
              <>
                <h2 className="text-3xl uppercase mt-10 text-white font-bold mb-4 md:mb-10">
                  Cursos Favoritos
                </h2>

                <CursoCarousel array={filteredBlogs} />
              </>
            ) : (
              <>
                <h2 className="text-3xl uppercase mt-10 text-white font-bold mb-4 md:mb-10">
                  No tienes Blogs Favoritos en este momento
                </h2>
              </>
            )}
          </div>
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
