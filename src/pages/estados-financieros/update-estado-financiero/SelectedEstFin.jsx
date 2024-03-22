import React, { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../../../utils/estFin.form";
import { ButtonForm } from "../../../components/ui/ButtonForm";
import { FileInput } from "../../../components/FileInput";
import { meses } from "../../../assets/adminData";
import { toast } from "../../../components/ui/use-toast";
import { EstFinCtrl } from "../../../api/estados-financieros/fb.estfin";
import { useNavigate } from "react-router-dom";

const EstFin = new EstFinCtrl();
export const SelectedEstFin = ({ data }) => {
  const [EstFinDoc, setEstFinDoc] = useState(null);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: initialValues(data),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      if (formValues.month && formValues.year !== "") {
        let UpdatedEstFin = {
          _id: data._id,
          ...formValues,
          username: data.username,
          EstadoFinacieroUrl: EstFinDoc
            ? await EstFin.uploadEstadoFin(EstFinDoc, User?.uid, Slug)
            : data.EstadoFinacieroUrl,
        };

        const result = await EstFin.updateEstFin(UpdatedEstFin._id, UpdatedEstFin);
        if (result) {
          // El blog se creó correctamente
          toast({
            title: "Estado Finaciero Modificado Exitosamente",
          });

          formik.resetForm();
          navigate("/Perfil");
        } else {
          // Hubo un error al crear el blog
          toast({
            variant: "destructive",
            title: "Ocurrio un error al modificar el Estado Financiero",
            description:
              "algo paso al monento de registrar los datos suministrados.",
          });
        }

        console.log(UpdatedEstFin);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="text-xl text-white flex items-center font-semibold mb-5">
        Estado Financiero: {data?.month} {data?.year}
      </h2>
      <div className="w-full space-y-3">
        <h2 className="text-white text-2xl font-semibold mb-2">Ventas</h2>
        <Input
          name={"ventas"}
          value={formik.values.ventas}
          onChange={formik.handleChange}
          error={formik.errors.ventas}
        />
      </div>
      <div className="w-full space-y-3">
        <h2 className="text-white text-2xl font-semibold mb-2">Gastos</h2>
        <Input
          name={"gastos"}
          value={formik.values.gastos}
          onChange={formik.handleChange}
          error={formik.errors.gastos}
        />
      </div>
      <div className="w-full space-y-3 mt-3">
        <h2 className="text-white text-2xl font-semibold mb-2">
          Cliente: {data.username}
        </h2>
      </div>

      <div className="w-full space-y-3">
        <FileInput Doc={EstFinDoc} setDoc={setEstFinDoc} />
      </div>

      <div className="w-full flex space-x-4">
        <div className="flex flex-col">
          <h2 className="text-white text-2xl font-semibold mb-2">Mes</h2>
          <select
            className="w-fit px-6 py-2 rounded-md"
            name="month"
            onChange={formik.handleChange}
          >
            <option value={data.month}>Mes Actual: {data.month}</option>
            {meses.map((mes) => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <h2 className="text-white text-2xl font-semibold mb-2">Año</h2>
          <select
            className="w-fit px-6 py-2 rounded-md"
            name="year"
            onChange={formik.handleChange}
          >
            <option value={data.month}>Año Actual: {data.year}</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <ButtonForm formik={formik} title={"Modificar Estado Financiero"} />
      </div>
    </form>
  );
};
