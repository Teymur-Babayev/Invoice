import React from 'react'
import logoBuho from "../../../assets/logo-buho-white.webp";
import { PreguntasFrecuentesData } from '../../../assets/adminData';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../../components/ui/accordion";

export const Preguntas = ({preguntasRef}) => {
  return (
    <div id='preguntas'  className="w-full scroll-m-72 bg-white h-fit">
        <div className="px-[3%] md:px-[5%] lg:px-[10%] flex w-full h-fit  flex-col  py-5 md:pt-5">
        <h2 className="text-3xl font-semibold mx-auto my-3  text-esatDark">Preguntas Frecuentes</h2>
          <div className="md:w-[70%] mx-auto my-auto flex items-center justify-center h-full">
            <Accordion ref={preguntasRef} type="single" collapsible className="w-full">
              {PreguntasFrecuentesData.map((preg, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger >{preg.pregunta}</AccordionTrigger>
                  <AccordionContent >
                    {typeof preg.respuesta == "object" ? (
                      <ul  >
                        {preg.respuesta.map((resp) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    ) : (
                      <>{preg.respuesta}</>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
  )
}
