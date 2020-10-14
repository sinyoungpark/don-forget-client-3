import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import './Home.scss';
import moment, { Moment as MomentTypes } from 'moment';
import Modal from "./Modal"
import axios from "axios"

function Home({ userId, history }) {

  // 달력 랜더
  const [selectedDate, setSelectedDate] = useState(moment());
  const [month, setMonth] = useState(selectedDate._locale._months[selectedDate.month()])
  // 월 선택 모달
  const [openSelectMonth, setOpenSelectMonth] = useState(false)
  const [year, setYear] = useState(moment().year())
  // 오른쪽 일정 창 오픈
  const [openSchedule, setOpenSchedule] = useState(false)
  // 일정 추가 모달
  const [isOpen, setModal] = useState(false);
  // 일정 받아오기
  const [data, setData] = useState(null);

  const generate = () => {
    // const today = moment();
    const today = selectedDate;
    console.log(today);
    console.log(month);
    const startWeek = today.clone().startOf('month').week();
    const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className={`row${endWeek - startWeek + 1}`} key={week}>
          {
            Array(7).fill(0).map((n, i) => {
              let current = today.clone().week(week).startOf('week').add(n + i, 'day')
              let isSelected = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
              let isGrayed = current.format('MM') === today.format('MM') ? '' : 'grayed';
              return (
                <div
                  className={`box  ${isSelected} ${isGrayed}`} key={i}
                  onClick={() => {
                    // 선택한 날짜로 이동
                    setSelectedDate(current)
                    // 오른쪽 일정 오픈
                    setOpenSchedule(true)
                  }}
                >
                  <span className={`text`}>
                    {current.format('D')}
                    <ul>
                      {/* 일정 유무 확인해서 <li>로 랜더 */}
                      {(data !== null) ?
                        data.map((obj) => {
                          if (obj.date !== null && obj.date.slice(0, 10) === current.format().slice(0, 10)) {
                            console.log(current.format().slice(0, 10));
                            return (
                              <li key={obj.id} className={obj.type}>
                                <hr />
                              </li>
                            )
                          }
                        })
                        : ""
                      }
                    </ul>
                  </span>
                </div>
              )
            })
          }
        </div>
      )
    }
    return calendar;
  }

  const selectMonth = () => {
    setOpenSelectMonth(!openSelectMonth);
  }

  const monthModal = () => {
    return (<>
      <span onClick={() => setYear(year - 1)}>&lt;</span>
      <span>{year}</span>
      <span onClick={() => setYear(year + 1)}>&gt;</span>
      <hr />
      <span onClick={() => setSelectedDate(moment().year(year).month(0).date(1))}>JAN</span>
      <span onClick={() => setSelectedDate(moment().year(year).month(1).date(1))}>FEB</span>
      <span onClick={() => setSelectedDate(moment().year(year).month(2).date(1))}>MAR</span>
      <span onClick={() => setSelectedDate(moment().year(year).month(3).date(1))}>APR</span>
      <span onClick={() => setSelectedDate(moment().year(year).month(4).date(1))}>MAY</span>
      <span onClick={() => setSelectedDate(moment().year(year).month(5).date(1))}>JUN</span>
      <span onClick={() => setSelectedDate(moment().year(year).month(6).date(1))}>JUL</span>
      <span onClick={() => setSelectedDate(moment().year(year).month(7).date(1))}>AUG</span>
      <span onClick={() => setSelectedDate(moment().year(year).month(8).date(1))}>SEP</span>
      <span onClick={() => setSelectedDate(moment().year(year).month(9).date(1))}>OCT</span>
      <span onClick={() => setSelectedDate(moment().year(year).month(10).date(1))}>NOV</span>
      <span onClick={() => setSelectedDate(moment().year(year).month(11).date(1))}>DEC</span>
    </>
    )
  }

  const getSchedule = () => {
    axios.get(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`)
      .then((res) => {
        let data = res.data;
        data = data.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        setData(data);
        console.log(data);
      })
  }

  useEffect(() => {
    // 선택한 날짜에 맞게 월 업데이트
    setMonth(selectedDate._locale._months[selectedDate.month()])
  });

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <div className="home">
      <div className="full_page">
        <div className={openSchedule ? "sideCalendar" : "Calendar"}>
          <div className="head">
            <span className="title">{month}</span>
            {/* 월 선택 모달 오픈 버튼 */}
            <button className="select_month" onClick={selectMonth}>
              {openSelectMonth ? "˄" : "˅"}
            </button>
            {/* 스케줄 추가 버튼 */}
            <button className="add_schedule"
              onClick={(e) => {
                e.preventDefault();
                setModal(!isOpen);
              }}>+</button>
          </div>
          {/* 월 선택 모달 */}
          <div className="selectMonth" style={openSelectMonth ? { display: "inline-block" } : { display: "none" }}>
            {monthModal()}
          </div>

          <div className="body">
            <div className="row">
              <div className="box">
                <span className="text">SUN</span>
              </div>
              <div className="box">
                <span className="text">MON</span>
              </div>
              <div className="box">
                <span className="text">TUE</span>
              </div>
              <div className="box">
                <span className="text">WED</span>
              </div>
              <div className="box">
                <span className="text">THU</span>
              </div>
              <div className="box">
                <span className="text">FRI</span>
              </div>
              <div className="box">
                <span className="text">SAT</span>
              </div>
            </div>
            {generate()}
          </div>
        </div>

        {/* 오른쪽 일정 창 */}
        <div className={openSchedule ? "sideSchedule" : "none"}>
          <button className="closeSideSchedule" onClick={() => setOpenSchedule(false)}>✕</button>
          <h2 className="date">
            {selectedDate.format("M[/]D[(]ddd[)]")}
          </h2>
          {/* <button className="sideSchedule_empty"
            onClick={(e) => {
              e.preventDefault();
              setModal(!isOpen);
            }}> + 일정추가 </button> */}

          <ul>
            {/* 일정 유무 확인해서 <li>로 랜더 */}
            {(data !== null) ?
              data.map((obj) => {
                if (obj.date !== null && obj.date.slice(0, 10) === selectedDate.format().slice(0, 10)) {
                  return (
                    <li key={obj.id}>
                      <div className={obj.type}>
                        {obj.event_target} {obj.type}
                        <div className="gift">{obj.gift}</div>
                      </div>
                    </li>
                  )
                }
              })
              : ""
            }
          </ul>
        </div>

        {/* 일정추가 모달 */}
        <Modal userId={userId} isOpen={isOpen} setModal={setModal} />

      </div>
    </div>
  );
}

export default withRouter(Home);
