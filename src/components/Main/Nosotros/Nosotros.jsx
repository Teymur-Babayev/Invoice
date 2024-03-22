import React from 'react'
import cursos from "../../../assets/cursos.webp";
import imgGreen from "../../../assets/nosotros2.webp";
import logogreen from "../../../assets/icons/business.webp";
import blogs from "../../../assets/blogs.webp";
import handshakeimg from "../../../assets/handshakeimg.webp";
import logoorange from "../../../assets/icons/handshake.webp";
import valores from "../../../assets/imag-valores.webp";
import porqueelegirnos from "../../../assets/porqueelegirnos.webp";
import logoblue from "../../../assets/icons/building.webp";
import imgMotivadora from "../../../assets/nosotros1.webp";
import waves from "../../../assets/waves.webp";
import cell from "../../../assets/cell.webp";

import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

export const Nosotros = () => {
  return (
    <div id="acerca" className="w-full pb-[5%] relative h-full bg-white">
        {/* NOSOTROS SECTION */}
        <div className="w-full hidden md:h-screen lg:h-[70vh] px-[5%] lg:px-[20%]">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 pt-20">
            <div className="w-full md:w-[60%] md:ml-auto md:mt-auto h-[30vh] md:h-[21vh]">
              <img
                className="w-full h-full bg-center bg-contain bg-no-repeat"
                src={cursos}
                alt=""
              />
            </div>
            <div
              className=" hover:bg-none relative group bg-cover transition-all cursor-pointer bg-no-repeat w-full flex flex-col items-center justify-center h-[35vh]"
              style={{ backgroundImage: `url(${imgGreen})` }}
            >
              <div className="w-full h-full absolute inset-0 group-hover:hidden bg-LogoGreen"></div>
              <img
                className="w-1/2 group-hover:hidden z-10"
                src={logogreen}
                alt=""
              />
              <h2 className="text-white font-bold z-10 text-xl -translate-y-7 group-hover:-translate-y-3">
                Quienes somos
              </h2>
              <p className="text-white hidden text-justify z-10 font-bold group-hover:block text-[12px] px-[7%]">
                EasySAT es una aplicación web para simplificar el cumplimiento
                de tus obligaciones fiscales, creado por contadores para
                emprendedores que no les guste batallar con temas fiscales y de
                esa autoridad gubernamental que se llama SAT, olvídate de
                batallar con el sat y utiliza EasySAT
              </p>
            </div>
            <div className="w-full md:w-[60%] md:mr-auto md:mt-auto h-[30vh] md:h-[21vh]">
              <img
                className="w-full h-full bg-center bg-contain bg-no-repeat"
                src={blogs}
                alt=""
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3">
            <div
              className="relative cursor-pointer group  bg-center bg-cover bg-no-repeat w-full md:translate-x-[20%] flex flex-col items-center justify-center h-[35vh]"
              style={{ backgroundImage: `url(${handshakeimg})` }}
            >
              <div className="w-full h-full absolute inset-0 group-hover:hidden bg-LogoBlue"></div>
              <img
                className="w-1/2 group-hover:hidden z-10"
                src={logoorange}
                alt=""
              />
              <h2 className="text-white font-bold z-10 text-xl -translate-y-7 group-hover:-translate-y-3">
                Como te ayudaremos
              </h2>
              <p className="text-white hidden z-10 font-bold text-justify group-hover:block text-[12px] px-[5%]">
                Haremos más fácil el cumplimiento de tus obligaciones fiscales
                puesto que seremos tu departamento contable y fiscal , solo
                necesitamos tu e firma y que elijas uno de nuestro paquetes
                accesibles para ti
              </p>
            </div>
            <div className="bg-slate-500 w-full md:w-[60%] mx-auto mb-auto h-[30vh] md:h-[21vh]">
              <img
                className="w-full h-full bg-center bg-contain bg-no-repeat"
                src={valores}
                alt=""
              />
            </div>

            <div
              className=" cursor-pointer relative group hover:bg-imageOrange bg-center bg-cover bg-no-repeat w-full md:-translate-x-[20%] flex flex-col items-center justify-center h-[35vh]"
              style={{ backgroundImage: `url(${porqueelegirnos})` }}
            >
              <div className="w-full h-full absolute inset-0 group-hover:hidden bg-LogoYellow"></div>
              <img
                className="w-1/2 group-hover:hidden z-10"
                src={logoblue}
                alt=""
              />
              <h2 className="text-white font-bold z-10 text-xl group-hover:-translate-y-3 -translate-y-7">
                Porque elegirnos
              </h2>
              <p className="text-white hidden z-10 text-justify font-bold group-hover:block text-[12px] px-[5%]">
                Somos un despacho de contadores y auditores establecido desde
                hace ya de 10 años, con sus oficinas centrales en el centro de
                Monterrey Nuevo León, nuestros contadores constantemente
                actualizados, garantizan tu seguridad en temas fiscales.
              </p>
            </div>
          </div>
        </div>

        {/* PALABRA MOTIVADORA */}
        <div
          className="w-full hidden flex justify-center overflow-hidden items-center bg-center bg-cover bg-fixed h-[50vh] mt-28"
          style={{ backgroundImage: `url(${imgMotivadora})` }}
        >
          <motion.h2
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center text-3xl md:text-5xl font-bold text-white"
          >
            Deja de batallar con el SAT y <br />
            utiliza EasySAT
          </motion.h2>
        </div>

        {/* APP INFO */}
        <div className="w-full pt-[10%]  h-fit  flex flex-col">
          <div
            className="w-full h-full flex md:px-[20%] flex-col md:flex-row bg-[length:100%_100%] bg-no-repeat bg-center "
            style={{ backgroundImage: `url(${waves})` }}
          >
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="h-full mx-auto md:mx-0 w-[70%] md:w-[50%] mb-5 md:mb-0 lg:w-[35%] scale-[120%]"
              src={cell}
              alt=""
            />
            <div className="md:w-[70%] mb-20 md:my-20 lg:mb-0 flex flex-col justify-center items-center">
              <h2 className="md:text-2xl lg:text-4xl text-lg  text-white text-center font-bold">
                !OBTEN LA APLICACION AHORA Y <br />
                EXPERIMENTA LA DIFERENCIA!
              </h2>
              <p className="text-white w-[70%] md:w-full text-base md:text-xl  text-center">
                Descubre como esta herramienta pueda impulsar tu éxito
              </p>

              <button className="md:bg-black bg-black text-white md:text-white mt-5 lg:mt-5 rounded-lg px-4 py-2 font-semibold">
                PROXIMAMENTE
              </button>

              <Link to="/Registro" className='bg-white text-black uppercase font-bold rounded-md px-4 py-2 mt-2'>Registrate Ya</Link>
            </div>
          </div>
        </div>
      </div>
  )
}
