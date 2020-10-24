import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import './Gift.scss';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function Gift() {

  // 4개 || 8개씩 랜더
  const [addListNum, setAddListNum] = useState(8);

  const [isSearching, setIsSearching] = useState(false);
  const [topGiftList, setTopList] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState("");
  const tags = ["20대 여자 생일 선물", "30대 남자 생일 선물", "입학 선물", "30대 여자 집들이 선물", "설 선물", "출산용품", "결혼 선물", "취직 축하 선물", "수능 응원"]

  // 데이터 addListNum수 만큼 랜더
  const [preItems, setPreItems] = useState(0);
  const [items, setItems] = useState(addListNum); // 4 or 8

  const [breweries, setBreweries] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const updateWidth = () => {
    if (window.innerWidth < 757) {
      setAddListNum(4);
      // console.log("mobile");
    } else {
      setAddListNum(8);
      // console.log("desktop");
    }
  }

  useEffect(() => {
    // width가 변화할 때 함수 실행 됨
    updateWidth();
    console.log("addListNum:", addListNum)
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  })

  useEffect(() => {
    // 추천선물 받아오기
    axios.get(`https://don-forget-server.com/gift/recommandGift`)
      .then((res) => {
        console.log(res.data);
        return res.data
      })
      .then((data) => setTopList(data));
  }, [])

  // 클릭해서 조회수 올리기!
  const clickProduct = (data) => {
    axios.post(`https://don-forget-server.com/gift/clickProduct`, data)
      .then((res) => {
        console.log("message:", res.data.message);
      })
  }

  // 검색버튼 클릭으로 직접 키워드 검색
  const clickSearch = () => {
    setIsSearching(true);
    setPreItems(0);
    setItems(addListNum);
    setBreweries([]);
    setTimeout(() => {
      axios.post(`https://don-forget-server.com/gift/find/?text=${searchKeyword}`)
        .then((res) => {
          console.log("res.data:", res.data);
          let fourItems = res.data.slice(preItems, items);
          //updating data
          setBreweries(fourItems);
          setPreItems(preItems + addListNum);
          setItems(items + addListNum);
        })
    }, 500);
  }

  // 태그 클릭으로 검색
  const clickTagSearch = (tag) => {
    setIsSearching(true);
    setPreItems(0);
    setItems(addListNum);
    setBreweries([]);
    setSearchKeyword(tag); // 스크롤 검색 위해서 검색어 저장
    setTimeout(() => {
      axios.post(`https://don-forget-server.com/gift/find/?text=${tag}`)
        .then((res) => {
          // console.log("res.data:", res.data);
          let fourItems = res.data.slice(preItems, items);
          setBreweries(fourItems);
          setPreItems(preItems + addListNum);
          setItems(items + addListNum);
        })
    }, 500);
  }

  // 스크롤 시 다음 데이터 불러오기
  const clickSearchMore = () => {
    setTimeout(() => {
      axios.post(`https://don-forget-server.com/gift/find/?text=${searchKeyword}`)
        .then((res) => {
          // console.log("res.data:", res.data);
          let fourItems = res.data.slice(preItems, items);
          //updating data
          setBreweries([...breweries, ...fourItems]);
          setPreItems(preItems + addListNum);
          setItems(items + addListNum);
        })
    }, 1000); // 시간 차 주지 않으면 스크롤 계속 내려감!
  }

  return (
    <div className="gift">
      <div className="full_page">
        <h1>이런 선물 어때요?</h1>
        <input type="text" className="search_input"
          placeholder="선물을 검색해주세요."
          onChange={(e) => setSearchKeyword(e.target.value)}></input>
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
          className="scrollableDiv"
          style={{
            // height: 600,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 검색 전: 추천 선물 랜더, 검색 후: 검색 선물 랜더 */}
          {isSearching ?
            <InfiniteScroll
              className="giftList"
              dataLength={breweries.length} //This is important field to render the next data
              next={clickSearchMore}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              {breweries && breweries.map((data, i) => {
                {/* console.log("breweries.length:", breweries.length) */ }
                let title = data.title;
                title = title.replaceAll("<b>", "");
                title = title.replaceAll("</b>", "");
                if (title.length > 40) {
                  title = title.slice(0, 40) + "..." // 45글자까지만
                }

                return (
                  <div key={i} className="giftListEntry" onClick={(e) => clickProduct(data)}>
                    <img src={data.image}></img>
                    <div className="giftList_title">{title}</div>
                    <div className="giftList_price">{data.lprice}원</div>
                    <div className="giftList_category">{data.category1}</div>
                  </div>
                )
              })}
            </InfiniteScroll>
            :
            <div className="giftList">
              <h4># 돈't forget 추천선물로 보는 Top 8</h4>
              {topGiftList && topGiftList.map((data, i) => {
                let title = data.title;
                title = title.replaceAll("<b>", "#");
                title = title.replaceAll("</b>", "");
                if (title.length > 40) {
                  title = title.slice(0, 40) + "..." // 45글자까지만
                }

                return (
                  <div key={i} className="giftListEntry" onClick={(e) => clickProduct(data)}>
                    <span className="giftList_ranking">{i + 1}</span>
                    <img src={data.image}></img>
                    <div className="giftList_title">{title}</div>
                    <div className="giftList_price">{data.lprice}원</div>
                    <div className="giftList_category">조회수 {data.clickCount}</div>
                  </div>
                )
              })}
            </div>
          }

        </div>
      </div>
    </div>
  );
}

export default withRouter(Gift);
