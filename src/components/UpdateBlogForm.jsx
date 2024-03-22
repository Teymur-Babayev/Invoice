import React, { useState } from "react";
import { Input } from "./ui/Input";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../utils/perfil.blog.form";
import { toast } from "../components/ui/use-toast";
import { ButtonForm } from "./ui/ButtonForm";
import { BlogsCtrl } from "../api/fb.blogs";
import { uid } from "uid";

const blogCtrl = new BlogsCtrl();
export const UpdateBlogForm = ({
  BlogSelected,
  AutorUsername,
  setBlogSelected,
}) => {
  const [BlogMD, setBlogMD] = useState(null);
  const [BlogImg, setBlogImg] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(BlogSelected),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const Slug = uid(25);
      
      let UpdatedBlogData = {
        ...formValue,
        Slug: Slug,
        blogFileName: BlogMD
          ? await blogCtrl.uploadBlogMD(BlogMD, BlogSelected.Autor, BlogSelected.id)
          : BlogSelected?.blogFileName,
        blog_img: BlogImg
          ? await blogCtrl.uploadBlogImage(BlogImg, BlogSelected.Autor, BlogSelected.id)
          : BlogSelected?.blog_img,
        likes: BlogSelected?.likes ? BlogSelected?.likes : [],
        favs: BlogSelected?.favs ? BlogSelected?.favs : []
      };

      const resp = await blogCtrl.updateBlog(BlogSelected.id, UpdatedBlogData);
      if (resp) {
        setBlogSelected(null);
        toast({
          title: "Blog actualizado exitosamente",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Ocurrio un error al actualizar el blog",
          description:
            "algo paso al monento de registrar los datos suministrados.",
        });
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full space-y-3">
        <Input
          title={"Titulo"}
          className={"w-full"}
          name={"Titulo"}
          type={"text"}
          placeholder={"blog titulo"}
          value={formik.values.Titulo}
          onChange={formik.handleChange}
          error={formik.errors.Titulo}
        />
        <Input
          title={"Descripcion"}
          className={"w-full"}
          name={"Descripcion"}
          type={"text"}
          placeholder={"blog descripcion"}
          value={formik.values.Descripcion}
          onChange={formik.handleChange}
          error={formik.errors.Descripcion}
        />

        <h4 className="block mb-2 text-xl font-medium text-white">
          Autor: {AutorUsername}
        </h4>

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

        <ButtonForm formik={formik} title={"Modificar Blog"}/>
      </div>
    </form>
  );
};
