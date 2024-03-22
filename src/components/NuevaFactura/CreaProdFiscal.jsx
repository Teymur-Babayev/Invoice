import React, { useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Plus } from 'lucide-react'
import { useFormik } from 'formik'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '../ui/select'
import * as Yup from "yup";
import { CatUniData } from '../../assets/adminData'
import { uid } from 'uid'
import { useAuth } from '../../hooks/useAuth'
import { InfoFiscal } from "../../api/infoFiscal";
import { useToast } from '../ui/use-toast'
import { useQueryClient } from 'react-query'

const InfoFisCtrl = new InfoFiscal()
export const CreaProdFiscal = () => {
    const [ShowProductoDialog, setShowProductoDialog] = useState(false)

    const {User} = useAuth()
    const {toast} = useToast()

    const QC = useQueryClient()

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

    const formikPro = useFormik({
        initialValues: {
            descripcion: null,
            nombreInterno: null,
            unidad: null,
            precio: null,
            codigoSat: null,
            NoIdenInterno: null,
            cuentaPredial: null,
            iva: null,
            ivaRet: null,
            isr: null
        },
        validationSchema: Yup.object({
            descripcion: Yup.string().required('La descripción es requerida'),
            nombreInterno: Yup.string(),
            unidad: Yup.string().required('La unidad es requerida'),
            precio: Yup.string().required('El precio es requerido'),
            codigoSat: Yup.string().required('El código SAT es requerido'),
            NoIdenInterno: Yup.string(),
            cuentaPredial: Yup.string(),
        }),
        validateOnChange: true,
        onSubmit: async (formValue) => {
            let IDPROD = uid(32)
            let IdUser = User.uid

            let dataProdDb = {
                productoDe: IdUser,
                descripcion: formValue.descripcion,
                nombreInterno: formValue.nombreInterno,
                unidad: formValue.unidad,
                claveUnidad: CatUniData.find(uni => uni.nombre === formValue.unidad)?.clave,
                precio: formValue.precio,
                codigoSat: formValue.codigoSat,
                NoIdenInterno: formValue.NoIdenInterno,
                cuentaPredial: formValue.cuentaPredial,
                iva: parseFloat(formValue.iva),
                ivaRet: parseFloat(formValue.ivaRet),
                isr: parseFloat(formValue.isr),
            }

            const resp = await InfoFisCtrl.createInfoProduct(IDPROD, dataProdDb);

            if (resp) {
                toast({
                    title: "Datos del producto agregados exitosamente",
                });

                QC.invalidateQueries(`productos-${User.uid}`)
                setShowProductoDialog(false)
                formikPro.resetForm()
            } else {
                toast({
                    variant: "destructive",
                    title: "Error al subir datos del producto",
                });
                setShowProductoDialog(false)

                formikPro.resetForm()
            }
        }
    })

    return (
        <>
            <button type='button' onClick={() => setShowProductoDialog(true)} className='flex w-full py-1 items-center px-2 gap-x-2 text-[14px] hover:bg-gray-100'> <Plus /> Agregar</button>
            <Dialog key={'AgregarProducto'} open={ShowProductoDialog} onClose={() => setShowProductoDialog(false)}>
                <DialogContent className="sm:max-w-[520px] overflow-y-auto overflow-x-hidden h-fit">
                    <form className='w-full h-full flex gap-y-3 flex-col ' onSubmit={formikPro.handleSubmit}>
                        <div className='w-full h-full text-xl text-LogoBlue font-semibold flex gap-y-3 flex-col '>
                            Nuevo Producto
                        </div>

                        {/* Descripcion */}
                        <div className='w-full h-fit flex flex-col px-1'>
                            <label htmlFor="descripcion">Descripcion*</label>
                            <textarea
                                type="text" name='descripcion'
                                placeholder='Maximo 1000 caracteres'
                                className='border-[1px] resize-none h-[10dvh] px-2 py-1 border-gray-300'
                                onChange={formikPro.handleChange}
                                value={formikPro.values.descripcion}
                            />
                            {
                                formikPro.errors.descripcion &&
                                (<>
                                    <h2 className='text-[12px] text-red-500'>*Campo Requerido</h2>
                                </>)
                            }
                        </div>

                        <div className='flex items-center gap-x-3'>
                            <div className='w-full h-fit flex flex-col px-1'>
                                <label htmlFor="nombreInterno">Nombre Interno</label>
                                <input
                                    type="text" name='nombreInterno'
                                    className='border-[1px] px-2 py-1 border-gray-300'
                                    onChange={formikPro.handleChange}
                                    value={formikPro.values.nombreInterno || ""}
                                />
                            </div>
                            <div className='w-full h-fit flex flex-col px-1'>
                                <label htmlFor="unidad">Unidad*</label>
                                <Select
                                    key={"inputUnidad"}
                                    className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                                    onValueChange={(e) => {
                                        formikPro.setFieldValue("unidad", e);
                                    }}
                                    value={formikPro.values.unidad || ''} // Asegúrate de proporcionar un valor predeterminado vacío
                                >
                                    <SelectTrigger className="w-full border-2 border-gray-500 ">
                                        <SelectValue placeholder="Selecciona" />
                                    </SelectTrigger>
                                    <SelectContent className="h-[200px] px-0">
                                        {CatUniData.map((regimen, index) => (
                                            <SelectItem
                                                key={index}
                                                value={regimen.nombre}
                                            >
                                                {regimen.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {
                                    formikPro.errors.unidad &&
                                    (<>
                                        <h2 className='text-[12px] text-red-500'>*Campo Requerido</h2>
                                    </>)
                                }
                            </div>
                        </div>

                        <div className='flex items-center gap-x-3'>
                            <div className='w-full h-fit flex flex-col px-1'>
                                <label htmlFor="precio">Precio*</label>
                                <input
                                    type="text" name='precio'
                                    className='border-[1px] px-2 py-1 border-gray-300'
                                    onChange={(e) => {
                                        formikPro.handleChange(e)
                                        formikPro.setFieldValue("precio", handleChange(e))
                                    }}
                                    value={formikPro.values.precio}
                                />
                                {
                                    formikPro.errors.precio &&
                                    (<>
                                        <h2 className='text-[12px] text-red-500'>*Campo Requerido</h2>
                                    </>)
                                }
                            </div>
                            <div className='w-full h-fit flex flex-col px-1'>
                                <label htmlFor="codigoSat">Codigo del SAT*</label>
                                <input
                                    type="text" name='codigoSat'
                                    className='border-[1px] px-2 py-1 border-gray-300'
                                    onChange={formikPro.handleChange}
                                    value={formikPro.values.codigoSat}
                                />
                                {
                                    formikPro.errors.codigoSat &&
                                    (<>
                                        <h2 className='text-[12px] text-red-500'>*Campo Requerido</h2>
                                    </>)
                                }
                            </div>
                        </div>

                        <div className='flex items-center gap-x-3'>
                            <div className='w-full h-fit flex flex-col px-1'>
                                <label htmlFor="NoIdenInterno">No Identificacion interno</label>
                                <input
                                    type="text" name='NoIdenInterno'
                                    className='border-[1px] px-2 py-1 border-gray-300'
                                    onChange={formikPro.handleChange}
                                    value={formikPro.values.NoIdenInterno}
                                />
                            </div>
                            <div className='w-full h-fit flex flex-col px-1'>
                                <label htmlFor="cuentaPredial">Cuenta Predial</label>
                                <input
                                    type="text" name='cuentaPredial'
                                    className='border-[1px] px-2 py-1 border-gray-300'
                                    onChange={formikPro.handleChange}
                                    value={formikPro.values.cuentaPredial}
                                />
                            </div>
                        </div>

                        <div className='flex w-full items-center gap-x-3'>
                            <div className='w-full'>
                                <label htmlFor="iva">IVA</label>
                                <Select
                                    key={"IVA"}
                                    className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                                    onValueChange={(e)=>{
                                        formikPro.setFieldValue("iva",e)
                                    }}
                                >
                                    <SelectTrigger className="w-full border-2 border-gray-500 ">
                                        <SelectValue placeholder="Selecciona" />
                                    </SelectTrigger>
                                    <SelectContent className="h-[100px] px-0">
                                        <SelectItem
                                            value={"0"}
                                        >
                                            Excento
                                        </SelectItem>
                                        <SelectItem
                                            value={"0.08"}
                                        >
                                            8%
                                        </SelectItem>
                                        <SelectItem
                                            value={"0.16"}
                                        >
                                            16%
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className='w-full'>
                                <label htmlFor="ivaRet">IVA RET</label>
                                <Select
                                    key={"IVARET"}
                                    className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                                    onValueChange={(e)=> {
                                        formikPro.setFieldValue("ivaRet",e)
                                    }}
                                >
                                    <SelectTrigger className="w-full border-2 border-gray-500 ">
                                        <SelectValue placeholder="Selecciona" />
                                    </SelectTrigger>
                                    <SelectContent className="h-[100px] px-0">
                                        <SelectItem
                                            value={"0"}
                                        >
                                            Excento
                                        </SelectItem>
                                        <SelectItem
                                            value={"0.1066"}
                                        >
                                            10.6%
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className='w-full'>
                                <label htmlFor="codigoSat">ISR</label>
                                <Select
                                    key={"ISR"}
                                    className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                                    onValueChange={(e)=>{
                                        formikPro.setFieldValue("isr",e)
                                    }}
                                >
                                    <SelectTrigger className="w-full border-2 border-gray-500 ">
                                        <SelectValue placeholder="Selecciona" />
                                    </SelectTrigger>
                                    <SelectContent className="h-[100px] px-0">
                                        <SelectItem
                                            value={"0"}
                                        >
                                            Excento
                                        </SelectItem>
                                        <SelectItem
                                            value={"0.0125"}
                                        >
                                            1.25%
                                        </SelectItem>
                                        <SelectItem
                                            value={"0.10"}
                                        >
                                            10%
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                        <div className='flex gap-x-3 items-center mt-5 justify-end'>
                            <button type='button' className='px-4 py-1 bg-gray-300 transition-all hover:bg-LogoBlue hover:text-white font-semibold  w-fit' onClick={() => { setShowProductoDialog(false) }}>Cancelar</button>
                            <button type='submit' disabled={!formikPro.isValid || formikPro.isSubmitting ? true : false} className='px-4 py-1 bg-gray-300 transition-all disabled:opacity-50 hover:bg-LogoBlue hover:text-white font-semibold  w-fit' >Guardar</button>
                        </div>
                    </form>

                </DialogContent>
            </Dialog>
        </>
    )
}
