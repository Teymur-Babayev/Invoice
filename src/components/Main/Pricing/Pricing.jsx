import React from "react";
import { motion } from "framer-motion";
import { services } from "../../../assets/services";
import { useNavigate } from "react-router-dom";
import { CheckIcon } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import SubscriptionButton from "../../SubscriptionButton";

export const Pricing = () => {
  const { User } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden h-full pt-5 lg:pt-10 bg-white">
      <div className="md:px-[10%] lg:px-[20%] lg:pb-5 md:pt-16">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-6xl text-black font-bold uppercase text-center">
            descubre
          </h2>
          <h4 className="text-3xl md:text-6xl text-black font-bold text-center uppercase">
            nuestros paquetes
          </h4>
          <h4 className="text-black text-base md:text-xl text-center font-bold pb-3">
            Diseñados para adaptarse a tus necesidades específicas y <br />
            garantizar su cumplimiento.
          </h4>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-5 h-full w-full">
        {services.map((servicio, index) => (
          <div
            key={index}
            className={`w-full mb-[5%] ${
              index !== 0 ? "mt-[2%]" : "mt-[7%]"
            } flex flex-col  ${
              index == 1 || index == 3
                ? "bg-LogoBlueDark md:flex-row-reverse "
                : "bg-LogoBlue md:flex-row"
            } px-[5%] py-[5%] md:py-0 gap-y-6 lg:px-[15%] h-full md:h-[40vh] `}
          >
            <div className="md:w-1/2 flex justify-center items-center">
              <ul key={index} className="text-white font-bold space-y-2">
                {servicio.contents.map((cont, index) => (
                  <motion.li
                    initial={{ opacity: 0, x: 200 }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.3 },
                    }}
                    key={index}
                    className="flex font-semibold items-center"
                  >
                    <CheckIcon className="mr-2 w-[20%] text-LogoGreen" />{" "}
                    <span className="w-[80%] lg:text-xl">{cont.title}.</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{
                  opacity: 1,
                  scale: 1.25,
                  transition: { delay: 0.2 },
                }}
                className={`w-full md:w-[55%] md:scale-125 h-fit md:h-full rounded-md p-[2pt] bg-gradient-to-r from-LogoGreen ${
                  index == 1 || index == 3 ? "" : ""
                } ${
                  index == 1 || index == 3
                    ? "via-LogoBlue to-LogoBlueDark"
                    : "via-LogoBlueDark to-LogoBlue"
                }`}
              >
                <div className="bg-white rounded-md p-4 gap-4 md:p-2 md:gap-2 flex flex-col items-center justify-center w-full h-full">
                  <h2 className="text-center text-base  pt-5 md:pt-2 text-black font-bold">
                    {servicio.title}
                    {index == 3 && (
                      <h3 className="text-center text-base pt-2 text-black/50 font-semibold">
                        {servicio.description}
                      </h3>
                    )}
                  </h2>

                  <div className="w-full flex items-center justify-center h-[50%] ">
                    <h4 className="text-center text-4xl  text-DgyaBase font-bold">
                      {servicio.precio == 0 ? (
                        <>
                          <span>Gratis</span>
                        </>
                      ) : (
                        <>
                          <span className="w-[80%]">${servicio.precio}</span>
                          <span className="w-[20%] text-2xl text-black font-semibold my-auto">
                            /mes
                          </span>
                        </>
                      )}
                    </h4>
                  </div>

                  <div className="flex justify-center">
                    {!User ? (
                      <button
                        disabled={
                          User?.UserPlan == servicio?.Plan ? true : false
                        }
                        className={`bg-gradient-to-r px-6 mx-auto cursor-pointer from-LogoGreen via-LogoBlueDark to-LogoBlue text-white font-bold py-1 rounded-md`}
                        onClick={async () => {
                          navigate("/Login");
                        }}
                      >
                        Obtener Plan
                      </button>
                    ) : (
                      <>
                        {User?.UserPlan !== "Gratis" ? (
                          <>
                            {
                              User?.UserPlan === servicio.Plan ? (
                                <span className="w-full bg-gradient-to-r font-semibold text-white px-6 py-[2%] rounded-md from-LogoGreen via-LogoBlueDark to-LogoBlue">
                                  Plan Actual
                                </span>
                              ) : (
                                <>
                                  <span className="w-full bg-gradient-to-r font-semibold text-white px-6 py-[2%] rounded-md from-LogoGreen via-LogoBlueDark to-LogoBlue">
                                    Ya posees plan
                                  </span>
                                </>
                              )
                            }
                          </>
                        ) : (
                          <>
                            {servicio.precio != 0 && (
                              <SubscriptionButton
                                price={servicio.precio}
                                plan={servicio.Plan}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
