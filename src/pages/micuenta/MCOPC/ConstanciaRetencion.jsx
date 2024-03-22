import { Plus, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '../../../components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import EditarSVG from "../../../assets/Editar.svg";
import EliminarSVG from "../../../assets/Eliminar.svg";

const HeadersConstancias = [
  'Periodo',
  'Proveedor',
  'RFC',
  'Monto de Operación',
  'Retención de IVA',
  'Retención de ISR',
  'Ejercicio'
]

const meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

const dataFake = [
  {},
  {},
  {},
  {},
  {},
  {},
]

const ConstanciaRetencion = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [Pagi, setPagi] = useState(1)
  const pageSize = 6;
  const [page, setPage] = useState(1);
  const [MesFiltro, setMesFiltro] = useState('Enero')
  const [MontoOpe, setMontoOpe] = useState(0);
  const [retenIva, setretenIva] = useState(0);
  const [retenIsr, setretenIsr] = useState(0);


  const totalPages = Math.ceil(10 / pageSize);

  const nextPage = () => {
    setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleChange = (event) => {
    // Extraer el valor actual del input
    let value = event.target.value;

    // Permitir números y punto decimal
    value = value.replace(/[^0-9.]/g, '');

    // Evitar múltiples puntos decimales
    const match = value.match(/\./g);
    if (match && match.length > 1) {
      value = value.replace(/\.+$/, "");
    }
    // Ajustar la posición del cursor después del formateo
    setTimeout(() => {
      event.target.selectionStart = selectionStart;
      event.target.selectionEnd = selectionStart;
    });

    // Formatear a moneda manteniendo la posición del cursor
    const selectionStart = event.target.selectionStart;
    const formattedValue = formatToCurrency(value);

    return formattedValue
  };


  const formatToCurrency = (amount) => {
    // Convertir el string a número para formatear correctamente
    const numberAmount = Number(amount) || 0;

    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2, // Asegúrate de incluir dos dígitos decimales
    }).format(numberAmount).replace('MX$', '').trim(); // Remover el símbolo de peso si es necesario
  };


  return (
    <div className='w-full flex flex-col pr-[10%] pt-2 justify-center items-center h-full rounded-md'>
      <div className='bg-white border-2 px-5 flex items-center justify-between border-gray-300 w-full py-5 rounded-lg'>

        <div className='flex items-center gap-x-3'>
          <h2 className='font-[12px] text-3xl'>Constancias de Retención</h2>

          <Dialog key={`agregarDialog`} className="flex items-center mt-1">
            <DialogTrigger asChild>
              <button className='w-fit border-2 border-gray-300 rounded-md px-3 py-1 flex items-center gap-x-2'>
                <div className='w-4 h-4 p-[1px] flex items-center justify-center rounded-full bg-black'>
                  <Plus className='text-white' />
                </div>
                <span>Agregar</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 pt-5 gap-2">
                  <div className='border-[2px] flex justify-around w-full py-1 px-4 border-gray-200 rounded-md'>
                    <div className='w-1/3 text-center'>Período</div>
                    <div className='w-1/3 text-center'>Proveedor</div>
                    <div className='w-1/3 text-center'>RFC</div>
                  </div>

                  <div className='w-full py-2 flex justify-around items-center'>
                    <div className='w-1/3 flex flex-col items-center justify-center'>
                      <Select
                        key={1}
                        className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                        onValueChange={(e) => { setMesFiltro(e) }}
                        value={MesFiltro}
                      >
                        <SelectTrigger className="w-[90%] border-2 border-gray-300 ring-0 focus:ring-0 px-3">
                          <SelectValue placeholder="Selecciona un Mes" />
                        </SelectTrigger>
                        <SelectContent className="h-[20dvh] px-0">
                          {meses.map((mes) => (
                            <SelectItem
                              key={mes}
                              value={`${mes}`}
                            >
                              {mes}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='w-1/3 flex justify-center'>
                      <input type="text" className='w-[90%] border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black' />
                    </div>

                    <div className='w-1/3 flex justify-center'>
                      <input type="text" className='w-[90%] border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black' />
                    </div>
                  </div>


                  <div className='border-[2px] flex justify-around w-full py-1 px-4 border-gray-200 rounded-md'>
                    <div className='w-1/2 text-center'>Monto de Operación</div>
                    <div className='w-1/2 text-center'>Retención de IVA</div>
                  </div>

                  <div className='w-full py-2 flex gap-x-3 px-2 justify-around items-center'>
                    <div className='w-1/2 flex justify-center'>
                      <input
                        type="text"
                        className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black'
                        value={MontoOpe}
                        onChange={(e) => {
                          setMontoOpe(handleChange(e))
                        }}
                      />
                    </div>
                    <div className='w-1/2 flex justify-center'>
                      <input
                        type="text"
                        className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black'
                        value={retenIva}
                        onChange={(e) => {
                          setretenIva(handleChange(e))
                        }}
                      />
                    </div>
                  </div>

                  <div className='border-[2px] flex justify-around w-full py-1 px-4 border-gray-200 rounded-md'>
                    <div className='w-1/2 text-center'>Retención de ISR</div>
                    <div className='w-1/2 text-center'>Ejercicio</div>
                  </div>

                  <div className='w-full py-2 flex gap-x-3 px-2 justify-around items-center'>
                    <div className='w-1/2 flex justify-center'>
                      <input
                        type="text"
                        className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black'
                        value={retenIsr}
                        onChange={(e) => {
                          setretenIsr(handleChange(e))
                        }}
                      />
                    </div>
                    <div className='w-1/2 flex justify-center'>
                      <input type="text" className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black' />
                    </div>
                  </div>

                </div>
              </div>
              <DialogFooter className="sm:justify-end mt-5">
                <DialogClose asChild>
                  <button className='px-4 py-1 rounded-md bg-transparent border-2 border-gray-400 hover:border-LogoBlue hover:bg-LogoBlue hover:text-white'>Guardar</button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className='w-[30%] flex px-3 items-center border-2 border-gray-400 rounded-lg'>
          <input
            //onChange={handleChange} 
            className='py-1 w-full ring-0 outline-none border-none text-[14px] placeholder:text-[14px]' type="text" placeholder='Buscar proveedor, RFC...' />

          <Search className='w-5 h-5 text-gray-400' />
        </div>
      </div>



      <div className='w-full bg-white border-2 border-gray-300 rounded-lg mt-5'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[12px] w-[250px] font-bold text-center">{HeadersConstancias[startIndex]}</TableHead>
              <TableHead className="text-[12px] w-[250px] font-bold text-center">{HeadersConstancias[startIndex + 1]}</TableHead>
              <TableHead className="text-[12px] w-[250px] font-bold text-center">{HeadersConstancias[startIndex + 2]}</TableHead>
              <TableHead className="text-[12px] w-[250px] font-bold text-center">{HeadersConstancias[startIndex + 3]}</TableHead>
              <TableHead className="text-[12px] w-[250px] font-bold text-center">{HeadersConstancias[startIndex + 4]}</TableHead>
              <TableHead className="text-[12px] w-[250px] font-bold text-center">{HeadersConstancias[startIndex + 5]}</TableHead>
              <TableHead className="text-[12px] w-[250px] font-bold text-center">{HeadersConstancias[startIndex + 6]}</TableHead>
              <TableHead className="w-[150px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {
              dataFake.map((data) => (
                <TableRow>
                  <TableHead className="text-[10px] w-[250px] text-center">Enero 2024</TableHead>
                  <TableHead className="text-[10px] w-[250px] text-center">Universidad</TableHead>
                  <TableHead className="text-[10px] w-[250px] text-center">GOB21239092</TableHead>
                  <TableHead className="text-[10px] w-[250px] text-center">19,200.00</TableHead>
                  <TableHead className="text-[10px] w-[250px] text-center">466.54</TableHead>
                  <TableHead className="text-[10px] w-[250px] text-center">200.60</TableHead>
                  <TableHead className="text-[10px] w-[250px] text-center">2023</TableHead>
                  <TableHead className="text-[10px] w-[90px] flex justify-around items-center text-center">
                    <Dialog key={`EditarDialog`} className="flex items-center mt-1">
                      <DialogTrigger asChild>
                        <img className='w-6 h-6 cursor-pointer' src={EditarSVG} />

                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <div className="flex items-center space-x-2">
                          <div className="grid flex-1 pt-5 gap-2">
                            <div className='border-[2px] flex justify-around w-full py-1 px-4 border-gray-200 rounded-md'>
                              <div className='w-1/3 text-center'>Período</div>
                              <div className='w-1/3 text-center'>Proveedor</div>
                              <div className='w-1/3 text-center'>RFC</div>
                            </div>

                            <div className='w-full py-2 flex justify-around items-center'>
                              <div className='w-1/3 flex flex-col items-center justify-center'>
                                <Select
                                  key={1}
                                  className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                                  onValueChange={(e) => { setMesFiltro(e) }}
                                  value={MesFiltro}
                                >
                                  <SelectTrigger className="w-[90%] border-2 border-gray-300 ring-0 focus:ring-0 px-3">
                                    <SelectValue placeholder="Selecciona un Mes" />
                                  </SelectTrigger>
                                  <SelectContent className="h-[20dvh] px-0">
                                    {meses.map((mes) => (
                                      <SelectItem
                                        key={mes}
                                        value={`${mes}`}
                                      >
                                        {mes}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className='w-1/3 flex justify-center'>
                                <input type="text" className='w-[90%] border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black' />
                              </div>

                              <div className='w-1/3 flex justify-center'>
                                <input type="text" className='w-[90%] border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black' />
                              </div>
                            </div>


                            <div className='border-[2px] flex justify-around w-full py-1 px-4 border-gray-200 rounded-md'>
                              <div className='w-1/2 text-center'>Monto de Operación</div>
                              <div className='w-1/2 text-center'>Retención de IVA</div>
                            </div>

                            <div className='w-full py-2 flex gap-x-3 px-2 justify-around items-center'>
                              <div className='w-1/2 flex justify-center'>
                                <input
                                  type="text"
                                  className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black'
                                  value={MontoOpe}
                                  onChange={(e) => {
                                    setMontoOpe(handleChange(e))
                                  }}
                                />
                              </div>
                              <div className='w-1/2 flex justify-center'>
                                <input
                                  type="text"
                                  className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black'
                                  value={retenIva}
                                  onChange={(e) => {
                                    setretenIva(handleChange(e))
                                  }}
                                />
                              </div>
                            </div>

                            <div className='border-[2px] flex justify-around w-full py-1 px-4 border-gray-200 rounded-md'>
                              <div className='w-1/2 text-center'>Retención de ISR</div>
                              <div className='w-1/2 text-center'>Ejercicio</div>
                            </div>

                            <div className='w-full py-2 flex gap-x-3 px-2 justify-around items-center'>
                              <div className='w-1/2 flex justify-center'>
                                <input
                                  type="text"
                                  className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black'
                                  value={retenIsr}
                                  onChange={(e) => {
                                    setretenIsr(handleChange(e))
                                  }}
                                />
                              </div>
                              <div className='w-1/2 flex justify-center'>
                                <input type="text" className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black' />
                              </div>
                            </div>

                          </div>
                        </div>
                        <DialogFooter className="sm:justify-end mt-5">
                          <DialogClose asChild>
                            <button className='px-4 py-1 rounded-md bg-transparent border-2 border-gray-400 hover:border-LogoBlue hover:bg-LogoBlue hover:text-white'>Editar</button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog key={`EliminarDialog`} className="flex items-center mt-1">
                      <DialogTrigger asChild>
                        <img className='w-6 h-6 cursor-pointer' src={EliminarSVG} />

                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <div className="flex items-center space-x-2">
                          <div className="grid flex-1 pt-5 gap-2">
                            <div className='border-[2px] flex justify-around w-full py-1 px-4 border-gray-200 rounded-md'>
                              <div className='w-1/3 text-center'>Período</div>
                              <div className='w-1/3 text-center'>Proveedor</div>
                              <div className='w-1/3 text-center'>RFC</div>
                            </div>

                            <div className='w-full py-2 flex justify-around items-center'>
                              <div className='w-1/3 flex flex-col items-center justify-center'>
                                <Select
                                  key={1}
                                  className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                                  onValueChange={(e) => { setMesFiltro(e) }}
                                  value={MesFiltro}
                                >
                                  <SelectTrigger className="w-[90%] border-2 border-gray-300 ring-0 focus:ring-0 px-3">
                                    <SelectValue placeholder="Selecciona un Mes" />
                                  </SelectTrigger>
                                  <SelectContent className="h-[20dvh] px-0">
                                    {meses.map((mes) => (
                                      <SelectItem
                                        key={mes}
                                        value={`${mes}`}
                                      >
                                        {mes}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className='w-1/3 flex justify-center'>
                                <input type="text" className='w-[90%] border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black' />
                              </div>

                              <div className='w-1/3 flex justify-center'>
                                <input type="text" className='w-[90%] border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black' />
                              </div>
                            </div>


                            <div className='border-[2px] flex justify-around w-full py-1 px-4 border-gray-200 rounded-md'>
                              <div className='w-1/2 text-center'>Monto de Operación</div>
                              <div className='w-1/2 text-center'>Retención de IVA</div>
                            </div>

                            <div className='w-full py-2 flex gap-x-3 px-2 justify-around items-center'>
                              <div className='w-1/2 flex justify-center'>
                                <input
                                  type="text"
                                  className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black'
                                  value={MontoOpe}
                                  onChange={(e) => {
                                    setMontoOpe(handleChange(e))
                                  }}
                                />
                              </div>
                              <div className='w-1/2 flex justify-center'>
                                <input
                                  type="text"
                                  className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black'
                                  value={retenIva}
                                  onChange={(e) => {
                                    setretenIva(handleChange(e))
                                  }}
                                />
                              </div>
                            </div>

                            <div className='border-[2px] flex justify-around w-full py-1 px-4 border-gray-200 rounded-md'>
                              <div className='w-1/2 text-center'>Retención de ISR</div>
                              <div className='w-1/2 text-center'>Ejercicio</div>
                            </div>

                            <div className='w-full py-2 flex gap-x-3 px-2 justify-around items-center'>
                              <div className='w-1/2 flex justify-center'>
                                <input
                                  type="text"
                                  className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black'
                                  value={retenIsr}
                                  onChange={(e) => {
                                    setretenIsr(handleChange(e))
                                  }}
                                />
                              </div>
                              <div className='w-1/2 flex justify-center'>
                                <input type="text" className='w-full border-2 border-gray-300 py-[6px] rounded-md outline-none text-center placeholder:text-black' />
                              </div>
                            </div>

                          </div>
                        </div>
                        <DialogFooter className="sm:justify-end mt-5">
                          <DialogClose asChild>
                            <button className='px-4 py-1 rounded-md bg-transparent border-2 border-gray-400 hover:border-LogoBlue hover:bg-LogoBlue hover:text-white'>Eliminar</button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableHead>
                </TableRow>
              ))
            }

          </TableBody>
        </Table>

      </div>

      <div className='w-full items-center justify-start py-2'>
        <div className='flex items-center gap-x-1'>
          {/* Renderizado condicional para mostrar o no la flecha izquierda */}
          {!(page <= 1) && (<button onClick={prevPage} className='text-[10px] cursor-pointer text-gray-500'>{"<"}</button>)}

          Pag {page}

          {!(page === totalPages) && (<button onClick={nextPage} className='text-[10px] cursor-pointer text-gray-500'>{">"}</button>)}

        </div>
      </div>


    </div>
  )
}

export default ConstanciaRetencion