import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Admin Routes
import { AdminBlog } from "../pages/admin/Create.Blog";
import { UpdateBlogPage } from "../pages/admin/Update.Blog";
import { ActualizarCursoPage } from "../pages/admin/Update.Curso";
import { PageCurso } from "../pages/admin/Create.Curso";
import { PageCliente } from "../pages/admin/Create.Cliente";
import { PageClienteUpdate } from "../pages/admin/Update.Cliente";
import { CreateVideoCursoPage } from "../pages/admin/Create.Video.Curso";
import { UpdateVideoCursoPage } from "../pages/admin/Update.Video.Curso";
import { DeleteBlogPage } from "../pages/admin/Delete.Blog";
import { DeleteCursoPage } from "../pages/admin/Detele.Curso";
import { DeleteVideoPage } from "../pages/admin/Delete.Video";
import { DeleteUserPage } from "../pages/admin/Delete.User";
import { SuccessPage } from "../pages/success";
import { ManageInvoice } from "../pages/admin/Manage.invoice";

//Normal Routes
import { Main } from "../pages/Main";
import { Contabilidad } from "../pages/contabilidad/Contabilidad";
import { Cursos } from "../pages/cursos/Cursos";
import { Curso } from "../pages/cursos/curso/Curso";
import { Video } from "../pages/cursos/curso/video-curso/Video";
import { LoginPage } from "../pages/auth/LoginPage";
import { Perfil } from "../pages/perfil/Perfil";
import { ErrorPage } from "../pages/404";
import { Solicitudes } from "../pages/solicitudes/Solicitudes";
import { Solicitud } from "../pages/solicitudes/solicitud/Solicitud";
import { CreateSoliPage } from "../pages/contabilidad/crear-solicitud/create.solicitud";
import { UpdateSoliPage } from "../pages/perfil/mis-solicitudes/modificar-solicitud/Modificar.Solicitud";
import { DeleteSoliPage } from "../pages/perfil/mis-solicitudes/eliminar-solicitud/Eliminar.Solicitud";
import { MainPrueba } from "../pages/MainPrueba";
import { CreateEstFinPage } from "../pages/estados-financieros/Create.EstFin";
import { UpdateEstFin } from "../pages/estados-financieros/Update.EstFin";
import { DeleteEstFin } from "../pages/estados-financieros/Delete.EstFin";
import { RegistroPage } from "../pages/auth/RegistroPage";
import { CursosFav } from "../pages/cursos/favoritos/CursosFav";
import { PruebasExcel } from "../pages/pruebas/PruebasExcel";
import { PruebasXml } from "../pages/pruebas/PruebasXml";
import { Edit_Invoice } from "../pages/billing-System/edite_invoice";
import { Client_Information } from "../pages/client_information/index";
import { BillinSystem } from "../pages/billing-System/index";
import { CommonlyUsedComponents } from "../pages/infoFiscal/template";
import { ResetPasswordPage } from "../pages/resetPassword/ResetPasswordPage";
import Micuenta from "../pages/micuenta/Micuenta";
import InfoFiscal from "../pages/infoFiscal/InfoFiscal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  
  {
    path:"/CommonlyUsedComponents",
    element: <CommonlyUsedComponents />
  },
  {
    path:"/Edit_Invoice",
    element: <Edit_Invoice />
  },
  {
    path: "/Client_Information",
    element: <Client_Information />,
  },
  {
    path:"/bilingSystem",
    element: <BillinSystem />
  },

  {
    path:"/ManageInvoice",
    element: <ManageInvoice />
  },

  {
    path: "/Prueba",
    element: <MainPrueba />,
  },
  {
    path: "/Contabilidad",
    element: <Contabilidad />,
  },
  {
    path: "/Contabilidad/:userPlan/:id",
    element: <CreateSoliPage />,
  },
  {
    path: "/Cursos",
    element: <Cursos />,
  },
  {
    path: "/curso/:cursoId",
    element: <Curso />,
  },
  {
    path: "/curso/:cursoId/video/:id",
    element: <Video />,
  },
  // {
  //   path: "/Blogs",
  //   element: <Blogs />,
  // },
  // {
  //   path: "/:id/Blogs/Favoritos",
  //   element: <BlogsFav />,
  // },
  {
    path: "/:id/Cursos/Favoritos",
    element: <CursosFav />,
  },
  // {
  //   path: "/Blog/:slug",
  //   element: <Blog />,
  // },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/Perfil",
    element: <Perfil />,
  },
  {
    path: "/Clientes",
    element: <Solicitudes />,
  },
  {
    path: "/Clientes/Cliente/:id",
    element: <Solicitud />,
  },
  {
    path: "/Perfil/Solicitudes/Crear",
    element: <CreateSoliPage />,
  },
  {
    path: "/Perfil/Solicitudes/Modificar/:id",
    element: <UpdateSoliPage />,
  },
  {
    path: "/Perfil/Solicitudes/Eliminar/:id",
    element: <DeleteSoliPage />,
  },
  {
    path: "/admin/crear-blog",
    element: <AdminBlog />,
  },
  {
    path: "/admin/actualizar-blog",
    element: <UpdateBlogPage />,
  },
  {
    path: "/admin/eliminar-blog",
    element: <DeleteBlogPage />,
  },
  {
    path: "/admin/crear-curso",
    element: <PageCurso />,
  },
  {
    path: "/admin/actualizar-curso",
    element: <ActualizarCursoPage />,
  },
  {
    path: "/admin/eliminar-curso",
    element: <DeleteCursoPage />,
  },
  {
    path: "/admin/crear-video-curso",
    element: <CreateVideoCursoPage />,
  },
  {
    path: "/admin/actualizar-video-curso",
    element: <UpdateVideoCursoPage />,
  },
  {
    path: "/admin/eliminar-video-curso",
    element: <DeleteVideoPage />,
  },
  {
    path: "/admin/crear-cliente",
    element: <PageCliente />,
  },
  {
    path: "/admin/actualizar-cliente",
    element: <PageClienteUpdate />,
  },
  {
    path: "/admin/eliminar-cliente",
    element: <DeleteUserPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
  {
    path: "/admin/agregar-estFin",
    element: <CreateEstFinPage />,
  },
  {
    path: "/admin/modificar-estFin",
    element: <UpdateEstFin />,
  },
  {
    path: "/admin/eliminar-estFin",
    element: <DeleteEstFin />,
  },
  {
    path: "/Registro",
    element: <RegistroPage />,
  },
  {
    path:"/Pruebas/excel",
    element: <PruebasExcel />
  },
  {
    path:"/Pruebas/xml",
    element: <PruebasXml />
  },
  {
    path:"/resetPassword",
    element: <ResetPasswordPage />
  },
  {
    path:"/micuenta",
    element: <Micuenta />
  },
  {
    path:"/informacionFiscal",
    element: <InfoFiscal />
  }
]);

export const Rutas = () => {
  return <RouterProvider router={router} />;
};
