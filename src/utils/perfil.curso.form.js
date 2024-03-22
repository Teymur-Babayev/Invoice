import * as Yup from "yup";

export function initialValues(curso) {
  return {
    Titulo:  curso?.Titulo || "",
    Descripcion:  curso?.Descripcion  || "",
    Autor:  curso?.Autor  || "",
  };
}

export function initialValuesDelete(curso,videos) {
  return {
    Titulo:  curso?.Titulo || "",
    Descripcion:  curso?.Descripcion  || "",
    Autor:  curso?.Autor  || "",
    CursoId:curso?.id || "",
    Videos: videos || []
  };
}

export function validationSchema() {
  return Yup.object({
    Titulo: Yup.string().required(true),
    Descripcion: Yup.string().required(true),
    Autor: Yup.string().required(true),
  });
}


export function validationSchemaDelete() {
  return Yup.object({
    Titulo: Yup.string(),
    Descripcion: Yup.string(),
    Autor: Yup.string(),
  });
}
