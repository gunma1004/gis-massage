"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// 🌟 최신 행정구역(인천 제물포구·영종구 등)이 반영된 전체 지역 데이터
const regionData: Record<string, { name: string; districts: Record<string, { name: string; dongs: string[] }> }> = {
  seoul: {
    name: "서울특별시",
    districts: {
      jongno: { name: "종로구", dongs: ["청운동", "효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", "종로1가", "종로5가", "이화동", "혜화동", "창신동", "숭인동"] },
      jung: { name: "중구", dongs: ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "황학동", "중림동"] },
      yongsan: { name: "용산구", dongs: ["후암동", "용산2가동", "남영동", "청파동", "원효로동", "효창동", "용문동", "이촌동", "이태원동", "한남동", "서빙고동", "보광동"] },
      seongdong: { name: "성동구", dongs: ["왕십리동", "마장동", "사근동", "행당동", "응봉동", "금호동", "옥수동", "성수동", "송정동", "용답동"] },
      gwangjin: { name: "광진구", dongs: ["중곡동", "능동", "구의동", "광장동", "자양동", "화양동", "군자동"] },
      dongdaemun: { name: "동대문구", dongs: ["신설동", "용두동", "제기동", "전농동", "답십리동", "장안동", "청량리동", "회기동", "휘경동", "이문동"] },
      jungnang: { name: "중랑구", dongs: ["면목동", "상봉동", "중화동", "묵동", "망우동", "신내동"] },
      seongbuk: { name: "성북구", dongs: ["성북동", "삼선동", "동선동", "돈암동", "안암동", "보문동", "정릉동", "길음동", "종암동", "월곡동", "장위동", "석관동"] },
      gangbuk: { name: "강북구", dongs: ["삼양동", "미아동", "송중동", "송천동", "번동", "수유동", "우이동", "인수동"] },
      dobong: { name: "도봉구", dongs: ["창동", "도봉동", "쌍문동", "방학동"] },
      nowon: { name: "노원구", dongs: ["상계동", "중계동", "하계동", "공릉동"] },
      eunpyeong: { name: "은평구", dongs: ["불광동", "갈현동", "구산동", "대조동", "응암동", "역촌동", "신사동", "증산동", "수색동", "진관동"] },
      seodaemun: { name: "서대문구", dongs: ["천연동", "북아현동", "충현동", "신촌동", "연희동", "홍제동", "홍은동", "남가좌동", "북가좌동"] },
      mapo: { name: "마포구", dongs: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "서교동", "합정동", "망원동", "연남동", "성산동", "상암동"] },
      yangcheon: { name: "양천구", dongs: ["목동", "신월동", "신정동"] },
      gangseo: { name: "강서구", dongs: ["등촌동", "화곡동", "우장산동", "가양동", "발산동", "공항동", "방화동"] },
      guro: { name: "구로구", dongs: ["신도림동", "구로동", "가리봉동", "고척동", "개봉동", "오류동", "수궁동"] },
      geumcheon: { name: "금천구", dongs: ["가산동", "독산동", "시흥동"] },
      yeongdeungpo: { name: "영등포구", dongs: ["영등포동", "여의동", "당산동", "도림동", "문래동", "양평동", "신길동", "대림동"] },
      dongjak: { name: "동작구", dongs: ["노량진동", "상도동", "흑석동", "사당동", "대방동", "신대방동"] },
      gwanak: { name: "관악구", dongs: ["보라매동", "청림동", "성현동", "행운동", "낙성대동", "청룡동", "은천동", "서원동", "신원동", "서림동", "신사동", "난향동", "조원동", "대학동", "난곡동", "삼성동", "미성동"] },
      seocho: { name: "서초구", dongs: ["서초동", "잠원동", "반포동", "방배동", "양재동", "내곡동"] },
      gangnam: { name: "강남구", dongs: ["역삼동", "개포동", "청담동", "삼성동", "대치동", "신사동", "논현동", "압구정동", "세곡동", "자곡동", "일원동", "수서동", "도곡동"] },
      songpa: { name: "송파구", dongs: ["잠실동", "풍납동", "거여동", "마천동", "방이동", "오금동", "송파동", "석촌동", "삼전동", "가락동", "문정동", "장지동", "위례동"] },
      gangdong: { name: "강동구", dongs: ["강일동", "상일동", "명일동", "고덕동", "암사동", "천호동", "성내동", "둔촌동"] }
    }
  },
  gyeonggi: {
    name: "경기도",
    districts: {
      suwon_jangan: { name: "수원시 장안구", dongs: ["파장동", "정자동", "영화동", "송죽동", "조원동", "율천동"] },
      suwon_gwonseon: { name: "수원시 권선구", dongs: ["세류동", "평동", "권선동", "곡선동", "입북동", "서둔동"] },
      suwon_paldal: { name: "수원시 팔달구", dongs: ["매교동", "매산동", "고등동", "화서동", "수창동", "지동"] },
      suwon_yeongtong: { name: "수원시 영통구", dongs: ["매탄동", "원천동", "영통동", "망포동", "광교동"] },
      seongnam_sujeong: { name: "성남시 수정구", dongs: ["신흥동", "태평동", "수진동", "단대동", "산성동", "복정동"] },
      seongnam_jungwon: { name: "성남시 중원구", dongs: ["성남동", "중앙동", "금광동", "은행동", "하대원동", "도촌동"] },
      seongnam_bundang: { name: "성남시 분당구", dongs: ["분당동", "수내동", "정자동", "서현동", "이매동", "야탑동", "금곡동", "구미동", "판교동", "백현동"] },
      uijeongbu: { name: "의정부시", dongs: ["의정부동", "호원동", "장암동", "신곡동", "송산동", "가능동"] },
      anyang_manan: { name: "안양시 만안구", dongs: ["안양동", "석수동", "박달동"] },
      anyang_dongan: { name: "안양시 동안구", dongs: ["비산동", "관양동", "평촌동", "호계동"] },
      bucheon_wonmi: { name: "부천시 원미구", dongs: ["심곡동", "원미동", "소사동", "중동", "상동", "약대동"] },
      bucheon_sosa: { name: "부천시 소사구", dongs: ["소사본동", "범박동", "역곡동", "괴안동", "송내동"] },
      bucheon_ojeong: { name: "부천시 오정구", dongs: ["오정동", "원종동", "고강동", "성곡동"] },
      gwangmyeong: { name: "광명시", dongs: ["광명동", "철산동", "하안동", "소하동", "일직동"] },
      pyeongtaek: { name: "평택시", dongs: ["팽성읍", "포승읍", "고덕면", "서정동", "비전동", "동삭동"] },
      dongducheon: { name: "동두천시", dongs: ["생연동", "보산동", "중앙동", "상패동"] },
      ansan_sangnok: { name: "안산시 상록구", dongs: ["일동", "사동", "본오동", "반월동", "부곡동", "성포동"] },
      ansan_danwon: { name: "안산시 단원구", dongs: ["고잔동", "초지동", "선부동", "원곡동", "대부동"] },
      goyang_deogyang: { name: "고양시 덕양구", dongs: ["원신동", "흥도동", "효자동", "고양동", "행신동", "화정동"] },
      goyang_ilsandong: { name: "고양시 일산동구", dongs: ["식사동", "중산동", "정발산동", "백석동", "마두동", "장항동"] },
      goyang_ilsanseo: { name: "고양시 일산서구", dongs: ["일산동", "탄현동", "주엽동", "대화동", "송포동"] },
      gwacheon: { name: "과천시", dongs: ["별양동", "중앙동", "문원동", "과천동"] },
      guri: { name: "구리시", dongs: ["인창동", "교문동", "수택동", "갈매동"] },
      namyangju: { name: "남양주시", dongs: ["와부읍", "진접읍", "화도읍", "오남읍", "다산동", "평내동"] },
      osan: { name: "오산시", dongs: ["중앙동", "대원동", "남촌동", "초평동", "세마동"] },
      siheung: { name: "시흥시", dongs: ["대야동", "신천동", "은행동", "목감동", "정왕동", "배곧동"] },
      gunpo: { name: "군포시", dongs: ["군포동", "산본동", "금정동", "대야동"] },
      uiwang: { name: "의왕시", dongs: ["고천동", "부곡동", "내손동", "청계동"] },
      hanam: { name: "하남시", dongs: ["신장동", "창우동", "천현동", "미사동", "위례동"] },
      yongin_cheoin: { name: "용인시 처인구", dongs: ["포곡읍", "모현읍", "역삼동", "유림동", "동부동"] },
      yongin_giheung: { name: "용인시 기흥구", dongs: ["신갈동", "영덕동", "구갈동", "상갈동", "보정동", "동백동"] },
      yongin_suji: { name: "용인시 수지구", dongs: ["풍덕천동", "신봉동", "죽전동", "동천동", "상현동", "성복동"] },
      paju: { name: "파주시", dongs: ["문산읍", "조리읍", "금촌동", "교하동", "운정동"] },
      icheon: { name: "이천시", dongs: ["창전동", "중리동", "증포동", "부발읍"] },
      anseong: { name: "안성시", dongs: ["공도읍", "안성동", "대덕면"] },
      gimpo: { name: "김포시", dongs: ["고촌읍", "통진읍", "사우동", "장기동", "구래동", "마산동"] },
      hwaseong: { name: "화성시", dongs: ["봉담읍", "매송면", "비봉면", "동탄동", "병점동", "남양읍"] },
      gwangju: { name: "광주시", dongs: ["오포읍", "초월읍", "곤지암읍", "경안동", "광남동"] },
      yangju: { name: "양주시", dongs: ["회천동", "정릉동", "양주동", "백석읍"] },
      pochon: { name: "포천시", dongs: ["소흘읍", "군내면", "포천동", "선단동"] },
      yeoju: { name: "여주시", dongs: ["여흥동", "중앙동", "오학동"] },
      yeoncheon: { name: "연천군", dongs: ["연천읍", "전곡읍"] },
      gapyeong: { name: "가평군", dongs: ["가평읍", "설악면", "청평면"] },
      yangpyeong: { name: "양평군", dongs: ["양평읍", "강상면", "옥천면"] }
    }
  },
  incheon: {
    name: "인천광역시",
    districts: {
      jemulpo: { name: "제물포구", dongs: ["신포동", "도원동", "율목동"] },
      yeongjong: { name: "영종구", dongs: ["영종동", "운서동", "용유동"] },
      michuhol: { name: "미추홀구", dongs: ["숭의동", "용현동", "학익동", "도화동", "주안동", "관교동", "문학동"] },
      yeonsu: { name: "연수구", dongs: ["옥련동", "선학동", "연수동", "청학동", "동춘동", "송도동"] },
      namdong: { name: "남동구", dongs: ["구월동", "간석동", "만수동", "서창동", "논현동"] },
      bupyeong: { name: "부평구", dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동"] },
      gyeyang: { name: "계양구", dongs: ["효성동", "작전동", "계산동", "임학동", "병방동"] },
      seohae: { name: "서해구", dongs: ["연희동", "가정동", "석남동"] },
      geomdan: { name: "검단동", dongs: ["검단동", "불로동", "마전동", "당하동", "원당동", "아라동"] },
      ganghwa: { name: "강화군", dongs: ["강화읍", "선원면", "불은면"] },
      ongjin: { name: "옹진군", dongs: ["북도면", "연평면", "백령면", "대청면"] }
    }
  }
};

