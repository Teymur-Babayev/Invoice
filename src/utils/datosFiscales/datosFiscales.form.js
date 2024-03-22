import * as Yup from "yup";

export function initialValues() {
  return {
    rfc:"",
    passSat:""
  };
}

export function validationSchema() {
  return Yup.object({
    rfc: Yup.string().required(true),
    passSat: Yup.string().required(true),
  });
}