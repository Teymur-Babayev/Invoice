import * as Yup from "yup";

export function initialValues(soli) {
  return {
    Telefono: soli?.Telefono || "",
  };
}

export function validationSchema() {
  return Yup.object({
    Telefono: Yup.string().required(true),
  });
}