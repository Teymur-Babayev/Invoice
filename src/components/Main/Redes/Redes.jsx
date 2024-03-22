import React from 'react'
import facebookLogo from "../../../assets/icons/Icono-Facebbok.svg";
import instagramLogo from "../../../assets/icons/Icono-Instagram.svg";
import tiktokLogo from "../../../assets/icons/Icono-TikTok.svg";
import youtubeLogo from "../../../assets/icons/Icono-YouTube.svg";

export const Redes = () => {
  return (
    <div className="w-full h-[30vh] md:h-[35vh] relative">
      <div className="absolute inset-0 bg-white">
        <div className="md:px-[20%] py-5 md:pt-5">
          <div className="space-y-3 p-4">
            <h2 className="text-esatDark text-4xl md:text-5xl text-center">
            Síguenos en nuestras
            </h2>
            <h4 className="text-esatDark text-4xl md:text-5xl text-center">
            redes sociales
            </h4>

            <div className="flex justify-center space-x-10 pt-7">
              <a
                href="https://www.facebook.com/profile.php?id=61550941282416&mibextid=ZbWKwL"
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="w-14 h-14 bg-center bg-cover"
                style={{ backgroundImage: `url(${facebookLogo})` }}
              ></a>
              <a
                href="https://www.instagram.com/easysat.mx/"
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="w-14 h-14 bg-center bg-cover"
                style={{ backgroundImage: `url(${instagramLogo})` }}
              ></a>

              <a
                href="https://www.tiktok.com/@easy.sat"
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="w-14 h-14 bg-center bg-cover"
                style={{ backgroundImage: `url(${tiktokLogo})` }}
              ></a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="w-14 h-14 bg-center bg-cover"
                style={{ backgroundImage: `url(${youtubeLogo})` }}
              ></a>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
