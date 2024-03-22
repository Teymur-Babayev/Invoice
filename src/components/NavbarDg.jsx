import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  LogOut,
  Menu,
  MenuIcon,
  Star,
  UserIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChatBot } from "./ChatBot";
import {
  NavOptionsSinLog,
  NavOptionsLog,
  NavOptionsLogNoAdmin,
} from "../utils/data";

function checkPage() {
  const location = useLocation();

  if (location.pathname === "/") {
    // Estamos en la página principal
    // Hacer algo
    return true;
  } else {
    // Estamos en otra página
    return false;
  }
}

export const NavbarDg = ({ isblack }) => {
  const { User, logout } = useAuth();
  const location = useLocation();
  const [Route, setRoute] = useState(location.pathname);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [MenuDesktopToggle, setMenuDesktopToggle] = useState(false);
  const [ArrowToggle, setArrowToggle] = useState(false);

  const [toggleMenu, settoggleMenu] = useState(false);

  const isMainPage = checkPage();

  const handleMenuToggle = () => {
    settoggleMenu(!toggleMenu);
  };

  const [scrollPassedLimit, setScrollPassedLimit] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollLimit = 200; // Define el límite de scroll después del cual deseas cambiar el estilo

      if (window.scrollY > scrollLimit) {
        setScrollPassedLimit(true);
      } else {
        setScrollPassedLimit(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    if (User) {
      if (User.UserRole.includes("Admin")) {
        setIsAdmin(true);
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed z-50 flex w-full md:px-[3%] lg:px-[3%] justify-between `}
      >
        <ul
          className={`hidden overflow-hidden bg-white ${
            scrollPassedLimit ? "bg-black/80" : ""
          } transition-all  md:flex justify-center items-center  ${
            scrollPassedLimit ? "rounded-b-md" : "mt-5  rounded-full"
          }  ${
            scrollPassedLimit ? "shadow-lg" : "text-black"
          } divide-x-2 [&>a]:md:text-sm over [&>a]:lg:text-xl [&>a]:md:px-2 [&>a]:md:py-2 [&>a]:lg:px-2 [&>a]:lg:py-2  text-black font-semibold lg:text-base`}
        >
          {!User && (
            <>
              {NavOptionsSinLog.map((nav,index) => (
                <Link
                  key={index}
                  to={nav.to}
                  className={`hover:bg-LogoYellow hover:text-white transition-colors ${
                    scrollPassedLimit || isblack ? "text-black" : ""
                  }`}
                >
                  {nav.name}
                </Link>
              ))}
            </>
          )}

          {User && (
            <>
              {IsAdmin ? (
                <>
                  {NavOptionsLog.map((nav, index) => (
                    <>
                      {nav.name == "Perfil" ? (
                        <div className="flex items-center space-x-3">
                          <Link
                            key={index}
                            to="/Perfil"
                            className={`flex items-center px-4 ${
                              isblack ? "text-white" : ""
                            } justify-center space-x-3`}
                          >
                            <Avatar className="">
                              <AvatarImage src={User?.Img_url} />
                              <AvatarFallback className="bg-black">
                                <UserIcon className="text-white" />
                              </AvatarFallback>
                            </Avatar>
                            <h2
                              className={`${
                                scrollPassedLimit || isblack ? "text-black" : ""
                              }`}
                            >
                              {User?.Username && <p>{User.Username}</p>}
                            </h2>
                            <LogOut
                              onClick={logout}
                              className={`w-5 h-5 cursor-pointer ${
                                scrollPassedLimit || isblack
                                  ? "text-black"
                                  : "text-black"
                              }`}
                            />
                          </Link>
                        </div>
                      ) : (
                        <Link
                          key={index}
                          to={nav.to}
                          className={`hover:bg-LogoYellow hover:text-white transition-colors ${
                            scrollPassedLimit || isblack ? "text-black" : ""
                          }`}
                        >
                          {nav.name}
                        </Link>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <>
                  {NavOptionsLogNoAdmin.map((nav, index) => (
                    <>
                      {nav.name == "Perfil" ? (
                        <div className="flex items-center space-x-3">
                          <Link
                            key={index}
                            to="/Perfil"
                            className={`flex items-center px-4 ${
                              isblack ? "text-white" : ""
                            } justify-center space-x-3`}
                          >
                            <Avatar className="">
                              <AvatarImage src={User?.Img_url} />
                              <AvatarFallback className="bg-black">
                                <UserIcon className="text-white" />
                              </AvatarFallback>
                            </Avatar>
                            <h2
                              className={`${
                                scrollPassedLimit || isblack ? "text-black" : ""
                              }`}
                            >
                              {User?.Username && <p>{User.Username}</p>}
                            </h2>
                            <LogOut
                              onClick={logout}
                              className={`w-5 h-5 cursor-pointer ${
                                scrollPassedLimit || isblack
                                  ? "text-black"
                                  : "text-black"
                              }`}
                            />
                          </Link>
                        </div>
                      ) : (
                        <Link
                          key={index}
                          to={nav.to}
                          className={`hover:bg-LogoYellow hover:text-white transition-colors ${
                            scrollPassedLimit || isblack ? "text-black" : ""
                          }`}
                        >
                          {nav.name}
                        </Link>
                      )}
                    </>
                  ))}
                </>
              )}
            </>
          )}
        </ul>

        <div
          className={` ${
            scrollPassedLimit ? "rounded-b-md" : "mt-5 rounded-full"
          } hidden md:flex gap-x-3 relative  `}
        >
          {checkPage() && !User && (
            <Link
              className={`${
                scrollPassedLimit ? "rounded-b-md " : " rounded-full "
              }  px-4 flex items-center hover:bg-LogoYellow hover:text-white transition-all shadow-md bg-white  text-base font-semibold `}
              to="/Registro"
            >
              Registrate
            </Link>
          )}
          <MenuIcon
            onMouseEnter={()=>setMenuDesktopToggle(true)}
            onClick={() => setMenuDesktopToggle(!MenuDesktopToggle)}
            className={`${
              scrollPassedLimit
                ? "rounded-b-md z-50 bg-white shadow-md text-black"
                : " rounded-full text-white  "
            }  cursor-pointer p-1 `}
            size={40}
          />
          <AnimatePresence onExitComplete={true}>
            {MenuDesktopToggle && (
              <motion.div
                initial={{
                  opacity: 0,
                  translateX: 100,
                }}
                animate={{
                  opacity: 1,
                  translateX: 0,
                }}
                exit={{
                  opacity: 0,
                  translateX: 100,
                }}
                onMouseLeave={()=> setMenuDesktopToggle(false)}
                className={`absolute bg-white right-0 flex-col top-0 rounded-l-2xl shadow-2xl w-[200px] h-fit`}
              >
                <div className="w-full flex justify-end px-3">
                  <MenuIcon
                    onClick={() => setMenuDesktopToggle(!MenuDesktopToggle)}
                    className={`${
                      scrollPassedLimit
                        ? "rounded-b-md bg-white shadow-md "
                        : " rounded-full text-LogoBlue  "
                    }  cursor-pointer p-1 `}
                    size={40}
                  />
                </div>
                <div className="px-[5%] h-fit flex justify-center  gap-y-2 flex-col items-center">
                  <Link
                    to="/"
                    className={`w-full py-2 font-semibold hover:bg-LogoYellow hover:text-white transition-all flex justify-center items-center rounded-lg `}
                  >
                    Inicio
                  </Link>
                  {User && (
                    <Link
                      to={'/Contabilidad'}
                      className={` w-full py-2 font-semibold hover:bg-LogoYellow hover:text-white transition-all flex justify-center items-center rounded-lg `}
                    >
                      EasySAT
                    </Link>
                  )}

                  {User && (
                    <Link
                      to="/Cursos"
                      className={` w-full py-2 font-semibold hover:bg-LogoYellow hover:text-white transition-all flex justify-center items-center rounded-lg `}
                    >
                      Cursos
                    </Link>
                  )}

                  <Link
                    to="/#contacto"
                    className={`${
                      location.pathname === "#contacto"
                        ? "bg-orange-500  text-white"
                        : "text-black"
                    } w-full py-2 font-semibold hover:bg-LogoYellow hover:text-white transition-all flex justify-center items-center rounded-lg `}
                  >
                    Contacto
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ChatBot scrollPassedLimit={scrollPassedLimit} />

        <div className={`w-full md:hidden p-2`}>
          <Menu
            size={50}
            onClick={handleMenuToggle}
            className={`flex mr-auto  cursor-pointer md:hidden p-2 rounded-md transition-all
            ${
              scrollPassedLimit || isblack
                ? "bg-white text-LogoBlue"
                : "text-white"
            } 
            `}
          />
        </div>
        {/* MENU MOBILE */}
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
                className={`flex mr-auto ${
                  toggleMenu ? "text-LogoBlue" : "text-white"
                } cursor-pointer md:hidden -translate-x-2 mb-5
                
                `}
              />
              <ul className="flex flex-col justify-center space-y-3 gap-x-5 text-black font-semibold text-lg">
                {!User && (
                  <>
                    {NavOptionsSinLog.map((nav) => (
                      <Link
                        to={nav.to}
                        className={` flex justify-center ${
                          location?.pathname === "/"
                            ? "bg-orange-500 text-white"
                            : ""
                        } transition-colors  p-2 rounded-md `}
                      >
                        {nav.name}
                      </Link>
                    ))}
                  </>
                )}
                {User && (
                  <>
                    {IsAdmin ? (
                      <>
                        {NavOptionsLog.map((nav, index) => (
                          <>
                            {nav.name === "Perfil" ? (
                              <>
                                <div className="flex py-1 cursor-pointer  transition-all items-center justify-between md:justify-start md:space-x-3">
                                  <Link
                                    key={index}
                                    to="/Perfil"
                                    className="w-full flex space-x-3 items-center"
                                  >
                                    <Avatar>
                                      <AvatarImage src={User.Img_url} />
                                      <AvatarFallback className="bg-black">
                                        <UserIcon className="text-white" />
                                      </AvatarFallback>
                                    </Avatar>
                                    {User.Username && <p>{User.Username}</p>}
                                  </Link>
                                  <LogOut
                                    onClick={logout}
                                    className="w-5 h-5 cursor-pointer"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <Link
                                  key={index}
                                  to={nav.to}
                                  className={` flex justify-center ${
                                    location?.pathname === "/"
                                      ? "bg-orange-500 text-white"
                                      : ""
                                  } transition-colors  p-2 rounded-md `}
                                >
                                  {nav.name}
                                </Link>
                              </>
                            )}
                          </>
                        ))}
                      </>
                    ) : (
                      <>
                        {NavOptionsLogNoAdmin.map((nav, index) => (
                          <>
                            {nav.name === "Perfil" ? (
                              <>
                                <div className="flex py-1 cursor-pointer  transition-all items-center justify-between md:justify-start md:space-x-3">
                                  <Link
                                    key={index}
                                    to="/Perfil"
                                    className="w-full flex space-x-3 items-center"
                                  >
                                    <Avatar>
                                      <AvatarImage src={User.Img_url} />
                                      <AvatarFallback className="bg-black">
                                        <UserIcon className="text-white" />
                                      </AvatarFallback>
                                    </Avatar>
                                    {User.Username && <p>{User.Username}</p>}
                                  </Link>
                                  <LogOut
                                    onClick={logout}
                                    className="w-5 h-5 cursor-pointer"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <Link
                                  key={index}
                                  to={nav.to}
                                  className={` flex justify-center ${
                                    location?.pathname === "/"
                                      ? "bg-orange-500 text-white"
                                      : ""
                                  } transition-colors  p-2 rounded-md `}
                                >
                                  {nav.name}
                                </Link>
                              </>
                            )}
                          </>
                        ))}
                      </>
                    )}
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
