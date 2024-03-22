import React, { useState } from "react";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { Input } from "../../components/ui/Input";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../../utils/perfil.blog.form";
import { User } from "../../api/fb.user";
import { BlogsCtrl } from "../../api/fb.blogs";
import { useQuery } from "react-query";
import { toast } from "../../components/ui/use-toast";
import { uid } from "uid";
import { ButtonForm } from "../../components/ui/ButtonForm";
import { FormContainer } from "../../components/ui/FormContainer";
import { Mail } from "../../api/mails/mail";

const BlogCtrl = new BlogsCtrl();
const UserCtrl = new User();
const MailCtrl = new Mail();
export const AdminBlog = () => {
  const [BlogImg, setBlogImg] = useState("");
  const [BlogMD, setBlogMD] = useState("");

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery("Users", UserCtrl.getUsersWithRole);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const Slug = uid(25);
      const fechaActual = new Date();

      let BlogData = {
        ...formValue,
        Slug: Slug,
        blogFileName: BlogMD
          ? await BlogCtrl.uploadBlogMD(BlogMD, formValue.Autor, Slug)
          : "",
        blog_img: BlogImg
          ? await BlogCtrl.uploadBlogImage(BlogImg, formValue.Autor, Slug)
          : "",
        fecha: fechaActual,
        likes:[],
        favs:[]
      };
      const result = await BlogCtrl.createBlog(Slug, BlogData);
      if (result) {
        // El blog se creó correctamente
        toast({
          title: "Blog Creado Exitosamente",
        });

        await MailCtrl.SendMails(
          formValue.Autor,
          Slug,
          "Blog",
          formValue.Titulo
        );

        formik.resetForm();
      } else {
        // Hubo un error al crear el blog
        toast({
          variant: "destructive",
          title: "Ocurrio un error al subir el blog",
          description:
            "algo paso al monento de registrar los datos suministrados.",
        });
      }
    },
  });

  return (
    <MainLayoutDg isblack={true}>
      <FormContainer>
        <div className="w-full min-h-screen h-fit pxfont-size: 36px;
    margin-top: 11px;-[3%]">
          <h2 className="md:text-3xl text-2xl text-white font-bold text-center py-5">
            Crear Blog
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="max-w-2xl rounded-md p-8 shadow-lg mx-auto bg-DgyaDark/30 "
          >
            <div className="w-full space-y-3">
              <Input
                title={"Titulo"}
                className={"w-full"}
                name={"Titulo"}
                type={"text"}
                placeholder={"Blog de analisis Sat"}
                value={formik.values.Titulo}
                onChange={formik.handleChange}
                error={formik.errors.Titulo}
              />
              <Input
                title={"Descripcion"}
                className={"w-full"}
                name={"Descripcion"}
                type={"text"}
                placeholder={
                  "Para realizar un auto analisis de lo que debo declarar..."
                }
                value={formik.values.Descripcion}
                onChange={formik.handleChange}
                error={formik.errors.Descripcion}
              />

              <h4 className="block mb-2 text-sm font-medium text-white ">
                Autor
              </h4>
              <select
                name={"Autor"}
                value={formik.values.Autor}
                onChange={formik.handleChange}
                className={`${
                  formik.errors.Autor
                    ? "bg-red-500 placeholder:text-white text-white"
                    : ""
                } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
              >
                <option value="" label="Selecciona al Autor">
                  Selecciona al Autor{" "}
                </option>
                {users &&
                  users.map((user, index) => (
                    <option key={index} value={user.uid}>
                      {" "}
                      {user.Username}
                    </option>
                  ))}
              </select>

              <Input
                title={"Sube tu archivo MarkDown"}
                className={"w-full"}
                name={"markdown"}
                type={"file"}
                onChange={(event) => {
                  setBlogMD(event.currentTarget.files[0]);
                }}
              />

              <Input
                title={"Sube una imagen para tu blog"}
                className={"w-full"}
                name={"markdown"}
                type={"file"}
                onChange={(event) => {
                  setBlogImg(event.currentTarget.files[0]);
                }}
              />

              <ButtonForm formik={formik} title={"Crear Blog"} />
            </div>
          </form>
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
