import * as Yup from "yup";

export function initialValues() {
  return  {
    Nombre: "",
    Apellido: "",
    Username: "",
    UserPlan: "Gratis",
    UserRole: "Cliente",
    email: "",
    password: "",
    rePassword:"",
    Img_url:"",
    Cargo: "",
    Empresa: ""
  };
}

export function validationSchema() {
  return Yup.object({
    Nombre: Yup.string().matches(/^[^\d]+$/, 'Este campo no debe contener números').required(true),
    Apellido: Yup.string().matches(/^[^\d]+$/, 'Este campo no debe contener números').required(true),
    Username: Yup.string(),
    email: Yup.string().email("Ingrese un correo valido").required(true),
    password: Yup.string().required(true),
    rePassword: Yup.string().required(true).oneOf([Yup.ref("password"),null],"Las Contraseñas deben coincidir")
  });
}
