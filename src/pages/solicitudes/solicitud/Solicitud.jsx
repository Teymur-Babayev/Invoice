import React from "react";
import { MainLayoutDg } from "../../../layouts/MainLayoutDg";
import { json, useParams } from "react-router-dom";
import { Separador } from "../../../components/Separador";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import { Download, FileCheck2, UserIcon } from "lucide-react";
import { ContabilidadCtrl } from "../../../api/contabilidad/fb.contabilidad";
import { User } from "../../../api/fb.user";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "../../../components/ui/use-toast";
import { FormContainer } from "../../../components/ui/FormContainer";
import { Skeleton } from "../../../components/ui/skeleton";
import { EstFinCtrl } from "../../../api/estados-financieros/fb.estfin";
import ChartComponent from "../../../components/graficas/ChartComponent";
import { ordenarPorMes } from "../../../assets/adminData";

const UserCtrl = new User();
const UserSoliInfo = ({ uid, Plan }) => {
  const { data: userInfo } = useQuery(uid, () => UserCtrl.getMe(uid));
  return (
    <div className="mt-5 flex max-w-md flex-col items-center p-4 w-full md:w-full bg-white rounded-md shadow-md">
      <div className="w-full h-fit">
        <Avatar className="mx-auto w-[20%] h-[10vh]">
          <AvatarImage src={userInfo?.Img_url} />
          <AvatarFallback className="bg-black w-[700px]">
            <UserIcon size={40} className="text-white" />
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="ml-3 space-y-1">
        <h3>Correo: {userInfo?.email}</h3>
        <div className="flex">
          <h3>
            Nombre: {userInfo?.Nombre} {userInfo?.Apellido}
          </h3>
        </div>
        <h3>Plan: {Plan}</h3>
      </div>
    </div>
  );
};

