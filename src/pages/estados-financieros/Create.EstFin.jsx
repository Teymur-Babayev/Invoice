import React, { useState } from "react";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { FormContainer } from "../../components/ui/FormContainer";
import { FileInput } from "../../components/FileInput";
import { Input } from "../../components/ui/Input";
import { ButtonForm } from "../../components/ui/ButtonForm";
import { meses } from "../../assets/adminData";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../../utils/estFin.form";
import { uid } from "uid";
import { useAuth } from "../../hooks/useAuth";
import { EstFinCtrl } from "../../api/estados-financieros/fb.estfin";
import { User as UserCt } from "../../api/fb.user";
import { toast } from "../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const EstFin = new EstFinCtrl();
const UserCtrl = new UserCt();
export const CreateEstFinPage = () => {
  const [EstFinDoc, setEstFinDoc] = useState("");
  const { User } = useAuth();
  const navigate = useNavigate();

  const { data: clientes } = useQuery("Clientes", UserCtrl.getUsersWithOutRole);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      let filteredClient =
        clientes?.filter((client) =>
          client.uid.toLowerCase().includes(formValues.cliente.toLowerCase())
        ) || [];
      const Slug = uid(25);
      

      if (formValues.month && formValues.year !== "") {
        let EstFinData = {
          ventas: formValues.ventas,
          gastos: formValues.gastos,
          username: filteredClient[0]?.Username,
          uid: formValues?.cliente,
          month: formValues.month,
          EstadoFinacieroUrl: EstFinDoc
            ? await EstFin.uploadEstadoFin(EstFinDoc, User?.uid, Slug)
            : "",
          year: formValues.year,
          _id: Slug
        };
        const result = await EstFin.createEstFin(Slug, EstFinData);
        if (result) {
          // El blog se creó correctamente
          toast({
            title: "Estado Finaciero Creado Exitosamente",
          });

          formik.resetForm();
          navigate("/Perfil");
        } else {
          // Hubo un error al crear el blog
          toast({
            variant: "destructive",
            title: "Ocurrio un error al subir el Estado Financiero",
            description:
              "algo paso al monento de registrar los datos suministrados.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "los datos mes y año no pueden estar vacios",
          description:
            "algo paso al monento de registrar los datos suministrados.",
        });
      }
    },
  });

  return (
    <MainLayoutDg isblack={true}>
      <FormContainer>
        <div className="pb-[3%]">
          <h2 className="text-4xl font-bold text-white text-center">
            Crear Solicitud
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-LogoBlue/50  max-w-3xl space-y-3 rounded-md mx-auto mt-5 p-[2%] w-full h-full"
          >
            <div className="w-full h-fit px-[2%] md:px-[15%]">
              <h2 className="text-white text-2xl font-semibold mb-2">Ventas</h2>
              <Input
                placeholder={"Ventas"}
                type={"number"}
                name={"ventas"}
                value={formik.values.ventas}
                onChange={formik.handleChange}
                error={formik.errors.ventas}
              />
            </div>
            <div className="w-full h-fit  px-[2%] md:px-[15%]">
              <h2 className="text-white text-2xl font-semibold mb-2">Gastos</h2>
              <Input
                placeholder={"Gastos"}
                type={"number"}
                name={"gastos"}
                value={formik.values.gastos}
                onChange={formik.handleChange}
                error={formik.errors.gastos}
              />
            </div>
            <div className="w-full h-fit px-[2%] md:px-[15%]">
              <h2 className="text-white text-2xl font-semibold mb-2">
                Cliente
              </h2>
              <select
                className="w-full px-6 py-2 rounded-md"
                name={"cliente"}
                value={formik.values.cliente}
                onChange={formik.handleChange}
              >
                <option value="">Selecciona un cliente</option>
                {clientes?.map((cliente, index) => (
                  <option key={index} value={cliente?.uid}>
                    {cliente?.Username}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full h-fit  px-[2%] md:px-[15%]">
              <h2 className="text-white text-2xl font-semibold mb-5">
                Estado Financiero
              </h2>
              <FileInput Doc={EstFinDoc} setDoc={setEstFinDoc} />
            </div>
            <div className="w-full space-x-3 h-fit flex px-[2%] md:px-[15%]">
              <div className="space-y-2">
                <select
                  className="w-fit px-6 py-2 rounded-md"
                  name={"month"}
                  value={formik.values.month}
                  onChange={formik.handleChange}
                >
                  <option value="">Selecciona Un Mes</option>
                  {meses.map((mes) => (
                    <option key={mes} value={mes}>
                      {mes}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <select
                  className="w-fit px-6 py-2 rounded-md"
                  name={"year"}
                  value={formik.values.year}
                  onChange={formik.handleChange}
                >
                  <option value="">Selecciona Un Año</option>
                  <option value={"2022"}>2022</option>
                  <option value={"2023"}>2023</option>
                  <option value={"2024"}>2024</option>
                  <option value={"2025"}>2025</option>
                </select>
              </div>
            </div>
            <div className="w-full h-fit  px-[2%] md:px-[15%]">
              <ButtonForm formik={formik} title={"Subir Estado Financiero"} />
            </div>
          </form>
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
