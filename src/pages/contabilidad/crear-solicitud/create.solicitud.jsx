import React, { useEffect, useState } from "react";
import { MainLayoutDg } from "../../../layouts/MainLayoutDg";
import { useAuth } from "../../../hooks/useAuth";
import { Input } from "../../../components/ui/Input";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "../../../utils/contabilidad.personas.form";
import { FileInput } from "../../../components/FileInput";
import { getCurrentDate } from "../../../utils/funcs";
import { ContabilidadCtrl } from "../../../api/contabilidad/fb.contabilidad";
import { toast } from "../../../components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { FormContainer } from "../../../components/ui/FormContainer";
import { ButtonForm } from "../../../components/ui/ButtonForm";

const Conta = new ContabilidadCtrl();
export const CreateSoliPage = () => {
  const { User } = useAuth();
  const { userPlan } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!User) {
      return navigate("/Login");
    }

    if (!User.UserPlan.includes(userPlan)) {
      return navigate(`/Contabilidad/${User.UserPlan}/${User.uid}`);
    }
  }, [User]);

  const [FirmaDigital, setFirmaDigital] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formData) => {
      let solicitudData = {
        ...formData,
        uid: User?.uid,
        estatus: "Activa",
        email: User?.email,
        Plan: User?.UserPlan,
        Fecha: getCurrentDate(),
        FirmaDigitalUrl: FirmaDigital
          ? await Conta.uploadFirma(FirmaDigital, User?.uid)
          : "",
      };

      const result = await Conta.createSolicitud(User?.uid, solicitudData);
      if (result) {
        // El blog se creó correctamente
        toast({
          title: "Solicitud Creada Exitosamente",
        });

        formik.resetForm();
      } else {
        // Hubo un error al crear el blog
        toast({
          variant: "destructive",
          title: "Ocurrio un error al crear la solicitud",
          description:
            "algo paso al monento de registrar los datos suministrados.",
        });
      }
    },
  });
  return (
    <MainLayoutDg isblack={true}>
      <FormContainer>
        <div className="pb-[3.9%] min-h-screen h-full w-full px-[2%] ">
          <div className="w-full mb-5 px-[3%]">
            <h2 className="text-2xl font-bold text-white text-center py-5">
              Crear Solicitud
            </h2>
            <form
              onSubmit={formik.handleSubmit}
              className="max-w-2xl rounded-md p-8 space-y-3 shadow-lg mx-auto bg-DgyaDark/30 "
            >
              <div className="grid grid-cols-1 space-y-2">
                <div className="flex">
                  <div className="w-1/2 flex items-center gap-x-3 h-fit ">
                    <h2 className="text-white">
                      Nombre Completo: {User.Nombre} {User.Apellido}
                    </h2>
                  </div>
                  <div className="w-1/2 flex items-center gap-x-3 h-fit ">
                    <h2 className="text-white">Nombre de Usuario: {User.Username}</h2>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-full  flex items-center gap-x-3 h-fit ">
                    <h2 className="text-white">Correo: {User.email}</h2>
                  </div>
                  <div className="w-full  flex items-center gap-x-3 h-fit ">
                    <h2 className="text-white">Plan: {User.UserPlan}</h2>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center gap-x-3 h-fit ">
                  <Input
                    name={"Telefono"}
                    title={"Telefono de contacto"}
                    type={"text"}
                    placeholder={"+52 555 34354464"}
                    value={formik.values.Telefono}
                    onChange={formik.handleChange}
                    className={` w-full text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  
                        ${
                          formik.errors.Telefono &&
                          "bg-red-500 text-white placeholder:text-white"
                        }
                        `}
                  />
                </div>

                <label className="block mb-2 text-sm font-medium text-white">
                  Agrega tu firma electronica
                </label>
                <FileInput Doc={FirmaDigital} setDoc={setFirmaDigital} />
              </div>
              
              <ButtonForm formik={formik} title={"Crear Solicitud"} />
              
            </form>
          </div>
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
