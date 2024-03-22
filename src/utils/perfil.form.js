import * as Yup from "yup";

export function initialValues(user) {
  return {
    Nombre: "" || user?.Nombre,
    Apellido: "" || user?.Apellido,
    Username:"" || user?.Username,
   // User_img:""
  };
}

export function validationSchema() {
  return Yup.object({
    Nombre: Yup.string().required(true),
    Apellido: Yup.string().required(true),
    Username: Yup.string().required(true),
    //User_img: Yup.string().required(true),
  });
}
