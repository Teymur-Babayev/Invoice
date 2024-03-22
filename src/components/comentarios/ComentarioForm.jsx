import { useFormik } from "formik";
import React from "react";
import {
  initialValues,
  validationSchema,
} from "../../utils/comentarios/comentarios.form";
import { ButtonForm } from "../ui/ButtonForm";
import { useAuth } from "../../hooks/useAuth";
import { uid } from "uid";
import { ComentCtrl } from "../../api/comentarios/fb.comentarios";
import { useQueryClient } from "react-query";

const ComentsCtrl = new ComentCtrl()
export const ComentarioForm = ({ zona,id }) => {
  const qc = useQueryClient()
  const { User } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(zona, User?.uid),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const fechaActual = new Date();
      const ComentId = uid(25)
      let ComentData = {
        ...formValue,
        fecha:fechaActual,
        refId:id
      }

      await ComentsCtrl.createComent(ComentId,ComentData)
      qc.invalidateQueries(`Coments ${id}`)
      formik.resetForm()
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="w-[70%] flex my-4 gap-x-3">
      <input
        className="w-full rounded-md px-4 "
        type="text"
        placeholder="Comentario..."
        name="comentario"
        value={formik.values.comentario}
        onChange={formik.handleChange}
        error={formik.errors.comentario}
      />
      <div className="w-1/3">
        <ButtonForm formik={formik} title={"Enviar Comentario"} />
      </div>
    </form>
  );
};
