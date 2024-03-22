import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    email: "",
    telefono: "",
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(true),
    email: Yup.string().required(true),
    telefono: Yup.string().required(true),
  });
}
