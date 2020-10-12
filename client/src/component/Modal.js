import React, { useState } from "react";
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";




export default function Modal({userId, isOpen, setModal}) {
   const [date, setDate] = useState("");
   const [eventTarget, setTarget] = useState("");
   const [eventType, setType] = useState("");
   const [gift, setGift] = useState("");

   
   function handleSaveBtn(e){
     
    e.preventDefault();
     console.log(date.slice(2));
     axios.post(`http://ec2-3-34-177-67.ap-northeast-2.compute.amazonaws.com:5000/schedule/${window.sessionStorage.getItem("id")}`, {
         date : date.slice(2),
         event_target:eventTarget,
         event_type : eventType,
         gift : gift
     })
     .then((res) => console.log(res.data))
     .then(() => {
         setModal(!isOpen);
     })
   }

    return (
        <div className={isOpen ? "addModal" : "none"}>
            <div className="content">
                <h3>경조사 추가하기</h3>
                <form>
                    <input type="date" id="birthday" name="birthday" onChange={(e) => setDate(e.target.value)} placeholder="eventDate"/>
                    <input type="text" placeholder="event target" label="event target" onChange={(e) => setTarget(e.target.value)}/>
                    <select className="event_type" onChange={(e) => setType(e.target.value)}>
                        <option value="" disabled selected> 경조사 종류 </option>
                        <option value="1">생일</option>
                        <option value="2">결혼식</option>
                        <option value="3">장례식</option>
                        <option value="3">집들이</option>
                        <option value="3">취직</option>
                        <option value="3">입학</option>
                        <option value="3">출산</option>
                        <option value="3">돌잔치</option>
                        <option value="3">기념일</option>
                        <option value="3">기타</option>
                    </select>
                    <input type="text" placeholder="gift" label="gift" onChange={(e) => setGift(e.target.value)}/>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setModal(!isOpen)
                    }}>취소</button>
                    <button onClick={handleSaveBtn}>저장하기</button>
                </form>
            </div>
        </div>
    )
}