import React from "react";
import { MainLayoutDg } from "../../../../layouts/MainLayoutDg";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { ContabilidadCtrl } from "../../../../api/contabilidad/fb.contabilidad";
import { useQuery } from "react-query";
import { toast } from "../../../../components/ui/use-toast";
import { FormContainer } from "../../../../components/ui/FormContainer";
import { Skeleton } from "../../../../components/ui/skeleton";

const Conta = new ContabilidadCtrl();
export const DeleteSoliPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: soli,isLoading } = useQuery(id, () => Conta.getSolicitud(id));

  const formik = useFormik({
    initialValues: {},
    validateOnChange: false,
    onSubmit: async () => {
      const result = await Conta.deleteSolicitud(id, soli);
      if (result) {
        // El blog se creó correctamente
        toast({
          title: "Solicitud Eliminada Exitosamente",
        });

        navigate("/Perfil");
        formik.resetForm();
      } else {
        // Hubo un error al crear el blog
        toast({
          variant: "destructive",
          title: "Ocurrio un error al Eliminar la solicitud",
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
          <div className="px-[3%] lg:px-0 mt-10">
            <Skeleton className='w-[80%] mx-auto h-[40vh]'/>
          </div>
        </FormContainer>
      </MainLayoutDg>
    )
  }
  return (
    <MainLayoutDg>
      <FormContainer>
        <h1 className="text-3xl text-white text-center font-bold my-4 md:mb-5">
          Eliminar Solicitud: <br /> {id}
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="max-w-2xl rounded-md p-8 space-y-3 shadow-lg mx-auto bg-white "
        >
          <h2 className="text-xl text-center">
            Estas seguro de eliminar esta solicitud?
          </h2>
          <button
            className="w-full flex justify-center py-2 bg-red-500 text-white rounded-md"
            type="submit"
          >
            {formik.isSubmitting ? (
              <Loader2 className="animate-spin animate-infinite" />
            ) : (
              "Eliminar Solicitud"
            )}
          </button>
        </form>
      </FormContainer>
    </MainLayoutDg>
  );
};
