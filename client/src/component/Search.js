import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './Search.scss';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";

function Search(props) {
  const { userId } = props;

  const [searchKeyword, setSearchKeyword] = useState("");

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
      });
  }

  return (
    <div className="search">
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
      </div>
    </div>
  );
}

export default withRouter(Search);
