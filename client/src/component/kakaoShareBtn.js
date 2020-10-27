import React, { useEffect } from 'react'
const KakaoShareButton = ({ data }) => {

  useEffect(() => {
    createKakaoButton(data)
    console.log(data);
  })

  const createKakaoButton = (data) => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init('d7fcccce457540e5621e96787fac52a9')
      }

      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: data.title,
          imageUrl: data.titleDetailUrl, // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: `https://e.kakao.com/t/${data.titleUrl}`,
            webUrl: `https://e.kakao.com/t/${data.titleUrl}`,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              webUrl: `https://e.kakao.com/t/${data.titleUrl}`,
            },
          },
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: `https://e.kakao.com/t/${data.titleUrl}`,
            },
          },
        ],
      })
    }
  }
  return (
    <div className="kakao-share-button">
      {/* Kakao share button */}
      <button id="kakao-link-btn">
        <img src="/icons/kakao.png" alt="kakao-share-icon" />
      </button>
    </div>
  )
}
export { KakaoShareButton }