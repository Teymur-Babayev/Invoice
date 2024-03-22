import React, { useState } from "react";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { FormContainer } from "../../components/ui/FormContainer";
import { User } from "../../api/fb.user";
import { useQuery } from "react-query";
import { UpdateClienteForm } from "../../components/UpdateClienteForm";

const userCtrl = new User();
export const PageClienteUpdate = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [UserSelected, setUserSelected] = useState(null);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data: usuarios } = useQuery("Users", userCtrl.getUsersWithOutRole);

  const filteredClientes =
    usuarios?.filter((usuario) =>
      usuario.Username.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <MainLayoutDg>
      <FormContainer>
      <div className="w-full h-full min-h-screen px-[3%]">
        <h2 className="text-5xl font-bold text-white text-center py-5">
          Actualizar Cliente
        </h2>
        <div className="max-w-2xl rounded-md p-8 shadow-lg mx-auto bg-LogoBlue/50 ">
          {/* buscador de Clientes */}
          <div className="relative bg-slate-100 flex items-center rounded-full my-2">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              id="search"
              type="text"
              placeholder="Buscar Cliente"
              value={searchTerm}
              onChange={handleSearch}
              onFocus={handleFocus}
              autoComplete="off"
            />
            <ul
              className={`${
                isFocused ? "absolute" : "hidden"
              } -bottom-[220%] md:-bottom-[240%] rounded-md shadow-md left-[5%] p-4 bg-white h-[90px] overflow-y-auto w-[90%] mt-4`}
            >
              {filteredClientes.length > 0 ? (
              filteredClientes.map((usuario, index) => (
                // Rest of your code...
                <li
                  onClick={() => {
                    setUserSelected(usuario);
                    setIsFocused(false);
                  }}
                  key={index}
                >
                  {usuario.Username}
                </li>
              ))
            ) : (
              <li>no se encontraron resultados</li>
            )}
            </ul>
          </div>
          {UserSelected && (
                <UpdateClienteForm  UserSelected={UserSelected} setUserSelected={setUserSelected}/>
          )}
        </div>
      </div>
      </FormContainer>
      
    </MainLayoutDg>
  );
};
