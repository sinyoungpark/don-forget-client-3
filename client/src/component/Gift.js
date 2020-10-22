import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import './Gift.scss';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";

function Gift() {

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchData, setSearchData] = useState([]);
  const tags = ["20대 여자 생일 선물", "30대 남자 생일 선물", "입학 선물", "30대 여자 집들이 선물", "설 선물", "출산용품", "결혼 선물", "취직 축하 선물", "수능 응원"]

  // 데이터 4개씩 랜더
  const [items, setItems] = useState(4);
  const [preItems, setPreItems] = useState(0);
  const [fetching, setFetching] = useState(false);

  const onChangeHandler = (e) => {
    setSearchKeyword(e.target.value);
  }

  const clickSearch = () => {
    setFetching(true);
    console.log(searchKeyword)
    axios.post(`https://don-forget-server.com/gift/find`, {
      params: { text: searchKeyword }
    })
      .then((res) => {
        let fourResult = res.data.slice(preItems, items)
        console.log(fourResult);
        let concatData = searchData.concat(fourResult)
        setSearchData(concatData);
      })
    setFetching(false);
  }

  const clickTagSearch = (tag) => {
    console.log(tag)
    axios.post(`https://don-forget-server.com/gift/find`, {
      params: { text: tag }
    })
      .then((res) => {
        // 아직 infinite scroll 적용X!! 직접 서치부터 수정하겠습니다~~~
        console.log(res.data);
        setSearchData(res.data);
      });
  }

  const [state, setState] = useState(false);
  const onScroll = () => {
    if (document.documentElement.scrollTop +
      document.documentElement.clientHeight ===
      document.documentElement.scrollHeight) {
      setState(true);
      console.log("스크롤 끝")
    } else {
      setState(false);
      console.log("스크롤 중간")
    }
  };
  useEffect(() => {
    console.log("스크롤???")
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });



  return (
    <div className="gift">
      <div className="full_page">
        <h1>Gift</h1>
        <input type="text" className="search_input"
          placeholder="선물을 검색해주세요."
          onChange={onChangeHandler}></input>
        <button className="search_btn" onClick={clickSearch}>
          <Avatar className="icon"> <SearchIcon /> </Avatar>
        </button>

        <ul className="gift_tags">
          {tags.map((tag, i) => {
            return (<li key={i}
              onClick={() => clickTagSearch(tag)}>{tag}</li>)
          })}

          <li key={99} onClick={() => clickTagSearch('')}>
            **테스트용(전체데이터랜더)**
          </li>
        </ul>

        <ul className="gift_list">
          {searchData && searchData.map((data, i) => {
            return (
              <div key={i} style={{ borderWidth: 1, borderStyle: "solid", borderColor: "grey", borderRadius: "20px", padding: "10px", margin: "10px", width: "40%", display: "inline-block" }}>
                <div>데이터</div>
                <div>{data.category1}</div>
                <div>{data.title}</div>
                <a>{data.link}</a>
                <div>{data.lprice}</div>
                <div>{data.hprice}</div>
                <div>{data.brand}</div>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Gift);
