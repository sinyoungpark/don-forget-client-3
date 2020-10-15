import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import './Search.scss';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import Modal from "./Modal";


function Search(props) {
  const { userId } = props;

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

  useEffect(() => {
    if (searchAgain){
      axios.post(`https://don-forget-server.com/search/${window.sessionStorage.getItem("id")}`, {
        data: searchKeyword
      })
        .then((res) => {
          console.log(res.data);
          setSearchData(res.data);
          setAgain(false);
        });
    }
  })


  function handleDeleteBtn(e) {
    axios.delete(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`,{
      params : {
        schedule_id : e.target.name
      }
    })
      .then((res) => {
        clickSearch()
      });
  }

  const onChangeHandler = (e) => {
    setSearchKeyword(e.target.value);
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


  return (
    <div className="search">
      <div className="gradient"></div>
      <div className="full_page">
        <h1>Search</h1>
        <input type="text" className="search_input"
          placeholder="날짜 혹은 이벤트 이름을 입력해주세요."
          onChange={onChangeHandler}></input>
        <button className="search_btn"
          onClick={clickSearch}>
          <Avatar className="icon">
            <SearchIcon />
          </Avatar>
        </button>
        <ul className="search_list">
          {
            searchData && searchData.map((data) => {
              const date = String(data.date).slice(0, 10);
              return (
                <div className="date_li">
                  <div className="date">{date.slice(5, 7)} / {date.slice(8)}</div>
                  <li key={data.id}>
                    <button className="li_button" onClick={(e) => {
                      e.preventDefault();
                      handleModifyBtn(date, data.event_target, data.event_type, data.gift, data.id, data.event_id);
                    }
                    }>수정</button>
                    <button className="li_button" onClick={handleDeleteBtn} name={data.id} value={data.event_id}>삭제</button>
                    <span className={data.type}>{data.giveandtake === "give" ? "→" : "←"}</span>
                    <span className="type">{data.event_target} {data.type}</span>
                    <span className="gift">{data.gift}</span>
                    <Modal isModify={isModify} data_date={curDate} data_event_target={curEventTarget} data_event_type={curEventType} data_gift={curDataGift} schedule_id={curSchduleId} event_id={curEventId} handleModify={handleModify} searchKeyword={searchKeyword} searchData={searchData} setAgain={setAgain}/>
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
