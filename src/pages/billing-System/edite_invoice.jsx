import React, { useEffect, useRef, useState } from 'react'
import { Auth } from "../../api/fb.invoice";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import Forward10Icon from '@mui/icons-material/Forward10';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';
import EmailIcon from '@mui/icons-material/Email';
import PropTypes from 'prop-types';
import Input from '@mui/material/Input';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import ReplyIcon from '@mui/icons-material/Reply';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { RegimenFiscalInfo } from "../../assets/adminData";
import { pay_way } from "../../assets/adminData";
import { MetodoDePago } from "../../assets/adminData";
import { FormaDePago } from "../../assets/adminData";
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
// import * as Auth_role from './temp.jsx';
import * as $ from 'jquery';
import './index.css';
import e from 'cors';
var before_price = 0, flag1 = 0, flag2 = 0, first_discount = 0, second_discount = 0, first_value = 0, second_value = 0;
var Subtotal_array1 = [], Subtotal_array2 = [];

export const Edit_Invoice = () => {
    
    const out_image = useRef();
    const imageFile = useRef();
    // price information.........................................................
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [second_subtotal, setSubtotal] = useState("");
    const [totalValue, settotalValue] = useState("");
    const [first_total, setfirst_total] = useState("");
    const [second_total, setsecond_total] = useState("");

    // Psersonal information and recevie personal information.....................

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [postalcode_date, setpostalcode_date] = useState("");
    const [csd, setcsd] = useState("");
    const [RFC, setRFC] = useState("");
    const [receiveName, setreceiveName] = useState("");
    const [created_at, setcreated_at] = useState("");
    const [serise, setSerise] = useState("");
    const [folio, setfolio] = useState("");
    const [exterior, setexterior] = useState("");

    // First product service information..........................................

    const [first_Price1, setfirst_Price1] = useState("");
    const [discountPrice1, setdiscountPrice1] = useState("");
    const [description1, setdescription1] = useState("");
    const [productname1, setproductname1] = useState("");
    const [productidentify1, setproductidentify1] = useState("");
    const [quantity1, setquantity1] = useState("");

    // Second product service information.........................................

    const [tax_regime, setTax_state] = useState("");
    const [Payment_method, setPay_toool] = useState("");
    const [InvoiceType, setType_invoice] = useState("");
    const [way_pay, setWay_pay] = useState("");

    const [unitValue, setUnitValue] = useState("");

    const AuthCtrl = new Auth();

    var userEmail = localStorage.getItem("userEmail");

    const Edit_items = async () => {
    
        var user_array = [name,userEmail, address, phone,postalcode_date,csd,RFC,receiveName,tax_regime,serise,folio,exterior,way_pay,
            InvoiceType, Payment_method ,created_at];

        var product_services = [productname1, productidentify1, first_Price1, discountPrice1, description1,  quantity1, unitValue];
            console.log(user_array, product_services, 118)
        if(name != "" && address != "" && phone != "" && postalcode_date != "" && csd != "" && RFC != "" && receiveName != "" && tax_regime != "" && unitValue != "" && serise != "" && folio != "" && exterior != "" && way_pay != "" && InvoiceType != "" && created_at != "" && Payment_method !== "") {
  
                console.log(user_array, 115);
                AuthCtrl.Edit_item(user_array,product_services)
                    .then(res => {
                        console.log(res)
                        alert("Su factura ha sido enviada exitosamente !");
                        return;
                    })
                    .catch(err => {
                        console.log(err);
                        return false;
                });
        }else{
            alert("Enter data correctly !");
        }
    }

    const Get_InvoiceInformation = () =>{
        var Edit_id = localStorage.getItem("Edit_id")
        AuthCtrl.Get_InvoiceInformation(Edit_id).then(res => {
            console.log(res.services, res.invoices, 180)
            setname(res.invoices.name),setphone(res.invoices.phone),
            setemail(res.invoices.email),setreceiveName(res.invoices.business_name)
            setaddress(res.invoices.address),setpostalcode_date(res.invoices.postal_code)
            setcsd(res.invoices.cfd),setRFC(res.invoices.rfc),setexterior(res.invoices.exchange_rate)
            setcreated_at(res.invoices.created_at);setSerise(res.invoices.series),setfolio(res.invoices.folio);
            setTax_state(res.invoices.tax_regime),setPay_toool(res.invoices.pay_method),setWay_pay(res.invoices.pay_way);
            setType_invoice(res.invoices.invoice_type),setreceiveName(res.invoices.business_name)
            
            setproductname1(res.services[0].product_name),setfirst_Price1(res.services[0].price)
            setproductidentify1(res.services[0].identification),setquantity1(res.services[0].quantity)
            setdescription1(res.services[0].description),setdiscountPrice1(res.services[0].discount)
            })                                                                                                                                                                                            
            .catch(err => {
                console.log(err);
                return false;
        });
    }

    const quantity = (key, e) => {
        if (key == 2) {
            console.log(Number(Subtotal_array1[Subtotal_array1.length - 1]));
            if (Subtotal_array2.length !== 0 && second_discount !== "") {
                setquantity2(e)
                second_value = Number(Subtotal_array2[Subtotal_array2.length - 1]) * Number(e) - Number(Subtotal_array2[Subtotal_array2.length - 1]) / 100 * Number(second_discount) * Number(e);
                setsecond_total(second_value.toFixed(2));
                setSubtotal((Number(first_value) + Number(second_value)).toFixed(2));
                console.log(first_value, second_value)
                return;
            } else {
                alert("Enter Price and discount correctly!");
                $('#discountPrice2').val("");
                return;
            }
        }
        else {
            if (Subtotal_array1.length !== 0 && first_discount !== "") {
                setquantity1(e)
                first_value = Number(Subtotal_array1[Subtotal_array1.length - 1]) * Number(e) - Number(Subtotal_array1[Subtotal_array1.length - 1]) / 100 * Number(first_discount) * Number(e);
                setfirst_total(first_value.toFixed(2));
                console.log(first_value, second_value);
                setSubtotal((Number(first_value) + Number(second_value)).toFixed(2));
                return;
            } else {
                alert("Enter Price and discount correctly!");
                $('#discountPrice1').val("");
                return;
            }
        }
    }

    const discountPrice = (key, e) => {
        if (key == 2) {
            if (Subtotal_array2.length !== 0) {
                setdiscountPrice2(e)
                second_discount = Number(Subtotal_array1[Subtotal_array1.length - 1]) / 100 * Number(e);
                setDiscount((Number(first_discount) + Number(Subtotal_array2[Subtotal_array2.length - 1]) / 100 * Number(e)).toFixed(2));
                return;
            } else {
                alert("Enter Price correctly!");
                $('#discountPrice2').val("");
                return;
            }
        }
        else {
            if (Subtotal_array1.length !== 0) {
                setdiscountPrice1(e)
                first_discount = Number(Subtotal_array1[Subtotal_array1.length - 1]) / 100 * Number(e);
                setDiscount((Number(second_discount) + Number(Subtotal_array1[Subtotal_array1.length - 1]) / 100 * Number(e)).toFixed(2));
                return;
            } else {
                alert("Enter Price correctly!");
                $('#discountPrice1').val("");
                return;
            }
        }
    }

    const setPrice_function = (key, e) => {
        if (key == 2) {
            setfirst_Price2(e);
            flag1 = 1;
            if (flag2 === 0) {
                flag2 = 1;
                if (Subtotal_array2[Subtotal_array2.length - 1] !== undefined) {
                    before_price = Subtotal_array2[Subtotal_array2.length - 1];
                    Subtotal_array2.push(e);
                    setPrice(Number(price) - Number(before_price) + Number(e));
                    return;
                } else {
                    Subtotal_array2.push(e);
                    setPrice(Number(price) + Number(e));
                    return;
                }
            }
            if (flag2 === 1) {
                before_price = Subtotal_array2[Subtotal_array2.length - 1];
                Subtotal_array2.push(e);
                setPrice(Number(price) - Number(before_price) + Number(e));
                return;
            }
        }
        else {
            flag2 = 0;
            setfirst_Price1(e);
            if (flag1 === 0) {
                before_price = e;
                flag1 = 1;
                Subtotal_array1.push(e);
                setPrice(e);
                return;
            }
            if (flag1 === 1) {
                before_price = Subtotal_array1[Subtotal_array1.length - 1];
                Subtotal_array1.push(e);
                setPrice(Number(price) - Number(before_price) + Number(e));
                return;
            }
        }
    }

    const StyledButton = styled(IconButton)(({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
    }));

    const StyledDay = styled(PickersDay)(({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        color:
            theme.palette.mode === 'light'
                ? theme.palette.secondary.dark
                : theme.palette.secondary.light,
    }));

    const ProSpan = styled('span')({
        display: 'inline-block',
        height: '1em',
        width: '1em',
        verticalAlign: 'middle',
        marginLeft: '0.3em',
        marginBottom: '0.08em',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
    });

    function Label({ componentName, valueType, isProOnly }) {
        const content = (
            <span>
                <strong>{componentName}</strong> for {valueType} editing
            </span>
        );

        if (isProOnly) {
            return (
                <Stack direction="row" spacing={0.5} component="span">
                    <Tooltip title="Included on Pro package">
                        <a
                            href="https://mui.com/x/introduction/licensing/#pro-plan"
                            aria-label="Included on Pro package"
                        >
                            <ProSpan />
                        </a>
                    </Tooltip>
                    {content}
                </Stack>
            );
        }
        return content;
    }

    const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="(#00) 000-0000"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    });

    TextMaskCustom.propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    const currencies = [
        {
            value: 'PESO',
            label: '$     PESO MEXICANO',
        },
    ];
    
    const generatePDF = ()  =>{
        alert("sfsd")
        // Create a new jsPDF instance
        const pdf = new jsPDF();
  
        // Get HTML content to be converted
        const content = document.getElementById('header-title');
        
        // Options for PDF generation
        const options = {
          // Set the 'background' option to true to include background images and colors
          background: true
        };
        alert("pdf");
        console.log(pdf, content, options)
        // Convert HTML to PDF
        pdf.html(content, options)
          .then(() => {
            // Save the PDF file
            pdf.save('converted_document.pdf');
          })
          .catch(error => {
            console.error('Error generating PDF:', error);
          });
      }

    const defaultProps = {
        options: RegimenFiscalInfo,
        getOptionLabel: (option) => option.nombre,
    };
    
    const defaultway_pay = {
        options: FormaDePago,
        getOptionLabel: (option) => option.nombre,
    };

    const defaultInvoice_type = {
        options: pay_way,
        getOptionLabel: (option) => option.nombre,
    };

    const defaultpay_method = {
        options: MetodoDePago,
        getOptionLabel: (option) => option.nombre,
    };
  
    return (
        <div className="background">
            <div className="container-field">
                <div className="header_">
                    <h1 className="header-title">Editar Factura</h1>
                    <img src="https://mui.com/static/images/avatar/2.jpg" ref={out_image}  className='userAvatar' />
                </div>
                <div id = "content_convert">
                    <div className="row add-row">
                        <div className="col-lg-2">
                            <TextField
                                id="input-with-icon-textfield"
                                label="Nombre"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                            <TextField
                                id="input-with-icon-textfield"
                                label="Correo electrónico"
                                className="textField"
                                value = {email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                onChange={(e) => setemail(e.target.value)}
                            />
                            <TextField
                                className="textField"
                                id="input-with-icon-textfield"
                                label="DIRECCIÓN"

                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HomeIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                value = {address}
                                onChange={(e) => setaddress(e.target.value)}
                            />

                        </div>

                        <div className="col-lg-2">
                            <TextField
                                className="textField_"
                                id="input-with-icon-textfield"
                                label="Número de teléfono"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value = {phone}
                                onChange={(e) => setphone(e.target.value)}
                                variant="standard"
                            />
                            <TextField
                                className="textField"
                                id="input-with-icon-textfield"
                                label="Código Postal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MarkAsUnreadIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                value = {postalcode_date}
                                onChange={(e) => setpostalcode_date(e.target.value)}
                            />
                            <TextField
                                className="textField"
                                id="input-with-icon-textfield"
                                label="Número de serie del CDS"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Forward10Icon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                value = {csd}
                                onChange={(e) => setcsd(e.target.value)}
                            />

                        </div>

                        <div className="col-lg-2">
                            <TextField
                                className="textField_"
                                id="input-with-icon-textfield"
                                label="Número RFC"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocalPoliceIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                value = {RFC}
                                onChange={(e) => setRFC(e.target.value)}
                            />
                            <TextField
                                className="textField"
                                id="input-with-icon-textfield"
                                label="Nombre del Negocio"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                value = {receiveName}
                                onChange={(e) => setreceiveName(e.target.value)}
                            />
                            <Stack spacing={1} >
                                <Autocomplete
                                    className="textField"
                                    style={{borderBottom : "1px solid red"}}
                                    {...defaultProps}
                                    id="disable-close-on-select"
                                    disableCloseOnSelect
                                    renderInput={(params) => (
                                        <TextField {...params} id="tax_state" label="Régimen Fiscal"
                                            variant="standard" />
                                    )}
                                    onChange={(e) => setTax_state(e.target.innerText)} 
                                />
                            </Stack>
                        </div>

                        <div className="col-lg-2">
                            <TextField id="standard-basic" className="textField_" label="Serise" variant="standard" value = {serise} onChange={(e) => setSerise(e.target.value)} />
                            <TextField id="standard-basic" className="textField" label="Fol." variant="standard" value = {folio} onChange={(e) => setfolio(e.target.value)} />
                            <TextField id="standard-basic" className="textField" label="Tipo de cambio" variant="standard" value = {exterior} onChange={(e) => setexterior(e.target.value)} />
                        </div>

                        <div className="col-lg-2">
                            <Stack spacing={1} >
                                <Autocomplete
                                    className="g_textField2"
                                    {...defaultway_pay}
                                    id="disable-close-on-select"
                                    style={{borderBottom : "1px solid red"}}
                                    disableCloseOnSelect
                                    renderInput={(params) => (
                                        <TextField {...params} id="way_pay" label="Forma de pagar"
                                            variant="standard" />
                                    )}
                                    onChange={(e) => setWay_pay(e.target.innerText)}
                                />
                            </Stack>
                            <Stack spacing={1} >
                                <Autocomplete
                                    className="g_textField1"
                                    {...defaultInvoice_type}
                                    id="disable-close-on-select"
                                    style={{borderBottom : "1px solid red"}}
                                    disableCloseOnSelect
                                    renderInput={(params) => (
                                        <TextField {...params} id="type_invoice" label="Tipo de factura"
                                            variant="standard" />
                                    )}
                                    onChange={(e) => setType_invoice(e.target.innerText)} 
                                />
                            </Stack>
                            <Stack spacing={1} >
                                <Autocomplete
                                    className="g_textField"
                                    {...defaultpay_method}
                                    id="disable-close-on-select"
                                    style={{borderBottom : "1px solid red"}}
                                    disableCloseOnSelect
                                    renderInput={(params) => (
                                        <TextField {...params} id="pay_tool" label="Método de pago"
                                            variant="standard" />
                                    )}
                                    
                                    onChange={(e) => setPay_toool(e.target.innerText)} 
                                />
                            </Stack>
                        </div>
                        <div className="col-lg-2">

                            <TextField
                                id="standard-select-currency"
                                select
                                label="Seleccionar"
                                className='pesoState1'
                                style={{ width: "100%" }}
                                defaultValue="PESO"
                                helperText="Selecciona tu moneda"
                                variant="standard"
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <div style={{ marginTop: "49px" }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} className="create_date">
                                    <DemoContainer components={['DatePicker']}   >
                                        <DatePicker
                                            label="Fecha de publicación"
                                            slots={{
                                                openPickerIcon: EditCalendarRoundedIcon,
                                                openPickerButton: StyledButton,
                                                day: StyledDay,
                                            }}
                                            id="start_date"
                                            slotProps={{
                                                openPickerIcon: { fontSize: 'large', backgound: 'white' },
                                                openPickerButton: { color: 'secondary', outline: 'none' },
                                                textField: {
                                                    variant: 'filled',
                                                    focused: true,
                                                    color: 'secondary',
                                                },
                                            }}
                                            value = {email}
                                            onChange={(event) => setcreated_at(event.format('YYYY-MM-DD'))}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>

                            </div>
                        </div>
                    </div>
                    <h2 className="conceptos" >Conceptos</h2>
                    <div className='properties'>
                        <div className="" style={{ width: '100%', overflow: 'auto' }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Producto/Servicios</th>
                                        <th>No.Identificación</th>
                                        <th>Precio</th>
                                        <th>Descuento</th>
                                        <th>Descripción</th>
                                        <th>Cantidad</th>
                                        <th>Unidad de medida</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='products'>
                                    <tr className='basic-field'>
                                        <td><input type="text" className="form-control input_val" id="productname1" value = {productname1} onChange={(event) => setproductname1(event.target.value)} style={{ textAlign: "center" }} /></td>
                                        <td><input type="text" className="form-control input_val" style={{ textAlign: "center" }} value = {productidentify1} onChange={(event) => setproductidentify1(event.target.value)} id="productidentify1" /></td>
                                        <td>
                                            <input type="number" className="form-control input_val" onChange={(e) => setPrice_function(1, e.target.value)} value = {first_Price1} id="first_Price1" style={{ textAlign: "center" }} />
                                        </td>
                                        <td><input type="number" className="form-control input_val" id="discountPrice1" onChange={(e) => discountPrice(1, e.target.value)} value = {discountPrice1}  style={{ textAlign: "center" }} /></td>
                                        <td><textarea className="form-control descriptions" onChange={(e) => setdescription1(e.target.value)} value = {description1}  rows="5" id="description1"></textarea></td>
                                        <td><input type="number" className="form-control input_val" style={{ textAlign: "center" }} id="quantity1" onChange={(e) => quantity(1, e.target.value)} value = {quantity1}  name="username" /></td>
                                        <td>
                                        <select className="form-control input_val" value = {unitValue}  onChange={(e) => setUnitValue(e.target.value)}  id = "unitValue" >
                                            <option> Not apply  </option>
                                            <option> Unit </option>
                                            <option> Service </option>
                                            <option> Piece </option>
                                            <option> Centimeter </option>
                                            <option> Meter </option>
                                            <option> Inch </option>
                                            <option> Squared Centimeter </option>
                                            <option> Squared Meter </option>
                                            <option> Squared Inch </option>
                                            <option> Mililiter </option>
                                            <option> Liter </option>
                                            <option> Gallon </option>
                                            <option> Gram </option>
                                            <option> Kilogram </option>
                                            <option> Ton </option>
                                            <option> Pound </option>
                                            <option> Box </option>
                                        </select>
                                        </td>
                                        <td>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                label=""
                                                className='priceState'
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ {first_total}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="standard"
                                            />
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                  
                                </tbody>
                            </table>
                            <div className='content-description'>
                            </div>
                            <div className="row view_state">
                                <div className="col-sm-3">
                                    <Button variant="contained" className='send-btn' onClick={() => add_row()} style={{ display: "none" }} endIcon={<AddIcon />}> Add row </Button>
                                </div>
                                <div className="col-sm-2" style={{ marginBottom: "20px", fontSize: '30px' }}>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Total parcial"
                                        className='priceState'
                                        disabled
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AttachMoneyIcon className='total' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{price}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        onChange={(event) => handleChange("name", event)}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Descuento"
                                        className='priceState'
                                        disabled
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start" className='avatarPrice'>
                                                    <b style={{ color: "black" }}>- </b> <MoneyOffIcon className='total' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{discount}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        onChange={(event) => handleChange("name", event)}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Total parcial"
                                        className='priceState'
                                        disabled
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment value={"sfsd"} position="start">
                                                    <AttachMoneyIcon className='total' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {second_subtotal}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        onChange={(event) => handleChange("name", event)}
                                    />
                                </div>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-2">
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Total"
                                        className='priceState'
                                        disabled
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountBalanceIcon className='total' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ {second_subtotal}
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        onChange={(event) => handleChange("name", event)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button variant="contained" className='send-btn' onClick={() => Edit_items()} endIcon={<SendIcon />}> Enviar </Button>
                <Link to={"/Client_Information"} >
                    <Button variant="contained" className='back-btn'endIcon={<ReplyIcon />}>Ver historial </Button>
                </Link>
                 <Button variant="contained" className='back-btn' onClick = {() =>generatePDF()}   endIcon={<CloudDownloadIcon />}> Descarga PDF </Button>
                <Link to={"/"} >
                    <Button variant="contained" className='back-btn'endIcon={<ReplyIcon />}> Atrás </Button>
                </Link>

               
            </div>
        </div>
    )

}




