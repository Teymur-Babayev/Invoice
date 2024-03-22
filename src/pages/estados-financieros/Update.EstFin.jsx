import React, { useState } from "react";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { FormContainer } from "../../components/ui/FormContainer";
import { useQuery } from "react-query";
import { EstFinCtrl } from "../../api/estados-financieros/fb.estfin";
import { UpdateEstadoForm } from "./update-estado-financiero/Upadate.Estado.Financiero";

const EstFin = new EstFinCtrl();
export const UpdateEstFin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [cursoSelected, setcursoSelected] = useState(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data: EstFinData } = useQuery("EstadosFinancieros", EstFin.getEstadoFinancieros);


  const filteredUsers = [...new Set(
    EstFinData?.filter(user => 
      user?.username?.toLowerCase()?.includes(searchTerm.toLowerCase())
    ).map(user => user.username)
  )];


  return (
    <MainLayoutDg>
      <FormContainer>
        <div className="w-full min-h-screen h-full px-[3%]">
          <h2 className="text-4xl text-white font-bold text-center py-5">
            Modificar Estado Financiero
          </h2>
          <div className="max-w-2xl rounded-md p-8 shadow-lg mx-auto bg-DgyaDark/30 ">
          <div className="relative bg-slate-100 flex items-center rounded-full my-2">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                id="search"
                type="text"
                placeholder="Buscar Cliente"
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
                {/* cursos encontrados */}
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((curso, index) => (
                    // Rest of your code...
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        setcursoSelected(curso);
                        setIsFocused(false);
                      }}
                      key={index}
                    >
                      {curso}
                    </li>
                  ))
                ) : (
                  <li>no se encontraron resultados</li>
                )}
              </ul>
            </div>
            {
              cursoSelected && (
                <UpdateEstadoForm
                cliente={cursoSelected}
                data={EstFinData}
                />
              )
            }
          </div>
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
