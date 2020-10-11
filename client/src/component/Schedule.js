import React from "react"
import  { useState, useEffect } from 'react';
import axios from "axios"

export default function Schedule(props){
    const {userId} = props;

    const [data, setData] = useState(null);

    useEffect(() => {
        const url = `http://ec2-3-34-177-67.ap-northeast-2.compute.amazonaws.com:5000/schedule/${userId}`
        console.log(url);
        axios.get(url)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
    });

    return(
        <div className="schedule">
            <h1>Schedule</h1>
            
            </div>
    )
}