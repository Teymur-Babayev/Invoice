import React, { useEffect } from "react";

export const ChatBot = () => {
  useEffect(() => {
    // Verificar si Crisp ya ha sido cargado
    if (window.$crisp) return;

    // Inicializar las variables de Crisp
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "52efb7e5-c367-4d50-a485-af46d00961f4";

    // Crear y agregar el script de Crisp al head del documento
    const s = document.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    document.getElementsByTagName("head")[0].appendChild(s);
  }, []);
  return null;
};
