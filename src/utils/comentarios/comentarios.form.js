import * as Yup from "yup";

export function initialValues(place,userId) {
  return {
    comentario: "",
    place,
    userId,
  };
}

export function validationSchema() {
  return Yup.object({
    comentario: Yup.string().required(true),
  });
}

export function deletevalidationSchema() {
  return Yup.object({
    ventas: Yup.number(),
    gastos: Yup.number(),
  });
}
