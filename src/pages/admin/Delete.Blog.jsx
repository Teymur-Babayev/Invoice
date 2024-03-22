import React, { useState } from "react";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { useQuery } from "react-query";
import { BlogsCtrl } from "../../api/fb.blogs";
import { useFormik } from "formik";
import { toast } from "../../components/ui/use-toast";
import {
  initialValues,
  validationSchemaDelete,
} from "../../utils/perfil.blog.form";
import { ButtonForm } from "../../components/ui/ButtonForm";
import { FormContainer } from "../../components/ui/FormContainer";

const blogsCtrl = new BlogsCtrl();
export const DeleteBlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [BlogSelected, setBlogSelected] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const { data: blogs } = useQuery("Blogs", blogsCtrl.getBlogs);

  const filteredBlogs =
    blogs?.filter((blog) =>
      blog.Titulo.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const formik = useFormik({
    initialValues: initialValues(BlogSelected),
    validationSchema: validationSchemaDelete(),
    validateOnChange: false,
    onSubmit: async () => {
      let deleteInfo = {
        blogId: BlogSelected.id,
        blogMDPath: BlogSelected.blogFileName,
        blogImagePath: BlogSelected.blog_img,
      };

      const resp = await blogsCtrl.deleteBlog(
        deleteInfo.blogId,
        deleteInfo.blogImagePath,
        deleteInfo.blogMDPath
      );
      if (resp) {
        setBlogSelected(null);
        toast({
          title: "Blog eliminado exitosamente",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Ocurrio un error al eliminar el blog",
          description:
            "algo paso al monento de registrar los datos suministrados.",
        });
      }
    },
  });
  return (
    <MainLayoutDg isblack={true}>
      <FormContainer>
      <div className="w-full min-h-screen h-fit px-[3%]">
              <h2 className="text-2xl text-white font-bold text-center py-5">
                Eliminar Blog
              </h2>

              <div className="max-w-2xl rounded-md p-8 shadow-lg mx-auto bg-DgyaDark/30 ">
                {/* buscador de blogs */}
                <div className="relative bg-slate-100 flex items-center rounded-full my-2">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    id="search"
                    type="text"
                    placeholder="Buscar Blog"
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={handleFocus}
                    autocomplete="off"
                  />
                  <ul
                    className={`${
                      isFocused ? "absolute" : "hidden"
                    } -bottom-[220%] md:-bottom-[240%] rounded-md shadow-md left-[5%] p-4 bg-white h-[90px] overflow-y-auto w-[90%] mt-4`}
                  >
                    {filteredBlogs.length > 0 ? (
                      filteredBlogs.map((curso, index) => (
                        // Rest of your code...
                        <li
                          key={index}
                          onClick={() => {
                            setBlogSelected(curso);
                            setIsFocused(false);
                          }}
                        >
                          {curso.Titulo}
                        </li>
                      ))
                    ) : (
                      <li>no se encontraron resultados</li>
                    )}
                  </ul>
                </div>
                {BlogSelected ? (
                  <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-3 mt-5"
                  >
                    <div className="w-full flex justify-center ">
                      <img
                        className="object-contain w-full max-w-xs  md:w-32 md:h-32 rounded-md  md:rounded-md"
                        src={`${BlogSelected?.blog_img}`}
                        alt=""
                      />
                    </div>

                    <h2 className="text-2xl text-white font-semibold">
                      Titulo: {BlogSelected?.Titulo}
                    </h2>

                    <ButtonForm formik={formik} title={"Eliminar Blog"} icon={true} />
                  </form>
                ) : (
                  <></>
                )}
              </div>
            </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
