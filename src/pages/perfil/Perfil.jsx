import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { useAuth } from "../../hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { FileCheck, Pencil, ShieldAlert, User2 } from "lucide-react";
import { MisDatos } from "./opc/MisDatos";
import { UpdateDatos } from "./opc/UpdateDatos";
import { AdminPanel } from "./opc/AdminPanel";
import { MisSolicitudes } from "./mis-solicitudes/MisSolicitudes";
import { FormContainer } from "../../components/ui/FormContainer";
import './index.css';
export const Perfil = () => {
  const { User } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    if (!User) return navigate("/Login", { replace: true });
  }, [User]);

  useEffect(() => {
    if (User?.UserRole?.toLowerCase().trim().includes("admin")) setisAdmin(true);
  }, [User]);

  return (
    <MainLayoutDg isblack={true}>
      <FormContainer>
        <div className="w-full flex flex-col px-2 md:px-[2%]" >
          <h1 className="my-5 text-4xl text-white font-bold">Perfil</h1>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full flex-col md:flex-row md:space-y-2">
              <TabsTrigger className="w-full" value="account">
                Mis Datos <User2 className="ml-3" />
              </TabsTrigger>
              <TabsTrigger className="w-full" value="updateAccount">
                Actualizar Datos <Pencil className="ml-3" />
              </TabsTrigger>
              {isAdmin && (
                <TabsTrigger className="w-full flex items-center" value="admin">
                  Panel Administrativo <ShieldAlert className="ml-3" />
                </TabsTrigger>
              )}
            </TabsList>
            {/* mis datos section */}
            <TabsContent
              className="w-full h-full mb-7 justify-center items-center px-2  mt-[15%] md:mt-0"
              value="account"
            >
              <MisDatos />
            </TabsContent>

            {/* actualizar datos section */}
            <TabsContent
              className="w-full h-full mb-7 justify-center items-center px-2 mt-[20%] md:mt-0"
              value="updateAccount"
            >
              <UpdateDatos />
            </TabsContent>

            <TabsContent className="mt-[20%] h-full md:mt-0" value="password">
              <MisSolicitudes />
            </TabsContent>

            <TabsContent
              value="admin"
              className="w-full justify-center items-center px-2  mt-[20%] md:mt-0"
            >
              <AdminPanel />
            </TabsContent>
          </Tabs>
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
