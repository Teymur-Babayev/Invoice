import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navbar } from "../components/Navbar";
import bgImage from "../assets/nosotrosImg.webp";
import imgMotivadora from "../assets/nosotros1.webp";

import declaracion from "../assets/ServicioImpuestos.svg";
import aseFiscal from "../assets/ServicioAsesoriaFiscal.svg";
import svgprueba from "../assets/icons/Elemento.svg";
import Facturación from "../assets/ServicioFacturación.svg";

import waves from "../assets/waves.webp";
import { motion } from "framer-motion";
import cell from "../assets/cellApp.png";
import { Main as MainC } from "../components/Main/index";
import logo from "../assets/logoNuevo.png";
import CursosCarousel from "../components/cursos/CursosCarousel";
import { useQuery } from "react-query";
import { CursosCtrl } from "../api/fb.cursos";

import { servicioData } from "../assets/serviciosData";
import { XCircle } from "lucide-react";
import SubscriptionButton from "../components/SubscriptionButton";
import ReactPlayer from "react-player";


const CursosCtrlr = new CursosCtrl();
export const Main = () => {
  const { User } = useAuth();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [ChatBot, setChatBot] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [volumen, setVolumen] = useState(0); // 1 representa el volumen completo (sin mutear)

  const handleToggleMute = () => {
    // Alternar entre 0 y 1 para mutear o desmutear
    setVolumen((prevVolumen) => (prevVolumen === 0 ? 1 : 0));
  };

  const {
    data: Cursos,
    isLoading,
    isError,
  } = useQuery("Cursos", () => CursosCtrlr.getCursos());

  const filteredCourses =
    Cursos?.filter((course) =>
      course.Titulo.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];


  const [colorBoton, setColorBoton] = useState('colorOriginal'); // Reemplaza 'colorOriginal' con el color original del botón

  const cambiarColorBoton = () => {
    setColorBoton('red'); // Reemplaza 'nuevoColor' con el color que desees
  };

  const restaurarColorBoton = () => {
    setColorBoton('blue'); // Reemplaza 'colorOriginal' con el color original del botón
  };

  useEffect(() => {
    const handleScroll = () => {
      const divElement = document.getElementById('servicios'); // Reemplaza 'tuDiv' con el ID de tu div
      const rect = divElement.getBoundingClientRect();

      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        cambiarColorBoton();
      } else {
        restaurarColorBoton();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggle = () => {
    setChatBot(!ChatBot)
  }

  const contactoRef = useRef(null);
  const preguntasRef = useRef(null);
  const planesRef = useRef(null);
  const serviciosRef = useRef(null);

  // Función para desplazarse a la sección de contacto
  const scrollToSite = () => {
    if (contactoRef.current) {
      contactoRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (preguntasRef.current) {
      preguntasRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (planesRef.current) {
      planesRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (serviciosRef.current) {
      serviciosRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Efecto que se ejecuta una vez al montar el componente para desplazarse automáticamente a la sección de contacto
  useEffect(() => {
    // Verificar si la URL de la página contiene el fragmento #algo
    if (window.location.hash === '#contacto') {
      scrollToSite();
    }
    if (window.location.hash === '#preguntas') {
      scrollToSite();
    }
    if (window.location.hash === '#planes') {
      scrollToSite();
    }
    if (window.location.hash === '#servicios') {
      scrollToSite();
    }
  }, []);


  return (
    <>
      <Navbar />
      {/* HERO */}
      <div
        className="bg-blue-500 w-full h-full min-h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full flex flex-col items-center justify-center h-full bg-gradient-to-t min-h-screen  from-cyan-200 from-[15%] via-transparent  to-white">
          <h1 className=" text-4xl lg:text-7xl font-bold text-[#0f2538]">Contabilidad para</h1>
          <div className="flex items-center">
            <h2 className=" text-4xl lg:text-7xl flex font-bold text-[#0f2538] mt-[1%]">
              Personas
            </h2>
            <div className="w-full ml-3 h-fit p-5 bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${svgprueba})` }}
            >
              <span className="text-[#fff] text-4xl lg:text-7xl font-semibold">Físicas</span>
            </div>
          </div>

          <p className="text-[#0f2538]  w-[80%] md:w-fit text-center bg-[#ffffff]/40 px-3 md:px-8 py-3  rounded-md font-semibold text-base md:text-2xl mt-[3%]">Llevamos tu contabilidad online de una manera confiable <br /> y ordenada con apoyo de nuestros contadores expertos.</p>
        </div>
      </div>

      {/* SERVICIOS */}
      <div id="servicios" ref={serviciosRef} className="w-full h-fit hover:transition-all scroll-m-40 bg-cyan-200 flex flex-col justify-center items-center">
        <h2 className="text-5xl font-semibold  text-[#0f2538]">Servicios</h2>
        <p className="text-[#0f2538] text-2xl mt-2 text-center">Expertos en simplificar tus impuestos y maximizar tus beneficios. <br />Descubre nuestros servicios</p>

        <div className="md:px-[10%] px-[5%]  flex flex-wrap gap-10 py-[7%] place-content-center h-fit bg-cyan-200 w-full">
          <div className="w-[250px] transition-all cursor-pointer py-6 flex flex-col group space-y-3 items-center h-[300px] bg-[#ffffff] rounded-md shadow-md">
            <img src={aseFiscal} className="h-[50px] mx-auto" alt="" />
            <h3 className="text-[#0f2538] font-semibold md:text-xl text-base text-center">{servicioData[0].title}</h3>
            <p className="px-3  text-justify">{servicioData[0].description}</p>
          </div>
          <div className="w-[250px] group transition-all cursor-pointer py-6 flex flex-col space-y-3 items-center h-[300px] bg-[#ffffff] rounded-md shadow-md">
            <img src={Facturación} className="h-[50px] mx-auto" alt="" />
            <h3 className="text-[#0f2538] font-semibold md:text-xl text-base text-center">Facturación Electrónica</h3>
            <p className="px-3  text-justify">{servicioData[2].description}</p>
          </div>
          <div className="w-[250px] group transition-all cursor-pointer py-6 flex flex-col space-y-3 items-center h-[300px] bg-[#ffffff] rounded-md shadow-md">
            <img src={declaracion} className="h-[50px] mx-auto" alt="" />
            <h3 className="text-[#0f2538] font-semibold md:text-xl text-base text-center">Declaración de Impuestos</h3>
            <p className="px-3 text-sm  text-justify">{servicioData[3].description}</p>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="planes" ref={planesRef} className="w-full h-[70vh] hover:transition-all pb-[10%] relative bg-[#ffffff]">
        <div className="bg-cyan-200 w-full py-[3%] flex flex-col  items-center ">
          <h3 className="text-center text-3xl md:text-5xl font-semibold text-[#0f2538]">
            Descubre <br />Nuestros Paquetes
          </h3>
          <p className="mt-3 text-center text-base md:text-2xl font-medium  text-[#0f2538]">Diseñados para adaptarse a tus necesidades específicas y <br />
            garantizar su cumplimiento.
          </p>
        </div>
        <div className="bg-cyan-200 hidden md:block w-full h-full"
          style={{
            clipPath: `polygon(100% 0, 0 0, 100% 66%)`
          }}
        />

        <div className="lg:px-[10%] md:px-[5%] px-[3%] gap-3 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 md:absolute md:top-[45%] md:left-0 ">
          <div className="flex flex-col p-6 transition-all cursor-pointer group hover:bg-[#0f2538] hover:scale-105 shadow-2xl mx-auto w-fit px-7 text-center text-gray-900 bg-[#ffffff] hover:b-rounded-lg  xl:p-8 ">
            <h3 className="mb-4 ml-5 text-4xl group-hover:text-[#fff] font-bold mr-auto">Básico</h3>
            <div className="flex ml-5 mb-5 justify-center items-baseline mr-auto my-2">
              <span className="mr-2 text-5xl group-hover:text-[#fff] text-LogoBlue font-bold">$579</span>
              <span className="text-black group-hover:text-[#fff] text-2xl">/mes</span>
              <span className="text-xs ml-2 group-hover:text-[#fff]">*IVA incluido*</span>
            </div>

            <p className="text-xs text-gray-600 group-hover:text-[#fff] mb-3">Plan diseñado para personas físicas que tributan en RESICO o RIF</p>


            <ul role="list" className="mb-8 flex justify-center flex-col w-full h-full space-y-6 text-left">
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Emisión de facturas ilimitadas</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Asesoría contable personalizada y específica de tu régimen </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Soporte vía WhatsApp</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Soporte vía correo electrónico</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Asesoría telefónica</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Declaración de impuestos</span>
              </li>
            </ul>
            {
              User ?
                (<>
                  <SubscriptionButton
                    price={579}
                    plan={"Basico"}
                  />
                </>) :
                (<>
                  <Link to="/login" className="w-[80%] mt-auto hover:bg-[#ffffff] hover:text-[#0f2538] mx-auto rounded-md bg-LogoBlue py-2 px-4 text-[#fff] hover:no-underline">Comprar ahora</Link>
                </>)
            }
          </div>
          <div className="flex flex-col p-6 transition-all cursor-pointer group hover:bg-[#0f2538] hover:scale-105  shadow-2xl mx-auto w-fit px-15 text-center text-gray-900 bg-[#ffffff] hover:b-rounded-lg  xl:p-8 ">
            <h3 className="mb-4 ml-5 text-3xl group-hover:text-[#fff] font-bold mr-auto">Pro</h3>
            <div className="flex ml-5 mb-5 justify-center items-baseline mr-auto my-2">
              <span className="mr-2 text-5xl group-hover:text-[#fff] text-LogoBlue font-bold">$749</span>
              <span className="text-black group-hover:text-[#fff] text-2xl">/mes</span>
              <span className="text-xs ml-2 group-hover:text-[#fff]">*IVA incluido*</span>
            </div>

            <p className="text-xs text-gray-600 group-hover:text-[#fff] mb-3">Este plan esta hecho para profesionales o emprendedores con un 1 régimen fiscal (Plataformas tecnologicas, Actividad Empresarial o Arrendamiento)</p>

            <ul role="list" className="mb-8 space-y-4 flex flex-col justify-center h-full w-full text-left">
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Emisión de Facturas ilimitadas</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Asesoría contable personalizada y específica de tu régimen</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Soporte vía WhatsApp</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Soporte vía correo electrónico</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Asesoría telefónica</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Declaración de impuestos</span>
              </li>
            </ul>
            {
              User ?
                (<>
                  <SubscriptionButton
                    price={749}    
                    plan={"Pro"}
                  />
                </>) :
                (<>
                  <Link to="/login" className="w-[80%] mt-auto hover:bg-[#ffffff] hover:text-[#0f2538] mx-auto rounded-md bg-LogoBlue py-2 px-4 text-[#fff] hover:no-underline">Comprar ahora</Link>
                </>)
            }
          </div>
          <div className="flex flex-col p-6 transition-all cursor-pointer group hover:bg-[#0f2538] hover:scale-105 shadow-2xl mx-auto w-fit px-15 text-center text-gray-900 bg-[#ffffff] hover:b-rounded-lg  xl:p-8 ">
            <h3 className="mb-4 ml-5 text-3xl group-hover:text-[#fff] font-bold mr-auto">Premium</h3>
            <div className="flex ml-5 mb-5 justify-center items-baseline mr-auto my-2">
              <span className="mr-2 text-5xl group-hover:text-[#fff] text-LogoBlue font-bold">$1049</span>
              <span className="text-black group-hover:text-[#fff] text-2xl">/mes</span>
              <span className="text-xs ml-2 group-hover:text-[#fff]">*IVA incluido*</span>
            </div>

            <p className="text-xs text-gray-600 group-hover:text-[#fff] mb-3">Si cuentas con 2 o más regímenes, este es tu plan ideal</p>


            <ul role="list" className="mb-8 flex flex-col h-full w-full justify-center space-y-4 text-left">
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Emisión de Facturas ilimitadas</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Asesoría contable personalizada y específica de tu régimen</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Soporte vía WhatsApp</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Soporte vía correo electrónico</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Asesoría telefónica</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-800 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-base font-semibold group-hover:text-[#fff]">Declaración de impuestos</span>
              </li>
            </ul>
            {
              User ?
                (<>
                  <SubscriptionButton
                    price={1049}
                    plan={"Premium"}
                  />
                </>) :
                (<>
                  <Link to="/login" className="w-[80%] mt-auto hover:bg-[#ffffff] hover:text-[#0f2538] mx-auto rounded-md bg-LogoBlue py-2 px-4 text-[#fff] hover:no-underline">Comprar ahora</Link>
                </>)
            }
          </div>

        </div>
      </div>


      <div className="w-full block h-[180vh] md:h-[120vh] lg:h-[70vh] bg-[#ffffff]" />
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
            className="h-full mx-auto md:mx-0 w-[70%] lg:translate-y-[20%] xl:translate-y-0 md:w-[50%] mb-5 md:mb-0 lg:w-[35%] lg:scale-[150%] xl:scale-[130%]"
            src={cell}
            alt=""
          />
          <div className="md:w-[70%] mb-20 md:py-[15%] lg:mb-0 flex flex-col justify-center items-center">
            <h2 className="md:text-2xl lg:text-4xl text-lg  text-[#fff] text-center font-bold">
              ¡Obtén la aplicación ahora y <br /> experimenta la diferencia!
            </h2>
            <p className="text-[#fff] w-[70%] md:w-full text-base md:text-xl  text-center">
              Descubre como esta herramienta puede impulsar tu éxito
            </p>

            <button className="md:bg-black bg-black text-[#fff] md:text-[#fff] mt-5 lg:mt-5 rounded-lg px-4 py-2 font-semibold">
              Próximamente
            </button>

            <Link to="/Registro" className='bg-[#ffffff] text-black font-bold rounded-md px-4 py-2 mt-2 hover:no-underline'>Regístrate</Link>
          </div>
        </div>
      </div>

      {/* CURSOS */}
      <div className="w-full mt-10 flex h-fit flex-col items-center">
        <h2 className="text-3xl mt-5 md:text-5xl text-[#0f2538] font-bold">Cursos</h2>

        <h4 className="text-center w-full md:w-[60%] text-base md:text-2xl text-[#0f2538] font-medium my-4">
          En EasySAT te ofrecemos cursos interactivos y actualizados que te permitirán profundizar tus conocimientos en contabilidad, impuestos y finanzas.
        </h4>

        <div className="w-full md:w-[75%] px-[3%] my-5">
          <CursosCarousel array={filteredCourses} />
        </div>

      </div>

      {/* CTA */}
      <MainC.Opiniones />

      {/* PALABRA MOTIVADORA */}
      <div
        className="w-full flex justify-center overflow-hidden items-center bg-center bg-cover bg-fixed h-[30vh] mt-28"
        style={{ backgroundImage: `url(${imgMotivadora})` }}
      >
        <motion.h2
          initial={{ opacity: 0, x: 1000 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center text-3xl md:text-5xl font-bold text-[#fff]"
        >
          Deja de batallar con el SAT y <br />
          utiliza EasySAT
        </motion.h2>
      </div>

      <MainC.Preguntas preguntasRef={preguntasRef} />

      <div className="w-full h-10 my-5 bg-[#0f2538]"
        style={{ clipPath: "polygon(100% 1%, 0 0, 50% 18%)" }}
      />

      {/* REDES */}
      <MainC.Redes />

      {/* CONTACTO */}
      <MainC.Contacto contactoRef={contactoRef} />

      {pathname == "/" && (
        <div className="fixed  left-[3%] bottom-[3%] bg-slate-700 overflow-hidden rounded-full w-20 h-20 md:w-32 md:h-32">
          <ReactPlayer
          onClick={handleToggleMute}
          height={"100%"}
          width={"100%"}
          style={{
            objectFit:"cover"
          }}
          loop
          playing
          volume={volumen}
          url={"https://firebasestorage.googleapis.com/v0/b/dgya-fb.appspot.com/o/ESATVIDEOS%2F202401291603.mp4?alt=media&token=6588d9b1-40b3-423a-8f2a-6634d3177087"}
          />
        </div>
      )}

      <div className="fixed z-50 flex-col md:flex-row right-[2%] bottom-[3%] rounded-full flex justify-center items-end md:items-center">
        {ChatBot ? (
          <div className="flex w-[90%] md:w-[400px] shadow-2xl mb-7 md:mb-0 rounded-md bg-LogoBlue h-14 p-4 justify-center items-center">
            <XCircle
              onClick={handleToggle}
              className="absolute left-[6%] -top-[6%] md:-left-[3%] md:-top-[2%] cursor-pointer text-esatLight hover:text-LogoGreen transition-colors"
            />
            <h3 className="text-[#fff] text-sm">
              Hola soy Kavii tu asistente virtual, es un placer saludarte, ¿en
              que te podemos ayudar?
            </h3>
          </div>
        ) : (
          <></>
        )}

        <div className="w-16 rounded-full  ml-2">
          <img
            className="w-full animate-float h-full bg-center bg-contain"
            src={logo}
            alt=""
          />
        </div>
      </div>
    </>
  );
};
