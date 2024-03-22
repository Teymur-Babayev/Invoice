import * as Yup from "yup";

export function initialValues(curso) {
  return {
    Titulo: "",
    Descripcion:"",
    curso:curso.id,
    modulo_img:"",
    modulo_url:""
  };
}

export function initialValuesUpdate(video) {
    return {
      Titulo: video?.Titulo || "",
      Descripcion: video?.Descripcion || "",
      curso: video?.curso,
      modulo_img:  "",
      modulo_url: video?.modulo_url ||""
    };
  }

export function validationSchema() {
  return Yup.object({
    Titulo: Yup.string().required(true),
    Descripcion: Yup.string().required(true),
    modulo_url: Yup.string().required(true),
  });
}

export function validationSchemaDelete() {
  return Yup.object({
    Titulo: Yup.string(),
    Descripcion: Yup.string(),
    modulo_url: Yup.string(),
  });
}
