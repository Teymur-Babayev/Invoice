import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import { recibidasPrueba } from '../../../assets/adminData';

const formatISODateToNormal = (isoDateString) => {
  // Verificar si la fecha de entrada ya está en el formato deseado (dd/mm/yyyy)
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(isoDateString)) {
    return isoDateString; // Devolver la fecha de entrada sin modificar
  }

  // Si la fecha no está en el formato deseado, convertirla a formato normal
  const date = new Date(isoDateString);
  // Asegúrate de que la fecha esté en el formato deseado. Puedes ajustar este formato según necesites.
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};


const extractDataWithPagination = (invoices, pageNumber = 1, pageSize = 5) => {
  // Calcular el índice de inicio de los objetos para la página actual
  const startIndex = (pageNumber - 1) * pageSize;
  // Filtrar los objetos para obtener solo los de la página actual
  const paginatedItems = invoices.slice(startIndex, startIndex + pageSize);

  // Extraer los datos específicos de cada objeto paginado
  return paginatedItems.map(invoice => ({
    periodoDeCobro: formatISODateToNormal(invoice.fecha_timbrado),
    fechaDeEmision: formatISODateToNormal(invoice.fecha_emision),  // Se asume el mismo valor para ambos, revisa esto para ajustar según necesidades
    cliente: invoice.nombre_receptor,
    rfc: invoice.rfc_receptor,
    subtotal: invoice.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2, useGrouping: true }),
    total: invoice.total.toLocaleString('es-MX', { minimumFractionDigits: 2, useGrouping: true }),
    formaDePago: invoice.formadepago,
    serie: invoice.serie,
    folio: invoice.folio,
    tipoDeCDFI: invoice.usocfdi,
    estado: invoice.estado_sat
  }));
};

const Recibidas = () => {

  const [startIndex, setStartIndex] = useState(0);
  const [Pagi, setPagi] = useState(1)
  const pageSize = 6;
  const [page, setPage] = useState(1);
  const [FacturasEmitidas, setFacturasEmitidas] = useState([]);
  const [FacturasFiltradas, setFacturasFiltradas] = useState(extractDataWithPagination(recibidasPrueba, page, pageSize));
  const [FacturasEmitidasCompletas, setFacturasEmitidasCompletas] = useState(null);

  useEffect(() => {
    setFacturasEmitidas(extractDataWithPagination(recibidasPrueba, Pagi, pageSize))
  }, [Pagi])

  useEffect(() => {
    setFacturasEmitidasCompletas(extractDataWithPagination(recibidasPrueba, pageSize, pageSize))
    setFacturasEmitidas(extractDataWithPagination(recibidasPrueba, page, pageSize));
  }, [page]);

  const totalPages = Math.ceil(recibidasPrueba.length / pageSize);

  const nextPage = () => {
    setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const eliminarDuplicados = (array) => {
    // Objeto para almacenar los UUID ya vistos
    const vistos = {};

    // Filtrar el array, manteniendo solo los elementos no vistos previamente
    return array.filter((obj) => {
      // Verificar si el UUID del objeto ya ha sido visto
      if (vistos[obj.uuid]) {
        return false; // Si ya ha sido visto, omitir este objeto
      }
      // Si no ha sido visto, marcarlo como visto y mantenerlo
      vistos[obj.uuid] = true;
      return true;
    });
  }

  const filtrarFacturas = (searchValue) => {
    if (!searchValue) {
      setFacturasFiltradas([...FacturasEmitidas]);
      return;
    }

    const valorBuscado = searchValue.toLowerCase();

    let filtradasPorRFC = recibidasPrueba.filter(factura =>
      factura.rfc_receptor.toLowerCase().includes(valorBuscado)
    );

    let filtradasPorNombre = recibidasPrueba.filter(factura =>
      factura.nombre_receptor.toLowerCase().includes(valorBuscado)
    );

    const dataCompleta = [...filtradasPorNombre, ...filtradasPorRFC]
    const dataSinDupli = eliminarDuplicados(dataCompleta);

    setFacturasFiltradas(extractDataWithPagination(dataSinDupli, page, pageSize))
  };

  const handleChange = (event) => {
    const valorInput = event.target.value;
    filtrarFacturas(valorInput);
  };

  const HeadersEmitidas = [
    'PERIODO DE PAGO',
    'CUENTA DE GASTO',
    'FECHA DE EMISIÓN',
    'PROVEEDOR',
    'RFC',
    'SUBTOTAL',
    'IVA',
    'TOTAL',
    'USO DEL CDFI',
    'FORMA DE PAGO',
    'SERIE',
    'FOLIO',
    'TIPO DE CDFI',
    'ESTADO'
  ]
  return (
    <div className='w-full flex flex-col pr-[10%] pt-2 justify-center items-center h-full rounded-md'>
      <div className='bg-white border-2 px-5 flex items-center justify-between border-gray-300 w-full py-5 rounded-lg'>
        <h2 className='font-[12px] text-4xl'>Facturas recibidas</h2>

        <div className='w-[30%] flex px-3 items-center border-2 border-gray-400 rounded-lg'>
          <input
            onChange={handleChange}
            className='py-1 w-full ring-0 outline-none border-none text-[14px] placeholder:text-[14px]' type="text" placeholder='Buscar cliente, RFC...' />

          <Search className='w-5 h-5 text-gray-400' />
        </div>
      </div>


      <div className='w-full bg-white border-2 border-gray-300 rounded-lg mt-5'>
        <Table className="w-[150dvw] overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 1]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 2]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 3]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 4]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 5]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 6]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 7]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 8]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 9]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 10]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 11]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 12]}</TableHead>
              <TableHead className="text-[10px] w-[250px] text-center">{HeadersEmitidas[startIndex + 13]}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {console.log(FacturasFiltradas)}
            {
              FacturasFiltradas.map((factura) => (
                <TableRow >
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                  <TableCell className="text-center text-[12px]">Prueba</TableCell>
                </TableRow>
              ))
            }

          </TableBody>
        </Table>

      </div>

      <div className='w-full flex items-center py-2 justify-start'>
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

export default Recibidas