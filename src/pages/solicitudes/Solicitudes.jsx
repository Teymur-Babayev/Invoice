import React, { useEffect, useState } from "react";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Separador } from "../../components/Separador";
import { useQuery } from "react-query";
import { ContabilidadCtrl } from "../../api/contabilidad/fb.contabilidad";
import { SolicitudCard } from "../../components/SolicitudCard";
import { SearchBar } from "../../components/SearchBar";
import { SLoading } from "./Solicitudes.loading";
import fondo from "../../assets/fondo.webp";
import { User2 } from "lucide-react";

const Conta = new ContabilidadCtrl();

export const Solicitudes = () => {
  const { User } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: solicitudes,
    isLoading,
    isError,
  } = useQuery("Solicitudes", Conta.getSolicitudes);

  useEffect(() => {
    if (!User) return navigate("/Login", { replace: true });
  }, [User]);

  useEffect(() => {
    if (!User?.UserRole?.includes("Admin"))
      return navigate("/", { replace: true });
  }, [User]);

  if (isLoading) return <SLoading />;
  if (isError) return navigate("/");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients =
  solicitudes?.filter((cliente) =>
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <MainLayoutDg isblack={true}>
      <div
        className={`bg-fixed bg-cover h-fit md:h-full`}
        style={{ backgroundImage: `url(${fondo})` }}
      >
        <div className="max-w-6xl mx-auto">
          <div className={` px-[3%]  lg:px-0 pt-[15%] md:pt-[8.4%]`}>
            <div className={`h-full min-h-screen px-[3%] md:px-0 md:mt-5`}>
              <SearchBar
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                placeholder={"Buscar por email"}
              />

              <h2 className="text-white text-4xl font-bold">
                Nuestros Clientes
              </h2>

              <div className="w-full mt-10 grid gap-4 grid-cols-1 md:grid-cols-4">
                {filteredClients?.map((clientes,index) => (
                  <Link to={`/Clientes/Cliente/${clientes.id}`} key={index} className="w-full cursor-pointer bg-white rounded-md p-2">
                    <User2 size={50} className="mx-auto mb-3 mt-5"/>
                    <h2 className="text-black text-center">{clientes?.email}</h2>
                    <h3 className="text-center mt-2">{clientes?.Telefono}</h3>
                    <h3 className="text-center mt-2">{clientes?.Plan}</h3>
                    <h3 className="text-center mt-2">{clientes?.Fecha}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayoutDg>
  );
};
