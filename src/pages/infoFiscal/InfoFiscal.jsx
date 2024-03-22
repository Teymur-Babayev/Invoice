import React, { useEffect, useRef, useState } from 'react'
import { MainLayoutDg } from '../../layouts/MainLayoutDg'
import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Pencil, User2 } from 'lucide-react'
import * as Yup from "yup";
import { RegimenFiscalInfo } from "../../assets/adminData";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
import { useFormik } from 'formik'
import { InfoFiscal as INF } from "../../api/infoFiscal";
import { useToast } from '../../components/ui/use-toast'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
}
    from "../../components/ui/tooltip";

const IFCTRL = new INF()
const InfoFiscal = () => {

    const { User } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!User) {
            navigate("/", { replace: true });
        }
    }, [User])

    const [RazonSocial, setRazonSocial] = useState("")

    const fileInputCER = useRef(null);
    const fileInputKEY = useRef(null);

    const FileSelloCer = useRef(null);
    const FileSelloKey = useRef(null);

    const fileInputLogo = useRef(null);

    const [RegimenFiscal, setRegimenFiscal] = useState("")
    const [ToggleCIEC, setToggleCIEC] = useState(false)
    const [CFA, setCFA] = useState(false)
    const [CSD, setCFD] = useState(false)

    // Estados para almacenar los nombres de los archivos
    const [nombreArchivoCER, setNombreArchivoCER] = useState('');
    const [nombreArchivoKEY, setNombreArchivoKEY] = useState('');
    // Estados para almacenar los nombres de los archivos
    const [NombreSelloCer, setNombreSelloCer] = useState('');
    const [NombreSelloKey, setNombreSelloKey] = useState('')

    const hcToggleCIEC = () => {
        setToggleCIEC(!ToggleCIEC)
    }

    const hcToggleCFA = () => {
        setCFA(!CFA)
    }

    const hcToggleCFD = () => {
        setCFD(!CSD)
    }

    const handleClickLogo = () => {
        fileInputLogo.current.click();
    };

    const handleClickCER = () => {
        fileInputCER.current.click();
    };

    const handleClickKEY = () => {
        fileInputKEY.current.click();
    };

    const handleSelloCer = () => {
        FileSelloCer.current.click();
    }

    const handleSelloKey = () => {
        FileSelloKey.current.click();
    }

    const [ImgSrc, setImgSrc] = useState("")

    const handleFileSelectLogo = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Actualizar el estado con la URL de la imagen
                setImgSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileSelectKEY = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue("FirmaArchKey", file);
            setNombreArchivoKEY(file.name); // Actualizar el nombre del archivo
        }
    };

    const handleFileSelectCER = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue("FirmaArchCer", file);
            setNombreArchivoCER(file.name); // Actualizar el nombre del archivo
        }
    };

    const handleFileSelloCer = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue("SelloArchCer", file);
            setNombreSelloCer(file.name);
        }
    }

    const handleFileSelloKey = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue("SelloArchKey", file);
            setNombreSelloKey(file.name);
        }
    }

    const { toast } = useToast();

    const formik = useFormik({
        initialValues: {
            razonSocial: "",
            rfc: "",
            ciec: "",
            regimenFiscal: "",
            folio: 0,
            telefono: "",
            codigoPostal: "",
            municipio: "",
            estado: "",
            colonia: "",
            calle: "",
            noExterior: "",
            noInterior: "",
            FirmaArchCer: null,
            FirmaArchKey: null,
            SelloArchCer: null,
            SelloArchKey: null,
            contraFirmaAvan: "",
            contraSellosDig: "",
            logotipo: ""
        },
        validationSchema: Yup.object({
            razonSocial: Yup.string()
                .matches(/^[A-Za-z ]+$/, "Solo se permiten letras")
                .required("Requerido"),
            rfc: Yup.string()
                .matches(/^[A-Za-z0-9]{13}$/, "Debe ser alfanumérico y tener exactamente 13 caracteres")
                .required("Requerido"),
            ciec: Yup.string()
                .matches(/^[A-Za-z0-9]+$/)
                .required("Requerido"),
            //regimenFiscal: 
            folio: Yup.number()
                .required("El folio es requerido")
                .moreThan(0, "El folio debe ser mayor que 0"),
            telefono: Yup.string()
                .matches(/^[\d\s-]{10,14}$/, "El número de teléfono debe tener entre 10 y 14 dígitos y puede incluir espacios o guiones")
                .required("Requerido"),
            codigoPostal: Yup.string()
                .matches(/^\d{5}$/, "El código postal debe tener 5 dígitos")
                .required("Requerido"),
            municipio: Yup.string()
                .matches(/^[A-Za-z\s]+$/, "Solo se permiten letras y espacios")
                .required("Requerido"),
            estado: Yup.string()
                .matches(/^[A-Za-z\s]+$/, "Solo se permiten letras y espacios")
                .required("Requerido"),
            colonia: Yup.string()
                .matches(/^[A-Za-z0-9\s]+$/, "Solo se permiten caracteres alfanuméricos y espacios")
                .required("Requerido"),
            calle: Yup.string()
                .matches(/^[A-Za-z0-9\s]+$/, "Solo se permiten caracteres alfanuméricos y espacios")
                .required("Requerido"),
            noExterior: Yup.string()
                .matches(/^[A-Za-z0-9\s]*$/, "Solo se permiten caracteres alfanuméricos y espacios")
                .notRequired(),
            noInterior: Yup.string()
                .matches(/^[A-Za-z0-9\s]*$/, "Solo se permiten caracteres alfanuméricos y espacios")
                .notRequired(),
            FirmaArchCer: Yup.mixed()
                .required("Un archivo es requerido")
                .test("fileType", "Solo se admiten archivos .cer", (value) => {
                    return value && value.name.endsWith('.cer');
                }),
            FirmaArchKey: Yup.mixed()
                .required("Un archivo es requerido")
                .test("fileType", "Solo se admiten archivos .key", (value) => {
                    return value && value.name.endsWith('.key');
                }),
            SelloArchCer: Yup.mixed()
                .required("Un archivo es requerido")
                .test("fileType", "Solo se admiten archivos .cer", (value) => {
                    return value && value.name.endsWith('.cer');
                }),
            SelloArchKey: Yup.mixed()
                .required("Un archivo es requerido")
                .test("fileType", "Solo se admiten archivos .key", (value) => {
                    return value && value.name.endsWith('.key');
                }),
            contraFirmaAvan: Yup.string()
                .required("Requerido"),
            contraSellosDig: Yup.string()
                .required("Requerido"),
            logotipo: Yup.mixed()
                .test(
                    "fileType",
                    "Solo se admiten archivos JPG o PNG",
                    value => value && (value.type === "image/jpeg" || value.type === "image/png")
                )
        }),
        validateOnChange: true,
        onSubmit: async (formValue) => {
            let findedRegimen = RegimenFiscalInfo.find(regimen => regimen.nombre === formValue.regimenFiscal)
            let InfoFiscal = {
                razonSocial: formValue.razonSocial,
                rfc: formValue.rfc,
                ciec: formValue.ciec,
                regimenFiscal: findedRegimen.clave,
                folio: formValue.folio,
                telefono: formValue.telefono,
                direccion: {
                    codigoPostal: formValue.codigoPostal,
                    municipio: formValue.municipio,
                    estado: formValue.estado,
                    colonia: formValue.colonia,
                    calle: formValue.calle,
                    noExterior: formValue.noExterior,
                    noInterior: formValue.noInterior
                },
                contraFirma: formValue.contraFirmaAvan,
                contraSello: formValue.contraSellosDig,
                logotipoUrl: await IFCTRL.SubirFotoLogoTipo(formValue.logotipo, User.uid),
                FirmaCerUrl: await IFCTRL.SubirArchivoCerKey(formValue.FirmaArchCer, User.uid, "FirmaCer"),
                FirmaKeyUrl: await IFCTRL.SubirArchivoCerKey(formValue.FirmaArchKey, User.uid, "FirmaKey"),
                SelloCerUrl: await IFCTRL.SubirArchivoCerKey(formValue.SelloArchCer, User.uid, "SelloCer"),
                SelloKeyUrl: await IFCTRL.SubirArchivoCerKey(formValue.SelloArchKey, User.uid, "SelloKey"),
            }

            const resp = await IFCTRL.createInfoFiscal(User.uid, InfoFiscal)

            if (resp) {
                toast({
                    title: "Datos Agregados Exitosamente",
                });

                navigate("/micuenta")
            } else {
                toast({
                    variant: "destructive",
                    title: "Error al Subir Datos",
                });
            }
        }
    })

    return (
        <MainLayoutDg>
            <div className='w-full flex h-full min-h-[100dvh] pt-[20dvh] bg-white'>
                 <form
                    onSubmit={formik.handleSubmit}
                    className='w-full h-full mx-[2%] md:mx-[10%]'>
                    <div className='w-full'>
                        <h2 className='font-semibold text-cyan-800 text-3xl mb-5'>¡Hola! Bienvenido</h2>

                        <p className='text-cyan-800'>Completa la siguiente informacion para que puedas emitir facturas cuanto antes</p>

                        <h2 className='font-semibold mt-2 text-cyan-800 text-3xl mb-5'>Información personal</h2>
                    </div>
                    <div className='w-full flex flex-col md:flex-row py-2'>
                        {/* LOGO */}
                        <div className='border-2 w-full md:w-1/2  flex md:flex-row flex-col gap-y-3 md:gap-y-0 gap-x-5 justify-around py-4 px-2 border-gray-500 rounded-md'>
                            <div onClick={handleClickLogo} className='w-[80%] mx-auto md:mx-0 md:w-[40%] relative bg-gray-400/40 cursor-pointer shadow-md shadow-gray-400 rounded-md flex justify-center items-center'>
                                {/* Muestra el componente User2 solo si no hay una imagen cargada */}
                                {!ImgSrc && <User2 className='w-40 h-40 fill-white text-white' />}

                                {/* Muestra la imagen cargada si existe una URL en el estado */}
                                {ImgSrc && <img src={ImgSrc} className='w-full h-full object-cover' alt="" />}

                                <div className='absolute top-3 p-2 right-3 bg-white rounded-full shadow-md'>
                                    <Pencil className='w-5 h-5 fill-black' />
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        ref={fileInputLogo}
                                        onChange={(event) => {
                                            formik.setFieldValue("logotipo", event.currentTarget.files[0])
                                            handleFileSelectLogo(event)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='w-full md:w-[60%] md:block flex flex-col items-center justify-center  space-y-3'>
                                <h3 className='text-gray-700 text-2xl'>Agrega tu logotipo y <br />
                                    personaliza tus facturas</h3>

                                <p className='text-gray-500 text-[14px]'>
                                    Formato PNG o JPG 180 x 180 px de  <br />
                                    resolución y menos de 1MB de <br />
                                    tamaño
                                </p>

                                <button disabled={formik.errors.logotipo ? true : false} className='w-[70%] py-3 px-5 disabled:opacity-50 bg-gray-300 text-gray-500 rounded-sm'>Guardar logo</button>
                            </div>
                        </div>
                        {/* Razon social */}
                        <div className='w-full  mt-5 md:mt-0 md:w-1/2 px-3'>
                            <label htmlFor="RS">Razón social*</label>
                            <input
                                type="text"
                                className={`w-full border-2 outline-none border-gray-500 py-1 px-3 rounded-sm ${formik.errors.razonSocial &&
                                    "border-red-500 border-2  placeholder:text-red-600"
                                    }`}
                                name="razonSocial"
                                value={formik.values.razonSocial}
                                onChange={formik.handleChange}
                            />

                            <div className='w-full flex items-center justify-between gap-x-5'>
                                <div className='w-1/2'>
                                    <label htmlFor="RFC">RFC*</label>
                                    <input
                                        className={`w-full border-2 outline-none border-gray-500 py-1 px-3 rounded-sm ${formik.errors.rfc &&
                                            "border-red-500 border-2  placeholder:text-red-600"
                                            }`}
                                        name="rfc"
                                        value={formik.values.rfc.toUpperCase()}
                                        onChange={formik.handleChange} />
                                </div>

                                <div className='w-1/2'>
                                    <label htmlFor="CIEC">CIEC*</label>
                                    <div
                                        className={`w-full flex border-2 outline-none py-1 px-3 rounded-sm ${formik.touched.ciec && formik.errors.ciec ? "border-red-500 placeholder:text-red-600" : "border-gray-500"
                                            }`}
                                    >
                                        <input
                                            className="w-full bg-transparent outline-none border-0 focus:border-0 focus:ring-0 active:ring-0 active:border-0"
                                            type={ToggleCIEC ? "text" : "password"}
                                            name="ciec"
                                            value={formik.values.ciec}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} // Asegúrate de incluir el manejo del evento onBlur para actualizar formik.touched.ciec
                                        />
                                        {ToggleCIEC ? (
                                            <EyeOff className="cursor-pointer" onClick={hcToggleCIEC} />
                                        ) : (
                                            <Eye className="cursor-pointer" onClick={hcToggleCIEC} />
                                        )}
                                    </div>

                                </div>
                            </div>

                            <div className='w-full flex items-center justify-between gap-x-5'>
                                <div className='w-1/2'>
                                    <label htmlFor="RF">Régimen Fiscal</label>
                                    <Select
                                        key={1}
                                        className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                                        onValueChange={(e) => {
                                            setRegimenFiscal(e)
                                            formik.setFieldValue("regimenFiscal", e)
                                        }}
                                        value={RegimenFiscal}
                                    >
                                        <SelectTrigger className="w-full border-2 border-gray-500 ">
                                            <SelectValue placeholder="Selecciona" />
                                        </SelectTrigger>
                                        <SelectContent className="h-fit px-0">
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

                                <div className='w-1/2'>
                                    <label htmlFor="CIEC">Folio de inicio</label>
                                    <input
                                        className={`w-full border-2 outline-none border-gray-500 py-1 px-3 rounded-sm ${formik.errors.folio &&
                                            "border-red-500 border-2  placeholder:text-red-600"
                                            }`}
                                        type="number"
                                        name="folio"
                                        value={formik.values.folio}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>

                            <label htmlFor="telefono">Número de celular para notificaciones</label>
                            <input
                                type="tel"
                                className={`w-full border-2 outline-none border-gray-500 py-1 px-3 rounded-sm ${formik.errors.telefono &&
                                    "border-red-500 border-2  placeholder:text-red-600"
                                    }`}
                                name="telefono"
                                value={formik.values.telefono}
                                onChange={formik.handleChange} />
                        </div>
                    </div>

                    <div className='w-full'>
                        <h2 className='font-semibold mt-2 text-cyan-800 text-3xl mb-5'>Domicilio fiscal</h2>
                    </div>

                    <div className='w-full py-2'>

                        <div className='w-full px-3 md:px-0 flex md:flex-row flex-col items-center justify-between gap-x-5'>
                            <div className='w-full md:w-1/3'>
                                <label htmlFor="CodPost">Codigo postal*</label>
                                <input
                                    className={`w-full border-2 outline-none border-gray-500 py-1 px-3 rounded-sm ${formik.errors.codigoPostal &&
                                        "border-red-500 border-2  placeholder:text-red-600"
                                        }`}
                                    type="number"
                                    name="codigoPostal"
                                    value={formik.values.codigoPostal}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className='w-full md:w-1/3'>
                                <label htmlFor="Municipio">Municipio</label>
                                <input
                                    type="text"
                                    className={`w-full border-2 outline-none border-gray-500 py-1 px-3 rounded-sm ${formik.errors.municipio &&
                                        "border-red-500 border-2  placeholder:text-red-600"
                                        }`}
                                    name="municipio"
                                    value={formik.values.municipio}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className='w-full md:w-1/3'>
                                <label htmlFor="Estado">Estado</label>
                                <input
                                    className={`w-full border-2 outline-none border-gray-500 py-1 px-3 rounded-sm ${formik.errors.estado &&
                                        "border-red-500 border-2  placeholder:text-red-600"
                                        }`}
                                    type="text"
                                    name="estado"
                                    value={formik.values.estado}
                                    onChange={formik.handleChange} />
                            </div>
                        </div>

                        <div className='w-full flex md:flex-row flex-col items-center justify-between gap-x-5 mt-4'>
                            <div className='w-full md:w-1/3'>
                                <label htmlFor="Colonia">Colonia*</label>
                                {/* <Select
                                    key={2}
                                    className="border-none ring-0 focus:ring-0 text-black placeholder:text-black"
                                // onValueChange={(e) => { setMesFiltro(e) }}
                                // value={MesFiltro}
                                >
                                    <SelectTrigger className="w-full border-2 border-gray-500 ">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="h-[40dvh] px-0">

                                        <SelectItem
                                        // key={mes}
                                        // value={`${mes} ${Year}`}
                                        >
                                            Colonia
                                        </SelectItem>
                                    </SelectContent>
                                </Select> */}
                                <input
                                    className={`w-full border-2 outline-none border-gray-500 py-1 px-3 rounded-sm ${formik.errors.colonia &&
                                        "border-red-500 border-2  placeholder:text-red-600"
                                        }`}
                                    type="text"
                                    name="colonia"
                                    value={formik.values.colonia}
                                    onChange={formik.handleChange} />
                            </div>

                            <div className='w-full md:w-1/3'>
                                <label htmlFor="Calle">Calle*</label>
                                <input
                                    className={`w-full border-2 outline-none border-gray-500 py-1 px-3 rounded-sm ${formik.errors.calle &&
                                        "border-red-500 border-2  placeholder:text-red-600"
                                        }`}
                                    type="text"
                                    name="calle"
                                    value={formik.values.calle}
                                    onChange={formik.handleChange} />
                            </div>

                            <div className='w-full md:w-1/3 flex justify-between items-center gap-x-5'>
                                <div className='w-1/2'>
                                    <label htmlFor="NumExterior">No. exterior</label>
                                    <input
                                        type="text"
                                        className={`w-full border-2 outline-none border-gray-500 py-1 px-3 rounded-sm ${formik.errors.noExterior &&
                                            "border-red-500 border-2  placeholder:text-red-600"
                                            }`}
                                        name="noExterior"
                                        value={formik.values.noExterior}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <label htmlFor="NumInterior">No. interior</label>
                                    <input
                                        type="text"
                                        className={`w-full border-2 outline-none border-gray-500 py-1 px-3 rounded-sm ${formik.errors.noInterior &&
                                            "border-red-500 border-2  placeholder:text-red-600"
                                            }`}
                                        name="noInterior"
                                        value={formik.values.noInterior}
                                        onChange={formik.handleChange}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='w-full'>
                        <h2 className='font-semibold mt-2 text-cyan-800 text-3xl mb-3'>Firma electrónica avanzada y certificado de sellos digitales</h2>

                        <p className='text-gray-600'>*Es importante que subas tus sellos digitales, ya que sin ellos no podrás emitir facturas.</p>
                    </div>

                    <div className='w-full h-4 flex justify-between mt-4 px-2'>
                        <div className='md:w-1/2 w-full px-2 gap-x-2 flex items-center '>
                            <span className='text-LogoBlueDark font-bold'>E.firma</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><span className='text-LogoBlueDark border-2 rounded-full border-LogoBlueDark px-[3px] text-[10px]'>?</span></TooltipTrigger>
                                    <TooltipContent className="py-6 px-4 text-black font-semibold">
                                        <p>La e.firma es un archivo digital que contiene la clave <br /> 
                                        privada del contribuyente y se utiliza para firmar <br />
                                        electrónicamente documentos fiscales, como la <br />
                                        presentación de declaraciones y la realización de <br />
                                        trámites ante el SAT
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className='md:w-1/2 w-full px-2 gap-x-2 flex items-center '>
                            <span className='text-LogoBlueDark font-bold'>Certificado de sellos digitales</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><span className='text-LogoBlueDark border-2 rounded-full border-LogoBlueDark px-[3px] text-[10px]'>?</span></TooltipTrigger>
                                    <TooltipContent className="py-6 px-4 gap-y-3">
                                        <p>Se trata de un archivo electrónico que sirve para firmar/sellar <br />
                                            los Comprobantes Fiscales (CDFI) emitidos por los <br />
                                            contribuyentes, con el fin de autenticarlos mediante <br />
                                            una cadena original y otorgarles legalidad.
                                        </p>
                                        <p className='font-bold mt-3'>
                                            Recuerda que para poder solicitar tu Certificado de <br />
                                            Sello Digital es necesario que tu e.firma esté vigente, <br />
                                            pues las necesitarás para firmar tu solicitud
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>

                    <div className='w-full flex md:flex-row flex-col gap-y-3 md:gap-y-0 items-center justify-between py-4 px-2 gap-x-5'>
                        <div className='w-full md:w-1/2  border-gray-500 rounded-sm border-2 px-9 py-5'>
                            <label htmlFor="Estado">Sube tu archivo .CER</label>

                            <div
                                onClick={handleClickCER}
                                className={`w-full border-2 border-gray-500 flex overflow-hidden mt-3 rounded-md items-center justify-end ${formik.errors.FirmaArchCer
                                    ? "border-red-500 placeholder:text-red-600"
                                    : "border-gray-500"
                                    }`}>
                                {nombreArchivoCER && !formik.errors.FirmaArchCer && (
                                    <h2 className='line-clamp-3 text-[12px] text-black w-[70%] overflow-hidden'>{nombreArchivoCER}</h2>
                                )}
                                {nombreArchivoCER && formik.errors.FirmaArchCer && (
                                    <h2 className='text-red-500 text-[12px] mr-auto pl-4'>Archivo Invalido</h2>
                                )}
                                <button className='w-[33%] py-1 h-full bg-gray-300 border-l-2 border-gray-500'>Browse</button>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={fileInputCER}
                                    onChange={handleFileSelectCER}
                                />
                            </div>

                            <label htmlFor="Estado">Sube tu archivo .KEY</label>
                            <div
                                onClick={handleClickKEY}
                                className={`w-full border-2 border-gray-500 flex overflow-hidden mt-3 rounded-md items-center justify-end ${formik.errors.FirmaArchKey
                                    ? "border-red-500 placeholder:text-red-600"
                                    : "border-gray-500"
                                    }`}>
                                {nombreArchivoCER && !formik.errors.FirmaArchKey && (
                                    <h2 className='line-clamp-3 text-[12px] w-[70%] overflow-hidden'>{nombreArchivoKEY}</h2>
                                )}
                                {nombreArchivoCER && formik.errors.FirmaArchKey && (
                                    <h2 className='text-red-500 text-[12px] mr-auto pl-4'>Archivo Invalido</h2>
                                )}
                                <button className='w-[33%] py-1 h-full bg-gray-300 border-l-2 border-gray-500'>Browse</button>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={fileInputKEY}
                                    onChange={handleFileSelectKEY}
                                />
                            </div>

                            <div className='mt-4'>
                                <label htmlFor="ContraFirmaAvan">Contraseña de la firma electrónica avanzada</label>
                                <div
                                    className={`w-full flex border-2 outline-none py-1 px-3 rounded-sm ${formik.touched.contraFirmaAvan && formik.errors.contraFirmaAvan ? "border-red-500 placeholder:text-red-600" : "border-gray-500"
                                        }`}
                                >
                                    <input
                                        className={`w-full bg-transparent outline-none border-0 focus:border-0 focus:ring-0 active:ring-0 active:border-0`}
                                        type={CFA ? "text" : "password"}
                                        name="contraFirmaAvan"
                                        value={formik.values.contraFirmaAvan}
                                        onChange={formik.handleChange}
                                    />
                                    {CFA ? (
                                        <EyeOff
                                            className={`cursor-pointer`}
                                            onClick={hcToggleCFA}
                                        />
                                    ) : (
                                        <Eye
                                            className={`cursor-pointer`}
                                            onClick={hcToggleCFA}
                                        />
                                    )}
                                </div>

                            </div>

                            <div className='flex items-center justify-end mt-5'>
                                <button disabled={!formik.errors.FirmaArchCer && !formik.errors.FirmaArchKey ? false : true} className='bg-esatDark disabled:opacity-50 text-white w-[50%] py-3'>Cargar archivos</button>
                            </div>
                        </div>
                        <div className='w-full md:w-1/2  border-gray-500 rounded-sm border-2 px-9 py-5'>
                            <label htmlFor="Estado">Sube tu archivo .CER</label>
                            <div
                                onClick={handleSelloCer}
                                className={`w-full border-2 border-gray-500 flex overflow-hidden mt-3 rounded-md items-center justify-end ${formik.errors.SelloArchCer
                                    ? "border-red-500 placeholder:text-red-600"
                                    : "border-gray-500"
                                    }`}
                            >
                                {NombreSelloCer && !formik.errors.SelloArchCer && (
                                    <h2 className='line-clamp-3 text-[12px] w-[70%] overflow-hidden'>{NombreSelloCer}</h2>
                                )}
                                {NombreSelloCer && formik.errors.SelloArchCer && (
                                    <h2 className='text-red-500 text-[12px] mr-auto pl-4'>Archivo Invalido</h2>
                                )}
                                <button className='w-[33%] py-1 h-full bg-gray-300 border-l-2 border-gray-500'>Browse</button>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={FileSelloCer}
                                    onChange={handleFileSelloCer}
                                />
                            </div>

                            <label htmlFor="Estado">Sube tu archivo .KEY</label>
                            <div
                                onClick={handleSelloKey}
                                className={`w-full border-2 border-gray-500 flex overflow-hidden mt-3 rounded-md items-center justify-end ${formik.errors.SelloArchKey
                                    ? "border-red-500 placeholder:text-red-600"
                                    : "border-gray-500"
                                    }`}>
                                {NombreSelloKey && !formik.errors.SelloArchKey && (
                                    <h2 className='line-clamp-3 text-[12px] w-[70%] overflow-hidden'>{NombreSelloKey}</h2>
                                )}
                                {NombreSelloKey && formik.errors.SelloArchKey && (
                                    <h2 className='text-red-500 text-[12px] mr-auto pl-4'>Archivo Invalido</h2>
                                )}
                                <button className='w-[33%] py-1 h-full bg-gray-300 border-l-2 border-gray-500'>Browse</button>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={FileSelloKey}
                                    onChange={handleFileSelloKey}
                                />
                            </div>

                            <div className='mt-4'>
                                <label htmlFor="ContraFirmaAvan">Contraseña de los sellos digitales*</label>

                                <div
                                    className={`w-full flex border-2 outline-none py-1 px-3 rounded-sm ${formik.touched.contraFirmaAvan && formik.errors.contraFirmaAvan ? "border-red-500 placeholder:text-red-600" : "border-gray-500"
                                        }`}
                                >
                                    <input
                                        className={`w-full bg-transparent outline-none border-0 focus:border-0 focus:ring-0 active:ring-0 active:border-0`}
                                        type={CSD ? "text" : "password"}
                                        name="contraSellosDig"
                                        value={formik.values.contraSellosDig}
                                        onChange={formik.handleChange}
                                    />
                                    {CSD ? (
                                        <EyeOff
                                            className={`cursor-pointer`}
                                            onClick={hcToggleCFD}
                                        />
                                    ) : (
                                        <Eye
                                            className={`cursor-pointer`}
                                            onClick={hcToggleCFD}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className='flex items-center justify-end mt-5'>
                                <button disabled={!formik.errors.SelloArchCer && !formik.errors.SelloArchKey ? false : true} className='bg-esatDark disabled:opacity-50 text-white w-[50%] py-3'>Cargar archivos</button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full px-5 flex items-center mb-5 gap-x-5 justify-end'>
                        <Link to={"/micuenta"} >
                            Terminar después
                        </Link>

                        <button
                            type='submit'
                            disabled={formik.isValid || !formik.isSubmitting ? false : true}
                            className='bg-LogoBlue disabled:opacity-50 py-3 px-10 text-white '>
                            {formik.isSubmitting ? (<div className="flex justify-center transition-transform animate-spin"><Loader2 /></div>) : "Finalizar"}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayoutDg>
    )
}

export default InfoFiscal



