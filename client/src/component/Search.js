import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import './Search.scss';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import Modal from "./Modal";


function Search(props) {
  const { userId, setUseEffect, controllUseEffect, setSchedule, isSchedule } = props;

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchData, setSearchData] = useState(null);

  //수정 모달창 따로 
  const [isModify, handleModify] = useState(false);

  //이제 띄울 modal창 정보들 
  const [curDate, setCurDate] = useState("");
  const [curEventTarget, setCurTarget] = useState("");
  const [curEventType, setEventType] = useState("");
  const [curDataGift, setCurGift] = useState("");
  const [curSchduleId, setCurScheduleId] = useState("");
  const [curEventId, setCurEventId] = useState("");

  //다시 get 요청
  const [searchAgain, setAgain] = useState(false);

  //현재 선택된 태크 
  const [curTag, setTag] = useState("");

  useEffect(() => {
    if (searchAgain) {
      axios.post(`https://don-forget-server.com/search/${window.sessionStorage.getItem("id")}`, {
        data: searchKeyword
      })
        .then((res) => {
          console.log(res.data);
          setSearchData(res.data);
          setAgain(false);
          setUseEffect(!controllUseEffect)
        });
    }
  })


  function handleDeleteBtn(e) {
    axios.delete(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`, {
      params: {
        schedule_id: e.target.name
      }
    })
      .then((res) => {
        clickSearch()
        setUseEffect(!controllUseEffect)
      });
  }

  const onChangeHandler = (e) => {
    if (e.target.value === "") {
      setSearchData([]);
      setSchedule(true);
    } else {
      setSchedule(false);
      setSearchKeyword(e.target.value);
    }
  }

  const clickSearch = () => {
    console.log(searchKeyword)
    axios.post(`https://don-forget-server.com/search/${window.sessionStorage.getItem("id")}`, {
      data: searchKeyword
    })
      .then((res) => {
        console.log(res.data);
        setSearchData(res.data);
      });
  }

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


  const handleTag = (e) => {
    console.log(e.target.value)
    if (curTag === e.target.value) {
      console.log("hi")
      setSchedule(true);
      setTag("");
    } else {
      setTag(e.target.value);
      axios.post(`https://don-forget-server.com/search/${window.sessionStorage.getItem("id")}`, {
        data: e.target.value
      })
        .then((res) => {
          console.log(res.data);
          setSearchData(res.data);
          setSchedule(false);
        })
    }
  }


  return (
    <div className="search">
      <div className="gradient"></div>
      <div className="full_page">
        <input type="text" className="search_input"
          placeholder="이벤트 대상의 이름 혹은 이벤트 종류를 입력해주세요."
          onChange={onChangeHandler}
          onKeyPress={clickSearch} ></input>
        <ul className="tag">
          <button className="생일" onClick={handleTag} value="생일">#생일</button>
          <button className="결혼식" onClick={handleTag} value="결혼식">#결혼식</button>
          <button className="장례식" onClick={handleTag} value="장례식">#장례식</button>
          <button className="집들이" onClick={handleTag} value="집들이">#집들이</button>
          <button className="취직" onClick={handleTag} value="취직">#취직</button>
          <button className="입학" onClick={handleTag} value="입학">#입학</button>
          <button className="출산" onClick={handleTag} value="출산" >#출산</button>
          <button className="돌잔치" onClick={handleTag} value="돌잔치">#돌잔치</button>
          <button className="기념일" onClick={handleTag} value="기념일">#기념일</button>
          <button className="기타" onClick={handleTag} value="기타">#기타</button>
        </ul>
        <ul className={isSchedule ? "none" : "search_list"} >
          {
            searchData && searchData.map((data) => {
              const date = String(data.date).slice(0, 10);
              return (
                <div className="date_li">
                  <div className="date">{date.slice(5, 7)} / {date.slice(8) < 10 ? "0" + date.slice(8) : date.slice(8)}</div>
                  <li key={data.id}>
                    <button className="li_button" onClick={(e) => {
                      e.preventDefault();
                      handleModifyBtn(date, data.event_target, data.event_type, data.gift, data.id, data.event_id);
                    }
                    }>수정</button>
                    <button className="li_button" onClick={handleDeleteBtn} name={data.id} value={data.event_id}>삭제</button>
                    <span className={data.type}>{data.giveandtake === "give" ? "→" : "←"}</span>
                    <span className="type">{data.event_target} {data.type}</span>
                    <span className="gift">{data.gift[0]}</span>
                    {console.log(data.gift)}
                    <span className="gift">{data.gift[0] === "현금" ? data.gift[1] + ` 원` : data.gift[1]} </span>
                    <Modal isModify={isModify} data_date={curDate} data_event_target={curEventTarget} data_event_type={curEventType} data_gift={curDataGift} schedule_id={curSchduleId} event_id={curEventId} handleModify={handleModify} searchKeyword={searchKeyword} searchData={searchData} setAgain={setAgain} />
                  </li>
                </div>
              )
            })
          }

        </ul>
      </div>
    </div>
  );
}

export default withRouter(Search);
