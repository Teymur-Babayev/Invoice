import React from "react";
import RotatingDivs from "../../../components/RotatingDivs";
import logo from "../../../assets/logocolor.webp";

export const Heroes = () => {
  return (
    <section
      className="flex items-center bg-gradient-to-t from-esatLight via-white/50 to-white justify-center h-fit md:h-screen overflow-hidden bg-center bg-contain md:bg-cover"
      
    >
      <div className="w-full p-[5%] mt-[12%] md:mt-0 h-full flex flex-col md:flex-row ">
        <div className="lg:w-1/2 md:w-[60%] h-full flex items-center justify-center">
          <img src={logo} alt="" />
        </div>
        <div className="lg:w-1/2 md:w-[40%]  flex flex-col gap-10 md:gap-7 "
        >
          <h2
            className="md:mt-[20%] lg:mt-[15%] text-center mt-10 text-2xl md:text-3xl lg:text-4xl font-bold uppercase"
            style={{ WebkitTextStroke: "1px white" }}
          >
            contabilidad para personas fisÍcas y morales.
          </h2>
          <h4 className="text-center  lg:mt-[5%] md:text-2xl text-xl  font-bold uppercase">
            llevar una contabilidad financiera adecuada es fundamental para el{" "}
            <br />
            éxito y sostenibilidad de una empresa
          </h4>
          <RotatingDivs />
        </div>
      </div>
    </section>
  );
};
