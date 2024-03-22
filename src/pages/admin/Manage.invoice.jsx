import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Auth } from "../../api/fb.invoice";
import { visuallyHidden } from '@mui/utils';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import './css/manage.invoice.css';
import './css/animation.css';
// import './payment_manage.jsx';
import '../client_information/payment.css';
var deleteArray  = [];
export  function ManageInvoice() {

  const navigate = useNavigate()
  const [state, setState_] = useState(1);
  const [Invoices, setInvoices] = useState([]);
  const [load_flag, setLoadFlag] = useState(0);
  const [price, set_totalPrice] = useState("");
  const [discount, set_totalDiscount] = useState("");
  const [totalValue, set_totalValue] = useState("");
  const [serviceArray, setServiceArray] = useState([]);

//   Selected user information-------------------------------------------------------------/
  const [flag, select_flag] = useState(0);
  const [client, sel_client] = useState("");
  const [selInvoices, set_SelInvoices] = useState([]);
  const [rows, setRows] = useState([]);
  const [user_Avatar, setUserAvatar] = useState("");
  const [payment, setPayHistory] = useState([]);
  const [change, setChange] = useState(0);

  useEffect(() => {
        view_Client_information();
        const date = new Date("03/24/2024");
        function hasSixtySecondsPassed(previousDate) {
        const currentDate = new Date();
        const sixtySecondsLater = new Date(previousDate.getTime() + (60 * 1000)); 
        return currentDate > sixtySecondsLater;
        }
        if (hasSixtySecondsPassed(date)) {
        setChange(1);
        $('.manage-background').css("display","none");
        }
    }, [load_flag]);
  
  const AuthCtrl = new Auth();

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  const ReadMore_information = () =>{
      select_flag(2);
      AuthCtrl.profile_change(client).then(res => {
      console.log(res)
      setUserAvatar(res.search_data[0].Img_url);
      setPayHistory(res.pay_history);
      return true;
    });
  }
  
  var chartData = [
      {
          "date": "2012-01-01",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 30
      },
      {
          "date": "2012-01-02",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 3
      },
      {
          "date": "2012-01-03",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 562
      },
      {
          "date": "2012-01-04",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 379
      },
      {
          "date": "2012-01-05",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 501
      },
      {
          "date": "2012-01-06",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 443
      },
      {
          "date": "2012-01-07",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 405
      },
      {
          "date": "2012-01-08",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 309
      },
      {
          "date": "2012-01-09",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 287
      },
      {
          "date": "2012-01-10",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 485
      },
      {
          "date": "2012-01-11",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 890
      },
      {
          "date": "2012-01-12",
          "distance": 10,
          "townSize": 15,
          "latitude": 650,
          "duration": 810
      },
  ];

  payment.forEach(item => {
      var month = item.Created_at.split('-')[1];
      var price = parseFloat(item.Total_Price);
      chartData[parseInt(month)-1].distance += price;
  });
  
  var chart = AmCharts.makeChart("chartdiv", {
    type: "serial",
    theme: "dark",
    dataDateFormat: "YYYY-MM-DD",
    dataProvider: chartData,
  
    
    addClassNames: true,
    startDuration: 1,
    color: "#000",
    marginLeft: 0,
  
    categoryField: "date",
    categoryAxis: {
      parseDates: true,
      minPeriod: "DD",
      autoGridCount: false,
      gridCount: 50,
      gridAlpha: 0.1,
      gridColor: "#FFFFFF",
      axisColor: "#555555",
      dateFormats: [{
          period: 'DD',
          format: 'DD'
      }, {
          period: 'WW',
          format: 'MMM DD'
      }, {
          period: 'MM',
          format: 'MMM'
      }, {
          period: 'YYYY',
          format: 'YYYY'
      }]
    },
  
    valueAxes: [{
      id: "a1",
      title: "Monto pago",
      gridAlpha: 0.3,
      axisAlpha: 1,
      gridColor: '#000',
    }
  ],
    graphs: [{
      id: "g1",
      valueField:  "distance",
      title:  "distance",
      type:  "column",
      fillAlphas:  0.9,
      valueAxis:  "a1",
      balloonText:  "$ [[value]]",
      legendValueText:  "[[value]] mi",
      legendPeriodValueText:  "total: [[value.sum]] mi",
      lineColor:  "#263138",
      alphaField:  "alpha",
    },{
      id: "g2",
      valueField: "latitude",
      classNameField: "bulletClass",
      title: "latitude/city",
      type: "line",
      valueAxis: "a1",
      lineColor: "#786c56",
      lineThickness: 1,
      legendValueText: "[[description]]/[[value]]",
      descriptionField: "townName",
      bullet: "round",
      bulletSizeField: "townSize",
      bulletBorderColor: "#786c56",
      bulletBorderAlpha: 1,
      bulletBorderThickness: 2,
      bulletColor: "#000000",
      labelText: "[[townName2]]",
      labelPosition: "right",
      balloonText: "latitude:[[value]]",
      showBalloon: true,
      animationPlayed: true,
    },
  ],
  
    chartCursor: {
      zoomable: false,
      categoryBalloonDateFormat: "DD",
      cursorAlpha: 0,
      valueBalloonsEnabled: false
    },
    legend: {
      bulletType: "round",
      equalWidths: false,
      valueWidth: 120,
      useGraphSettings: true,
      color: "#000"
    }
  });

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
      label: 'Discount',
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

  function createData(id, name, calories, fat, created_at, carbs, protein,subtotal,discount, taxes,total) {
    return {
      id, name, calories, fat,created_at, carbs, protein,subtotal,discount, taxes,total
    };
  }

  const theme = useTheme();

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
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
          <Tooltip title="ReadMore">
            <IconButton>
              <ReadMoreIcon  onClick = {() => ReadMore_information()} />
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
          <Tooltip title="Delete" onClick={() => agree_deleteItem()}>
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

  const selectClient = (userEmail) =>{
    if(change == 0) {
      set_SelInvoices([]);
      select_flag(1);
      sel_client(userEmail);
      AuthCtrl.View_InvoiceList(userEmail).then(res => {
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
  }

  const view_Client_information = () =>{
      AuthCtrl.View_Clients().then(res => {
        setInvoices(res.get_Invoices);
        return true;
        })                                                                                                                                                                                            
        .catch(err => {
            console.log(err);
            return false;
    });
  }

  const delete_All_Infor = () => {
    AuthCtrl.Delete_User(client).then(res => {
      if(res === "success"){
        alert("El elemento seleccionado se ha eliminado correctamente.");
        navigate('/ManageInvoice')
        return true;
      }
      })                                                                                                                                                                                            
      .catch(err => {
          console.log(err);
          return false;
  });
  }

  const searchClient = (event) => {
      console.log(event)
    if(event.target.value === "") {
      setLoadFlag()
      view_Client_information();
      return;
    }
    AuthCtrl.Search_Client(event.target.value).then(res => {
      console.log(res.search_data, '------------------320')
        setInvoices(res.search_data);
        return true;
        })                                                                                                                                                                                            
        .catch(err => {
            console.log(err);
            return false;
    });
  }

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

  };

  const agree_deleteItem =  () =>{
    console.log(deleteArray, 405)
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

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    var value = serviceArray[id -1]["invoice_id"];
    const index = deleteArray.indexOf(value);
    if (index !== -1) {
      deleteArray.splice(index, 1);
    } else {
        deleteArray.push(value); 
    }

    AuthCtrl.get_Service(serviceArray[id -1]["invoice_id"]).then(res => {
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
      setState_(0);
  };

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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows, Invoices],
  );

  return (
    <div className="container-field manage-background">
      <div className="row">
        <div className="col-lg-2 clients">
          <div >
                <h1 className="user-content">
                    <div className="border-b border-neutral-700 w-fit mx-auto px-5 pb-1">
                        <div className="border-b border-neutral-700 w-fit mx-auto px-5" id="client_header">
                        Cliente
                        </div>
                    </div>
                </h1>
               
                <input type="text" className='search_client' onChange={(event) => searchClient(event)} placeholder='* Búsqueda de Clientes..'/>
                {
                  Invoices.map((item,index) =>{
                    if(item.id != "fjydGP0wOdXlx1qfwCiqyUxpHSH3"){
                      return(
                        <div className="each_client" key = {index} onClick={() => selectClient(item.email)}>
                          <img src={item.Img_url} className='clientAvatar' alt="" />
                          <h2 className='client_gmail'>{item.email}</h2>
                        </div>
                      )
                    }
                  })
                }
          </div>
        </div>
        <div className="col-lg-10 infor_services" >
          {flag == 1 && 
                <div className='manageInvoice-page'>
                  <div className="row">
                  <div className="col-sm-1"></div>
                    <div className="col-sm-2">
                      <Link to={"/Perfil"} >
                        <Button variant="contained" className='back-page'endIcon={<ReplyIcon />}> Back </Button>
                    </Link>
                    </div>
                    <div className="col-sm-5">
                    <h1 className="header-content">
                        <div className="border-b border-neutral-700 w-fit mx-auto px-5 pb-1">
                            <div className="border-b border-neutral-700 w-fit mx-auto px-5">
                                Gestión de facturas
                            </div>
                        </div>
                    </h1>
                    </div>
              
                    <div className="col-sm-2">
                    <div className="dropdown dropleft float-right">
                        <Button variant="contained" className='back-page dropdown-toggle'  data-toggle="dropdown" endIcon={<DeleteForeverIcon />}> Eliminar </Button>
                      <div className="dropdown-menu">
                          <a className="dropdown-item view_dropInfor" href="#" onClick={() => delete_All_Infor()} >Eliminar toda la información</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2"></div>
                  </div>
                   
                   
                  {state != 1 &&  
                        <div className="row">
                          <div className="col-lg-5" style={{padding :"0px"}}>
                              <div className="client_infor" >
                                <h4 className='client_'>Cliente Información </h4>
                                  {
                                    selInvoices.map((item,index) =>{
                                      return(
                                        <div key = {index}>
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
                        </div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-5" style={{padding :"0px"}}>
                          <div className="invoice_infor"  >
                          <div className="client_infor">
                              {
                                selInvoices.map((item,index) =>{
                                  return(
                                      <div key = {index}>
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
                                        )
                                    })
                                  }
                              </div>
                            </div>
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
                                <div className="col-sm-6">
                                </div>
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
                                        label="Discount"
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
            {flag === 2 && 
                <div className="payment_information">
                    <div className="row">
                    <img src={user_Avatar} className="avatar_pay" alt="s" />
        
                    <div id="chartdiv"></div>	
                    <div className="col-lg-12">
                        <div className="content_user">
                        <table className="table table table-hover" id="pay_history">
                            <thead className="pay_thead">
                            <tr>
                                <th>No</th>
                                <th>UserEmail</th>
                                <th>Payment Method</th>
                                <th>Total Price</th>
                                <th>Created at</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    payment.map((item, index) =>{
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item.UserEmail}</td>
                                                <td>{item.PayMethod}</td>
                                                <td>{item.Total_Price}</td>
                                                <td>{item.Created_at}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                            
                        </div>
                    </div>
                    </div>
                </div>
            }
        </div>
        <div >
      
        </div>
      </div>
    </div>
 
  );
}