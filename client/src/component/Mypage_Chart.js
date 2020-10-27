import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Chart(props) {

  const [statistics, setStatistics] = useState([]);
  const data = [
    { name: '1', gift: 0, money: 0 },
    { name: '2', gift: 0, money: 0 },
    { name: '3', gift: 0, money: 0 },
    { name: '4', gift: 0, money: 0 },
    { name: '5', gift: 0, money: 0 },
    { name: '6', gift: 0, money: 0 },
    { name: '7', gift: 0, money: 0 },
    { name: '8', gift: 0, money: 0 },
    { name: '9', gift: 0, money: 0 },
    { name: '10', gift: 0, money: 0 },
    { name: '11', gift: 0, money: 0 },
    { name: '12', gift: 0, money: 0 },
  ];

  useEffect(() => {
    axios.get(`https://don-forget-server.com/schedule/statistics/${window.sessionStorage.getItem("id")}`)
      .then((res) => {
        const Year_Data = res.data;
        console.log('Year_Data : ', Year_Data);
        for (let month in Year_Data) {
          console.log('month : ', month);
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.name === month) {
              element["gift"] = Year_Data[month].gift;
              element.money = (Year_Data[month].money / 10000);
            }
          }
        }
        setStatistics(data);
      })
      .then(() => { console.log("statistics:", statistics) })
  }, [])


  return (
    <ResponsiveContainer minWidth={200} minHeight={250}>
      <LineChart data={statistics} margin={{ right: 0 }}>
        <Line yAxisId="left" type="monotone" dataKey="gift" name="선물" stroke="mediumpurple" strokeWidth="4" activeDot={{ r: 8 }} />
        <Line yAxisId="right" type="monotone" dataKey="money" name="현금" stroke="mediumseagreen" strokeWidth="4" activeDot={{ r: 8 }} />
        <XAxis dataKey="name" unit="월" tick={{ fontSize: "0.8rem", fill: "#4a4a4a" }} />
        <YAxis yAxisId="left" orientation="left" unit="개" axisLine={false} tick={{ fontSize: "0.8rem", fill: "#4a4a4a" }} />
        <YAxis yAxisId="right" orientation="right" unit="만원" axisLine={false} tick={{ fontSize: "0.8rem", fill: "#4a4a4a" }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip labelFormatter={(month) => `${month}월`} />
        <Legend verticalAlign="top" align="right" iconSize={20} wrapperStyle={{ paddingRight: "50px", paddingBottom: "30px" }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
;

export default Chart;