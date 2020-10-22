import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import './Gift.scss';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function Gift() {

  const [searchKeyword, setSearchKeyword] = useState("");

  const tags = ["20대 여자 생일 선물", "30대 남자 생일 선물", "입학 선물", "30대 여자 집들이 선물", "설 선물", "출산용품", "결혼 선물", "취직 축하 선물", "수능 응원"]

  // 데이터 4개씩 랜더
  const [preItems, setPreItems] = useState(0);
  const [items, setItems] = useState(4);

  const [breweries, setBreweries] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const onChangeHandler = (e) => {
    setSearchKeyword(e.target.value);
  }

  // 검색버튼 클릭으로 키워드 검색
  const clickSearch = () => {
    setPreItems(0);
    setItems(4);
    setBreweries([]);
    setTimeout(() => {
      axios.post(`https://don-forget-server.com/gift/find/?text=${searchKeyword}`)
        .then((res) => {
          console.log("res.data:", res.data);
          let fourItems = res.data.slice(preItems, items);
          //updating data
          setBreweries(fourItems);
          setPreItems(items);
          setItems(items + 4);
        })
    }, 500);
  }

  // 스크롤 시 다음 데이터 불러오기
  const clickSearchMore = () => {
    setTimeout(() => {
      axios.post(`https://don-forget-server.com/gift/find/?text=${searchKeyword}`)
        .then((res) => {
          console.log("res.data:", res.data);
          let fourItems = res.data.slice(preItems, items);
          //updating data
          setBreweries([...breweries, ...fourItems]);
          setPreItems(items);
          setItems(items + 4);
        })
    }, 1500);
  }

  // 태그 클릭으로 검색(아직 스크롤 적용 안됩니다~!!)
  const clickTagSearch = (tag) => {
    setTimeout(() => {
      axios.post(`https://don-forget-server.com/gift/find/?text=${tag}`)
        .then((res) => {
          console.log("res.data:", res.data);
          let fourItems = res.data.slice(preItems, items);
          setBreweries([...breweries, ...fourItems]);
          setPreItems(preItems + 4);
          setItems(items + 4);
        })
    }, 1500);
  }

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
        </ul>

        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <InfiniteScroll
            dataLength={breweries.length} //This is important field to render the next data
            next={clickSearchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap" }} //To put endMessage and loader to the top.
            scrollableTarget="scrollableDiv"
          >
            {breweries && breweries.map((data, i) => {
              console.log("breweries:", breweries)
              return (
                <div key={i} style={{ borderWidth: 1, borderStyle: "solid", borderColor: "grey", borderRadius: "20px", padding: "10px", margin: "10px", width: "40%", display: "inline-block", fontSize: "0.7rem" }}>
                  <div>{data.title}</div>
                  <img src={data.image} style={{ width: "150px" }}></img>
                  <a style={{ overflow: "hidden", wordBreak: "break-all" }}>{data.link}</a>
                  <div>{data.category1}</div>
                  <div>{data.lprice}</div>
                  <div>{data.hprice}</div>
                  <div>{data.brand}</div>
                </div>
              )
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Gift);