const EstFin = new EstFinCtrl();
const UserCharts = ({ uid }) => {
  const { data: ContaEstFin, isLoading } = useQuery(`Conta${uid}`, () =>
    EstFin.getEstadosFinancierosByUser(uid)
  );
  const dataNueva = ContaEstFin?.map((data) => {
    return {
      ...data,
      name: data.month,
    };
  });
  const dataOrdenada = ordenarPorMes(dataNueva);
  const [mes, setmes] = useState("enero");


  if(dataOrdenada?.length == 0){
    return(
      <div className="w-full h-[10vh]">
        <h2 className="text-2xl text-white font-bold">Su Gestor aun no a proporcionado informacion.</h2>
      </div>
    )
  }

  return (
    <>
      <div className="w-full ">
        <select
          onChange={(data) => setmes(data.target.value)}
          className={` invisible bg-gray-50 border mb-3 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
        ></select>
        <ChartComponent estFinData={dataOrdenada} />
      </div>
      <div className="w-full ">
        <select
          onChange={(data) => setmes(data.target.value)}
          className={` bg-gray-50 border mb-3 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
        >
          {dataOrdenada?.map((estFin, index) => (
            <option key={index} value={estFin.month}>
              <span className="first-letter:uppercase">{estFin.name}</span>{" "}
              <span>{estFin.year}</span>
            </option>
          ))}
        </select>
        <ChartComponent mes={mes} qtyChart={1} estFinData={dataOrdenada} />
      </div>
    </>
  );
};

const UserEstFin = ({ uid }) => {
  const { data: ContaEstFin, isLoading } = useQuery(`EstFin${uid}`, () =>
    EstFin.getEstadosFinancierosByUser(uid)
  );
  const dataNueva = ContaEstFin?.map((data) => {
    return {
      ...data,
      name: data.month,
    };
  });
  const dataOrdenada = ordenarPorMes(dataNueva);

  if(dataOrdenada?.length == 0){
    return(
      <div className="w-full h-[10vh]">
        <h2 className="text-2xl text-white font-bold">Su Gestor aun no a proporcionado informacion.</h2>
      </div>
    )
  }

  return (
    <div className="grid w-full gap-2  grid-cols-3 grid-flow-row md:grid-cols-4 md:grid-rows-2 lg:grid-rows-4 lg:grid-cols-6 h-fit ">
      {dataOrdenada?.map((estFin, index) => (
        <a
          key={index}
          href={estFin.EstadoFinacieroUrl}
          download
          className="hover:bg-white p-4 w-full group transition-all cursor-pointer hover:shadow-lg rounded-md flex gap-2 flex-col justify-center items-center"
        >
          <FileCheck2 size={40} className="text-white group-hover:text-black" />
          <div>
            <h2 className="text-xs text-white text-center group-hover:text-black">
              {estFin.username}
            </h2>
            <h4 className="text-xs text-white text-center group-hover:text-black">
              {estFin.name} {estFin.year}
            </h4>
          </div>
        </a>
      ))}
    </div>
  );
};

const Conta = new ContabilidadCtrl();
export const Solicitud = () => {
  const { id } = useParams();
  const [Estatus, setEstatus] = useState(null);
  const [EstatusError, setEstatusError] = useState(false);

  const {
    data: solicitud,
    isLoading,
    isError,
  } = useQuery("Solicitud", () => Conta.getSolicitud(id));

  const formik = useFormik({
    initialValues: {},
    validateOnChange: true,
    onSubmit: async () => {
      if (Estatus != undefined && Estatus != "") {
        setEstatusError(false);
        const result = await Conta.updateSolicitud(id, { estatus: Estatus });
        if (result) {
          // El blog se creó correctamente
          toast({
            title: "Solicitud Modificada Exitosamente",
          });

          formik.resetForm();
        } else {
          // Hubo un error al crear el blog
          toast({
            variant: "destructive",
            title: "Ocurrio un error al modificar la Solicitud",
            description:
              "algo paso al monento de registrar los datos suministrados.",
          });
        }
      } else {
        setEstatusError(true);
      }
    },
  });

  // LOADING ARREGLAR
  if (isLoading) {
    return (
      <MainLayoutDg isblack={true}>
        <FormContainer>
          <div className="px-[3%] lg:px-0">
            <Skeleton className="w-[70%] h-7" />
            <Separador />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <h2 className="text-2xl text-white font-bold mb-4 md:mb-5">
                  Datos Personales
                </h2>
                <Skeleton className="w-[100%] h-[20vh]" />
              </div>
              <div>
                <h2 className="text-2xl text-white font-bold mb-4 md:mb-5">
                  Firma Digital
                </h2>
                <Skeleton className="w-[100%] h-[20vh]" />
              </div>
              <div>
                <h2 className="text-xl text-white font-bold mb-6 lg:mb-6">
                  Cambiar Status de Solicitud
                </h2>
                <Skeleton className="w-[100%] h-[20vh]" />
              </div>
            </div>
          </div>
        </FormContainer>
      </MainLayoutDg>
    );
  }

  return (
    <MainLayoutDg isblack={true}>
      <FormContainer>
        <div className={` h-full min-h-screen px-[3%] lg:px-0 md:mt-5`}>
          <h1 className="text-xl md:text-3xl text-white font-bold my-4 md:mb-5">
            Cliente: {id}
          </h1>

          <Separador />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-1 h-full md:h-[40vh] p-4 ">
            <div className="w-full h-full">
              <h2 className="text-white font-semibold text-2xl">
                Datos del Cliente
              </h2>
              <UserSoliInfo uid={solicitud.uid} Plan={solicitud.Plan} />
            </div>
            <div className="w-full mt-10 md:mt-0 flex flex-col h-full">
              <h2 className="text-white font-semibold text-2xl">
                Firma Digital
              </h2>
              <a
                className="mt-5 block w-full max-w-md rounded-md  flex flex-col items-center bg-white p-4"
                href={solicitud?.FirmaDigitalUrl}
                download={`Firma`}
              >
                <Download />
                <h3 className="text-[10px]">Firma Digital</h3>
              </a>
            </div>
          </div>
          <Separador />
          <h1 className="text-xl md:text-3xl text-white font-bold my-4 md:mb-5">
            Contabilidad de: {solicitud.email}
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 px-4 pb-20">
            <UserCharts uid={solicitud?.uid} />
          </div>

          <Separador />
          <h1 className="text-xl md:text-3xl text-white font-bold my-4 md:mb-5">
            Estados Financieros de: {solicitud.email}
          </h1>
          <div className="w-full grid grid-cols-2 gap-5 px-4 pb-20">
            <UserEstFin uid={solicitud?.uid} />
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
           
            <div>
              <h2 className="text-2xl text-white font-bold mb-4 md:mb-5">
                Datos Personales
              </h2>
              <UserSoliInfo uid={solicitud?.uid} Plan={solicitud?.Plan} />
            </div>
           
            <div className="mt-3 md:mt-0">
              <h2 className="text-2xl text-white font-bold mb-4 md:mb-5">
                Firma Digital
              </h2>
              <div className=" w-full gap-3  overflow-x-auto">
                <a
                  className="bg-white cursor-pointer flex flex-col items-center justify-center shadow-md w-full h-[130px] rounded-md "
                  href={solicitud?.FirmaDigitalUrl}
                  download={`Firma`}
                >
                  <Download />
                  <h3 className="text-[10px]">Firma Digital</h3>
                </a>
              </div>
            </div>
           
            <form onSubmit={formik.handleSubmit} className="mt-3 md:mt-0">
              <h2 className="text-2xl text-white font-bold mb-4 md:mb-5">
                Cambiar Status de Solicitud
              </h2>
              <select
                name={"Status"}
                onChange={(value) => setEstatus(value.target.value)}
                className={` ${
                  EstatusError
                    ? "bg-red-500 text-white font-bold"
                    : "bg-gray-50"
                } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
              >
                <option value="">Actualmente: {solicitud?.estatus}</option>
                <option value="Activa">Activa </option>
                <option value="Proceso">En Proceso </option>
                <option value="Finalizada">Finalizada </option>
              </select>
              <button
                type="submit"
                className="mt-5 w-full flex justify-center bg-black rounded-md py-2 text-white"
              >
                {formik.isSubmitting ? (
                  <Loader2 className="animate-spin animate-infinite" />
                ) : (
                  "Cambiar Estatus"
                )}
              </button>
            </form>
          </div> */}
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
