import React, { useEffect, useState } from 'react'
import logo from "../assets/logocolor.webp";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Bell, LogOut, Menu, Search, User2, User2Icon, UserIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export const Navbar = () => {

  const [bgWhite, setBgWhite] = useState(false);
  const [currentHash, setCurrentHash] = useState(null);
  const [toggleMenu, settoggleMenu] = useState(false);

  const handleMenuToggle = () => {
    settoggleMenu(!toggleMenu);
  };

  const { User, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setBgWhite(true);
      } else {
        setBgWhite(false);
      }
    };

    const handleHash = () => {
      const hashes = ['#servicios', '#planes', '#contacto', "#preguntas"];
      const newHash = hashes.find(hash => {
        const element = document.querySelector(hash);
        if (element && element.getBoundingClientRect().top >= 0) {
          return hash;
        }
      })
      setCurrentHash(newHash);
    }

    window.addEventListener('scroll', handleScroll);

    window.addEventListener('scroll', handleHash);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const location = useLocation();

  const isCurrentPath = (path) => {

    if (path.startsWith('#')) {
      return window.location.hash === path;
    }

    return location.pathname === path;

  }  

  const isMainPath = () => {
    if (location.pathname === "/") {
      return true
    } else {
      return false
    }
  }

  const scrollToTop = () => {
    // Scroll hacia el tope de la página
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // O 'auto' para un desplazamiento instantáneo
    });
  };

  return (
  
    <div className='fixed bg-white shadow-md z-50 w-full flex px-[3%] md:px-[5%] lg:px-[10%] py-5 items-center justify-between' style={{background: "red !important"}}>
      <Link className='v-[25vw]' onClick={() => { if (location.pathname === "/") { scrollToTop() } }} to={"/"} id="contend-bg-perfil">
        <img src={logo} className='h-20' alt="" />
      </Link>


      <div className={` hidden w-[75vw] md:flex justify-end transition-all py-4 px-3`} >
        <ul className='flex items-center gap-x-3' id='header_title_style'>
          {
            location.pathname === "/micuenta" || location.pathname === "/informacionFiscal"
              ? (<div className='flex items-center gap-x-3'>

                <div className='bg-gray-300 rounded-full w-[15dvw] px-3 flex items-center gap-x-3'>
                  <Search className='w-5 h-5 font-bold text-gray-400' />
                  <input type="text" className='w-full outline-none border-none ring-0 bg-gray-300' />
                </div>
                <div>
                  <Bell className='w-5 h-5 font-bold text-LogoBlue' />
                </div>


                <div className='relative'>
                <DropdownMenu className="relative right-0 top-0">
                  <DropdownMenuTrigger asChild>
                    <div className='w-7 h-7 p-1 cursor-pointer flex items-center justify-center shadow-lg rounded-full bg-black'>
                      <User2Icon className='text-white' />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="absolute -right-5 w-52">
                    <DropdownMenuGroup >
                      <DropdownMenuItem className="hover:bg-LogoGreen focus:bg-LogoGreen cursor-pointer">
                        <Link to="/Perfil">Configuración de perfil</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-LogoGreen focus:bg-LogoGreen cursor-pointer">
                        Configuración de factura
                      </DropdownMenuItem  >
                      <DropdownMenuItem className="hover:bg-LogoGreen focus:bg-red-500 cursor-pointer" onClick={()=>{logout()}}>
                        Salir
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
                
              </div>)
              : (<>
                <a className={`text-center ${isCurrentPath('#servicios') ? 'text-LogoBlue' : 'text-esatDark'}`} href={`${isMainPath() ? "#servicios" : "/#servicios"}`}>Servicios</a>

                <a className={`inline-block whitespace-nowrap text-center ${isCurrentPath('#planes') ? 'text-LogoBlue' : 'text-esatDark'}`} href={`${isMainPath() ? "#planes" : "/#planes"}`}>Planes</a>

                <Link className={`text-center ${isCurrentPath('/cursos') ? 'text-LogoBlue' : 'text-esatDark'}`} to={'/cursos'}>Cursos</Link>

                <a className={`inline-block whitespace-nowrap text-center ${isCurrentPath('#preguntas') ? 'text-LogoBlue' : 'text-esatDark'}`} href={`${isMainPath() ? "#preguntas" : "/#preguntas"}`}>Preguntas frecuentes</a>

                <a className={`text-center ${isCurrentPath('#contacto') ? 'text-LogoBlue' : 'text-esatDark'}`} href={`${isMainPath() ? "#contacto" : "/#contacto"}`}>Contacto</a>

                {
                  User ? (<li><div className="flex py-1 cursor-pointer  transition-all items-center justify-between md:justify-start md:gap-x-3">
                    <Link
                      to="/Client_Information"
                      className="w-[130px] flex border-2 cursor-pointer border-LogoBlue rounded-md px-3 py-1 gap-x-1 items-center"
                    >
                      <User2 className='text-LogoBlue' />
                      <p className='w-full text-LogoBlue uppercase text-[14px]'>mi cuenta</p>

                    </Link>
                    <LogOut
                      onClick={logout}
                      className="w-5 h-5 text-LogoBlue cursor-pointer"
                    />
                  </div></li>) : (<>
                    <li className='hover:-translate-y-1 transition-all'>
                      <Link className=' hover:-translate-y-1 transition-all whitespace-nowrap text-esatDark' to={'/Login'}>Iniciar Sesión</Link>
                    </li>
                    <li className='hover:-translate-y-1 transition-all'>
                      <Link className='  bg-LogoBlue py-2 px-4 text-white rounded-md ' to={'/Registro'}>Regístrate</Link>
                    </li>
                  </>)
                }
              </>)
          }


        </ul>

      </div>

      <Menu className='block w-[50%] md:hidden' size={30} onClick={handleMenuToggle} />
      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col w-full h-screen absolute left-0 top-0 bg-white px-6 py-4 md:hidden"
          >
            <Menu
              size={40}
              onClick={handleMenuToggle}
              className={`flex ml-auto ${toggleMenu ? "text-esatDark" : "text-white"
                } cursor-pointer md:hidden -translate-x-2 mb-5
                
                `}
            />
            <ul className="flex flex-col justify-center gap-y-5 gap-x-3 text-black font-semibold text-lg">
              <li className='w-full transition-colors py-2 rounded-md  group hover:bg-esatLight'>
                <a className='w-full h-full inline-block ' href="">Servicios</a>
              </li>
              <li className='w-full transition-colors py-2 rounded-md  group hover:bg-esatLight'>
                <a className='w-full h-full inline-block ' href="">Planes</a>
              </li>
              <li className='w-full transition-colors py-2 rounded-md  group hover:bg-esatLight'>
                <Link className='w-full h-full inline-block ' to={"/cursos"}>Cursos</Link>
              </li>
              <li className='w-full transition-colors py-2 rounded-md  group hover:bg-esatLight'>
                <a className='w-full h-full inline-block ' href="">Preguntas Frecuentas</a>
              </li>
              <li className='w-full transition-colors py-2 rounded-md  group hover:bg-esatLight'>
                <a className='w-full h-full inline-block ' href="">Contacto</a>
              </li>


              {
                User ? (<li><div className="flex py-1 cursor-pointer  transition-all items-center justify-between md:justify-start md:gap-x-3">
                  <Link
                    to="/micuenta"
                    className="w-[130px] flex border-2 cursor-pointer border-LogoBlue rounded-md px-3 py-1 gap-x-1 items-center"
                  >
                    <User2 className='text-LogoBlue' />
                    <p className='w-full text-LogoBlue uppercase text-[14px]'>mi cuenta</p>

                  </Link>
                  <LogOut
                    onClick={logout}
                    className="w-5 h-5 text-LogoBlue cursor-pointer"
                  />
                </div></li>) : (<>
                  <li className='w-full transition-colors py-2 rounded-md  group hover:bg-esatLight'>
                    <Link className='w-full h-full inline-block ' to={"/login"}>Iniciar Sesion</Link>
                  </li>
                  <li className='w-full transition-colors py-2 rounded-md  group hover:bg-esatLight'>
                    <Link className='w-full h-full inline-block ' to={"/registro"}>Registrate</Link>
                  </li>
                </>)
              }
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
