import React, { useEffect, useRef, useState } from "react";
import { MainLayoutDg } from "../layouts/MainLayoutDg";
import { useAuth } from "../hooks/useAuth";
import { SubsCtrl } from "../api/check/fb.subs";
import { User } from "../api/fb.user";
import { estaEntreLasFechas } from "../utils/funcs";
import { useQuery } from "react-query";
import { toast } from "../components/ui/use-toast";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../utils/main.form";
import { Main } from "../components/Main/index";
import { useLocation } from "react-router-dom";

const Subs = new SubsCtrl();
const UserCtrl = new User();
export const MainPrueba = () => {
  const { User } = useAuth();
  const formRef = useRef();

  const [selection, setselection] = useState("Mision");
  const { data: subInfo } = useQuery("subs", () => Subs.getSubs());

  const location = useLocation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const res = await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE,
          import.meta.env.VITE_EMAILJS_TEMPLATE,
          formRef.current,
          import.meta.env.VITE_EMAILJS_KEY
        );

        if (res.status === 200) {
          toast({
            title: "Correo enviado exitosamente",
          });
          formik.resetForm();
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    subInfo?.map((sub) => {
      if (User?.uid == sub?.id) {
        if (!estaEntreLasFechas(sub.fechaDeCreacion, sub.fechaDeFinalizacion)) {
          toast({
            variant: "destructive",
            title: "Tu Subscripcion a caducado",
            description:
              "Renueva para seguir disfrutando de nuestros servicios",
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      subInfo?.map(async (sub) => {
        const { fechaDeCreacion, fechaDeFinalizacion } = sub;
        if (!estaEntreLasFechas(fechaDeCreacion, fechaDeFinalizacion)) {
          await UserCtrl.UpdatePlanById(sub?.uid, "Gratis");
        }
      });
    })();
  }, []);

  useEffect(() => {
    const { hash } = location;
    const newStr = hash.replace(/#/g, "");
    const element = document.getElementById(newStr);
    element?.scrollIntoView();

    if (hash === "" || hash === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  return (
    <MainLayoutDg>
      {/* MAIN */}
      <Main.Heroes />
      {/* SERVICIOS */}
      <Main.Servicios selection={selection} />
      {/* NOSOTROS */}
      <Main.Nosotros />

      {/* PRICING */}
      {/* <Main.Pricing /> */}
      {/* CURSOS Y BLOGS */}
      {/* <Main.CursosBlogs /> */}
      {/* PREGUNTAS FRECUENTES */}
      <Main.Preguntas />
      {/* CTA */}
      <Main.Opiniones />
      {/* REDES */}
      <Main.Redes />
      {/* CONTACTO */}
      <Main.Contacto />
    </MainLayoutDg>
  );
};
