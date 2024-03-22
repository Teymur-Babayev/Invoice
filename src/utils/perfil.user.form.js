import * as Yup from "yup";

export function initialValues(user) {
  return {
    Nombre: "",
    Apellido:  "",
    Cargo: "",
    Empresa: "",
    Img_url: "",
    uid:"",
    Username:"",
    UserPlan:"",
    UserRole:"",
    email: "",
    password:""
  };
}

export function initialValuesDelete(user) {
  return {
    Username:user?.Username || "",
    uid: user?.uid
  };
}


export function initialValuesUpdate(user) {
  return {
    Nombre: user?.Nombre || "",
    Apellido: user?.Apellido || "",
    Cargo: user?.Cargo || "",
    Empresa: user?.Empresa || "",
    Img_url: user?.Img_url || "",
    uid: user?.uid || "",
    email: user?.email || "",
    Username:user?.Username || "",
    UserPlan:user?.UserPlan || "",
    UserRole:user?.UserRole || "",
  };
}

export function validationSchema() {
  return Yup.object({
    Nombre: Yup.string().required(true),
    Apellido: Yup.string().required(true),
    Cargo: Yup.string().required(true),
    Empresa: Yup.string().required(true),
    Username: Yup.string().required(true),
    UserPlan: Yup.string().required(true),
    UserRole: Yup.string().required(true),
    email: Yup.string().required(true),
    password: Yup.string().required(true),
  });
}

export function validationSchema2() {
  return Yup.object({
    Nombre: Yup.string().required(true),
    Apellido: Yup.string().required(true),
    Cargo: Yup.string().required(true),
    Empresa: Yup.string().required(true),
    Username: Yup.string().required(true),
    UserPlan: Yup.string().required(true),
    UserRole: Yup.string().required(true),
  });
}

export function validationSchemaDelete() {
  return Yup.object({
    Username: Yup.string(),
  });
}