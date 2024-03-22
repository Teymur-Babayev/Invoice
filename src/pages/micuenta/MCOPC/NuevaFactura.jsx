import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { MetodoDePago as MDP, Moneda as Coin, FormaDePago as FDP, TipoDePago as TDF, Moneda, RegimenFiscalInfo, UsoCDFI, FormaDePago } from "../../../assets/adminData";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { InfoFiscal } from "../../../api/infoFiscal";
import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from 'react-query';
import { Search } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, } from "../../../components/ui/command";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';

import EditarSVG from "../../../assets/Editar.svg";
import EliminarSVG from "../../../assets/Eliminar.svg";

import { UpdateClienteFom } from '../../../components/NuevaFactura/UpdCliFiscal';
import { CreaCliFiscal } from '../../../components/NuevaFactura/CreaCliFiscal';
import { CreaProdFiscal } from '../../../components/NuevaFactura/CreaProdFiscal';
import { useToast } from '../../../components/ui/use-toast';

// Calcula la fecha de hace 3 días
const fechaActual = new Date();
const tresDiasAtras = new Date(fechaActual.setDate(fechaActual.getDate() - 3));

const InfoFisCtrl = new InfoFiscal()
const NuevaFactura = () => {
  const [DatosJSON, setDatosJSON] = useState(null)
  const { User } = useAuth()
  const [Value, setValue] = useState(null)
  const [ValueProduc, setValueProduc] = useState(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchProd, setsearchProd] = useState('')

  const { toast } = useToast()

  const [OpenPreview, setOpenPreview] = useState(false)

  const [OpenCliente, setOpenCliente] = useState(false)
  const [OpenProductos, setOpenProductos] = useState(false)

  const [startIndex, setstartIndex] = useState(0)

  const [shoClienteUpdateDialog, setshoClienteUpdateDialog] = useState(false)

  const [ClienteSelected, setClienteSelected] = useState(null)

  const [tabla, settabla] = useState([])

  const [SubTotal, setSubTotal] = useState(0)
  const [iva, setiva] = useState(0)
  const [isr, setisr] = useState(0)
  const [ivaret, setivaret] = useState(0)
  const [total, settotal] = useState(0)

  const [showProductDel, setshowProductDel] = useState(false)

  const HeadersEmitidas = [
    'Cant',
    'Claves',
    'Descripción',
    'Valor Unitario',
    'Subtotal',
    'Descuentos',
    'Impuestos',
    'Total',
  ]

  const { data: InfoFiscalData, refetch } = useQuery(`${User.uid}-InfoFiscal`, () => InfoFisCtrl.getInfoFiscal(User.uid))
  const { data: MisClientes } = useQuery(`clientes-${User.uid}`, () => InfoFisCtrl.getInfoMisClientes(User.uid))
  const { data: MisProductos } = useQuery(`productos-${User.uid}`, () => InfoFisCtrl.getInfoMisProductos(User.uid))

  let folio = InfoFiscalData ? InfoFiscalData?.folio : 0


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

  const handleTipoDeFacturaChange = (value) => {
    formik.setFieldValue("TipoDeFactura", value);
    formik.setFieldTouched("TipoDeFactura", true, false); // Marca el campo como tocado
  };

  const handleFormaDePagoChange = (value) => {
    formik.setFieldValue("FormaDePago", value);
    formik.setFieldTouched("FormaDePago", true, false); // Marca el campo como tocado
  };

  const handleMetodoDePagoChange = (value) => {
    formik.setFieldValue("MetodoDePago", value);
    formik.setFieldTouched("MetodoDePago", true, false); // Marca el campo como tocado
  };

  const handleMonedaChange = (value) => {
    formik.setFieldValue("Moneda", value);
    formik.setFieldTouched("Moneda", true, false); // Marca el campo como tocado
  };

  const handleTipoDeCambioChange = (value) => {
    formik.setFieldValue("TipoDeCambio", handleChange(value));
    formik.setFieldTouched("TipoDeCambio", true, false); // Marca el campo como tocado
  };

  const formik = useFormik({
    initialValues: {
      cliente: null,
      fechaDeEmision: "",
      TipoDeFactura: null,
      FormaDePago: null,
      MetodoDePago: null,
      Moneda: null,
      TipoDeCambio: null,
      Serie: null,
      Folio: folio
    },
    validationSchema: Yup.object({
      cliente: Yup.object().required(),
      fechaDeEmision: Yup.date()
        .min(tresDiasAtras, 'La fecha de emisión debe ser dentro de los últimos 3 días')
        .required('Este campo es obligatorio'),
      TipoDeFactura: Yup.string().required(),
      FormaDePago: Yup.string().required(),
      MetodoDePago: Yup.string().required(),
      Moneda: Yup.string().required(),
      Serie: Yup.string().required(),
      Folio: Yup.number().required()
    }),
    validateOnChange: true,
    onSubmit: async (formvalue) => {
      let findedMetodoPago = MDP.find(mdp => mdp.nombre === formvalue.MetodoDePago)
      let findedTipoPago = TDF.find(tdf => tdf.nombre === formvalue.TipoDeFactura)
      let findedMoneda = Coin.find(coin => coin.nombre === formvalue.Moneda)

      let clienteData = MisClientes.find(cli => cli.rfc === ClienteSelected?.rfc)


      if (tabla.length == 0) {
        toast({
          variant: "destructive",
          title: "Debe agregar productos a su factura",
        });
      } else {
        let conceptos = tabla.map((producto)=>{
          return {
            "ClaveProdServ": producto.datosAdi.codigoSat,
            "Cantidad": producto.cantidad,
            "ClaveUnidad": producto.datosAdi.claveUnidad,
            "Unidad": producto.datosAdi.unidad,
            "Descripcion": producto.descripcion,
            "ValorUnitario": producto.datosAdi.precio.replace("$",""),
            "Importe": producto.subtotal,
            "Descuento": "0.00",
            "ObjetoImp": "02",
            "Impuestos":
            {
              "Traslados":
                [
                  {
                    "Base": producto.subtotal,
                    "Impuesto": "002",
                    "TipoFactor": "Tasa",
                    "TasaOCuota": `${producto.impuestosPorcentaje}`,
                    "Importe": `${producto.impuestosTotal}`
                  }
                ]
            }
          }
        })
        setOpenPreview(true)
        let DataApiFormatted = {
          "Comprobante": {
            "Version": "4.0",
            "Serie": formvalue.Serie,
            "Folio": formvalue.Folio,
            "Fecha": formvalue.fechaDeEmision,
            "NoCertificado": "falta",
            "SubTotal": formatToCurrency(SubTotal).replace("$", ""),
            "Descuento": "0.00",
            "Moneda": findedMoneda.clave,
            "Total": formatToCurrency(total).replace("$",""),
            "TipoDeComprobante": findedTipoPago.clave,
            "MetodoPago": findedMetodoPago.clave,
            "Exportacion": "falta",
            "LugarExpedicion": InfoFiscalData?.direccion.codigoPostal,
          },
          "Emisor":
          {
            "Rfc": InfoFiscalData?.rfc,
            "Nombre": InfoFiscalData?.razonSocial,
            "RegimenFiscal": InfoFiscalData?.regimenFiscal
          },
          "Receptor":
          {
            "Rfc": clienteData?.rfc,
            "Nombre": clienteData?.razonSocial,
            "UsoCFDI": clienteData?.usoCFDI,
            "DomicilioFiscalReceptor": clienteData?.codigoPostal,
            "RegimenFiscalReceptor": clienteData?.regimenFiscal,
          },
          "Conceptos":conceptos,
          "Impuestos":
          {
            "TotalImpuestosTrasladados": `${formatToCurrency(iva + isr + ivaret).replace("$","")}`,
            "Traslados":
              [
                {
                  "Base": `${ formatToCurrency(SubTotal).replace("$","") }`,
                  "Impuesto": "002",
                  "TipoFactor": "Tasa",
                  "TasaOCuota": "0.160000",
                  "Importe": `${formatToCurrency(total - SubTotal).replace("$","")}`
                }
              ]
          },
          "CamposPDF": {
            "tipoComprobante": "NOTA DE CRÉDITO",
            "Comentarios": "Ninguno"
          },
          "logo": ""
        }
        const myJSON = JSON.stringify(DataApiFormatted, null, 2)
        setDatosJSON(myJSON)
      }
    }
  })

  const AgregarProducto = (producto) => {
    const cantidad = 1;
    const claves = producto.claveUnidad;
    const descripcion = producto.descripcion;

    // Convertir el precio a número eliminando el símbolo "$"
    const precioNumerico = parseFloat(producto.precio.replace("$", ""));
    const valorUnitario = isNaN(precioNumerico) ? 0 : precioNumerico;

    // Calcular el subtotal
    const subtotal = cantidad * valorUnitario;

    // Convertir los impuestos a números
    const ivaPorcentaje = parseFloat(producto.iva) || 0;
    const isrPorcentaje = parseFloat(producto.isr) || 0;
    const ivaretPorcentaje = parseFloat(producto.ivaret) || 0;

    // Calcular los impuestos individuales (IVA, ISR, IVA Retenido)
    const iva = subtotal * ivaPorcentaje;
    const isr = subtotal * isrPorcentaje;
    const ivaret = subtotal * ivaretPorcentaje;

    // Calcular la suma de los impuestos totales (IVA + ISR + IVA Retenido)
    const impuestosTotal = iva + isr + ivaret;
    const impuestosPorcentaje = ivaPorcentaje + isrPorcentaje + ivaretPorcentaje

    // Calcular el total del producto (subtotal + impuestos)
    const total = subtotal + impuestosTotal;

    let dataTabla = {
      cantidad,
      claves,
      descripcion,
      valorUnitario,
      subtotal,
      descuento: 0,
      iva,
      isr,
      ivaret,
      impuestosTotal,
      impuestosPorcentaje,
      total,
      datosAdi: producto
    };

    setOpenProductos(false)
    settabla([...tabla, dataTabla])
  };

  const handleCantidadChange = (newValue, index) => {
    // Convertir el nuevo valor a número
    const newCantidad = parseInt(newValue);

    // Verificar si el nuevo valor es un número válido
    if (!isNaN(newCantidad)) {
      // Actualizar la cantidad en la tabla
      const updatedTabla = [...tabla];
      updatedTabla[index].cantidad = newCantidad;

      // Recalcular subtotal y total para la fila actual

      const subtotal = newCantidad * updatedTabla[index].valorUnitario;
      const impuestos = subtotal * updatedTabla[index].impuestosPorcentaje;
      const total = subtotal + impuestos;

      updatedTabla[index].subtotal = subtotal;
      updatedTabla[index].impuestosTotal = impuestos;
      updatedTabla[index].total = total;

      // Actualizar el estado con la nueva tabla
      settabla(updatedTabla);
    }

    ActualizarValoresGlobales()
  };

  const ActualizarValoresGlobales = () => {
    const subtotalCalculado = tabla.reduce((acc, curr) => {
      // Verificar si curr.subtotal es un número válido antes de agregarlo al acumulador
      if (!isNaN(curr.subtotal)) {
        return acc + parseFloat(curr.subtotal);
      } else {
        return acc;
      }
    }, 0);
    setSubTotal(subtotalCalculado);

    const ivaCalculado = tabla.reduce((acc, curr) => {
      // Verificar si curr.subtotal es un número válido antes de agregarlo al acumulador
      if (!isNaN(curr.iva)) {
        let totalIva = curr.cantidad * curr.iva;
        return acc + parseFloat(totalIva);
      } else {
        return acc;
      }
    }, 0);
    setiva(ivaCalculado)

    const isrCalculado = tabla.reduce((acc, curr) => {
      // Verificar si curr.subtotal es un número válido antes de agregarlo al acumulador
      if (!isNaN(curr.isr)) {
        let totalIva = curr.cantidad * curr.isr;
        return acc + parseFloat(totalIva);
      } else {
        return acc;
      }
    }, 0);
    setisr(isrCalculado)

    const ivaretCalculado = tabla.reduce((acc, curr) => {
      // Verificar si curr.subtotal es un número válido antes de agregarlo al acumulador
      if (!isNaN(curr.ivaret)) {
        let totalIva = curr.cantidad * curr.ivaret;
        return acc + parseFloat(totalIva);
      } else {
        return acc;
      }
    }, 0);
    setivaret(ivaretCalculado)

    const totalCalculado = tabla.reduce((acc, curr) => {
      // Verificar si curr.subtotal es un número válido antes de agregarlo al acumulador
      if (!isNaN(curr.total)) {
        return acc + parseFloat(curr.total);
      } else {
        return acc;
      }
    }, 0);
    settotal(totalCalculado);

  }

  useEffect(() => {

    ActualizarValoresGlobales()
    formik.setFieldValue("producto", tabla)
  }, [tabla])




  return (
    <form onSubmit={formik.handleSubmit} className='w-full h-full pr-[4%] pt-[1%]'>
      <div className='md:flex hidden md:h-[41dvh] gap-x-6 justify-between items-center'>
        {/* CLIENTES */}
        <div className='w-1/2 h-full flex flex-col bg-white '>
          <h3 className='w-[80%] mx-auto mt-[3%] text-LogoBlueDark font-semibold'>Cliente</h3>
          {
            !ClienteSelected ? (
              <Popover key={'popdelcliente'} open={OpenCliente} onOpenChange={setOpenCliente}>
                <PopoverTrigger asChild>
                  <button
                    aria-expanded={OpenCliente}
                    className="w-[80%] mx-auto border-[1px] border-gray-200 text-black py-2 px-3  flex items-center justify-between"
                  >
                    {Value || "Buscar o agregar Cliente"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] h-[30dvh] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Buscar o agregar Cliente"
                      value={Value}
                      onValueChange={(e) => {
                        setValue(e);
                        setSearchTerm(e);
                      }}
                    />
                    <CommandEmpty>No se encontraron clientes.</CommandEmpty>
                    <CommandGroup className="overflow-y-auto">
                      <CreaCliFiscal />

                      {MisClientes?.filter(cliente =>
                        cliente.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        cliente.rfc.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map(cliente => (
                        <CommandItem
                          key={cliente.id} // Asegúrate de tener una clave única para cada CommandItem
                          onSelect={(currentValue) => {
                            let data = currentValue.split(" ");
                            let findedCli = MisClientes.find(cli => cli.rfc.toLowerCase() === data[2].toLowerCase());
                            let dataNew = {
                              id: findedCli.id,
                              codigoPostal: findedCli.codigoPostal,
                              email: findedCli.email,
                              formaDePago: FormaDePago.find(regimen => regimen.clave === findedCli.formaDePago)?.nombre,
                              razonSocial: findedCli.razonSocial,
                              rfc: findedCli.rfc,
                              regimenFiscal: RegimenFiscalInfo.find(regimen => regimen.clave === findedCli.regimenFiscal)?.nombre,
                              usoCFDI: UsoCDFI.find(regimen => regimen.clave === findedCli.usoCFDI)?.nombre,
                              direccion: findedCli.direccion
                            }
                            formik.setFieldValue("cliente", dataNew)
                            setClienteSelected(dataNew);

                          }}
                        >
                          {cliente && typeof cliente.razonSocial === 'string' ? cliente.razonSocial : ''} {cliente && typeof cliente.rfc === 'string' ? cliente.rfc : ''}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>)
              :
              (<>
                <div className='w-[80%] mt-3 gap-y-2 flex flex-col mx-auto'>
                  <h2>Datos del Receptor</h2>
                  <div className='w-full flex items-center gap-x-3'>
                    <h2 className='w-[35%]'>Razón Social</h2> <h4>{ClienteSelected.razonSocial}</h4>
                  </div>
                  <div className='w-full flex items-center gap-x-3'>
                    <h2 className='w-[35%]'>RFC</h2> <h4>{ClienteSelected.rfc}</h4>
                  </div>
                  <div className='w-full flex items-center gap-x-3'>
                    <h2 className='w-[35%]'>Código Postal</h2> <h4>{ClienteSelected.codigoPostal}</h4>
                  </div>
                  <div className='w-full flex items-center gap-x-3'>
                    <h2 className='w-[35%]'>Régimen fiscal</h2> <h4>{ClienteSelected.regimenFiscal}</h4>
                  </div>

                  <div className='w-full flex items-center gap-x-3'>
                    <h2 className='w-[35%]'>Uso CDFI</h2> <h4>{ClienteSelected.usoCFDI}</h4>
                  </div>

                  <UpdateClienteFom ClienteSelected={ClienteSelected} setClienteSelected={setClienteSelected} refetch={refetch} setshoClienteUpdateDialog={setshoClienteUpdateDialog} shoClienteUpdateDialog={shoClienteUpdateDialog} />
                </div>
              </>)
          }

        </div>
        {/* INFO FACTURA */}
        <div className='w-1/2 px-[5%] h-full bg-white rounded-md'>
          <div className='mt-5 flex justify-between items-center'>
            <h3 className='w-[75%]'>Fecha de Emision</h3>
            <input
              type="datetime-local"
              className={`bg-gray-200 py-1 w-full px-3 rounded-md ${formik.touched.fechaDeEmision && formik.errors.fechaDeEmision &&
                "border-red-500 border-2  placeholder:text-red-600"
                }`}
              name="fechaDeEmision"
              value={formik.values.fechaDeEmision}
              onChange={formik.handleChange}
            />
            <div className='w-[20%] ml-5'></div>
          </div>

          <div className='mt-3 flex justify-between items-center'>
            <h3 className='w-[75%]'>Tipo de Factura</h3>
            <Select
              key="TipoDeFactura"
              className={`border-none outline-none ring-0 focus:ring-0 text-black placeholder:text-black
          ${formik.touched.TipoDeFactura && formik.errors.TipoDeFactura ? "border-red-500 border-2  placeholder:text-red-600" : ""}
          `}
              onValueChange={handleTipoDeFacturaChange}
              value={formik.values.TipoDeFactura}
            >
              <SelectTrigger className={`w-full  bg-gray-200 h-8
          ${formik.touched.TipoDeFactura && formik.errors.TipoDeFactura ? "border-red-500 border-2  placeholder:text-red-600" : "border-none outline-none"}
          `}>
                <SelectValue placeholder="Metodo de Pago" />
              </SelectTrigger>
              <SelectContent className="h-fit px-0">
                {TDF.map((tdf) => (
                  <SelectItem key={tdf.nombre} value={tdf.nombre}>
                    {tdf.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className='w-[20%] ml-5'></div>
          </div>

          <div className='mt-3 flex justify-between items-center'>
            <h3 className='w-[75%]'>Forma de Pago</h3>
            <Select
              key={`FormaDePago`}
              className={`border-none outline-none ring-0 focus:ring-0 text-black placeholder:text-black
          ${formik.touched.FormaDePago && formik.errors.FormaDePago ? "border-red-500 border-2  placeholder:text-red-600" : ""}
          `}
              onValueChange={handleFormaDePagoChange}
              value={formik.values.FormaDePago}
            >
              <SelectTrigger className={`w-full  bg-gray-200 h-8
          ${formik.touched.FormaDePago && formik.errors.FormaDePago ? "border-red-500 border-2  placeholder:text-red-600" : "border-none outline-none"}
          `}>
                <SelectValue placeholder="Metodo de Pago" />
              </SelectTrigger>
              <SelectContent className="h-fit px-0">
                {
                  FDP.map((fdp) => (
                    <SelectItem
                      value={fdp.nombre}
                    >
                      {fdp.nombre}
                    </SelectItem>
                  ))
                }

              </SelectContent>
            </Select>
            <div className='w-[20%] ml-5'></div>
          </div>

          <div className='mt-3 flex justify-between items-center'>
            <h3 className='w-[75%]'>Metodo de Pago</h3>
            <Select
              key={`MetodoDePago`}
              className={`border-none outline-none ring-0 focus:ring-0 text-black placeholder:text-black
              ${formik.errors.MetodoDePago &&
                "border-red-500 border-2  placeholder:text-red-600"
                }
              `}
              onValueChange={handleMetodoDePagoChange}
              value={formik.values.MetodoDePago}
            >
              <SelectTrigger className={`w-full  bg-gray-200 h-8
          ${formik.touched.MetodoDePago && formik.errors.MetodoDePago ? "border-red-500 border-2  placeholder:text-red-600" : "border-none outline-none"}
          `}>
                <SelectValue placeholder="Metodo de Pago" />
              </SelectTrigger>
              <SelectContent className="h-fit px-0">
                {
                  MDP.map((mp) => (
                    <SelectItem
                      value={mp.nombre}
                    >
                      {mp.nombre}
                    </SelectItem>
                  ))
                }

              </SelectContent>
            </Select>
            <div className='w-[20%] ml-5'></div>
          </div>

          <div className='mt-3 flex w-[85%] gap-x-2 justify-between items-center'>
            <div className='mt-3 flex w-1/2 justify-between items-center'>
              <h3 className='w-[60%]'>Serie</h3>
              <input type="text" className={` w-full py-1 pl-3  bg-gray-200 rounded-md
                ${formik.errors.Serie && formik.errors.Serie ?
                  "border-red-500 border-2  placeholder:text-red-600"
                  : "border-none "
                }
                `}
                name="Serie"
                onChange={formik.handleChange}
              />
            </div>
            <div className='mt-3 flex w-1/2 justify-between items-center'>
              <h3 className='w-[60%]'>Folio</h3>
              <input type="number" className={` w-full py-1 pl-3  bg-gray-200 rounded-md
                ${formik.errors.Folio && formik.errors.Folio ?
                  "border-red-500 border-2  placeholder:text-red-600"
                  : "border-none "
                }
                `}
                name="Folio"
                onChange={formik.handleChange}
                value={formik.values.Folio}
              />
            </div>
          </div>


          <div className='mt-3 flex w-[85%] gap-x-2 justify-between items-center'>
            <div className='mt-3 flex w-1/2 justify-between items-center'>
              <h3 className='w-[60%] mr-3'>Moneda</h3>
              <Select
                key={`Moneda`}
                className={`border-none outline-none ring-0 focus:ring-0 text-black placeholder:text-black
              ${formik.errors.MetodoDePago &&
                  "border-red-500 border-2  placeholder:text-red-600"
                  }
              `}
                onValueChange={handleMonedaChange}
                value={formik.values.Moneda}
              >
                <SelectTrigger className={`w-full  bg-gray-200 h-8
          ${formik.touched.Moneda && formik.errors.Moneda ? "border-red-500 border-2  placeholder:text-red-600" : "border-none outline-none"}
          `}>
                  <SelectValue placeholder="Metodo de Pago" />
                </SelectTrigger>
                <SelectContent className="h-fit px-0">
                  {
                    Coin.map((cn) => (
                      <SelectItem
                        value={cn.nombre}
                      >
                        {cn.nombre}
                      </SelectItem>
                    ))
                  }

                </SelectContent>
              </Select>
            </div>
            {
              formik.values.Moneda != "Peso Mexicano" && (<div className='mt-3 flex w-1/2  items-center'>
                <h3 className='w-[60%] text-[12px]'>Tipo de cambio</h3>
                <input
                  type="text"
                  className={` w-full py-1 pl-3  bg-gray-200 rounded-md
                ${formik.errors.TipoDeCambio && formik.errors.TipoDeCambio ?
                      "border-red-500 border-2  placeholder:text-red-600"
                      : "border-none "
                    }
                `}
                  name='TipoDeCambio'
                  value={formik.values.TipoDeCambio}
                  onChange={handleTipoDeCambioChange}
                />
              </div>)
            }

          </div>
        </div>
      </div>

      {/* PRODUCTOS */}
      <div className='w-full md:flex flex-col hidden md:h-[33dvh]  px-[5%] bg-white rounded-md py-[1%] my-[2%]'>
        <div className='w-1/3'>
          <Popover key={'popdelproducto'} open={OpenProductos} onOpenChange={setOpenProductos}>
            <PopoverTrigger asChild>
              <button
                aria-expanded={OpenProductos}
                className="w-full border-[1px] border-gray-200 text-black py-2 px-3  flex items-center justify-between"
              >
                {ValueProduc || "Buscar o agregar Producto"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] h-[25dvh] p-0">
              <Command>
                <CommandInput
                  placeholder="Buscar o agregar Producto"
                  value={ValueProduc}
                  onValueChange={(e) => {
                    setValueProduc(e);
                    setsearchProd(e);
                  }}
                />
                <CommandGroup className="overflow-y-auto">
                  <CreaProdFiscal />
                  {MisProductos?.filter(prod =>
                    prod.nombreInterno.toLowerCase().includes(searchProd.toLowerCase())
                  ).map((producto, index) => (
                    <CommandItem
                      key={index}
                      value={producto}
                      onSelect={(currentValue) => {
                        AgregarProducto(producto)
                      }}
                    >
                      {producto.nombreInterno}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='w-full h-[30dvh] overflow-y-auto mt-2 border-2 border-gray-200 rounded-md'>
          <Table className="w-full overflow-y-auto overflow-x-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="text-[13px] w-fit text-center">{HeadersEmitidas[startIndex]}</TableHead>
                <TableHead className="text-[13px] w-fit text-center">{HeadersEmitidas[startIndex + 1]}</TableHead>
                <TableHead className="text-[13px] w-fit text-center">{HeadersEmitidas[startIndex + 2]}</TableHead>
                <TableHead className="text-[13px] w-fit text-center">{HeadersEmitidas[startIndex + 3]}</TableHead>
                <TableHead className="text-[13px] w-fit text-center">{HeadersEmitidas[startIndex + 4]}</TableHead>
                <TableHead className="text-[13px] w-fit text-center">{HeadersEmitidas[startIndex + 5]}</TableHead>
                <TableHead className="text-[13px] w-fit text-center">{HeadersEmitidas[startIndex + 6]}</TableHead>
                <TableHead className="text-[13px] w-fit text-center">{HeadersEmitidas[startIndex + 7]}</TableHead>
                <TableHead className="text-[13px] w-fit text-center">{HeadersEmitidas[startIndex + 8]}</TableHead>
                <TableHead className="text-[13px] w-fit text-center"></TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              <>
                {
                  tabla.map((table, index) => (
                    <TableRow>
                      <TableCell className="text-center text-[12px]">
                        {/* Control de entrada para la cantidad */}
                        <input
                          type="number"
                          className="w-full h-full bg-transparent text-center outline-none"
                          value={table.cantidad}
                          onChange={(e) => handleCantidadChange(Math.max(1, parseInt(e.target.value)), index)}
                        />

                      </TableCell>
                      <TableCell className="text-center text-[12px]">{table.claves}</TableCell>
                      <TableCell className="text-center text-[12px]">{table.descripcion}</TableCell>
                      <TableCell className="text-center text-[12px]">${table.valorUnitario}</TableCell>
                      <TableCell className="text-center text-[12px]">${table.subtotal}</TableCell>
                      <TableCell className="text-center text-[12px]">{table.descuento}</TableCell>
                      <TableCell className="text-center text-[12px]">{formatToCurrency(table.impuestosTotal)}</TableCell>
                      <TableCell className="text-center text-[12px]">{formatToCurrency(table.total)}</TableCell>
                      <TableCell className="text-center text-[12px] flex items-center gap-x-3">

                        <img className='w-5 h-5 cursor-pointer' src={EditarSVG} />
                        <img className='w-5 h-5 cursor-pointer' src={EliminarSVG} />
                      </TableCell>
                    </TableRow>
                  ))
                }

              </>
            </TableBody>
          </Table>
        </div>
        <div className='flex justify-end items-center'>

        </div>

      </div>
      {/* CONTENIDO DE INFOFISCAL Y VISTA PREVIA */}
      <div className='w-full  pt-3 h-4'>
        <div className='w-fit flex items-center gap-x-3  h-4 ml-auto'>
          <div className='px-4 py-[1px] w-fit rounded-md bg-esatDark'>
            <h5 className='text-white text-end'>Subtotal</h5>
            <span className='text-white'>{formatToCurrency(SubTotal)}</span>
          </div>
          <div className='px-4 py-[1px] w-fit rounded-md bg-esatDark'>
            <h5 className='text-white text-end'>IVA</h5>
            <span className='text-white'>{formatToCurrency(iva)}</span>
          </div>
          <div className='px-4 py-[1px] w-fit rounded-md bg-esatDark'>
            <h5 className='text-white text-end'>ISR</h5>
            <span className='text-white'>{formatToCurrency(isr)}</span>
          </div>
          <div className='px-4 py-[1px] w-fit rounded-md bg-esatDark'>
            <h5 className='text-white text-end'>IVA RET</h5>
            <span className='text-white'>{formatToCurrency(ivaret)}</span>
          </div>
          <div className='px-4 py-[1px] w-fit rounded-md bg-LogoBlue'>
            <h5 className='text-white text-end'>Total</h5>
            <span className='text-white'>{formatToCurrency(total)}</span>
          </div>

          <Dialog open={OpenPreview} onOpenChange={() => setOpenPreview(false)} key={`dialog de confirmacion`}>
            <DialogTrigger asChild>
              <button type='submit' className='py-1 px-4 rounded-md my-2 border-2 border-gray-400 flex items-center group gap-x-2 bg-gray-200 transition-all hover:bg-LogoBlueDark hover:text-white hover:border-LogoBlueDark text-LogoBlueDark'><Search className='w-4 h-4 text-LogoBlueDark group-hover:text-white' /> Vista Previa</button>
            </DialogTrigger>
            <DialogContent className="w-[600px] max-h-[600px]">
              <div className='w-full h-full flex gap-y-3 flex-col '>
                <textarea contentEditable="false" className='w-[480px] h-[300px] resize-none mt-5' value={DatosJSON} ></textarea>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </form>
  )
}

export default NuevaFactura