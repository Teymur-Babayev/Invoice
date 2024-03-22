import * as Yup from "yup";

export function initialValues(estFin) {
  return {
    ventas: estFin?.ventas || "",
    gastos: estFin?.gastos ||  "",
    cliente: estFin?.uid || "",
    month: estFin?.month || "",
    year: estFin?.year || "",
  };
}

export function validationSchema() {
  return Yup.object({
    ventas: Yup.number().required(true),
    gastos: Yup.number().required(true),
  });
}

export function deletevalidationSchema() {
  return Yup.object({
    ventas: Yup.number(),
    gastos: Yup.number(),
  });
}
