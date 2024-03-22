import React from 'react'
import { AuthLayout } from '../../layouts/AuthLayout'
import logo from "../../assets/logo.png";
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { validationSchemaResset } from '../../utils/login.form';
import { User } from "../../api/fb.user";
import { toast } from '../../components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const UserCtrl = new User();
export const ResetPasswordPage = () => {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validationSchemaResset(),
        onSubmit: async ({ email }) => {
            console.log(email)

            const result = await UserCtrl.resetPassword(email)

            if (result) {
                toast({
                    title: "Correo de recuperacion enviado exitosamente",
                });
                formik.resetForm()
            } else {
                toast({
                    title: "Ocurrio un error al momento de enviar el correo",
                });
            }
        }
    })

    return (
        <AuthLayout>
            <div className="flex items-center justify-center h-screen min-h-[100dvh] overflow-hidden bg-gradient-to-t from-esatDark via-LogoBlue to-cyan-400"
            >
                <form onSubmit={formik.handleSubmit} className="bg-white w-[90%]  md:w-[50%] lg:w-[30%] h-fit pb-[5%] mx-auto rounded-2xl shadow-2xl overflow-x-hidden">
                    <img src={logo} onClick={()=>{navigate("/")}} className="w-[45%] cursor-pointer mt-[7%] mx-auto" alt="" />
                    <div className='px-[5%] mt-[5dvh]'>
                        <h2 className="text-xl md:text-xl text-black/80 font-bold">Recupera tu cuenta</h2>
                        <p className="text-[13px] font-light text-esatDark mt-1">Te enviaremos un enlace para cambiar la contraseña</p>
                    </div>

                    <div className='px-[7%]'>
                        <div className="mt-[4dvh]">
                            <label className="mr-auto text-esatDark" htmlFor="email">Correo electrónico</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Introduce tu correo electrónico"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className={`w-full py-2 px-2 transition-all outline-none border-[1px] rounded-md border-gray-200 focus:border-gray-600
                ${formik.errors.email &&
                                    "border-red-500 border-2 placeholder:text-red-600"
                                    }
                `} />
                        </div>
                    </div>

                    <div className="flex justify-center mt-[12dvh]">
                        <button
                            type='submit'
                            disabled={formik.isValid ? false : true}
                            className="w-[70%] disabled:opacity-50 text-white mx-auto py-2 
                        rounded-md bg-gradient-to-r from-esatDark via-LogoBlue to-cyan-600">
                            {formik.isSubmitting ? (<div className="flex justify-center transition-transform animate-spin"><Loader2 /></div>) : "Enviar correo"}
                        </button>
                    </div>

                    <div className='flex items-center flex-col mt-[5dvh]'>
                        <span className="font-light ">Regresa  <Link to="/login" className="text-LogoBlue font-semibold underline">Inicio de Sesión</Link></span>

                        <span className="font-light ">¿No tienes cuenta?  <Link to="/registro" className="text-LogoBlue font-semibold underline">Regístrate</Link></span>

                    </div>

                </form>
            </div>
        </AuthLayout>
    )
}
