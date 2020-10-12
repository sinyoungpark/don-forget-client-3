import React from "react"
import { useState, useEffect } from 'react';
import axios from "axios"
import Modal from "./Modal"
import "./Schedule.scss"

export default function Schedule(props) {
    const { userId } = props;

    const [data, setData] = useState(null);
    const [isOpen, setModal] = useState(false);

    //수정 모달창 따로 
    const [isModify, handleModify] = useState(false);

    useEffect(() => {

        axios.get(`http://ec2-3-34-177-67.ap-northeast-2.compute.amazonaws.com:5000/schedule/${window.sessionStorage.getItem("id")}`)
            .then((res) => {
                let data = res.data;
                data = data.sort(function (a, b) {
                    return new Date(a.date) - new Date(b.date);
                });

                setData(data);
                console.log(data);
            })
    }, []);

    function handleDeleteBtn(e) {
        axios.delete(`http://ec2-3-34-177-67.ap-northeast-2.compute.amazonaws.com:5000/schedule/${window.sessionStorage.getItem("id")}`, {
            params: {
                event_id: e.target.value,
                schedule_id: e.target.name
            }
        })
            .then((res) => console.log(res))
    }
    //http://localhost:5000/schedule/:id?event_id=2&schedule_id=3

    function handleModifyBtn(e) {
        handleModify(!isModify);

    }

    return (
        <div className="schedule">
            <h1>Schedule</h1>
            <button onClick={(e) => {
                e.preventDefault();
                setModal(!isOpen);
            }} className="addBtn">+</button>
            <ul className="schedule_list">
                {
                    data && data.map((data) => {
                        const date = String(data.date).slice(0, 10);
                        return (
                            <div>
                                <div className="date">{date.slice(5, 7)} / {date.slice(8)}</div>
                                <li key={data.id}>
                                    <span>{data.event_target}</span>
                                    <span className="type">{data.event_type}</span>
                                    <span className="gift">{data.gift}</span>
                                    <button className="li_button" onClick={handleModifyBtn}>수정</button>
                                    <button className="li_button" onClick={handleDeleteBtn} name={data.id} value={data.event_id}>삭제</button>
                                    <Modal isModify={isModify} data_date={date} data_event_target={data.event_target} data_event_type={data.event_type} data_gift={data.gift} schedule_id={data.id} event_id={data.event_id} handleModify={handleModify} />
                                </li>
                            </div>
                        )
                    })
                }
            </ul>
            <Modal userId={userId} isOpen={isOpen} setModal={setModal} />
        </div>
    )
}
