import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import wavesblack from "../../../assets/waves-black.webp";
import blogs from "../../../assets/blogsImage.jpeg";
import corte1 from "../../../assets/video/corte1.mp4";
import { Volume2, VolumeX } from "lucide-react";

export const CursosBlogs = () => {
  const [muted, setmuted] = useState(true)
  
  return (
    <div className="w-full overflow-hidden bg-white  md:h-full  flex flex-col">
      <div
        className="w-full h-full  flex flex-col px-[5%] md:px-[10%] lg:px-[20%] bg-[length:100%_100%] bg-no-repeat bg-center "
        style={{ backgroundImage: `url(${wavesblack})` }}
      >
        <div className="pt-[30%] md:pt-44 lg:pt-20">
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            Cursos y Blogs
          </h2>
          <h4 className="text-white mt-5 text-base md:text-xl text-center font-semibold">
            En DGyA, creemos en el poder del conocimiento. Por eso, te ofrecemos
            cursos y blogs que te mantendrán al tanto de las últimas tendencias
            y cambios en el mundo de la contabilidad y los impuestos
          </h4>
        </div>
        <motion.div
          key={`CURSOS`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col p-4 md:p-0 lg:flex-row mt-7 md:mt-16 justify-between gap-8"
        >
          <div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full relative shadow-2xl lg:w-1/2 "
          >
            <video className="w-full relative scale-110 h-full rounded-md" autoPlay muted={muted}  loop>
              <source src={corte1} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
              
            </video>
            {
              muted ? (<VolumeX onClick={()=>setmuted(!muted)} className="absolute text-white bottom-0 left-0 cursor-pointer" size={30}/>) : (<Volume2 onClick={()=>setmuted(!muted)} className="absolute text-white bottom-0 left-0 cursor-pointer" size={30}/>)
            }
            
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl text-center font-bold leading-9 text-white pb-4">
              Cursos en Línea
            </h1>
            <p className="font-normal text-base text-center leading-6 text-white ">
              Accede a cursos interactivos y actualizados que te permitirán
              profundizar tus conocimientos en contabilidad, impuestos y
              finanzas.
            </p>
            <p className="font-normal text-xl text-center leading-6 text-white ">
              Totalmente gratis para nuestros afiliados
            </p>
            <Link
              to="/cursos"
              className="w-1/2 flex justify-center bg-white mx-auto hover:bg-black hover:text-white transition-all text-black font-bold mt-7 py-2 rounded-md"
            >
              Ve a Cursos
            </Link>
          </div>
        </motion.div>
        <motion.div
          key={`BLOGS`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col mb-[30%] md:mb-44 lg:mb-20 p-4 md:p-0 lg:flex-row-reverse mt-7 md:mt-16 justify-between gap-8"
        >
          <div className="w-full shadow-2xl lg:w-1/2 ">
            <img
              className="w-full h-full rounded-md "
              src={blogs}
              alt="A group of People"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl text-center font-bold leading-9 text-white pb-4">
              Blogs informativos
            </h1>
            <p className="font-normal text-base text-center leading-6 text-white ">
              Accede a blogs interactivos y actualizados que te permitirán
              profundizar tus conocimientos en contabilidad, impuestos y
              finanzas.
            </p>
            <Link
              to="/blogs"
              className="w-1/2 flex justify-center bg-white mx-auto hover:bg-black hover:text-white transition-all text-black font-bold mt-7 py-2 rounded-md"
            >
              Ve a Blogs
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
