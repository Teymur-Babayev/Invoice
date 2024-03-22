import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import React from "react";
import { User } from "../api/fb.user";
import {
  initialValuesUpdate,
  validationSchema2,
} from "../utils/perfil.user.form";
import { Input } from "./ui/Input";
import { toast } from "../components/ui/use-toast";

const userCtrl = new User();
export const UpdateClienteForm = ({ UserSelected, setUserSelected }) => {
  const formik = useFormik({
    initialValues: initialValuesUpdate(UserSelected),
    validationSchema: validationSchema2(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      const resp = await userCtrl.updateMe(formValues.uid, formValues);
      if (resp) {
        toast({
          title: "Cliente actualizado exitosamente",
        });
        formik.resetForm()
        setUserSelected(null)
      } else {
        toast({
          variant: "destructive",
          title: "Ocurrio un error al actualizar los datos",
        });
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full space-y-3">
        <div className="flex flex-col md:flex-row md:space-x-3">
          <Input
            title={"Nombre"}
            className={"w-full"}
            name={"Nombre"}
            type={"text"}
            placeholder={"John"}
            value={formik.values.Nombre}
            onChange={formik.handleChange}
            error={formik.errors.Nombre}
          />
          <Input
            title={"Apellido"}
            className={"w-full"}
            name={"Apellido"}
            type={"text"}
            placeholder={"Doe"}
            value={formik.values.Apellido}
            onChange={formik.handleChange}
            error={formik.errors.Apellido}
          />
        </div>
        <Input
          title={"Nombre de usuario"}
          className={"w-full"}
          name={"Username"}
          type={"text"}
          placeholder={"John"}
          value={formik.values.Username}
          onChange={formik.handleChange}
          error={formik.errors.Username}
        />
        <Input
          title={"Correo de usuario"}
          className={"w-full"}
          name={"email"}
          type={"email"}
          placeholder={"John"}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <div className="flex flex-col md:flex-row md:space-x-3">
          <Input
            title={"Cargo"}
            className={"w-full"}
            name={"Cargo"}
            type={"text"}
            placeholder={"gerente,empleado,etc..."}
            value={formik.values.Cargo}
            onChange={formik.handleChange}
            error={formik.errors.Cargo}
          />
          <Input
            title={"Empresa"}
            className={"w-full"}
            name={"Empresa"}
            type={"text"}
            placeholder={"inc S.A"}
            value={formik.values.Empresa}
            onChange={formik.handleChange}
            error={formik.errors.Empresa}
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0 pb-5">
          <select
            name={"UserPlan"}
            value={formik.values.UserPlan}
            onChange={formik.handleChange}
            className={`${
              formik.errors.UserPlan
                ? "bg-red-500 placeholder:text-white text-white"
                : ""
            } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          >
            <option value="" label="Selecciona un plan">
              planes de usuario{" "}
            </option>
            <option value="Gratis">Gratis </option>
            <option value="RPC">Plan RPC y STATUS </option>
            <option value="Pendientes">Plan Años Pendientes </option>
            <option value="Personal">Plan Personal </option>
            <option value="Empresarial">Plan Empresarial </option>
          </select>

          <select
            name={"UserRole"}
            value={formik.values.UserRole}
            onChange={formik.handleChange}
            className={`${
              formik.errors.UserRole
                ? "bg-red-500 placeholder:text-white text-white"
                : ""
            } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          >
            <option value="" label="Permisos de Usuario">
              Permisos de Usuario{" "}
            </option>
            <option value="Admin">Admin</option>
            <option value="SubAdmin">SubAdmin</option>
            <option value="Cliente">Cliente</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-2 py-2 flex items-center justify-center hover:bg-black/70 transition-colors bg-black text-white rounded-md"
        >
          {formik.isSubmitting ? (
            <Loader2 className="animate-spin animate-infinite" />
          ) : (
            "Actualizar Cliente"
          )}
        </button>
      </div>
    </form>
  );
};
