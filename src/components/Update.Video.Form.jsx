import React, { useState } from "react";
import { Input } from "./ui/Input";
import { useFormik } from "formik";
import { initialValuesUpdate, validationSchema } from "../utils/perfil.video.form";
import { CursosCtrl } from "../api/fb.cursos";
import { toast } from "../components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { uid } from "uid";

const cursosCtrl = new CursosCtrl();
export const UpdateVideo = ({
  videoSelected,
  setvideoSelected,
  setcursoSelected,
}) => {
  const [videoImg, setvideoImg] = useState(null);
  const { User } = useAuth()

  const formik = useFormik({
    initialValues: initialValuesUpdate(videoSelected),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      const fechaActual = new Date();

      let UpdatedVideoData = {
        ...formValues,
        fecha:fechaActual,
        modulo_img: videoImg ? await cursosCtrl.uploadVideoImage(videoImg,User.uid,Slug) : videoSelected.modulo_img
      }

      const resp = await cursosCtrl.updateVideo(videoSelected.id,UpdatedVideoData)
      if (resp) {
        setcursoSelected(null);
        formik.resetForm()
        toast({
          title: "Video actualizado exitosamente",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Ocurrio un error al actualizar el Video",
          description:
            "algo paso al monento de registrar los datos suministrados.",
        });
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="text-xl text-white font-semibold mb-5">
        Video: {videoSelected.Titulo}
      </h2>
      <div className="w-full space-y-3">
        <div className="flex flex-col md:flex-row md:space-x-3">
          <Input
            title={"Titulo"}
            className={"w-full text-white"}
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
          placeholder={"Link del Video"}
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
      <button
        type="submit"
        className="w-full px-2 py-2 flex items-center justify-center hover:bg-black/70 transition-colors bg-black text-white rounded-md"
      >
        {formik.isSubmitting ? (
            <Loader2 className="animate-spin animate-infinite" />
          ) : (
            "Actualizar Video"
          )}
        
      </button>
    </form>
  );
};
