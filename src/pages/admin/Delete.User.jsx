import React, { useState } from "react";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { FormContainer } from "../../components/ui/FormContainer";
import { User } from "../../api/fb.user";
import { useQuery } from "react-query";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Loader2, Trash2, User2 } from "lucide-react";
import { useFormik } from "formik";
import {
  initialValuesDelete,
  validationSchemaDelete,
} from "../../utils/perfil.user.form";
import { toast } from "../../components/ui/use-toast";

const userCtrl = new User();
export const DeleteUserPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [UserSelected, setUserSelected] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const { data: users } = useQuery("User", userCtrl.getUsersWithOutRole);

  const filteredUsers =
    users?.filter((user) =>
      user.Username.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const formik = useFormik({
    initialValues: initialValuesDelete(UserSelected),
    validationSchema: validationSchemaDelete(),
    validateOnChange: false,
    onSubmit: async () => {
      const resp = await userCtrl.delUser(UserSelected)

      if (resp) {
        setUserSelected(null);
        toast({
          title: "Usuario eliminado exitosamente",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Ocurrio un error al eliminar el Usuario",
          description:
            "algo paso al monento de registrar los datos suministrados.",
        });
      }
    },
  });
  return (
    <MainLayoutDg>
      <FormContainer>
      <div className="w-full h-full min-h-screen px-[3%]">
        <h2 className="text-5xl text-white font-bold text-center py-5">
          Eliminar Usuario
        </h2>
        <div className="max-w-2xl rounded-md p-8 shadow-lg mx-auto bg-LogoBlue/50 ">
          {/* buscador de blogs */}
          <div className="relative bg-slate-100 flex items-center rounded-full my-2">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              id="search"
              type="text"
              placeholder="Buscar Usuario"
              value={searchTerm}
              onChange={handleSearch}
              onFocus={handleFocus}
              autoComplete="off"
            />
            <ul
              className={`${
                isFocused ? "absolute" : "hidden"
              } -bottom-[220%] md:-bottom-[240%] z-50 rounded-md shadow-md left-[5%] p-4 bg-white h-[90px] overflow-y-auto w-[90%] mt-4`}
            >
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  // Rest of your code...
                  <li
                    key={index}
                    onClick={() => {
                      setUserSelected(user);
                      setIsFocused(false);
                    }}
                  >
                    {user.Username}
                  </li>
                ))
              ) : (
                <li>no se encontraron resultados</li>
              )}
            </ul>
          </div>
          {UserSelected && (
            <form onSubmit={formik.handleSubmit} className="mt-5 space-y-3">
              <div className="flex justify-center items-center"></div>
              <div className="text-2xl text-white gap-3 font-semibold flex items-center   ">
                Usuario a eliminar:{" "}
                <Avatar>
                  <AvatarImage src={UserSelected.Img_url} />
                  <AvatarFallback className="bg-black">
                    <User2 className="text-white" />
                  </AvatarFallback>
                </Avatar>{" "}
                {UserSelected.Username}
              </div>
              <button
                type="submit"
                className="w-full px-2 py-2 flex items-center justify-center hover:bg-red-400 transition-colors bg-red-500 text-white rounded-md"
              >
                {formik.isSubmitting ? (
                  <Loader2 className="animate-spin animate-infinite" />
                ) : (
                  <>
                    Eliminar Usuario <Trash2 className="ml-3" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      </FormContainer>
      
    </MainLayoutDg>
  );
};