export default function MainClientUI() {
  const [activeSido, setActiveSido] = useState("seoul");
  const [shuffledDistricts, setShuffledDistricts] = useState<Array<[string, { name: string; dongs: string[] }]>>([]);

  const selectedRegion = regionData[activeSido];

  // 🌟 새로고침 및 탭 이동 시 구(District) 목록 순서를 무작위로 섞어주는 로직
  useEffect(() => {
    const districtsArray = Object.entries(selectedRegion.districts);
    for (let i = districtsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [districtsArray[i], districtsArray[j]] = [districtsArray[j], districtsArray[i]];
    }
    setShuffledDistricts(districtsArray);
  }, [activeSido, selectedRegion]);

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-sky-600 rounded-lg flex items-center justify-center text-white font-black text-sm">GIS</div>
            <div>
              <div className="text-base font-extrabold text-slate-900 leading-none">기인서테라피</div>
              <div className="text-[10px] text-slate-400 mt-0.5">GIS WELLNESS PLATFORM</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/prices" className="text-xs font-bold text-slate-600 hover:text-sky-600">가격안내</Link>
            <Link href="/reviews" className="text-xs font-bold text-slate-600 hover:text-sky-600">이용후기</Link>
          </div>
        </div>
      </header>

      {/* 🌟 banner.jpg 배너 적용 및 스팸/출장/마사지 키워드가 전혀 없는 프리미엄 웰니스 소개 배너 */}
      <section className="relative overflow-hidden bg-slate-900 text-center border-b border-slate-200 py-16 px-4">
        <img 
          src="/banner.jpg" 
          alt="기인서테라피 프리미엄 웰니스 배너" 
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.65]" 
        />
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <span className="bg-sky-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            PREMIUM WELLNESS SPACE
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
            경기·인천·서울 프리미엄 힐링 테라피 & 바디케어 플랫폼
          </h1>
          <p className="text-slate-200 text-xs md:text-sm font-medium">
            수도권 전 지역 투명한 정찰제 및 100% 안심 후불제 시스템으로 쾌적한 휴식을 선사합니다.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <span>📍</span> 지역별 제휴 파트너 찾기
        </h2>

        {/* 시도 선택 탭 */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.entries(regionData).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActiveSido(key)}
              className={`px-5 py-2.5 rounded-xl border font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
                activeSido === key
                  ? "bg-sky-50 text-sky-700 border-sky-400 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {val.name}
            </button>
          ))}
        </div>

        {/* 🌟 새로고침 시 순서가 무작위로 섞이는 구/군 리스트 출력 */}
        <div className="space-y-4">
          {shuffledDistricts.map(([distKey, distVal]) => (
            <div key={distKey} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="font-extrabold text-slate-900 text-base mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>{distVal.name}</span>
                <Link href={`/${activeSido}/${distKey}`} className="text-xs font-bold text-sky-600 hover:underline">
                  전체보기 &rarr;
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {distVal.dongs.map((dong, idx) => (
                  <Link
                    key={idx}
                    href={`/${activeSido}/${distKey}/${encodeURIComponent(dong)}`}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition"
                  >
                    {dong} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-10 mt-16 text-xs">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <div className="font-bold text-white text-sm">기인서테라피 (GIS Wellness)</div>
          <p>도메인 주소: https://gis-massage.netlify.app/ | 경기·인천·서울 제휴 힐링 플랫폼</p>
          <p className="text-slate-500 pt-2">© 2026 기인서테라피. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}