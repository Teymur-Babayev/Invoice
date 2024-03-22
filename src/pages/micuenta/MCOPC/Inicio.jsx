import React, { useEffect, useState } from 'react'
import ChartComponent from '../../../components/graficas/ChartComponent'
import { meses, ordenarPorMes } from '../../../assets/adminData'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { ChevronDown } from 'lucide-react'
import { obtenerGastosVentasPorFecha } from '../../../utils/funcs'
import './index.css';

const Inicio = () => {
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const anoActual = fechaActual.getFullYear();

  const ContaEstFin = [
    {
      gastos: 5000,
      ventas: 15000.50,
      year: "2024",
      month: "Enero",
      fecha: new Date("2024-01-03")
    },
    {
      gastos: 2000,
      ventas: 13000,
      year: "2024",
      month: "Enero",
      fecha: new Date("2024-01-12")
    },
    {
      gastos: 3000.75,
      ventas: 18000,
      year: "2024",
      month: "Enero",
      fecha: new Date("2024-01-15")
    },
    {
      gastos: 13000,
      ventas: 20000,
      year: "2024",
      month: "Febrero",
      fecha: new Date("2024-02-10")
    },
  ]

  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const [Year, setYear] = useState(anoActual)
  const [MesFiltro, setMesFiltro] = useState(`${nombresMeses[mesActual]} ${Year}`)
  const [Mes, setMes] = useState("Febrero")
  const [IngresosMes, setIngresosMes] = useState(null)
  const [GastosMes, setGastosMes] = useState(null)

  const dataNueva = ContaEstFin?.map((data) => {
    return {
      ...data,
      name: data.month,
    };
  });
  const dataOrdenada = ordenarPorMes(dataNueva);

  useEffect(() => {
    const data = obtenerGastosVentasPorFecha(dataOrdenada, MesFiltro)
    setGastosMes(data.gastos)
    setIngresosMes(data.ventas)
  }, [MesFiltro])

  const resumen = dataOrdenada.reduce((acumulador, transaccion) => {
    acumulador.gastos += transaccion.gastos;
    acumulador.ventas += transaccion.ventas;
    return acumulador;
  }, { gastos: 0, ventas: 0 });

  // Formatea los resultados
  const totalGastosFormateado = GastosMes?.toLocaleString('es-MX', { minimumFractionDigits: 2, useGrouping: true });
  const totalVentasFormateado = IngresosMes?.toLocaleString('es-MX', { minimumFractionDigits: 2, useGrouping: true });


  const handleSelectChange = (selectedOption) => {
    // Cuando cambia la selección, actualiza el estado y muestra la selección por consola
    setMesFiltro(selectedOption.value);
    console.log("Opción seleccionada:", selectedOption.value);
  };

  return (
    <div className='w-full flex flex-col pr-[3%] justify-center items-center h-full rounded-md'>
      <div className='w-[100%] overflow-hidden py-2 rounded-md'>
        <div className='w-[70%] h-full flex justify-center gap-x-3 rounded-md'>
          <div className='w-1/3 border-2 border-gray-300 group hover:bg-esatDark hoverValue transition-all cursor-pointer bg-white shadow-lg px-[2%] py-3 flex flex-col justify-center items-center rounded-md'>
            <h2 className='font-semibold group-hover:text-white text-center text-[18px]'>Total a pagar del mes</h2>

            <span className='flex group-hover:text-white items-center gap-x-1 mt-2'> <span className='font-light'>IVA</span><p className='text-esatDark group-hover:text-white font-semibold text-xl'>$850.00</p></span>
            <span className='flex group-hover:text-white items-center gap-x-1'> <span className='font-light'>ISR</span><p className='text-esatDark group-hover:text-white font-semibold text-xl'>$250.00</p></span>

          </div>
          <div className='w-1/3 border-2 border-gray-300 group hover:bg-esatDark hoverValue transition-all cursor-pointer bg-white shadow-lg px-[1%] py-3 flex flex-col justify-center items-center rounded-md'>
            <h2 className='font-semibold w-full group-hover:text-white text-center text-[14px]'>Vista previa declaracion anual</h2>
            <h2 className='font-light group-hover:text-white text-center text-[14px]'>ISR por pagar o a favor</h2>

            <h5 className='font-bold text-esatDark group-hover:text-white text-[35px]'>
              ${totalVentasFormateado}
            </h5>
          </div>
          <div className='w-1/3 border-2 border-gray-300 group hover:bg-esatDark  hoverValue transition-all cursor-pointer bg-white shadow-lg px-[1%] py-3 flex flex-col justify-center items-center rounded-md'>
            <h2 className='font-semibold w-full group-hover:text-white text-center text-[14px]'>Utilidad o perdida acumulada</h2>

            <h5 className='font-bold group-hover:text-white text-esatDark text-[35px]'>
              $1,500.00
            </h5>
          </div>
        </div>
      </div>
      <div className='w-[100%] gap-x-3 flex h-[69%]  shadow-lg rounded-md'>
        <div className='w-[70%] bg-white rounded-md shadow-lg'>
          <ChartComponent mes={Mes} Year={Year} setYear={setYear} data={dataOrdenada} />
        </div>
        <div className='w-[30%] flex-col gap-y-3 h-[25%] flex justify-around items-center'>
          <div className='w-full flex justify-end'>
            <Select
              key={1}
              className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
              onValueChange={(e) => { setMesFiltro(e) }}
              value={MesFiltro}
            >
              <SelectTrigger className="w-fit border-2 border-gray-300 ring-0 focus:ring-0 px-3">
                <SelectValue placeholder="Selecciona una Fecha" />
              </SelectTrigger>
              <SelectContent className="h-[40dvh] px-0">
                {nombresMeses.map((mes) => (
                  <SelectItem
                    key={mes}
                    value={`${mes} ${Year}`}
                  >
                    {mes} {Year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='w-full h-full bg-white shadow-lg px-[5%] py-3 rounded-md'>
            <h2 className='font-semibold text-[18px]'>Ingresos</h2>
            <h5 className='font-bold text-LogoBlue/90 text-[35px]'>
              ${totalVentasFormateado}
            </h5>
            <p className='font-semibold text-black/60'></p>
          </div>

          <div className='w-full h-full bg-white shadow-lg px-[5%] py-3 rounded-md'>
            <h2 className='font-semibold text-[18px]'>Gastos</h2>
            <h5 className='font-bold text-LogoGreen/90 text-[35px]'>
              ${totalGastosFormateado}
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inicio