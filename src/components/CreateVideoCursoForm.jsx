import React, { useState } from "react";
import { CursosCtrl } from "../api/fb.cursos";
import { Input } from "./ui/Input";
import { Loader2 } from "lucide-react";
import { initialValues, validationSchema } from "../utils/perfil.video.form";
import { useFormik } from "formik";
import { toast } from "../components/ui/use-toast";
import { uid } from "uid";
import { ButtonForm } from "./ui/ButtonForm";

const cursoCtrl = new CursosCtrl();
export const CreateVideoCursoForm = ({ cursoSelected, setcursoSelected }) => {
  const [videoImg, setvideoImg] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(cursoSelected),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      const Slug = uid(25);
      const fechaActual = new Date();

      let videoData = {
        ...formValues,
        modulo_img: videoImg ? await cursoCtrl.uploadVideoImage(videoImg,cursoSelected.Autor,Slug) : "",
        fecha:fechaActual
      };

      const resp = await cursoCtrl.createVideoCurso(Slug,videoData)

      if(resp){
        toast({
            title: "Video Agregado exitosamente",
          });
        formik.resetForm()
        setcursoSelected()
      }else{
        toast({
            variant: "destructive",
            title: "Ocurrio un error al crear el Video",
            description:
              "algo paso al monento de registrar los datos suministrados.",
          });
      }
      
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full space-y-3">
        <h2 className="text-xl text-white md:text-2xl font-bold">Curso: {cursoSelected.Titulo}</h2>
        <div className="flex flex-col md:flex-row md:space-x-3">
          <Input
            title={"Titulo"}
            className={"w-full"}
            name={"Titulo"}
            type={"text"}
            placeholder={"Titulo del Video"}
            value={formik.values.Titulo}
            onChange={formik.handleChange}
            error={formik.errors.Titulo}
          />
          <Input
            title={"Descripcion"}
            className={"w-full"}
            name={"Descripcion"}
            type={"text"}
            placeholder={"Descripcion del Video"}
            value={formik.values.Descripcion}
            onChange={formik.handleChange}
            error={formik.errors.Descripcion}
          />
        </div>
        <Input
          title={"link del video"}
          className={"w-full"}
          name={"modulo_url"}
          type={"text"}
          placeholder={"Descripcion del Video"}
          value={formik.values.modulo_url}
          onChange={formik.handleChange}
          error={formik.errors.modulo_url}
        />
        <Input
          title={"Sube una imagen para tu video"}
          className={"w-full pb-5"}
          name={"modulo_img"}
          type={"file"}
          onChange={(event) => {
            setvideoImg(event.currentTarget.files[0]);
          }}
        />
      </div>
      <ButtonForm formik={formik} title={"Crear Video"}/>
    </form>
  );
};
