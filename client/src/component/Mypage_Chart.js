import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React, { useState } from 'react';
import axios from 'axios';




function Chart (props) {
    const [statistics, setStatistics] = useState([]);
    
    let data = [
      {name: '1월', gift: 0, money: 0},
      {name: '2월', gift: 0, money: 0},
      {name: '3월', gift: 0, money: 0},
      {name: '4월', gift: 0, money: 0},
      {name: '5월', gift: 0, money: 0},
      {name: '6월', gift: 0, money: 0},
      {name: '7월', gift: 0, money: 0},
      {name: '8월', gift: 0, money: 0},
      {name: '9월', gift: 0, money: 0},
      {name: '10월', gift: 0, money: 0},
      {name: '11월', gift: 0, money: 0},
      {name: '12월', gift: 0, money: 0},
    ];

    axios.get(`https://don-forget-server.com/schedule/statistics/${window.sessionStorage.getItem("id")}`)
      .then((res) => {
        const Year_Data = res.data;
        // console.log('Year_Data : ',Year_Data);
        for(let month in Year_Data){
            console.log('month : ',month);
            for (let i = 0; i < data.length; i++) {
              const element = data[i];
              if(element.name === `${month}월`){
                  element.gift = Year_Data[month].gift;
                  element.money = Year_Data[month].money;
              }
            }
        }
        setStatistics(data)
      })

    return(
        <LineChart width={1000} height={400} data={statistics} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="gift" stroke="#8884d8"/>
            <Line type="monotone" dataKey="money" stroke="#82ca9d" activeDot={{r: 8}}/>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip/>
            <Legend />
        </LineChart>        
    )
}
;

export default Chart;