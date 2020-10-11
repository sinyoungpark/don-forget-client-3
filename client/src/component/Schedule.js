import React from "react"
import  { useState, useEffect } from 'react';
import axios from "axios"

export default function Schedule(props){
    const {userId} = props;

    const [data, setData] = useState([{id : 18, date: "20-39-2", gift: "wow"}]);

    useEffect(() => {

        axios.get(`http://ec2-3-34-177-67.ap-northeast-2.compute.amazonaws.com:5000/schedule/${window.sessionStorage.getItem("id")}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
    });

    return(
        <div className="schedule">
            <h1>Schedule</h1>
            <button>+</button>
            <ul className="schedule_list">
                {
                    data && data.map((data) => {
                        return (
                        <li key={data.id}>{data.id}, {data.date}, {data.gift}</li>
                        )
                    })
                }
                </ul>
            </div>
    )
}