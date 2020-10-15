import React from "react";
import { useState, useEffect, useRef } from 'react';
import axios from "axios"
import Modal from "./Modal"
import "./Schedule.scss"


export default function Schedule(props) {
    const { userId } = props;

    const [data, setData] = useState(null);
    const [isOpen, setModal] = useState(false);

    //수정 모달창 따로 
    const [isModify, handleModify] = useState(false);

    //이제 띄울 modal창 정보들 
    const [curDate, setCurDate] = useState("");
    const [curEventTarget, setCurTarget] = useState("");
    const [curEventType, setEventType] = useState("");
    const [curDataGift, setCurGift] = useState("");
    const [curSchduleId, setCurScheduleId] = useState("");
    const [curEventId, setCurEventId] = useState("");
    const [curGiveAndTake, setCurGiveAndTake] = useState("");

    //새로운 변화가 생길 시에만 useEffect가 동작하도록 
    const [controllUseEffect, setUseEffect] = useState(true);

    useEffect(() => {
        if (controllUseEffect) {
            axios.get(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`)
                .then((res) => {
                    let data = res.data;
                    data = data.sort(function (a, b) {
                        return new Date(a.date) - new Date(b.date);
                    });

                    setData(data);
                    setUseEffect(!controllUseEffect);
                    console.log(data);
                })
        }
    });

    function handleDeleteBtn(e) {
        axios.delete(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`, {
            params: {
                schedule_id: e.target.name
            }
        })
            .then((res) => setUseEffect(!controllUseEffect))
    }
    //http://localhost:5000/schedule/:id?event_id=2&schedule_id=3

    function handleModifyBtn(date, event_target, event_type, data_gift, schedule_id, event_id, data_giveandtake) {
        console.log(date, event_target, event_type, data_gift, schedule_id, event_id);
        setCurDate(date);
        setCurTarget(event_target);
        setEventType(event_type);
        setCurGift(data_gift);
        setCurScheduleId(schedule_id);
        setCurEventId(event_id);
        setCurGiveAndTake(data_giveandtake);
        handleModify(!isModify);
    }

    return (
        <div className="schedule">
            <div className="gradient"></div>
            <h1>Schedule
                <button onClick={(e) => {
                    e.preventDefault();
                    setModal(!isOpen);
                }} className="addBtn">+</button>
            </h1>
            <ul className="schedule_list">
                {
                    data && data.map((data) => {
                        const date = String(data.date).slice(0, 10);
                        return (
                            <div className="date_li">
                                <div className="date">{date.slice(5, 7)}/{date.slice(8)}</div>
                                <li key={data.id}>
                                    <button className="li_button" onClick={handleDeleteBtn} name={data.id} value={data.event_id}>삭제</button>
                                    <button className="li_button" onClick={(e) => {
                                        e.preventDefault();
                                        handleModifyBtn(date, data.event_target, data.type, data.gift, data.id, data.event_id, data.giveandtake);
                                    }}>수정</button>
                                    <span className={data.type}>{data.giveandtake === "give" ? "→" : "←"}</span>
                                    <span className="type">{data.event_target} {data.type}</span>
                                    <span className="gift">{data.gift}</span>
                                    <Modal isModify={isModify} data_date={curDate} data_event_target={curEventTarget} data_event_type={curEventType} data_gift={curDataGift} schedule_id={curSchduleId} event_id={curEventId} handleModify={handleModify} setUseEffect={setUseEffect} controllUseEffect={controllUseEffect} data_giveandtake={curGiveAndTake} />
                                </li>
                            </div>
                        )
                    })
                }
            </ul>
            <Modal userId={userId} isOpen={isOpen} setModal={setModal} setUseEffect={setUseEffect} controllUseEffect={controllUseEffect} />
        </div>
    )
}



