import React from 'react'
import { OpinionesClientes } from '../../../assets/adminData'
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { User2 } from 'lucide-react';

export const Opiniones = () => {
  return (
    <div className="w-full bg-white h-fit">
        <div className="px-[3%] md:px-[5%] lg:px-[10%] flex w-full h-fit  flex-col  py-5 md:pt-5">
          <div className="w-full space-y-3 md:p-4">
            <h2 className="text-black text-3xl md:text-4xl font-bold text-center">
              Lo que opinan
            </h2>
            <h4 className="text-black text-3xl md:text-4xl font-bold text-center">
              otros clientes de nosotros
            </h4>
          </div>
          <div className="mt-10 grid p-3 gap-10 grid-cols-1 md:grid-cols-3">
            {OpinionesClientes.map((opi, index) => (
              <div key={index} className="bg-white p-3 shadow-xl">
                <div className="flex mb-2 ">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center -translate-x-[50%] -translate-y-[25%]">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={opi?.imgUrl} />
                      <AvatarFallback className="bg-black">
                        <User2 className="text-white bg-black p-2 w-14 h-14" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h2 className="font-bold -translate-x-[10%] text-xl">
                      {opi.nombre}
                    </h2>
                    <h4 className="font-semibold -translate-x-[10%] text-lg">
                      {opi.cargo}
                    </h4>
                  </div>
                </div>

                <p className="mb-5 mt-auto">{opi.msg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
