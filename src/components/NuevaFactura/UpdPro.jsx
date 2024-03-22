import React, { useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import EditarSVG from "../../assets/Editar.svg";
import { useFormik } from 'formik';

export const UpdPro = ({producto}) => {
    const [showProductEdit, setshowProductEdit] = useState(false)

    
    return (
        <>
            <Dialog key={'AgregarProducto'} open={showProductEdit} onClose={() => setshowProductEdit(false)}>
                <DialogContent className="sm:max-w-[520px] overflow-y-auto overflow-x-hidden h-fit">
                    <form onSubmit={formik.handleSubmit} className='w-full h-full flex gap-y-3 flex-col ' >
                        <div className='w-full h-full text-xl text-LogoBlue font-semibold flex gap-y-3 flex-col '>
                            Editar Producto
                        </div>

                        {/* Descripcion */}
                        <div className='w-full h-fit flex flex-col px-1'>
                            <label htmlFor="descripcion">Cantidad</label>
                            <input
                                type="number" name='descripcion'
                                placeholder='Maximo 1000 caracteres'
                                className='border-[1px] resize-none  px-2 py-1 border-gray-300'
                                onChange={formik.handleChange}
                            />
                            {
                                formik.errors.cantidad &&
                                (<>
                                    <h2 className='text-[12px] text-red-500'>*Campo Requerido</h2>
                                </>)
                            }
                        </div>

                        <div className='flex gap-x-3 items-center mt-5 justify-end'>
                            <button type='button' className='px-4 py-1 bg-gray-300 transition-all hover:bg-LogoBlue hover:text-white font-semibold  w-fit' onClick={() => { setshowProductEdit(false) }}>Cancelar</button>
                            <button
                                type='submit'
                                //</div>disabled={!formikPro.isValid || formikPro.isSubmitting ? true : false} 
                                className='px-4 py-1 bg-gray-300 transition-all disabled:opacity-50 hover:bg-LogoBlue hover:text-white font-semibold  w-fit'
                            >Guardar</button>
                        </div>

                    </form>

                </DialogContent>
            </Dialog>
            <img className='w-6 h-6 cursor-pointer' onClick={() => setshowProductEdit(true)} src={EditarSVG} />
        </>
    )
}
