import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email().required(true),
    password: Yup.string().required(true),
  });
}

export function validationSchemaResset() {
  return Yup.object({
    email: Yup.string().email().required("Se necesita el correo para recuperar tu cuenta."),
  });
}