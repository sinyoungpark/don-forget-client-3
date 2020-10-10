import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import './Home.scss';
import moment, { Moment as MomentTypes } from 'moment';

function Home({ history }) {

  const [selectedDate, setSelectedDate] = useState(moment());
  const [month, setMonth] = useState(selectedDate._locale._months[selectedDate.month()])

  const generate = () => {
    // const today = moment();
    const today = selectedDate
    console.log(today)
    console.log(month)
    const startWeek = today.clone().startOf('month').week();
    const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className={`row${endWeek - startWeek}`} key={week}>
          {
            Array(7).fill(0).map((n, i) => {
              let current = today.clone().week(week).startOf('week').add(n + i, 'day')
              let isSelected = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
              let isGrayed = current.format('MM') === today.format('MM') ? '' : 'grayed';
              return (
                <div
                  className={`box  ${isSelected} ${isGrayed}`}
                  key={i}
                  onClick={() => setSelectedDate(current)}
                >
                  <span className={`text`}>{current.format('D')}</span>
                </div>
              )
            })
          }
        </div>
      )
    }
    return calendar;
  }

  useEffect(() => {
    setMonth(selectedDate._locale._months[selectedDate.month()])
  });

  return (
    <div className="home">
      <div className="full_page">
        <div className="Calendar">
          <div className="head">
            <span className="title">{month}</span>
            <button className="select_month">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" /></svg>
            </button>
            <button className="add_schedule">+</button>
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
      </div>
    </div>
  );
}

export default withRouter(Home);
