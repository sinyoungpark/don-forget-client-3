mport React from "react"
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

    //이제 띄울 modal창 정보들 
    const [curDate, setCurDate] = useState("");
    const [curEventTarget, setCurTarget] = useState("");
    const [curEventType, setEventType] = useState("");
    const [curDataGift, setCurGift] = useState("");
    const [curSchduleId, setCurScheduleId] = useState("");
    const [curEventId, setCurEventId] = useState("");

    useEffect(() => {

        axios.get(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`)
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
        axios.delete(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`, {
            params: {
                event_id: e.target.value,
                schedule_id: e.target.name
            }
        })
            .then((res) => console.log(res))
    }
    //http://localhost:5000/schedule/:id?event_id=2&schedule_id=3

    function handleModifyBtn(date, event_target, event_type, data_gift, schedule_id, event_id) {
        console.log(date, event_target, event_type, data_gift, schedule_id, event_id);
        setCurDate(date);
        setCurTarget(event_target);
        setEventType(event_type);
        setCurGift(data_gift);
        setCurScheduleId(schedule_id);
        setCurEventId(event_id);
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
                                    <button className="li_button" onClick={(e) => {
                                        e.preventDefault();
                                        handleModifyBtn(date, data.event_target, data.event_type, data.gift, data.id, data.event_id);
                                    }
                                    }>수정</button>
                                    <button className="li_button" onClick={handleDeleteBtn} name={data.id} value={data.event_id}>삭제</button>
                                    <span>{data.event_target}</span>
                                    <span className="type">{data.event_type}</span>
                                    <span className="gift">{data.gift}</span>
                                    <Modal isModify={isModify} data_date={curDate} data_event_target={curEventTarget} data_event_type={curEventType} data_gift={curDataGift} schedule_id={curSchduleId} event_id={curEventId} handleModify={handleModify} />
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



