import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import * as XLSX from 'xlsx';

import { MainLayoutDg } from '../../layouts/MainLayoutDg'
import { FormContainer } from '../../components/ui/FormContainer'

export const PruebasExcel = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [Facturas, setFacturas] = useState(null)
    const [TipoDeFactura, setTipoDeFactura] = useState("Por Definir")

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
    
        if (selectedFile) {
            setFile(selectedFile);
    
            const reader = new FileReader();
            reader.onload = (event) => {
                const binaryData = event.target.result;
                const workbook = XLSX.read(binaryData, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
                // Paso 1 y 2: Limpiar datos y filtrar filas no deseadas
                let cleanedData = jsonData.map(row =>
                    row.map(cell => {
                        if (typeof cell === 'string') {
                            let cleaned = cell.replace(/\(val\._act\.\)_/ig, "").replace(/[\r\n]+/g, " ");
                            cleaned = cleaned.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_');
                            return cleaned;
                        }
                        return cell;
                    })
                ).filter(row => row.length != 0 && row.length > 20);
    
                // Paso 3: Asumiendo que ya tienes una estructura limpia y consistente
                // Paso 4 y 5: Eliminar duplicados y filtrar valores inconsistentes (simplificado)
                let uniqueRows = [];
                let valueTypes = {}; // Para almacenar los tipos esperados de cada columna
    
                cleanedData.forEach(row => {
                    // Supongamos que la unicidad se determina por una combinación de columnas, por ejemplo, las primeras tres columnas
                    let uniqueKey = row.slice(0, 3).join('|');
                    if (!uniqueRows.find(existingRow => existingRow.slice(0, 3).join('|') === uniqueKey)) {
                        // Validar y corregir tipos de datos aquí según sea necesario
                        uniqueRows.push(row);
                    }
                });
    
                // Establecer datos filtrados y únicos
                setData(uniqueRows);
            };
            reader.readAsBinaryString(selectedFile);
        }
    };
    


    useEffect(() => {
        if (data.length > 0) {
            const facturas = data.slice(1).map((facturaData) => {
                const factura = {};
                data[0].forEach((columna, index) => {
                    // Limpiar el nombre de la columna: eliminar espacios y convertir a minúsculas
                    const nombreLimpio = columna.replace(/\s+/g, '_').toLowerCase();
                    factura[nombreLimpio] = facturaData[index];
                });
                return factura;
            });

            setFacturas(facturas)
        }
    }, [data])

    console.log(Facturas)

    return (
        <MainLayoutDg isblack={true}>
            <FormContainer>
                <div className='w-full h-full flex justify-center items-center'>
                    <div className=' w-[80%] p-4 rounded-md h-full bg-white'>
                        <h1>Contenido de Prueba para archvios excel</h1>
                        <div className='flex space-x-3'>
                            <h2>Tipo de Factura a Cargar: </h2>
                            <select onChange={(e) => { setTipoDeFactura(e.target.value) }}>
                                <option value="Emitidas">Facturas Emitidas</option>
                                <option value="Recibidas">Facturas Recibidas</option>
                            </select>
                        </div>

                        <div className="mt-4">

                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept=".xlsx, .xls"
                                className="mb-4"
                            />
                            {
                                Facturas && (
                                    <div className="overflow-x-auto">
                                        <h1 className='font-bold text-2xl text-black'>Cantidad de Facturas: {Facturas.length}</h1>
                                    </div>)
                            }
                        </div>

                        <div className="overflow-x-auto whitespace-no-wrap">
                            <div className="flex space-x-3">
                                {Facturas?.map((factura, index) => (
                                    <div key={index} className="flex-shrink-0 shadow-md rounded-md p-4 border">
                                        <h3 className='font-bold'>ID de la factura: <span className='font-normal'>{factura?.uuid}</span></h3>
                                        <h3 className='font-bold'>Nombre del emisor: <span className='font-normal'>{factura?.nombre_emisor}</span></h3>
                                        <h3 className='font-bold'>RFC del emisor: <span className='font-normal'>{factura?.rfc_emisor}</span></h3>
                                        <h3 className='font-bold'>Nombre del receptor: <span className='font-normal'>{factura?.nombre_receptor}</span></h3>
                                        <h3 className='font-bold'>RFC del receptor: <span className='font-normal'>{factura?.rfc_receptor}</span></h3>
                                        <h3 className='font-bold'>Fecha de emision: <span className='font-normal'>{factura?.fecha_emision}</span></h3>
                                        <h3 className='font-bold'>Forma de Pago: <span className='font-normal'>{factura?.formadepago}</span></h3>
                                        <div className='w-full mt-2 flex space-x-2'>
                                            <h3 className='font-bold'>Total: <span className='font-normal'>{factura?.total} {factura.moneda}</span> </h3>
                                            <h3 className='font-bold'>SubTotal: <span className='font-normal'>{factura?.subtotal} {factura.moneda}</span> </h3>
                                            <h3 className='font-bold'>Total Trasladado: <span className='font-normal'>{factura?.total_trasladados} {factura.moneda}</span> </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className='py-2 mt-3 px-4 bg-black rounded-md text-white cursor-pointer transition-all hover:bg-black/70'>Cargar Facturas: {TipoDeFactura}</button>
                    </div>
                </div>
            </FormContainer>
        </MainLayoutDg>
    )
}
