import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import "./Modal.css"


export default function Modal(props) {
    const [date, setDate] = useState("");
    const [eventTarget, setTarget] = useState("");
    const [eventType, setType] = useState("");
    const [gift, setGift] = useState("");
    const { userId, isOpen, setModal, isModify, data_date, data_event_target, data_event_type, data_gift, schedule_id, event_id, handleModify } = props;
    function handleSaveBtn(e) {

        e.preventDefault();

        if (date && eventTarget && eventType && gift) {
            axios.post(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`, {
                date: date,
                event_target: eventTarget,
                event_type: eventType,
                gift: gift
            })
                .then((res) => console.log(res.data))
                .then(() => {
                    setModal(!isOpen);
                })
        }
        else {
            alert("입력해주세요")
        }
    }

    function handleModifyBtn(e) {
        e.preventDefault();

        axios.put(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`, {
            date: date ? date : data_date,
            event_target: eventTarget ? eventTarget : data_event_target,
            event_type: eventType ? eventType : data_event_type,
            gift: gift ? gift : data_gift
        }, {
            params: {
                event_id: e.target.value,
                schedule_id: e.target.name
            }
        })
            .then((res) => console.log(res.data))
            .then(() => handleModify(!isModify));
    }

    return (
        <div className={isOpen ? "addModal" : (isModify ? "modifyModal" : "none")}>
            <div className="content">
                <h3 className="add_event">경조사 추가하기</h3>
                <h3 className="modify_event">수정하기</h3>
                <form>
                    <input className="add_event" type="date" id="birthday" name="birthday" onChange={(e) => setDate(e.target.value)} placeholder="eventDate *" />

                    <input className="modify_event" type="date" id="birthday" defaultValue={data_date} name="birthday" onChange={(e) => setDate(e.target.value)} placeholder="eventDate *" />

                    <input className="add_event" type="text" placeholder="event target *" label="event target" onChange={(e) => setTarget(e.target.value)} />

                    <input className="modify_event" defaultValue={data_event_target} type="text" placeholder="event target *" label="event target" onChange={(e) => setTarget(e.target.value)} />

                    <select className="event_type add_event" onChange={(e) => setType(e.target.value)}>
                        <option value="" disabled selected> 경조사 종류 *</option>
                        <option value="생일">생일</option>
                        <option value="결혼식">결혼식</option>
                        <option value="장례식">장례식</option>
                        <option value="집들이">집들이</option>
                        <option value="취직">취직</option>
                        <option value="입학">입학</option>
                        <option value="출산">출산</option>
                        <option value="돌잔치">돌잔치</option>
                        <option value="기념일">기념일</option>
                        <option value="기타">기타</option>
                    </select>

                    <select className="event_type modify_event" onChange={(e) => setType(e.target.value)} defaultValue={data_event_type}>
                        <option value="" disabled selected> 경조사 종류 *</option>
                        <option value="생일">생일</option>
                        <option value="결혼식">결혼식</option>
                        <option value="장례식">장례식</option>
                        <option value="집들이">집들이</option>
                        <option value="취직">취직</option>
                        <option value="입학">입학</option>
                        <option value="출산">출산</option>
                        <option value="돌잔치">돌잔치</option>
                        <option value="기념일">기념일</option>
                        <option value="기타">기타</option>
                    </select>

                    <input className="add_event" type="text" placeholder="gift *" label="gift" onChange={(e) => setGift(e.target.value)} />

                    <input className="modify_event" defaultValue={data_gift} type="text" placeholder="gift *" label="gift" onChange={(e) => setGift(e.target.value)} />

                    <button className="add_event" onClick={(e) => {
                        e.preventDefault();
                        setModal(!isOpen)
                    }}>취소</button>

                    <button className="modify_event" onClick={(e) => {
                        e.preventDefault();
                        handleModify(!isModify);
                    }}>취소</button>
                    <button className="add_event" onClick={handleSaveBtn}>저장하기</button>
                    <button className="modify_event" onClick={handleModifyBtn} name={schedule_id} value={event_id}>수정하기</button>
                </form>
            </div>
        </div>
    )
}




