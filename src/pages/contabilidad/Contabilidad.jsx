import React, { useEffect, useState } from "react";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { FormContainer } from "../../components/ui/FormContainer";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import fondo from ".././../assets/fondo.webp";
import { useQuery } from "react-query";
import { ContabilidadCtrl } from "../../api/contabilidad/fb.contabilidad";
import { EstFinCtrl } from "../../api/estados-financieros/fb.estfin";
import { Skeleton } from "../../components/ui/skeleton";
import { ordenarPorMes } from "../../assets/adminData";
import { IngresosGastos } from "../../components/contabilidad/IngresosGastos/IngresosGastos";
import { Documentos } from "../../components/contabilidad/Documentos/Documentos";

const EstFinCt = new EstFinCtrl();
const Conta = new ContabilidadCtrl();
export const Contabilidad = () => {
  const { User } = useAuth();
  const navigate = useNavigate();

  const { data: ContaEstFin, isLoading } = useQuery("ContaEstFin", () =>
    EstFinCt.getEstadosFinancierosByUser(User?.uid)
  );

  const { data: FirmaDigital } = useQuery("FirmaDigital", () =>
    Conta.getFirma(User?.uid)
  );

  const { data: Contribuyente } = useQuery(`SAT-${User?.uid}`, () =>
    Conta.getInfoSat("ABC123456ABC")
  );

  const [Selected, setSelected] = useState("Contabilidad");
  const [Mes, setMes] = useState("enero");

  const dataNueva = ContaEstFin?.map((data) => {
    return {
      ...data,
      name: data.month,
    };
  });
  const dataOrdenada = ordenarPorMes(dataNueva);

  useEffect(() => {
    if (!User) return navigate("/Login", { replace: true });
  }, [User]);

  if (isLoading) {
    return (
      <MainLayoutDg isblack={true}>
        <FormContainer mxw={true}>
          <div className="lg:flex pt-[17%] gap-5  md:pt-[5%] lg:pt-[2%] h-full">
            <div className="bg-LogoBlue rounded-tr-3xl rounded-br-3xl w-full lg:w-[20%] lg:h-full">
              <ul className="w-full h-full flex gap-4 flex-col py-10 items-center">
                <li className="w-full flex flex-col items-end">
                  <Skeleton
                    className={`py-2 h-10 rounded-l-3xl font-bold w-full md:w-[80%] md:ml-auto`}
                  />
                </li>
                <li className="w-full flex flex-col items-end">
                  <Skeleton
                    className={`py-2 h-10 rounded-l-3xl font-bold w-full md:w-[80%] md:ml-auto`}
                  />
                </li>
              </ul>
            </div>
            <div className="flex w-full h-fit gap-5 px-[5%]">
              <Skeleton className="w-1/2 h-[70vh]" />
              <Skeleton className="w-1/2 h-[70vh]" />
            </div>
          </div>
        </FormContainer>
      </MainLayoutDg>
    );
  }

  return (
    <MainLayoutDg isblack={true}>
      <section
        class="flex items-center justify-center w-full h-full lg:h-screen  bg-fixed bg-contain md:bg-cover "
        style={{ backgroundImage: `url(${fondo})` }}
      >
        <div className="pb-[3.9%] h-full min-h-screen w-full ">
          <div
            className={`flex pt-[17%] items-center md:pt-[7%] lg:pt-[5%] h-full`}
          >
            <div className="bg-LogoBlue rounded-tr-3xl rounded-br-3xl w-full lg:w-[20%] lg:h-full">
              <ul className="w-full  h-full flex gap-4 flex-col py-10 items-center">
                <li className="w-full flex flex-col items-end">
                  <button
                    onClick={() => setSelected("Contabilidad")}
                    className={`${
                      Selected === "Contabilidad" && "bg-white"
                    } py-2 rounded-l-3xl font-bold w-full md:w-[80%] md:ml-auto`}
                  >
                    Ingresos y Gastos
                  </button>
                </li>
                <li className="w-full flex flex-col items-end">
                  <button
                    onClick={() => setSelected("Declaracion")}
                    className={`${
                      Selected === "Declaracion" && "bg-white"
                    } py-2 rounded-l-3xl font-bold w-full md:w-[80%] md:ml-auto`}
                  >
                    Declaraciones de Impuestos
                  </button>
                </li>
                <li className="w-full flex flex-col items-end">
                  <button
                    onClick={() => setSelected("Informes")}
                    className={`${
                      Selected === "Informes" && "bg-white"
                    } py-2 rounded-l-3xl font-bold w-full md:w-[80%] md:ml-auto`}
                  >
                    Informes
                  </button>
                </li>
                <li className="w-full flex flex-col items-end">
                  <button
                    onClick={() => setSelected("Finanzas")}
                    className={`${
                      Selected === "Finanzas" && "bg-white"
                    } py-2 rounded-l-3xl font-bold w-full md:w-[80%] md:ml-auto`}
                  >
                    Documentos
                  </button>
                </li>
                <li className="w-full flex flex-col items-end">
                  <button
                    onClick={() => setSelected("Otros")}
                    className={`${
                      Selected === "Otros" && "bg-white"
                    } py-2 rounded-l-3xl font-bold w-full md:w-[80%] md:ml-auto`}
                  >
                    Otros
                  </button>
                </li>
              </ul>
            </div>
            {Selected == "Contabilidad" && (
              <IngresosGastos
                mes={Mes}
                setMes={setMes}
                ContaEstFin={ContaEstFin}
                FirmaDigital={FirmaDigital}
                dataOrdenada={dataOrdenada}
              />
            )}
            {Selected == "Finanzas" && (
              <Documentos dataOrdenada={dataOrdenada} />
            )}
          </div>
        </div>
      </section>
    </MainLayoutDg>
  );
};
