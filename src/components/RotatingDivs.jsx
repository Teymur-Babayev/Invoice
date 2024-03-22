import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroes1 from "../assets/heroes1.jpeg";
import heroes2 from "../assets/heroes2.jpeg";
import heroes3 from "../assets/heroes3.jpeg";

export default function App() {
  const [width, setWidth] = useState(0);
  const divRef = useRef(null);

  const [activeDiv, setActiveDiv] = useState(1); // comienza con el primer div

  const updateWidth = () => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const containerStyle = {
    width: `${width * 4}px`,
  };

  const childStyle = {
    width: `${width}px`,
  };

  return (
    <div ref={divRef} className="w-full md:mt-2  lg:mt-0  h-full ">
      <div className="flex h-full" style={containerStyle}>
        <AnimatePresence mode="wait">
          {activeDiv == 1 && (
            <motion.div
              key="circleDiv"
              initial={{ opacity: 0, x: -300}}
              animate={{ opacity: 1, x: 0}}
              exit={{ opacity: 0, x: 300}}
              transition={{ duration: 2 }} // Ajuste de la duración
              onAnimationComplete={() => {
                setTimeout(() => {
                  setActiveDiv(2);
                }, 7000);
              }}
              className="h-full flex justify-evenly items-end pb-10"
              style={childStyle}
            >
              <div className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 flex justify-center items-center ">
                <img className="bg-center bg-contain h-full w-full rounded-full" src={heroes1} alt="" />
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 flex justify-center items-center ">
                <img className="bg-center bg-contain h-full w-full rounded-full" src={heroes2} alt="" />
              </div><div className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 flex justify-center items-center ">
                <img className="bg-center bg-contain h-full w-full rounded-full" src={heroes3} alt="" />
              </div>
            </motion.div>
          )}

          {activeDiv == 2 && (
            <motion.div
              key="missionDiv"
              initial={{ opacity: 0, y: -300}}
              animate={{ opacity: 1, y: 0}}
              exit={{ opacity: 0, y: 300}}
              transition={{ duration: 2 }} // Ajuste de la duración
              onAnimationComplete={() => {
                setTimeout(() => {
                  setActiveDiv(3);
                }, 7000);
              }}
              className="h-full  w-full rounded-md"
              style={childStyle}
            >
              <div className="flex flex-col  rounded-md p-2 lg:p-4 justify-center md:-translate-y-[5%] bg-white items-center">
                <h2 className="font-bold text-4xl">Misión</h2>
                <p className="text-center mt-4 md:text-xs lg:text-sm">
                  Conscientes de la complejidad de la legislación fiscal
                  mexicana y de la gran cantidad de obligaciones que las
                  autoridades requieren a los contribuyentes nuestra misión como
                  Easy SAT Contabilidad en línea es ayudar a las empresas que
                  desean cumplir con sus obligaciones fiscales de manera
                  correcta y oportuna, tomando en cuenta también los beneficios
                  que las mismas leyes ofrecen a los contribuyentes, del tal
                  manera que nuestros clientes se sientan seguros de que su
                  situación fiscal se encuentra dentro del marco legal.
                </p>
              </div>
            </motion.div>
          )}

          {activeDiv == 3 && (
            <motion.div
              key="visionDiv"
              initial={{ opacity: 0, y: -300}}
              animate={{ opacity: 1, y: 0}}
              exit={{ opacity: 0, y: 300}}
              transition={{ duration: 2 }} // Ajuste de la duración
              onAnimationComplete={() => {
                setTimeout(() => {
                  setActiveDiv(4);
                }, 7000);
              }}
              className="h-full  w-full rounded-md"
              style={childStyle}
            >
              <div className="flex flex-col justify-center w-full rounded-md p-4 bg-white items-center">
                <h2 className="font-bold text-4xl">Visión</h2>
                <p className="text-center mt-4 text-sm">
                  Consolidarnos como un servicio de contabilidad en línea de
                  reconocido prestigio en base al cumplimiento siempre oportuno
                  de todos nuestros compromisos desarrollados con
                  profesionalismo, ética y diligencia.
                </p>
              </div>
            </motion.div>
          )}

          {activeDiv == 4 && (
            <motion.div
              key="valuesDiv"
              initial={{ opacity: 0, x: 300}}
              animate={{ opacity: 1, x: 0}}
              exit={{ opacity: 0, x: -300}}
              transition={{ duration: 2 }} // Ajuste de la duración
              onAnimationComplete={() => {
                setTimeout(() => {
                  setActiveDiv(1);
                }, 7000);
              }}
              className="h-full w-full rounded-md"
              style={childStyle}
            >
              <div className="flex flex-col  justify-center w-full rounded-md p-4 bg-white items-center">
                <h2 className="font-bold text-4xl">Valores</h2>
                <ul className="w-full flex flex-col justify-start px-[5%]">
                  <li>- Ética profesional.</li>
                  <li>- Compromiso.</li>
                  <li>- Lealtad.</li>
                  <li>- Honestidad.</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
