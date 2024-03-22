import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';
import HouseIcon from '@mui/icons-material/House';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Toolbar from '@mui/material/Toolbar';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import HttpsIcon from '@mui/icons-material/Https';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import FilterListIcon from '@mui/icons-material/FilterList';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FormControl from '@mui/material/FormControl';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Auth } from "../../api/fb.invoice";
import { visuallyHidden } from '@mui/utils';
import { change_information } from '../../api/fb.invoice';
import '../admin/css/manage.invoice.css';
import PaidIcon from '@mui/icons-material/Paid';
import './index.css';
import '../admin/css/animation.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Payment} from './payment.jsx';
  const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    const AuthCtrl = new Auth();

    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }

    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
          return order;
        }
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [
      {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'Service Name',
      },
      {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Key',
      },
      {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Description',
      },
      {
        id: 'created_at',
        numeric: true,
        disablePadding: false,
        label: 'Created at',
      },
      {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Unit value',
      },
      {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Subtotal',
      },
      {
        id: 'subtotal',
        numeric: true,
        disablePadding: false,
        label: 'Discount(%)',
      },
      {
        id: 'discount',
        numeric: true,
        disablePadding: false,
        label: 'Taxes',
      },
      {
        id: 'taxes',
        numeric: true,
        disablePadding: false,
        label: 'Quantity',
      },
      {
        id: 'quantity',
        numeric: true,
        disablePadding: false,
        label: 'Total',
      },
    ];

    function EnhancedTableHead(props) {
      const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
      const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
      };

      return (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    }

    EnhancedTableHead.propTypes = {
      numSelected: PropTypes.number.isRequired,
      onRequestSort: PropTypes.func.isRequired,
      onSelectAllClick: PropTypes.func.isRequired,
      order: PropTypes.oneOf(['asc', 'desc']).isRequired,
      orderBy: PropTypes.string.isRequired,
      rowCount: PropTypes.number.isRequired,
    };

  var deleteArray = [];
  export  function Client_Information() {
    const navigate = useNavigate()
    const out_image_ = useRef();
    const imageFile_ = useRef();
    
    var userEmail = localStorage.getItem("userEmail");
    var userPassword = localStorage.getItem("userPassword");

    const [price, set_totalPrice] = useState("");
    const [discount, set_totalDiscount] = useState("");
    const [totalValue, set_totalValue] = useState("");
    const [state, setState] = useState(1);
  //   Selected user information-------------------------------------------------------------/

    const [flag, select_flag] = useState(0);
    const [selInvoices, set_SelInvoices] = useState([]);
    const [rows, setRows] = useState([]);
    const [user_Avatar, setUserAvatar] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPhone, setUserphone] = useState("");
    const [userName, setUserName] = useState("");
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Profile Change items...-----------------------------------------------------------------/

    const [_name, set_nameValue] = useState("");
    const [_address, set_addressValue] = useState("");
    const [_phone, set_phoneValue] = useState("");
    const [_currentPassword, set_currentpassword] = useState("");
    const [_newPassword, set_newPassword] = useState("");
    const [_confirmpassword, set_confirmPassword] = useState("");
    const [serviceArray, setServiceArray] = useState([]);

    
    const profile_change = () =>{

      navigate('/Perfil')
    }
 
    const change_data = () =>{

      if(_currentPassword == userPassword){
        if(_newPassword == _confirmpassword) {
          const user_file = imageFile_.current.files[0];
          const formData = new FormData();
          formData.append('image', user_file);
    
          var change_data = [_name, _address, _phone, _newPassword];
    
          change_information(formData, change_data)
            .then(res => {
                console.log(res)
                  if(res == "success") {
                      console.log(res)
                      AuthCtrl.Invoice(product_services);
                      AuthCtrl.Invoice(product_services2);
                      alert("Su factura ha sido enviada exitosamente !");
                  }
              return true;
              })
              .catch(err => {
                  console.log(err);
                  return false;
            });
        }else{
          alert("Ingrese las nuevas contraseñas correctamente. ");
          set_newPassword("");
          set_confirmPassword("");
        }
      }
      else{
        alert("Ingrese la contraseña actual correctamente!");
        set_currentpassword("");
      }
    }
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    function createData(id, name, calories, fat, created_at, carbs, protein,subtotal,discount, taxes,total) {
      return {
        id, name, calories, fat,created_at, carbs, protein,subtotal,discount, taxes,total
      };
    }

    const view_invoiceList = () =>{

      select_flag(1);

      AuthCtrl.View_InvoiceList(userEmail).then(res => {
        console.log(res,333)
        setServiceArray(res.service);
        setRows(res.service.map((item, id) => createData(id + 1,item.product_name, item.identification, item.description,item.created_at, item.unit, item.price, item.discount, item.tax, item.quantity, Number(item.price) *Number(item.quantity) - Number(item.price)/100 * Number(item.discount) * Number(item.quantity))) )
          var get_subtotal = 0, get_discount = 0, get_totalprice = 0;
          for (let i = 0; i < res.service.length; i++) {
              var x = res.service[i];
              get_subtotal += Number(x.price);  
              get_discount += Number(x.discount);
              get_totalprice += Number(x.price) *Number(x.quantity) - Number(x.price)/100 * Number(x.discount) * Number(x.quantity);
          }
          set_totalPrice(get_subtotal);
          set_totalDiscount(get_discount);
          set_totalValue(get_totalprice.toFixed(2));

          set_SelInvoices(res.get_invoices);
          return true;

        })                                                                                                                                                                                            
        .catch(err => {
            console.log(err);
            return false;
    });
    }

    const ViewPayemtnState = () =>{
      select_flag(3);
     
    }
    
   

    const handleRequestSort = (event, property) => {

      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);

    };

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };

    var newDelArray = [];
    const handleClick = (id) => {
      console.log(serviceArray)
      AuthCtrl.get_Service(serviceArray[id -1]["invoice_id"]).then(res => {
        console.log(res, "--------------------------411")
        set_SelInvoices(res);
          return true;
          })                                                                                                                                                                                            
          .catch(err => {
              console.log(err);
              return false;
      });

      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
      setState(0);
      var value = serviceArray[id -1]["invoice_id"];

      const index = deleteArray.indexOf(value);
      if (index !== -1) {
        deleteArray.splice(index, 1);
      } else {
          deleteArray.push(value); 
      }
      console.log(deleteArray, "444---------------------------------selected")
    };

    const handleEdit_click = () =>{
      navigate('/Edit_Invoice')
      localStorage.setItem("Edit_id" , deleteArray[deleteArray.length -1]);

    }

    const agree_deleteItem =  () =>{

      for (let j = 0; j < deleteArray.length; j++) {
        const element = deleteArray[j];
        AuthCtrl.delete_item(element).then(res => {
          console.log(res, 362)
          if(res === "success") {
           alert("El elemento seleccionado se ha eliminado correctamente.");
           navigate('/Client_Information');
          }
               return true;
          })                                                                                                                                                                                            
          .catch(err => {
              console.log(err);
              return false;
       });
      }
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    EnhancedTableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
    };
  
    function EnhancedTableToolbar(props) {
      const { numSelected } = props;
  
      return (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} seleccionada
            </Typography>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
            </Typography>
          )}
           {numSelected > 0 ? (
              <Tooltip title="Edit" onClick={handleEdit_click}>
                <IconButton>
                  <BorderColorIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Filter list">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )}
           {numSelected > 0 ? (
            <Tooltip title="Delete" onClick={handleClickOpen}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      );
    }
    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
      () =>
        stableSort(rows, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      [order, orderBy, page, rowsPerPage, rows],
    );

    const loadFile_ = () => {
      const file = imageFile_.current.files[0];
      const reader = new FileReader();
      reader.onload = function () {
          out_image_.current.src = reader.result;
      };
      reader.readAsDataURL(file);
    };

    return (
      <div className="container-field manage-background">
        <div className="row">
          <div className="col-lg-2 clients">
            <div >
                  <h1 className="user-content">
                      <div className="border-b border-black-500 w-fit mx-auto px-5 pb-1">
                          <div className="border-b border-black-700 w-fit mx-auto px-5">
                              <Link to={"/"} >
                                  <HealthAndSafetyIcon className="homepage" />
                              </Link>
                          </div>
                      </div>
                  </h1>
                  
                  <Link className="system_" to={"/bilingSystem"} >
                      <NoteAddIcon className="create_invoice" />
                      <h3 className='client_'>Crear factura</h3>
                  </Link>
                  <div className="system_" onClick = {() =>view_invoiceList()} >
                      <ExitToAppIcon className="create_invoice" style={{marginLeft : "2px"}}/>
                      <h3 className='client_'>Issued Invoice</h3>
                  </div>
                  <div className="system_" onClick = {() =>profile_change()} >
                      <ManageAccountsIcon className="create_invoice" style={{marginLeft : "9px"}} />
                      <h3 className='client_'>Cambio de perfil</h3>
                  </div>
                  <div className="system_" onClick = {() =>ViewPayemtnState()} >
                      <PaidIcon className="create_invoice" style={{marginLeft : "9px"}} />
                      <h3 className='client_'>Gestión de pagos</h3>
                  </div>
            </div>
          </div>
          <div className="col-lg-10 infor_services" >
              {flag == 1 && 
                  <div className='manageInvoice-page'>
                      <h1 className="header-content">
                          <div className="border-b border-neutral-700 w-fit mx-auto px-5 pb-1">
                              <div className="border-b border-neutral-700 w-fit mx-auto px-5">
                                  Gestión de facturas
                              </div>
                          </div>
                      </h1>
                      {state !== 1 &&  
                        <div className="row">
                          <div className="col-lg-5" style={{padding :"0px"}}>
                          {
                            selInvoices.map((item,index) =>{
                              return(
                                  <div className="client_infor" key = {index}>
                                    <h4 className='client_'>Cliente Información </h4>
                                  
                                    <div className="all_informations">
                                      <p className="user">Nombre del Negocio : </p>
                                      <p className="user">{item.business_name}</p>
                                    </div>
                                    <div className="all_informations">
                                      <p className="user">RFC : </p>
                                      <p className="user">{item.rfc}</p>
                                    </div>
                                    <div className="all_informations">
                                      <p className="user">Código postal : </p>
                                      <p className="user">{item.postal_code}</p>
                                    </div>
                                    <div className="all_informations">
                                      <p className="user">Régimen Fiscal : </p>
                                      <p className="user">{item.tax_regime}</p>
                                    </div>
                                    <div className="all_informations">
                                      <p className="user">CFDI use : </p>
                                      <p className="user">{item.cfd}</p>
                                    </div>
                                </div>
                                )
                            })
                          }
                        </div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-5" style={{padding :"0px"}}>
                          {
                            selInvoices.map((item,index) =>{
                              return(
                                <div className="invoice_infor"  key = {index}>
                                <div className="client_infor">
                                  <div className="all_service_header" >
                                    <p className="user" style={{width : '30%'}}>Date of issue : </p>
                                    <input type="text" className="form-control time_text" disabled value={item.created_at} />
                                  </div>
                                  <div className="all_service">
                                  <p className="user" style={{width : '30%'}}>Invoice Type : </p>
                                    <input type="text" className="form-control time_text" disabled  value={item.invoice_type} />
                                  </div>
                                  <div className="all_service">
                                  <p className="user" style={{width : '30%'}}>Way to pay : </p>
                                    <input type="text" className="form-control time_text" disabled value={item.invoice_type}/>
                                  </div>
                                  <div className="all_service">
                                    <p className="user" style={{width : '30%'}}>Payment Method : </p>
                                    <input type="text" className="form-control time_text" disabled value={item.pay_method} />
                                  </div>
                                  <div className="all_service">
                                    <p className="serviceInfor" >Series</p>
                                    <input type="text" className="form-control " style={{width: "30%"}} disabled value={item.series} />
                                    <p className="serviceInfor" >Folio</p>
                                    <input type="text" className="form-control " style={{width: "30%"}} disabled value={item.folio}/>
                                  </div>
                                  <div className="all_service">
                                    <p className="serviceInfor" >Currency </p>
                                    <input type="text" className="form-control " style={{width: "30%"}} disabled value={item.currency} />
                                    <p className="serviceInfor" >Exchange rate</p>
                                    <input type="text" className="form-control " style={{width: "30%"}} disabled value={item.exchange_rate}/>
                                  </div>
                                </div>
                              </div>
                                )
                            })
                          }
                        </div>
                      </div>
                      }
                      {state === 1 && 
                          <div className="row">
                          <div className="col-lg-5" style={{padding :"0px"}}>
                              <div className="client_infor" >
                              </div>
                          </div>
                          <div className="col-lg-2"></div>
                          <div className="col-lg-5" style={{padding :"0px"}}>
                              <div className="invoice_infor" >
                              </div>
                          </div>
                        </div>
                      }
                      <Box  className = "all_information">
                      <Paper sx={{ width: '100%', mb: 2 }} className = "all_information">
                          <EnhancedTableToolbar numSelected={selected.length} />
                          <TableContainer>
                          <Table
                              sx={{ minWidth: 750 }}
                              aria-labelledby="tableTitle"
                              size={dense ? 'small' : 'medium'}
                          >
                              <EnhancedTableHead
                              numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              onSelectAllClick={handleSelectAllClick}
                              onRequestSort={handleRequestSort}
                              rowCount={rows.length}
                              />
                              <TableBody>
                              {visibleRows.map((row, index) => {
                                  const isItemSelected = isSelected(row.id);
                                  const labelId = `enhanced-table-checkbox-${index}`;

                                  return (
                                  <TableRow
                                      hover
                                      onClick={(event) => handleClick(row.id)}
                                      role="checkbox"
                                      aria-checked={isItemSelected}
                                      tabIndex={-1}
                                      key={row.id}
                                      selected={isItemSelected}
                                      sx={{ cursor: 'pointer' }}
                                  >
                                      <TableCell padding="checkbox">
                                      <Checkbox
                                          color="primary"
                                          checked={isItemSelected}
                                          inputProps={{
                                          'aria-labelledby': labelId,
                                          }}
                                      />
                                      </TableCell>
                                      <TableCell
                                      component="th"
                                      id={labelId}
                                      scope="row"
                                      padding="none"
                                      >
                                      {row.name}
                                      </TableCell>
                                      <TableCell align="right">{row.calories}</TableCell>
                                      <TableCell align="right">{row.fat}</TableCell>
                                      <TableCell align="right">{row.created_at}</TableCell>
                                      <TableCell align="right">{row.carbs}</TableCell>
                                      <TableCell align="right">{row.protein}</TableCell>
                                      <TableCell align="right">{row.subtotal}</TableCell>
                                      <TableCell align="right">{row.discount}</TableCell>
                                      <TableCell align="right">{row.taxes}</TableCell>
                                      <TableCell align="right">{row.total}</TableCell>
                                  </TableRow>
                                  );
                              })}
                              {emptyRows > 0 && (
                                  <TableRow
                                  style={{
                                      height: (dense ? 33 : 53) * emptyRows,
                                  }}
                                  >
                                  <TableCell colSpan={9} />
                                  </TableRow>
                              )}
                              </TableBody>
                          </Table>
                          </TableContainer>
                          <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                      </Paper>
                      <FormControlLabel
                          control={<Switch checked={dense} onChange={handleChangeDense} />}
                          label="Acolchado denso"
                      />
                              <div className="row view_state">
                                  <div className="col-sm-1"></div>
                                  <div className="col-sm-4">
                                  </div>
                                  <div className="col-sm-1"></div>

                                  <div className="col-sm-2" style={{ marginBottom: "20px", fontSize: '30px' }}>
                                      <TextField
                                          id="input-with-icon-textfield"
                                          label="Subtotal"
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
                                      />
                                  </div>
                                  <div className="col-sm-2">
                                      <TextField
                                          id="input-with-icon-textfield"
                                          label="Discount(%)"
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
                                      />
                                  </div>
                            
                                  <div className="col-sm-2">
                                      <TextField
                                          id="input-with-icon-textfield"
                                          label="Total"
                                          className='priceState'
                                          disabled
                                          InputProps={{
                                              startAdornment: (
                                                  <InputAdornment position="start">
                                                      <AccountBalanceIcon className='total' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ {totalValue}
                                                  </InputAdornment>
                                              ),
                                          }}
                                          variant="standard"
                                      />
                                  </div>
                              </div>
                      </Box>
                  </div>
              }
              {flag === 0 && 
                    <div className="hero">
                        <div className="snow">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1536" preserveAspectRatio="xMidYMax slice">
                            <g fill="#FFF" fill-opacity=".15" transform="translate(55 42)">
                            <g id="snow-bottom-layer">
                              <ellipse cx="6" cy="1009.5" rx="6" ry="5.5"/>
                              <ellipse cx="138" cy="1110.5" rx="6" ry="5.5"/>
                              <ellipse cx="398" cy="1055.5" rx="6" ry="5.5"/>
                              <ellipse cx="719" cy="1284.5" rx="6" ry="5.5"/>
                              <ellipse cx="760" cy="1155.5" rx="6" ry="5.5"/>
                              <ellipse cx="635" cy="1459.5" rx="6" ry="5.5"/>
                              <ellipse cx="478" cy="1335.5" rx="6" ry="5.5"/>
                              <ellipse cx="322" cy="1414.5" rx="6" ry="5.5"/>
                              <ellipse cx="247" cy="1234.5" rx="6" ry="5.5"/>
                              <ellipse cx="154" cy="1425.5" rx="6" ry="5.5"/>
                              <ellipse cx="731" cy="773.5" rx="6" ry="5.5"/>
                              <ellipse cx="599" cy="874.5" rx="6" ry="5.5"/>
                              <ellipse cx="339" cy="819.5" rx="6" ry="5.5"/>
                              <ellipse cx="239" cy="1004.5" rx="6" ry="5.5"/>
                              <ellipse cx="113" cy="863.5" rx="6" ry="5.5"/>
                              <ellipse cx="102" cy="1223.5" rx="6" ry="5.5"/>
                              <ellipse cx="395" cy="1155.5" rx="6" ry="5.5"/>
                              <ellipse cx="826" cy="943.5" rx="6" ry="5.5"/>
                              <ellipse cx="626" cy="1054.5" rx="6" ry="5.5"/>
                              <ellipse cx="887" cy="1366.5" rx="6" ry="5.5"/>
                              <ellipse cx="6" cy="241.5" rx="6" ry="5.5"/>
                              <ellipse cx="138" cy="342.5" rx="6" ry="5.5"/>
                              <ellipse cx="398" cy="287.5" rx="6" ry="5.5"/>
                              <ellipse cx="719" cy="516.5" rx="6" ry="5.5"/>
                              <ellipse cx="760" cy="387.5" rx="6" ry="5.5"/>
                              <ellipse cx="635" cy="691.5" rx="6" ry="5.5"/>
                              <ellipse cx="478" cy="567.5" rx="6" ry="5.5"/>
                              <ellipse cx="322" cy="646.5" rx="6" ry="5.5"/>
                              <ellipse cx="247" cy="466.5" rx="6" ry="5.5"/>
                              <ellipse cx="154" cy="657.5" rx="6" ry="5.5"/>
                              <ellipse cx="731" cy="5.5" rx="6" ry="5.5"/>
                              <ellipse cx="599" cy="106.5" rx="6" ry="5.5"/>
                              <ellipse cx="339" cy="51.5" rx="6" ry="5.5"/>
                              <ellipse cx="239" cy="236.5" rx="6" ry="5.5"/>
                              <ellipse cx="113" cy="95.5" rx="6" ry="5.5"/>
                              <ellipse cx="102" cy="455.5" rx="6" ry="5.5"/>
                              <ellipse cx="395" cy="387.5" rx="6" ry="5.5"/>
                              <ellipse cx="826" cy="175.5" rx="6" ry="5.5"/>
                              <ellipse cx="626" cy="286.5" rx="6" ry="5.5"/>
                              <ellipse cx="887" cy="598.5" rx="6" ry="5.5"/>
                            </g>
                            </g>
                            <g fill="#FFF" fill-opacity=".3" transform="translate(65 63)">
                            <g id="snow-top-layer">
                              <circle cx="8" cy="776" r="8"/>
                              <circle cx="189" cy="925" r="8"/>
                              <circle cx="548" cy="844" r="8"/>
                              <circle cx="685" cy="1115" r="8"/>
                              <circle cx="858" cy="909" r="8"/>
                              <circle cx="874" cy="1438" r="8" transform="rotate(180 874 1438)"/>
                              <circle cx="657" cy="1256" r="8" transform="rotate(180 657 1256)"/>
                              <circle cx="443" cy="1372" r="8" transform="rotate(180 443 1372)"/>
                              <circle cx="339" cy="1107" r="8" transform="rotate(180 339 1107)"/>
                              <circle cx="24" cy="1305" r="8" transform="rotate(180 24 1305)"/>
                              <circle cx="8" cy="8" r="8"/>
                              <circle cx="189" cy="157" r="8"/>
                              <circle cx="548" cy="76" r="8"/>
                              <circle cx="685" cy="347" r="8"/>
                              <circle cx="858" cy="141" r="8"/>
                              <circle cx="874" cy="670" r="8" transform="rotate(180 874 670)"/>
                              <circle cx="657" cy="488" r="8" transform="rotate(180 657 488)"/>
                              <circle cx="443" cy="604" r="8" transform="rotate(180 443 604)"/>
                              <circle cx="339" cy="339" r="8" transform="rotate(180 339 339)"/>
                              <circle cx="24" cy="537" r="8" transform="rotate(180 24 537)"/>
                            </g>
                            </g>
                        </svg>
                        </div>
                        <div className="hero__content">
                          <h1 className="svg_">* Hola! *</h1>
                        </div>
                    </div>
              }
              {
                flag === 2 &&
                  <div className="container" style={{marginTop: "30px"}}>
                      <div className="row">
                        <div className="col-lg-3">  
                        <img src={user_Avatar} className="my_Avatar" alt="s" ref={out_image_} onClick={() => document.getElementById('imageFile_').click()} />
                        <input type="file" ref={imageFile_} id='imageFile_' onChange={() => loadFile_()} style={{ display: "none" }} />
                        </div>
                        <div className="col-lg-6">
                            <div className="content_user">
                              <div className="each">
                              <TextField
                                    id="input-with-icon-textfield"
                                    label={userAddress}
                                    placeholder="Por favor escriba su número de teléfono."
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" >
                                                <ContactMailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    className="addressValue"
                                    onChange={(e) => set_nameValue(e.target.value)}
                                />
                                <TextField
                                    id="input-with-icon-textfield"
                                    label={userAddress}
                                    placeholder="Por favor escriba su dirección."
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" >
                                                <ContactMailIcon />
                                            </InputAdornment>
                                        ),
                                    
                                    }}
                                    variant="standard"
                                    className="addressValue"
                                    onChange={(e) => set_addressValue(e.target.value)}
                                />
                              </div>
                              <div className="each">
                                <TextField
                                    id="input-with-icon-textfield"
                                    label={userPhone}
                                    className="phoneValue"
                                    placeholder="Por favor escriba su número de teléfono."
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneInTalkIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    onChange={(e) => set_phoneValue(e.target.value)}
                                    type="number"
                                />
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="Contraseña actual"
                                    type="password"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HttpsIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    onChange={(e) => set_currentpassword(e.target.value)}
                                />
                              </div>
                              <div className="each">
                                  <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Nueva contraseña</InputLabel>
                                    <Input
                                      id="standard-adornment-password"
                                      type={showPassword ? 'text' : 'password'}
                                      endAdornment={
                                        <InputAdornment position="end">
                                          
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                          >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                        
                                      }
                                      onChange={(e) => set_newPassword(e.target.value)}
                                    />
                                </FormControl>
                                  <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Confirmar Contraseña</InputLabel>
                                    <Input
                                      id="standard-adornment-password"
                                      type={showPassword ? 'text' : 'password'}
                                      endAdornment={
                                        <InputAdornment position="end">
                                          
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                          >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                        
                                      }
                                      onChange={(e) => set_confirmPassword(e.target.value)}
                                    />
                                </FormControl>
                              </div>
                              <div style={{marginRight: "30px"}}>
                                <Button variant="contained" className='back-btn'endIcon={<ReplyIcon />} onClick={() => change_data()} > Ahorrar </Button>
                              </div>
                            </div>
                        </div>
                        <div className="col-lg-3"></div>
                      </div>
                  </div>
              }
               {
                flag === 3 &&
                  <Payment  user_Avatar ={user_Avatar} />
              }
          </div>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"* Eliminar elemento seleccionado *"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                  ¿Realmente desea eliminar el artículo de servicio seleccionado?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>DISCREPAR</Button>
                  <Button onClick={() => agree_deleteItem()}>ACEPTAR</Button>
                </DialogActions>
             </Dialog>
        </div>
      </div>
    );
  }