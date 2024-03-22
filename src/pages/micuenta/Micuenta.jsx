import React, { useEffect, useState } from 'react'
import { MainLayoutDg } from '../../layouts/MainLayoutDg'
import { ChevronRight, FileBarChart, Home, LineChart, Play, PlusCircle, Receipt } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion";
import { MCOPC } from './MCOPC';

import Inicio from "../../assets/micuentasvg/Inicio.svg";
import NuevaFactura from "../../assets/micuentasvg/NuevaFactura.svg";
import Facturas from "../../assets/micuentasvg/Facturas.svg";
import Declaraciones from "../../assets/micuentasvg/Declaraciones.svg";
import Documentos from "../../assets/micuentasvg/Documentos.svg";
import logo from "../../assets/logoNuevo.png";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Micuenta = () => {
    const { User } = useAuth()

    const [NavActive, setNavActive] = useState(true)
    const [FacturasAcordion, setFacturasAcordion] = useState(false)
    const [DeclaracionAcordion, setDeclaracionAcordion] = useState(false)
    const [DocumentosAcordion, setDocumentosAcordion] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!User) {
            navigate("/", { replace: true });
        }
    }, [User])

    const [OPC, setOPC] = useState(0)

    return (
        <MainLayoutDg>
            <div className='w-full flex h-full min-h-[100dvh] pt-[15dvh] bg-gray-200'>
                {/* MI CUENTA NAV */}
                <div className={`${NavActive ? "w-[25%]" : "xl:w-[4%] lg:w-[5%] md:w-[6%]"} md:block hidden mr-[5%] overflow-hidden h-[100] py-2 px-4 transition-all bg-LogoBlue`}>

                    <ul className='w-full flex flex-col overflow-x-hidden h-full gap-y-3 mt-3'>
                        <li className='w-full' style={{marginTop : "50px"}}>
                            <button onClick={() => setOPC(0)} className='flex w-full py-2 items-center gap-x-4'>
                                <img src={Inicio} alt="" className='w-6 h-6 bg-contain' />
                                <span className='text-white'>
                                    Inicio
                                </span>
                            </button>
                            <div className='w-[85%] ml-auto border-b border-gray-50/20' />
                        </li>
                        <li className='w-full'>
                            <button onClick={() => setOPC(1)} className='flex w-full py-2 items-center gap-x-4'>
                                <img src={NuevaFactura} alt="" className='w-6 h-6 bg-contain' />
                                <span className='text-white'>
                                    Nueva Factura
                                </span>
                            </button>
                            <div className='w-[85%] ml-auto border-b border-gray-50/20' />
                        </li>
                        <li className='w-full'>
                            <button className='flex w-full py-2 relative items-center gap-x-4'>
                                <img src={Facturas} alt="" className='w-6 h-6 bg-contain' />
                                <div onClick={() => { setFacturasAcordion(!FacturasAcordion) }} className='w-full flex items-center cursor-pointer '>
                                    <span className='text-white flex items-center'>
                                        Facturas
                                    </span>
                                    <Play className={`${FacturasAcordion ? "rotate-90" : "rotate-0"} ml-auto transition-all w-3 h-3 mr-3 text-white  fill-white`} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {
                                    FacturasAcordion &&
                                    (<>
                                        <div className='w-[78%] ml-auto'>
                                            <button onClick={() => setOPC(21)} className='text-white text-[12px]'>Emitidas</button>
                                        </div>
                                        <div className='w-[78%] ml-auto'>
                                            <button onClick={() => setOPC(22)} className='text-white text-[12px]'>Recibidas</button>
                                        </div>
                                        <div className='w-[78%] ml-auto'>
                                            <button onClick={() => setOPC(23)} className='text-white text-[12px]'>Constancias de Retención</button>
                                        </div>
                                        <div className='w-[78%] ml-auto'>
                                            <button onClick={() => setOPC(24)} className='text-white text-[12px]'>Gastos Extranjeros</button>
                                        </div>
                                        <div className='w-[78%] ml-auto'>
                                            <button onClick={() => setOPC(25)} className='text-white text-[12px]'>Pedimentos de Importación</button>
                                        </div>
                                    </>)
                                }
                            </AnimatePresence>

                            <div className='w-[85%] ml-auto border-b border-gray-50/20' />


                        </li>
                        <li className='w-full'>
                            <button className='flex w-full py-2 relative items-center gap-x-4'>
                                <div onClick={() => { setDeclaracionAcordion(!DeclaracionAcordion) }} className='w-full flex  items-center cursor-pointer '>
                                    <img src={Declaraciones} alt="" className='w-6 h-6 bg-contain' />
                                    <span className='text-white ml-[6%] flex items-center'>
                                        Declaraciones
                                    </span>
                                    <Play className={`${DeclaracionAcordion ? "rotate-90" : "rotate-0"} ml-auto transition-all w-3 h-3 mr-3 text-white  fill-white`} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {
                                    DeclaracionAcordion &&
                                    (<>
                                        <div className='w-[78%] ml-auto'>
                                            <button onClick={() => setOPC(31)} className='text-white text-[12px]'>Mensuales</button>
                                        </div>
                                        <div className='w-[78%] ml-auto'>
                                            <button onClick={() => setOPC(32)} className='text-white text-[12px]'>Anuales</button>
                                        </div>
                                        <div className='w-[78%] ml-auto'>
                                            <button onClick={() => setOPC(33)} className='text-white text-[12px]'>Pendientes</button>
                                        </div>
                                    </>)
                                }
                            </AnimatePresence>

                            <div className='w-[85%] ml-auto border-b border-gray-50/20' />
                        </li>
                        <li className='w-full'>
                            <button onClick={() => setOPC(0)} className='flex w-full py-2 items-center gap-x-4'>
                                <img src={Documentos} alt="" className='w-6 h-6 bg-contain' />
                                <span className='text-white'>
                                    Estados de Resultados
                                </span>
                            </button>
                            <div className='w-[85%] ml-auto border-b border-gray-50/20' />
                        </li>
                        <li className='w-full'>
                            <button className='flex w-full py-2 relative items-center gap-x-4'>
                                <img src={Documentos} alt="" className='w-6 h-6 bg-contain' />
                                <div onClick={() => { setDocumentosAcordion(!DocumentosAcordion) }} className='w-full flex items-center cursor-pointer '>
                                    <span className='text-white  flex items-center'>
                                        Documentos
                                    </span>
                                    <Play className={`${DocumentosAcordion ? "rotate-90" : "rotate-0"} ml-auto transition-all w-3 h-3 mr-3 text-white  fill-white`} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {
                                    DocumentosAcordion &&
                                    (<>
                                        <div className='w-[78%] ml-auto'>
                                            <button onClick={() => setOPC(41)} className='text-white text-[14px]'>Acuses</button>
                                        </div>
                                        <div className='w-[78%] ml-auto'>
                                            <button onClick={() => setOPC(42)} className='text-white text-[14px]'>invoices</button>
                                        </div>
                                        <div className='w-[78%] ml-auto'>
                                            <button onClick={() => setOPC(43)} className='text-white text-[14px]'>Documentos SAT</button>
                                        </div>
                                    </>)
                                }
                            </AnimatePresence>
                            <div className='w-[85%] ml-auto border-b border-gray-50/20' />
                        </li>
                        <li className='w-full'>
                            <button className='flex py-2 items-center gap-x-4'>
                                <LineChart className='text-white ' />
                                <span className='text-white '>
                                    Análisis de Datos
                                </span>
                            </button>
                        </li>
                  
                    </ul>
                </div>

                <div className='flex flex-col justify-center items-center  md:hidden w-full h-full '>

                    <div className='bg-white flex justify-center items-center flex-col px-4 py-6 rounded-md'>
                        <img src={logo} className='w-[30%]' alt="" />
                        <h2 className='text-esatDark text-2xl font-bold'>Para una mejor experiencia</h2>
                        <p className='text-esatDark text-2xl font-bold'>Utiliza la App de EasySAT</p>
                        <button onClick={() => navigate("/")} className='mt-10 w-full mx-[5%] bg-gray-300 rounded-md py-2 font-bold cursor-pointer'>Proximamente</button>
                    </div>

                </div>

                <OpcContainer opc={OPC} />
            </div>
        </MainLayoutDg>
    )
}

const OpcContainer = ({ opc }) => {
    return (<div className='w-[80%]  overflow-x-hidden pt-5 h-full md:flex hidden'>
        {opc === 0 && (<MCOPC.Inicio />)}
        {opc === 1 && (<MCOPC.NuevaFactura />)}
        {opc === 21 && (<MCOPC.Emitidas />)}
        {opc === 22 && (<MCOPC.Recibidas />)}
        {opc === 23 && (<MCOPC.ConstanciaRetencion />)}
        {opc === 24 && (<MCOPC.GastosExtranjeros />)}
        {opc === 25 && (<MCOPC.Pedimentos />)}
        {opc === 31 && (<><h2>Mensuales</h2></>)}
        {opc === 32 && (<><h2>Anuales</h2></>)}
        {opc === 33 && (<><h2>Pendientes</h2></>)}
        {opc === 41 && (<><h2>Acuses</h2></>)}
        {opc === 42 && (<MCOPC.Invoices/>)}
        {opc === 43 && (<><h2>Documentos SAT</h2></>)}

    </div>)
}



export default Micuenta