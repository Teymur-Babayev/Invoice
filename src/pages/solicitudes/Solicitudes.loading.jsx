import React from 'react'
import { Skeleton } from '../../components/ui/skeleton'
import { Separador } from '../../components/Separador'
import { MainLayoutDg } from '../../layouts/MainLayoutDg'
import fondo from "../../assets/fondo.webp";

export const SLoading = () => {
  return (
    <MainLayoutDg isblack={true}>
      <div className={`bg-fixed bg-cover h-fit md:h-full`}
      style={{ backgroundImage: `url(${fondo})` }}
      >
        <div className="max-w-6xl mx-auto">
        <div className={` px-[3%]  md:px-0 pt-[8.4%]`}>
          <div className={` min-h-screen px-[3%] lg:px-0 md:mt-5`}>
            <h1 className="text-3xl text-white font-bold mb-4 md:mb-5">
              Solicitudes Activas
            </h1>
            <div className="grid grid-flow-col gap-1 py-4 overflow-x-auto">
              <Skeleton className={'w-[200px] h-[120px] rounded-md shadow-md bg-white'} />
              <Skeleton className={'w-[200px] h-[120px] rounded-md shadow-md bg-white'} />
              <Skeleton className={'w-[200px] h-[120px] rounded-md shadow-md bg-white'} />
            </div>
            <Separador/>
            <h1 className="text-3xl text-white font-bold mb-4 md:mb-5">
              Solicitudes En Proceso
            </h1>
            <div className="grid grid-flow-col gap-1 py-4 overflow-x-auto">
              <Skeleton className={'w-[200px] h-[120px] rounded-md shadow-md bg-white'} />
              <Skeleton className={'w-[200px] h-[120px] rounded-md shadow-md bg-white'} />
            </div>
            <Separador />

            <h1 className="text-3xl text-white font-bold mb-4 md:mb-5">
              Solicitudes Finalizadas
            </h1>
            <div className="grid grid-flow-col gap-1 py-4 overflow-x-auto">
              <Skeleton className={'w-[200px] h-[120px] rounded-md shadow-md bg-white'} />
            </div>
          </div>
        </div>
      </div>
      </div>
  </MainLayoutDg>
  )
}
