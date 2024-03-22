
import React, { useEffect, useState } from "react";
import { Auth } from "../../api/fb.invoice";
import './payment.css';
// import './chat.js';
const AuthCtrl = new Auth();


export const Payment = (props) =>{

    const [user_Avatar, setUserAvatar] = useState("");
    const [payment, setPayHistory] = useState([]);
    const [userName, setUserName] = useState("");
    var userEmail = localStorage.getItem("userEmail");
    useEffect (() => {

        view_Client_information();

        },[])

    const view_Client_information = () =>{
        
        AuthCtrl.profile_change(userEmail).then(res => {
        
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
    
    console.log(chartData, chartData[0],payment)
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
    
    return(
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
    )
}