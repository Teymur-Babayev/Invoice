import React, { useEffect, useState } from "react";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { useQuery } from "react-query";
import { CursosCtrl } from "../../api/fb.cursos";
import { Loader2, Trash2 } from "lucide-react";
import { useFormik } from "formik";
import {
  initialValuesDelete,
  validationSchemaDelete,
} from "../../utils/perfil.curso.form";
import { ButtonForm } from "../../components/ui/ButtonForm";
import { FormContainer } from "../../components/ui/FormContainer";

const cursosCtrl = new CursosCtrl();
export const DeleteCursoPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [CursoSelected, setCursoSelected] = useState(null);
  const [videosCurso, setvideosCurso] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const { data: cursos } = useQuery("Cursos", cursosCtrl.getCursos);

  const filteredCursos =
    cursos?.filter((curso) =>
      curso.Titulo.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  useEffect(() => {
    (async () => {
      if (CursoSelected) {
        const videosCursos = await cursosCtrl.getVideosCurso(CursoSelected.id);
        setvideosCurso(videosCursos);
      }
    })();
  }, [CursoSelected]);

  const formik = useFormik({
    initialValues: initialValuesDelete(),
    validationSchema: validationSchemaDelete(),
    validateOnChange: false,
    onSubmit: async () => {
      let deleteData = {
        ...CursoSelected,
        videos: videosCurso,
      };
      await cursosCtrl.deleteCurso(deleteData);
    },
  });

  return (
    <MainLayoutDg isblack={true}>
      <FormContainer>
        <div className="w-full min-h-screen h-full px-[3%]">
          <h2 className="text-2xl text-white font-bold text-center py-5">
            Eliminar Curso
          </h2>
          <div className="max-w-2xl rounded-md p-8 shadow-lg mx-auto bg-DgyaDark/30 ">
            {/* buscador de blogs */}
            <div className="relative bg-slate-100 flex items-center rounded-full my-2">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                id="search"
                type="text"
                placeholder="Buscar Blog"
                value={searchTerm}
                onChange={handleSearch}
                onFocus={handleFocus}
                autocomplete="off"
              />
              <ul
                className={`${
                  isFocused ? "absolute" : "hidden"
                } -bottom-[220%] md:-bottom-[240%] rounded-md shadow-md left-[5%] p-4 bg-white h-[90px] overflow-y-auto w-[90%] mt-4`}
              >
                {filteredCursos.length > 0 ? (
                  filteredCursos.map((curso, index) => (
                    // Rest of your code...
                    <li
                      key={index}
                      onClick={() => {
                        setCursoSelected(curso);
                        setIsFocused(false);
                      }}
                    >
                      {curso.Titulo}
                    </li>
                  ))
                ) : (
                  <li>no se encontraron resultados</li>
                )}
              </ul>
            </div>
            {CursoSelected ? (
              <form onSubmit={formik.handleSubmit} className="space-y-3 mt-5">
                <div className="w-full flex justify-center ">
                  <img
                    className="object-contain w-full max-w-xs  md:w-32 md:h-32 rounded-t-lg  md:rounded-none md:rounded-l-lg"
                    src={`${CursoSelected?.curso_img}`}
                    alt=""
                  />
                </div>

                <h2 className="text-2xl text-white font-semibold">
                  Titulo: {CursoSelected?.Titulo}
                </h2>

                <ButtonForm
                  formik={formik}
                  title={"Eliminar Curso"}
                  icon={true}
                />
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
