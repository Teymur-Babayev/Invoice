import React, { useState } from "react";
import { AuthLayout } from "../../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import logo from "../../assets/logo.png";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../../utils/registro.form";
import { User } from "../../api/fb.user";
import { toast } from "../../components/ui/use-toast";

const UserCtrl = new User()

export const RegistroPage = () => {
  
  const [togglePassword, settogglePassword] = useState(false);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      const resp = await UserCtrl.createUser(formValue)
      if (resp == true) {
        toast({
          title: "Cliente creado exitosamente",
        });
        formik.resetForm()
        navigate('/Login')
      } 
      if(resp == "exist") {
        alert("Ya estás registrado en este sitio.");
        navigate('/Login')
      }
      else {
        if (resp == "Firebase: Error (auth/email-already-in-use).") {
          toast({
            variant: "destructive",
            title: "El correo esta en uso",
          });
        }
      }
    },
  });

  const handleTogglePassword = () => {
    settogglePassword(!togglePassword);
  };


  return (
    <AuthLayout>
      <div
        className="flex items-center h-full min-h-[100dvh] md:h-screen bg-gradient-to-t from-esatDark via-LogoBlue to-cyan-400"
      >
        

        <form onSubmit={formik.handleSubmit} className="bg-white w-[90%]  md:w-[50%] lg:w-[35%] h-fit mx-auto  rounded-2xl shadow-2xl overflow-hidden">
          <img src={logo} onClick={()=>navigate("/")} className="w-[45%] cursor-pointer pt-5 mx-auto" alt="" />

          <h2 className="text-center text-xl md:text-3xl mt-2 font-bold">¡Bienvenido a easySAT!</h2>
          <p className="text-center text-[13px] font-light text-esatDark mt-1">Regístrate para acceder a la plataforma</p>

          <div className="w-[90%] md:w-[80%] mt-7 mx-auto">

            <div className="flex gap-x-3">
              <div>
                <label className="mr-auto mt-7 text-esatDark" htmlFor="email">Nombre</label>
                <input
                  name="Nombre"
                  type="text"
                  value={formik.values.Nombre}
                  onChange={formik.handleChange}
                  className={`w-full py-2 px-2 transition-all outline-none border-[1px] rounded-md border-gray-200 focus:border-gray-600
                ${formik.errors.Nombre &&
                    "border-red-500 border-2  placeholder:text-red-600"
                    }
                `} />
              </div>
              <div>
                <label className="mr-auto mt-7 text-esatDark" htmlFor="email">Apellido</label>
                <input
                  name="Apellido"
                  type="text"
                  value={formik.values.Apellido}
                  onChange={formik.handleChange}
                  className={`w-full py-2 px-2 transition-all outline-none border-[1px] rounded-md border-gray-200 focus:border-gray-600
                ${formik.errors.Apellido &&
                    "border-red-500 border-2  placeholder:text-red-600"
                    }
                `} />
              </div>
            </div>

            <div className="mt-4">
              <label className="mr-auto text-esatDark" htmlFor="email">Correo electrónico</label>
              <input
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={`w-full py-2 px-2 transition-all outline-none border-[1px] rounded-md border-gray-200 focus:border-gray-600
                ${formik.errors.email &&
                  "border-red-500 border-2  placeholder:text-red-600"
                  }
                `} />
            </div>

            <div className="mt-3">
              <label className="mr-auto mt-3 text-esatDark" htmlFor="">Contraseña</label>
              <div
                className={`w-full py-2 px-2 transition-all outline-none border-[1px] flex justify-between rounded-md border-gray-200 focus:border-gray-600
                      ${formik.errors.password && "border-red-600"}
                      `}
              >
                <input
                  className={`w-full bg-transparent outline-none border-0 focus:border-0 focus:ring-0 active:ring-0 active:border-0
                      ${formik.errors.password &&
                    "placeholder:text-red-600 text-red-500"
                    }
                      `}
                  type={togglePassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {togglePassword ? (
                  <EyeOff
                    className={`cursor-pointer ${formik.errors.password && "text-red-500"
                      }`}
                    onClick={handleTogglePassword}
                  />
                ) : (
                  <Eye
                    className={`cursor-pointer ${formik.errors.password && "text-red-500"
                      }`}
                    onClick={handleTogglePassword}
                  />
                )}
              </div>
            </div>
            <div className="mt-3">
              <label className="mr-auto mt-3 text-esatDark" htmlFor="">Confirma tu Contraseña</label>
              <div
                className={`w-full py-2 px-2 transition-all outline-none border-[1px] flex justify-between rounded-md border-gray-200 focus:border-gray-600
                      ${formik.errors.rePassword && "border-red-600"}
                      `}
              >
                <input
                  className={`w-full bg-transparent outline-none border-0 focus:border-0 focus:ring-0 active:ring-0 active:border-0
                      ${formik.errors.rePassword &&
                    "placeholder:text-red-600 text-red-500"
                    }
                      `}
                  type={togglePassword ? "text" : "password"}
                  name="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                />
                {togglePassword ? (
                  <EyeOff
                    className={`cursor-pointer ${formik.errors.rePassword && "text-red-500"
                      }`}
                    onClick={handleTogglePassword}
                  />
                ) : (
                  <Eye
                    className={`cursor-pointer ${formik.errors.rePassword && "text-red-500"
                      }`}
                    onClick={handleTogglePassword}
                  />
                )}
              </div>
            </div>

            <div className="mt-2 gap-x-2 flex justify-start">
              <input type="checkbox" /> Acepto los Términos y Condiciones
            </div>

            <div className="flex justify-center">
              <button type="submit" disabled={formik.isValid ? false : true} 
              className="mt-10 md:mt-4 w-[70%] text-white mx-auto py-2 rounded-md bg-gradient-to-r from-esatDark via-LogoBlue to-cyan-600 disabled:opacity-50"
              >
                {formik.isSubmitting ? (<div className="flex justify-center transition-transform animate-spin"><Loader2/></div>) : "Regístrate"}
                </button>
            </div>

            <div className="flex justify-center mt-3">
              <span className="font-light mb-5">¿Ya tienes cuenta? <Link className="underline font-semibold text-LogoBlue" to="/login">Iniciar Sesión</Link></span>

            </div>



          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
