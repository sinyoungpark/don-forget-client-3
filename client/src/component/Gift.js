import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import './Gift.scss';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import Modal from "./Modal";


function Gift(props) {
  const { userId } = props;

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchData, setSearchData] = useState(null);

  //다시 get 요청
  const [searchAgain, setAgain] = useState(false);

  const tags = ["20대 여자 생일 선물", "30대 남자 생일 선물", "입학 선물", "30대 여자 집들이 선물", "설 선물", "출산용품", "결혼 선물", "취직 축하 선물", "수능 응원"]

  useEffect(() => {
    if (searchAgain) {
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

  return (
    <div className="gift">
      <div className="full_page">
        <h1>Search</h1>
        <input type="text" className="search_input"
          placeholder="선물을 검색해주세요."
          onChange={onChangeHandler}></input>
        <button className="search_btn" onClick={clickSearch}>
          <Avatar className="icon"> <SearchIcon /> </Avatar>
        </button>

        <ul className="gift_tags">
          {tags.map((tag, i) => {
            return (<li key={i}
              onClick={() => {
                setSearchKeyword(tag)
                clickSearch()
              }}>{tag}</li>)
          })}
        </ul>

        <ul className="gift_list">
          {searchData && searchData.map((data, i) => {
            return (
              <div key={i}> </div>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Gift);
