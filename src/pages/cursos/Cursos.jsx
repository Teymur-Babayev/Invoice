import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "react-query";
import { CursosCtrl } from "../../api/fb.cursos";
import { AlertCircle, Bookmark } from "lucide-react";
import { CreatedBy } from "../../components/CreatedBy";
import { Skeleton } from "../../components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { SearchBar } from "../../components/SearchBar";
import fondo from "../../assets/fondo.webp";
import { FormContainer } from "../../components/ui/FormContainer";
import CursosCarousel from "../../components/cursos/CursosCarousel";

const CursosCtrlr = new CursosCtrl();
export const Cursos = () => {
  const { User } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!User) return navigate("/Login", { replace: true });
  }, [User]);

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: Cursos,
    isLoading,
    isError,
  } = useQuery("Cursos", () => CursosCtrlr.getCursos());

  const filteredCourses =
    Cursos?.filter((course) =>
      course.Titulo.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const minLikes = 1;

  const filteredByLikes = Cursos
    ?.filter((blog) => {
      return blog?.likes?.length >= minLikes;
    })
    ?.slice(0, 3);


  if (isLoading)
    return (
      <MainLayoutDg isblack={true}>
        <div
          className="bg-fixed bg-cover overflow-hidden min-h-screen h-full"
        >
          <div className="max-w-6xl mx-auto">
            <div className={` px-[3%] lg:px-0 pt-[18%] md:pt-[8.4%]`}>
              <div className="my-3">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only "
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Busca un blog aqui"
                    required
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <h1 className="text-3xl text-white font-bold mb-4 md:mb-10">
                Nuestros Cursos
              </h1>
              <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-5 pb-[13%] `}
              >
                <div className="w-full flex gap-3 ">
                  <div className="max-w-md bg-white p-4 shadow-md rounded-md">
                    <Skeleton className="w-full bg-slate-200 h-[200px] rounded-md" />
                    <Skeleton className="w-[70%]  mt-5 bg-slate-200 h-[20px] rounded-md" />
                    <Skeleton className="w-full  mt-5 bg-slate-200 h-[60px] rounded-md" />

                    <div className="flex mt-5 items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                  </div>
                  <div className="max-w-md bg-white p-4 shadow-md rounded-md">
                    <Skeleton className="w-full bg-slate-200 h-[200px] rounded-md" />
                    <Skeleton className="w-[70%]  mt-5 bg-slate-200 h-[20px] rounded-md" />
                    <Skeleton className="w-full  mt-5 bg-slate-200 h-[60px] rounded-md" />

                    <div className="flex mt-5 items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            <div className="w-full h-fit flex items-center justify-between p-4">
              <div className="w-full flex items-center  md:w-1/2">
                {User && (
                  <Link
                    to={`/${User?.uid}/Cursos/Favoritos`}
                    className="flex items-center w-fit gap-x-3 hover:bg-black/80 group hover:text-white transition-all bg-white px-4 py-2 rounded-md cursor-pointer"
                  >
                    <Bookmark /> Mis Favoritos
                  </Link>
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

            {filteredByLikes.length > 0 && (
              <>
                <h2 className="text-3xl uppercase text-black font-bold mb-4 md:mb-10">
                  popular
                </h2>
                <CursosCarousel isPopular={true} array={filteredByLikes} />
              </>
            )}

            {filteredCourses.length > 0 ? (
              <>
                <h2 className="text-3xl uppercase mt-10 text-black font-bold mb-4 md:mb-10">
                  recientes
                </h2>
                <CursosCarousel isPopular={true} array={filteredCourses} />
              </>
            ) : (
              <h2 className="text-3xl uppercase mt-10 text-black font-bold mb-4 md:mb-10">
                No existen Cursos disponibles aun
              </h2>
            )}
          </div>
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
