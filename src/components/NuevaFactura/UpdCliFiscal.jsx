import { useFormik } from 'formik'
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FormaDePago, RegimenFiscalInfo, UsoCDFI } from '../../assets/adminData';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

import { InfoFiscal } from "../../api/infoFiscal";
import { useToast } from '../ui/use-toast';
import { useQueryClient } from 'react-query';

const InfoFisCtrl = new InfoFiscal()
export const UpdateClienteFom = ({ ClienteSelected,setClienteSelected , refetch }) => {
    const [datosOpcionales, setdatosOpcionales] = useState(false)
    const [setShowClienteUpdateDialog, setsetShowClienteUpdateDialog] = useState(false)
    const { User } = useAuth()

    const { toast } = useToast()

    const QC = useQueryClient();

    const formCliUpdate = useFormik({
        initialValues: {
            rfc: ClienteSelected?.rfc ?? "",
            razonSocial: null,
            regimenFiscal: null,
            usoCFDI: null,
            formaDePago: null,
            codigoPostal: null,
            email: "",
            calle: null,
            noExterior: null,
            noInterior: null,
            colonia: null,
            localidad: null,
            municipio: null,
            estado: null,
            pais: null
        },
        validationSchema: Yup.object({
            rfc: Yup.string()
                .matches(/^[A-Za-z0-9]{13}$/, "Debe ser alfanumérico y tener exactamente 13 caracteres")
                .required("Requerido"),
            razonSocial: Yup.string()
                .matches(/^[A-Za-z ]+$/, "Solo se permiten letras")
                .required("Requerido"),
            regimenFiscal: Yup.string().required(),
            usoCFDI: Yup.string().required(),
            formaDePago: Yup.string().required(),
            codigoPostal: Yup.string()
                .matches(/^\d{5}$/, "El código postal debe tener 5 dígitos")
                .required("Requerido"),
            email: Yup.string().email(),
        }),
        validateOnChange: true,
        onSubmit: async (formValue) => {
            let ID = ClienteSelected.id;
            let findedRegimen = RegimenFiscalInfo.find(regimen => regimen.nombre === formValue.regimenFiscal)
            let findedCDFI = UsoCDFI.find(cdfi => cdfi.nombre === formValue.usoCFDI)
            let findedFormaDePago = FormaDePago.find(fdp => fdp.nombre === formValue.formaDePago)


            let datosFiscalesCliente = {
                clienteDe: User.uid,
                rfc: formValue.rfc,
                razonSocial: formValue.razonSocial,
                regimenFiscal: findedRegimen.clave,
                usoCFDI: findedCDFI.clave,
                formaDePago: findedFormaDePago.clave,
                codigoPostal: formValue.codigoPostal,
                email: formValue.email,
                direccion: {
                    calle: formValue.calle,
                    noExterior: formValue.noExterior,
                    noInterior: formValue.noInterior,
                    colonia: formValue.colonia,
                    localidad: formValue.localidad,
                    municipio: formValue.municipio,
                    estado: formValue.estado,
                    pais: formValue.pais
                }
            }

            const resp = await InfoFisCtrl.updateInfoMisClientes(ID, datosFiscalesCliente)

            if (resp) {
                toast({
                    title: "Datos Agregados Exitosamente",
                });

                QC.invalidateQueries(`clientes-${User.uid}`)
                setClienteSelected(null)
                setsetShowClienteUpdateDialog(false)
                formCliUpdate.resetForm()
                
            } else {
                toast({
                    variant: "destructive",
                    title: "Error al subir datos del cliente",
                });

                setsetShowClienteUpdateDialog(false)
                formCliUpdate.resetForm()
            }

        }
    })

    useEffect(() => {
        formCliUpdate.setValues({
            rfc: ClienteSelected?.rfc ?? '',
            razonSocial: ClienteSelected?.razonSocial ?? '',
            regimenFiscal: ClienteSelected?.regimenFiscal ?? '',
            usoCFDI: ClienteSelected?.usoCFDI ?? '',
            formaDePago: ClienteSelected?.formaDePago ?? '',
            codigoPostal: ClienteSelected?.codigoPostal ?? '',
            email: ClienteSelected?.email ?? '',
            calle: ClienteSelected?.direccion.calle ?? '',
            noExterior: ClienteSelected?.direccion.noExterior ?? '',
            noInterior: ClienteSelected?.direccion.noInterior ?? '',
            colonia: ClienteSelected?.direccion.colonia ?? '',
            localidad: ClienteSelected?.direccion.localidad ?? '',
            municipio: ClienteSelected?.direccion.municipio ?? '',
            estado: ClienteSelected?.direccion.estado ?? '',
            pais: ClienteSelected?.direccion.pais ?? ''
        });
    }, [ClienteSelected])

    return (
        <>
            <button onClick={()=>setsetShowClienteUpdateDialog(true)} className='text-LogoBlue w-fit text-[14px]'>Actualizar datos</button>
            <Dialog key={'ActualizarCliente'} open={setShowClienteUpdateDialog} onClose={() => setsetShowClienteUpdateDialog(false)}>

                <DialogContent className="sm:max-w-[475px] overflow-y-auto overflow-x-hidden max-h-[70dvh] h-fit">
                    <form className='w-full h-full flex gap-y-3 flex-col ' onSubmit={formCliUpdate.handleSubmit}>
                        <h2>
                            Actualizar Datos de Cliente
                        </h2>

                        {/* RFC */}
                        <div className='w-full h-fit flex flex-col px-1'>
                            <label htmlFor="rfc">RFC</label>
                            <input
                                type="text" name='rfc'
                                className='border-[1px] px-2 py-1 border-gray-300'
                                onChange={formCliUpdate.handleChange}
                                value={formCliUpdate.values.rfc}
                            />
                            {
                                formCliUpdate.errors.rfc &&
                                (<>
                                    <h2 className='text-[12px] text-red-500'>*Campo Requerido</h2>
                                </>)
                            }
                        </div>

                        {/* RAZON SOCIAL */}
                        <div className='w-full h-fit flex flex-col px-1'>
                            <label htmlFor="razonSocial">Razón Social</label>
                            <input
                                type="text" name='razonSocial'
                                className='border-[1px] px-2 py-1 border-gray-300'
                                onChange={formCliUpdate.handleChange}
                                value={formCliUpdate.values.razonSocial}
                            />
                            {
                                formCliUpdate.errors.razonSocial &&
                                (<>
                                    <h2 className='text-[12px] text-red-500'>*Campo Requerido</h2>
                                </>)
                            }
                        </div>

                        {/* Régimen Fiscal */}
                        <div className='w-full h-fit flex flex-col px-1'>
                            <label htmlFor="regimenFiscal">Régimen Fiscal</label>
                            <Select
                                key={"regimenFiscalCliente"}
                                className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                                onValueChange={(e) => {
                                    formCliUpdate.setFieldValue("regimenFiscal", e)
                                }}
                                value={formCliUpdate.values.regimenFiscal}
                            >
                                <SelectTrigger className="w-full border-2 border-gray-500 ">
                                    <SelectValue placeholder="Selecciona" />
                                </SelectTrigger>
                                <SelectContent className="h-[200px] px-0">
                                    {
                                        RegimenFiscalInfo.map((regimen, index) => (
                                            <SelectItem
                                                key={index}
                                                value={regimen.nombre}
                                            >
                                                {regimen.nombre}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        {/* CDFI Y FORMA DE PAGO */}
                        <div className='w-full flex gap-x-3 items-center'>
                            {/* Régimen Fiscal */}
                            <div className='w-full h-fit flex flex-col px-1'>
                                <label className='text-[14px]' htmlFor="usoCDFI">Uso CDFI (opcional)</label>
                                <Select
                                    key={"usoCDFI"}
                                    className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                                    onValueChange={(e) => {
                                        formCliUpdate.setFieldValue("usoCFDI", e)
                                    }}
                                    value={formCliUpdate.values.usoCFDI}
                                >
                                    <SelectTrigger className="w-full border-2 border-gray-500 ">
                                        <SelectValue placeholder="Selecciona" />
                                    </SelectTrigger>
                                    <SelectContent className="h-[200px] px-0">
                                        {
                                            UsoCDFI.map((regimen, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={regimen.nombre}
                                                >
                                                    {regimen.nombre}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* Régimen Fiscal */}
                            <div className='w-full h-fit flex flex-col px-1'>
                                <label className='text-[14px]' htmlFor="formaDePago">Forma de Pago (opcional)</label>
                                <Select
                                    key={"usoCDFI"}
                                    className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                                    onValueChange={(e) => {
                                        formCliUpdate.setFieldValue("formaDePago", e)
                                    }}
                                    value={formCliUpdate.values.formaDePago}
                                >
                                    <SelectTrigger className="w-full border-2 border-gray-500 ">
                                        <SelectValue placeholder="Selecciona" />
                                    </SelectTrigger>
                                    <SelectContent className="h-[200px] px-0">
                                        {
                                            FormaDePago.map((regimen, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={regimen.nombre}
                                                >
                                                    {regimen.nombre}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Cod Postal y Email */}
                        <div className='w-full flex gap-x-3 items-center'>
                            {/* Régimen Fiscal */}
                            <div className='w-full h-fit flex flex-col px-1'>
                                <label className='text-[14px]' htmlFor="codigoPostal">Codigo Postal</label>
                                <input
                                    type="text" name='codigoPostal'
                                    className='border-[1px] py-1 border-gray-300'
                                    onChange={formCliUpdate.handleChange}
                                    value={formCliUpdate.values.codigoPostal}
                                />
                                {
                                    formCliUpdate.errors.codigoPostal &&
                                    (<>
                                        <h2 className='text-[12px] text-red-500'>*Campo Requerido</h2>
                                    </>)
                                }
                            </div>
                            {/* Régimen Fiscal */}
                            <div className='w-full h-fit flex flex-col px-1'>
                                <label className='text-[14px]' htmlFor="email">Email (opcional)</label>
                                <input
                                    type="email" name='email'
                                    className='border-[1px] py-1 border-gray-300'
                                    onChange={formCliUpdate.handleChange}
                                    value={formCliUpdate.values.email}
                                />
                                {
                                    formCliUpdate.errors.email &&
                                    (<>
                                        <h2 className='text-[12px] text-red-500'>*Campo Requerido</h2>
                                    </>)
                                }
                            </div>
                        </div>

                        <div className='w-full items-center flex justify-end '>
                            <div className='w-fit flex items-center border-b-[1px] border-LogoBlue' onClick={() => setdatosOpcionales(!datosOpcionales)}>
                                <button type='button' className='text-LogoBlue text-[14px] flex items-center gap-x-[1px]'>Agregar datos opcionales <ChevronDown className={`w-5 h-5 transition-all ${datosOpcionales && 'rotate-180'}`} /></button>
                            </div>
                        </div>

                        {
                            datosOpcionales &&
                            (<>
                                {/* Calle */}
                                <div className='w-full h-fit flex flex-col px-1'>
                                    <label className='text-[14px]' htmlFor="calle">Calle:</label>
                                    <input
                                        type="text" name='calle'
                                        className='border-[1px] py-1 border-gray-300'
                                        onChange={formCliUpdate.handleChange}
                                        value={formCliUpdate.values.calle}
                                    />
                                </div>
                                {/* No Interior No Exterior */}
                                <div className='w-full flex gap-x-3 items-center'>
                                    {/* Régimen Fiscal */}
                                    <div className='w-full h-fit flex flex-col px-1'>
                                        <label className='text-[14px]' htmlFor="noInterior">No. Exterior:</label>
                                        <input
                                            type="text" name='noInterior'
                                            className='border-[1px] py-1 border-gray-300'
                                            onChange={formCliUpdate.handleChange}
                                            value={formCliUpdate.values.noExterior}
                                        />
                                    </div>
                                    {/* Régimen Fiscal */}
                                    <div className='w-full h-fit flex flex-col px-1'>
                                        <label className='text-[14px]' htmlFor="noExterior">No. Interior:</label>
                                        <input
                                            type="text" name='noExterior'
                                            className='border-[1px] py-1 border-gray-300'
                                            onChange={formCliUpdate.handleChange}
                                            value={formCliUpdate.values.noInterior}
                                        />
                                    </div>
                                </div>
                                {/* Colonia Localidad*/}
                                <div className='w-full flex gap-x-3 items-center'>
                                    {/* Régimen Fiscal */}
                                    <div className='w-full h-fit flex flex-col px-1'>
                                        <label className='text-[14px]' htmlFor="colonia">Colonia:</label>
                                        <input
                                            type="text" name='colonia'
                                            className='border-[1px] py-1 border-gray-300'
                                            onChange={formCliUpdate.handleChange}
                                            value={formCliUpdate.values.colonia}
                                        />
                                    </div>
                                    {/* Régimen Fiscal */}
                                    <div className='w-full h-fit flex flex-col px-1'>
                                        <label className='text-[14px]' htmlFor="localidad">Localidad:</label>
                                        <input
                                            type="text" name='localidad'
                                            className='border-[1px] py-1 border-gray-300'
                                            onChange={formCliUpdate.handleChange}
                                            value={formCliUpdate.values.localidad}
                                        />
                                    </div>
                                </div>
                                {/* Municipio Estado*/}
                                <div className='w-full flex gap-x-3 items-center'>
                                    {/* Régimen Fiscal */}
                                    <div className='w-full h-fit flex flex-col px-1'>
                                        <label className='text-[14px]' htmlFor="municipio">Municipio:</label>
                                        <input
                                            type="text" name='municipio'
                                            className='border-[1px] py-1 border-gray-300'
                                            onChange={formCliUpdate.handleChange}
                                            value={formCliUpdate.values.municipio}
                                        />
                                    </div>
                                    {/* Régimen Fiscal */}
                                    <div className='w-full h-fit flex flex-col px-1'>
                                        <label className='text-[14px]' htmlFor="estado">Estado:</label>
                                        <input
                                            type="text" name='estado'
                                            className='border-[1px] py-1 border-gray-300'
                                            onChange={formCliUpdate.handleChange}
                                            value={formCliUpdate.values.estado}
                                        />
                                    </div>
                                </div>
                                {/* Calle */}
                                <div className='w-full h-fit flex flex-col px-1'>
                                    <label className='text-[14px]' htmlFor="pais">Pais:</label>
                                    <input
                                        type="text" name='pais'
                                        className='border-[1px] py-1 border-gray-300'
                                        onChange={formCliUpdate.handleChange}
                                        value={formCliUpdate.values.pais}
                                    />
                                </div>
                            </>)
                        }

                        <div className='flex gap-x-3 items-center mt-5 justify-end mr-[5%]'>
                            <button type='button' className='px-4 py-1 bg-gray-300 transition-colors hover:bg-LogoBlue font-semibold hover:text-white' onClick={() => { setsetShowClienteUpdateDialog(false) }}>Cancelar</button>
                            <button
                                type='submit'
                                disabled={!formCliUpdate.isValid || formCliUpdate.isSubmitting ? true : false}
                                className='px-4 py-1 disabled:opacity-50 bg-gray-300 transition-colors hover:bg-LogoBlue font-semibold hover:text-white'
                                onClick={() => { }}>Guardar</button>
                        </div>
                    </form>

                </DialogContent>
            </Dialog>
        </>

    )
}
