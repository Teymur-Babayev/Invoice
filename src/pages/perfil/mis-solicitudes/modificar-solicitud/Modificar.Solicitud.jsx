import React, { useState } from "react";
import { MainLayoutDg } from "../../../../layouts/MainLayoutDg";
import { useNavigate, useParams } from "react-router-dom";
import { ContabilidadCtrl } from "../../../../api/contabilidad/fb.contabilidad";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import { useAuth } from "../../../../hooks/useAuth";
import { Input } from "../../../../components/ui/Input";
import { FileInput } from "../../../../components/FileInput";
import {
  initialValues,
  validationSchema,
} from "../../../../utils/contabilidad.personas.form";
import { Loader2 } from "lucide-react";
import { toast } from "../../../../components/ui/use-toast";
import { FormContainer } from "../../../../components/ui/FormContainer";
import { Skeleton } from "../../../../components/ui/skeleton";

const Conta = new ContabilidadCtrl();
export const UpdateSoliPage = () => {
  const { User } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [FirmaDigital, setFirmaDigital] = useState(null);

  const { data: solicitud,isLoading } = useQuery(id, () => Conta.getSolicitud(id));

  const formik = useFormik({
    initialValues: initialValues(solicitud),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formData) => {
      let UpdatedSoli = {
        ...formData,
        Fecha: solicitud?.Fecha,
        Plan: solicitud?.Plan,
        estatus: solicitud?.estatus,
        uid: User?.uid,
        FirmaDigitalUrl: FirmaDigital
          ? await Conta.uploadFirma(FirmaDigital, User?.uid)
          : solicitud.FirmaDigitalUrl,
      };

      const result = await Conta.updateSolicitud(id, UpdatedSoli);
      if (result) {
        // El blog se creó correctamente
        toast({
          title: "Solicitud Modificada Exitosamente",
        });

        navigate("/Perfil");
        formik.resetForm();
      } else {
        // Hubo un error al crear el blog
        toast({
          variant: "destructive",
          title: "Ocurrio un error al modificar la solicitud",
          description:
            "algo paso al monento de registrar los datos suministrados.",
        });
      }
    },
  });

  if(isLoading){
    return(
      <MainLayoutDg>
        <FormContainer>
          <Skeleton className='w-[50%] mx-auto h-10'/>
          <div className="px-[3%] lg:px-0">

          <Skeleton className='w-[70%] mx-auto mt-10 h-[70vh]'/>
          </div>
        </FormContainer>
      </MainLayoutDg>
    )
  }

  return (
    <MainLayoutDg>
      <FormContainer>
        <h1 className="text-3xl text-white text-center font-bold my-4 md:mb-5">
          Modificar Solicitud: <br /> {id}
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-2xl rounded-md p-8 space-y-3 shadow-lg mx-auto bg-LogoBlueDark/80 "
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
          <button
            type="submit"
            className="w-full flex justify-center py-2 rounded-md bg-black text-white "
          >
            {formik.isSubmitting ? (
              <Loader2 className="animate-spin animate-infinite" />
            ) : (
              "Modificar Solicitud"
            )}
          </button>
        </form>
      </FormContainer>
    </MainLayoutDg>
  );
};
