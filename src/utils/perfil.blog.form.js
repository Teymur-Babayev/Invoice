import * as Yup from "yup";

export function initialValues(blog) {
  return {
    Titulo:  blog?.Titulo || "",
    Descripcion:  blog?.Descripcion  || "",
    Autor:  blog?.Autor  || "",
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
