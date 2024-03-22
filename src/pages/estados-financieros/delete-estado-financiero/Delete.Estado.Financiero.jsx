import { useFormik } from "formik";
import { FileCheck } from "lucide-react";
import React, { useState } from "react";
import { ButtonForm } from "../../../components/ui/ButtonForm";
import { EstFinCtrl } from "../../../api/estados-financieros/fb.estfin";
import { useNavigate } from "react-router-dom";
import {  initialValues, deletevalidationSchema} from "../../../utils/estFin.form";
import { toast } from "../../../components/ui/use-toast";

const EstFin = new EstFinCtrl()
export const DeleteEstadoForm = ({ cliente, data }) => {
  const [SelectedData, setSelectedData] = useState("");
  const navigate = useNavigate()

  const filteredEstFinClient =
    data?.filter((client) =>
      client.username.toLowerCase().includes(cliente.toLowerCase())
    ) || [];

    const formik = useFormik({
      initialValues:initialValues(),
      validationSchema:deletevalidationSchema(),
      validateOnChange: false,
      onSubmit: async () => {

        const result = await EstFin.deleteEstFin(SelectedData.id,SelectedData.EstadoFinacieroUrl)
        if (result) {
          toast({
            title: "Estado Financiero Eliminado Exitosamente",
          });
          navigate('/Perfil')
          formik.resetForm()
        } else {
          toast({
            variant: "destructive",
            title: "Ocurrio un error al eliminar el Estado Financiero",
            description:
              "algo paso al monento de registrar los datos suministrados.",
          });
        }
      }
    })

  return (
    <div>
      <div className="w-full space-y-3">
        <h2 className="text-2xl text-white font-bold">Cliente: {cliente}</h2>

        <div className="w-full overflow-auto">
          <div className="w-fit flex gap-3 overflow-auto">
            {filteredEstFinClient.map((data, index) => (
              <div
                key={index}
                onClick={() => setSelectedData(data)}
                className="bg-white cursor-pointer flex flex-col items-center justify-center rounded-md w-28 h-28"
              >
                <FileCheck size={40} />
                <span>{data.month}</span>
                <span>{data.year}</span>
              </div>
            ))}
          </div>
        </div>
        {SelectedData && (
          <>
            <form onSubmit={formik.handleSubmit}>

              <ButtonForm icon={true} formik={formik} title={`Eliminar ${SelectedData.month} ${SelectedData.year}`}/>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
