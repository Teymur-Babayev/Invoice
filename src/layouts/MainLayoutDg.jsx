import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import { NavbarDg } from "../components/NavbarDg";
import logo from "../assets/logoNuevo.png";
import { useLocation } from "react-router-dom";
import { XCircle } from "lucide-react";
import './index.css';
export const MainLayoutDg = ({ children, isblack }) => {
  const { User } = useAuth();
  const [ChatBot, setChatBot] = useState(false);

  const { pathname } = useLocation();

  const handleToggle = () => {
    localStorage.setItem("chatbotDismissed", "true");
    setChatBot(false);
  }

  useEffect(() => {
    // If chatbotDismissed is not in localStorage, default to showing the chatbot
    const chatBotBool = localStorage.getItem('chatbotDismissed') !== "true";
    setChatBot(chatBotBool);
  }, []);


  return (
    <div className="flex flex-col bg-slate-100 w-full min-h-screen" id="contend-perfil-style">
      <Navbar/>
      {/* <NavbarDg isblack={isblack} /> */}
      <div className="w-full">{children}</div>

      {pathname == "/" && (
        <div className="fixed  left-[3%] bottom-[3%] bg-slate-700 rounded-full w-20 h-20 md:w-32 md:h-32" >
          <div></div>
        </div>
      )}

      <div className="fixed z-50 flex-col md:flex-row right-[2%] bottom-[3%] rounded-full flex justify-center items-end md:items-center">
        {ChatBot ? (
          <div className="flex w-[98%] md:w-[400px] shadow-2xl mb-7 md:mb-0 rounded-md bg-LogoBlue h-14 p-4 justify-center items-center">
            <XCircle
              onClick={handleToggle}
              className="absolute -left-[3%] -top-[2%] cursor-pointer text-LogoBlue hover:text-LogoGreen transition-colors"
            />
            <h3 className="text-white text-sm">
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
      <Toaster />
    </div>
  );
};
