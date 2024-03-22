import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../../../utils/perfil.form";
import { User as UserCtrl } from "../../../api/fb.user";
import { Loader2, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../../../components/ui/Input";

const userCtrl = new UserCtrl();
export const UpdateDatos = () => {
  const { User, updateUser } = useAuth();

  const [Imagen, setImagen] = useState(null);
  const [handleImagen, sethandleImagen] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(User),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {

      let userInfo = {
        ...formValue,
        uid: User?.uid,
        Cargo: User?.Cargo,
        Empresa: User?.Empresa,
        Img_url: Imagen ? await userCtrl.uploadImage(Imagen, User?.uid) : "",
      }

      formik.resetForm()
      await userCtrl.updateMe(userInfo.uid, userInfo);
      updateUser(userInfo);
    },
  });
  return (
    <>
      <h3 className=" text-base text-white md:text-3xl text-center font-semibold mt-5">
        Completa tus datos de perfil aqui
      </h3>
      <form
        className="space-y-4 md:space-y-6 max-w-lg mx-auto mt-9"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex space-x-3">
          <Input
            className="w-full"
            title={"Nombre"}
            name={"Nombre"}
            placeholder={"John"}
            type={"text"}
            value={formik.values.Nombre}
            onChange={formik.handleChange}
            error={formik.errors.Nombre}
          />
          <Input
            className="w-full"
            title={"Apellido"}
            name={"Apellido"}
            placeholder={"Doe"}
            type={"text"}
            value={formik.values.Apellido}
            onChange={formik.handleChange}
            error={formik.errors.Apellido}
          />
        </div>

        <div>
          <Input
            className="w-full"
            title={"Nombre de Usuario"}
            name={"Username"}
            placeholder={"johndoe27"}
            type={"text"}
            value={formik.values.Username}
            onChange={formik.handleChange}
            error={formik.errors.Username}
          />
        </div>

        <div className="flex items-end space-x-3">
          <Input
            className="w-full"
            title={"Imagen de Perfil"}
            name={"User_img"}
            type={"file"}
            onChange={(event) => {
              setImagen(event.currentTarget.files[0]);
            }}
          />
          <Avatar className="-translate-y-1">
            <AvatarImage
              src={User ? User.Img_url : handleImagen}
              alt="@shadcn"
            />
            <AvatarFallback className="bg-black">
              <User2 className="text-white" />
            </AvatarFallback>
          </Avatar>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center text-white bg-black hover:bg-black/70 transition-colors focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          {formik.isSubmitting ? (
            <Loader2 className="animate-spin animate-infinite" />
          ) : (
            "Actualizar Datos"
          )}
        </button>
      </form>
    </>
  );
};
