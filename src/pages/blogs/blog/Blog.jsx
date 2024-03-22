import "../../../css/blog.css";
import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { MainLayoutDg } from "../../../layouts/MainLayoutDg";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { AutorCard } from "../../../components/AutorCard";
import { BlogsCtrl } from "../../../api/fb.blogs";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Skeleton } from "../../../components/ui/skeleton";
import { FormContainer } from "../../../components/ui/FormContainer";
import { ComentarioField } from "../../../components/cursos/curso/components/ComentarioField";
import { useAuth } from "../../../hooks/useAuth";
import { ComentarioForm } from "../../../components/comentarios/ComentarioForm";

const BlogCtrl = new BlogsCtrl();

export const Blog = () => {
  const { slug } = useParams();
  const [MDX, setMDX] = useState(`# Cargando..`);
  const { User } = useAuth();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery(`${slug}`, () => BlogCtrl.getBlog(slug));

  useEffect(() => {
    (async () => {
      const resp = await BlogCtrl.getBlogMDX(blog?.blogFileName);
      setMDX(resp);
    })();
  }, [!isLoading]);

  if (isLoading)
    return (
      <MainLayoutDg isblack={true}>
        <FormContainer>
          <div id="blog" className="w-full h-fit space-y-5 p-4 md:pt-6 md:pl-7">
            <Skeleton className="w-full md:max-w-xs bg-slate-200 md:w-8/12 h-[12vh] mx-auto md:h-24 rounded-md" />

            <Skeleton className="w-full bg-slate-200 md:w-[90%] h-[6vh]  md:h-12 rounded-md" />
            <Skeleton className="w-full bg-slate-200 md:w-[50%] h-[4vh] md:h-8 rounded-md" />
            <Skeleton className="w-full bg-slate-200 md:w-full h-[61vh] md:h-[50vh] rounded-md" />
          </div>
        </FormContainer>
      </MainLayoutDg>
    );

  if (isError)
    return (
      <MainLayout>
        <h2>Ocurrio un error buscando la informacion.</h2>
      </MainLayout>
    );
  return (
    <MainLayoutDg isblack={true}>
      <FormContainer>
        <div
          id="blog"
          className="w-full lg:bg-DgyaBase/30 shadow-lg rounded-md min-h-screen h-full p-4 md:pt-6 md:pl-7"
        >
          <AutorCard mxauto={true} autor={blog?.Autor} />
          <ReactMarkdown children={MDX} />
        </div>
        {User && (
          <>
            <ComentarioForm id={slug} zona={'Blogs'}/>
          </>
        )}
        <h2 className="my-5 text-white font-bold text-2xl">Comentarios</h2>
        <ComentarioField id={slug} />
      </FormContainer>
    </MainLayoutDg>
  );
};
