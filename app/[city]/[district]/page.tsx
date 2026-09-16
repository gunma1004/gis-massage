import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
  }>;
}

const SITE_URL = "https://gis-massage.netlify.app";
const SITE_NAME = "기인서테라피";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;
  
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const locationKeyword = `${cityName} ${districtName}`;

  const charSum = (locationKeyword + "gis_district_clean").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 30;

  // 🌟 '출장' 완전 배제, '마사지' 필수 포함 및 분산 배치된 30개 고유 패턴
  const titleVariants = [
    /* 0 */ `${locationKeyword} 프리미엄 힐링 테라피 및 마사지 안내 - ${SITE_NAME}`,
    /* 1 */ `${locationKeyword} 맞춤형 바디케어 마사지 프로그램 및 제휴 샵 안내`,
    /* 2 */ `[${SITE_NAME}] ${locationKeyword} 전문 웰니스 마사지 테라피 가이드`,
    /* 3 */ `${locationKeyword} 편안한 휴식 공간, 릴렉싱 마사지 정보`,
    /* 4 */ `${locationKeyword} 프라이빗 맞춤 마사지 테라피 제휴처 모음`,
    /* 5 */ `${locationKeyword} 전신 피로회복 힐링 마사지 테라피 안내`,
    /* 6 */ `[${SITE_NAME}] ${locationKeyword} 쾌적한 방문 바디 마사지 서비스`,
    /* 7 */ `${locationKeyword} 프리미엄 아로마 및 스웨디시 마사지 제휴 샵`,
    /* 8 */ `${locationKeyword} 웰니스 마사지 프로그램 요금 및 코스 안내`,
    /* 9 */ `${locationKeyword} 베테랑 테라피스트 1:1 맞춤 마사지 케어`,
    /* 10 */ `${SITE_NAME} | ${locationKeyword} 안심 힐링 마사지 테라피 공간`,
    /* 11 */ `${locationKeyword} 릴렉싱 바디케어 및 스파 마사지 프로그램`,
    /* 12 */ `${locationKeyword} 도심 속 힐링, 프리미엄 방문 마사지 테라피`,
    /* 13 */ `${locationKeyword} 맞춤형 정통 마사지 테라피 제휴 샵 정보`,
    /* 14 */ `[추천 제휴] ${locationKeyword} 웰니스 마사지 케어 가이드`,
    /* 15 */ `${locationKeyword} 심신 안정을 위한 힐링 마사지 테라피 안내`,
    /* 16 */ `${locationKeyword} 전문 에스테틱 및 바디케어 마사지 프로그램`,
    /* 17 */ `${locationKeyword} 1:1 맞춤형 컨디션 회복 마사지 테라피`,
    /* 18 */ `${locationKeyword} 쾌적하고 아늑한 휴식 마사지 테라피 정보`,
    /* 19 */ `${SITE_NAME} ${locationKeyword} 프리미엄 마사지 테라피 안내`,
    /* 20 */ `${locationKeyword} 전신 순환 및 릴렉스 바디 마사지 제휴`,
    /* 21 */ `${locationKeyword} 맞춤형 감성 마사지 테라피 및 힐링 프로그램`,
    /* 22 */ `[공식 제휴] ${locationKeyword} 안심 방문 마사지 케어 가이드`,
    /* 23 */ `${locationKeyword} 프리미엄 힐링 테라피 및 마사지 코스 비교`,
    /* 24 */ `${locationKeyword} 컨디션 맞춤형 바디마사지 케어 요금표`,
    /* 25 */ `${locationKeyword} 전문 웰니스 마사지 샵 제휴 정보 - ${SITE_NAME}`,
    /* 26 */ `${locationKeyword} 릴렉싱 아로마 마사지 테라피 프로그램`,
    /* 27 */ `${SITE_NAME} 추천 ${locationKeyword} 맞춤 힐링 마사지 케어`,
    /* 28 */ `${locationKeyword} 편안한 휴식을 위한 전문 바디마사지 케어`,
    /* 29 */ `${locationKeyword} 최종 웰니스 마사지 테라피 제휴 가이드`
  ];

  const descriptionVariants = [
    /* 0 */ `${locationKeyword} 지역 프리미엄 힐링 테라피 및 마사지 제휴 샵 안내. 투명한 가격과 쾌적한 휴식 공간 정보를 ${SITE_NAME}에서 확인하세요.`,
    /* 1 */ `${locationKeyword} 맞춤형 바디케어 마사지 프로그램 안내. 지친 일상 속 편안한 휴식과 피로 회복을 돕는 전문 제휴처 정보를 제공합니다.`,
    /* 2 */ `엄선된 ${locationKeyword} 웰니스 마사지 테라피 가이드. 투명하고 정직한 정찰제 운영으로 편안하고 쾌적한 휴식을 누려보세요.`,
    /* 3 */ `${locationKeyword} 편안한 휴식 공간과 릴렉싱 마사지 정보. 숙련된 테라피스트의 1:1 맞춤 프로그램을 안내해 드립니다.`,
    /* 4 */ `${locationKeyword} 프라이빗 맞춤 마사지 테라피 제휴 샵 모음. 신뢰할 수 있는 시설과 품격 있는 서비스를 비교해 보세요.`,
    /* 5 */ `${locationKeyword} 전신 피로회복 힐링 마사지 테라피 안내. 뭉친 근육을 부드럽게 이완하는 전문 바디케어 프로그램입니다.`,
    /* 6 */ `쾌적한 ${locationKeyword} 방문 바디 마사지 서비스 제휴 정보. 투명한 프로그램 구성과 친절한 안내를 만나보세요.`,
    /* 7 */ `${locationKeyword} 프리미엄 아로마 및 스웨디시 마사지 제휴 샵 정보. 심신 안정을 돕는 고품격 테라피를 확인하세요.`,
    /* 8 */ `${locationKeyword} 웰니스 마사지 프로그램 요금 및 코스 안내. 합리적이고 투명한 정찰제로 안심하고 이용하실 수 있습니다.`,
    /* 9 */ `베테랑 테라피스트의 ${locationKeyword} 1:1 맞춤 마사지 케어. 개인별 컨디션에 맞춘 최적의 힐링 솔루션을 제공합니다.`,
    /* 10 */ `${SITE_NAME}가 엄선한 ${locationKeyword} 안심 힐링 마사지 테라피 공간. 위생적이고 아늑한 제휴 샵 정보를 전해드립니다.`,
    /* 11 */ `${locationKeyword} 릴렉싱 바디케어 및 스파 마사지 프로그램 안내. 일상의 스트레스를 편안하게 비워내 보세요.`,
    /* 12 */ `${locationKeyword} 프리미엄 방문 마사지 테라피 가이드. 익숙한 공간에서 온전한 휴식과 재충전을 누려보세요.`,
    /* 13 */ `${locationKeyword} 맞춤형 정통 마사지 테라피 제휴 샵 정보. 엄선된 파트너들의 전문적인 케어 서비스를 확인하세요.`,
    /* 14 */ `신뢰할 수 있는 ${locationKeyword} 웰니스 마사지 케어 가이드. 투명한 정보 제공으로 편안한 선택을 도와드립니다.`,
    /* 15 */ `${locationKeyword} 심신 안정을 위한 힐링 마사지 테라피 안내. 부드러운 이완과 웰빙을 위한 맞춤 프로그램.`,
    /* 16 */ `전문 에스테틱 및 바디케어 마사지 프로그램 안내. ${locationKeyword} 지역 우수 제휴 샵의 상세 정보를 확인하세요.`,
    /* 17 */ `${locationKeyword} 1:1 맞춤형 컨디션 회복 마사지 테라피. 정성스러운 케어로 활기찬 일상을 되찾아보세요.`,
    /* 18 */ `${locationKeyword} 쾌적하고 아늑한 휴식 마사지 테라피 정보. 세심하고 품격 있는 바디케어 제휴처 안내.`,
    /* 19 */ `${SITE_NAME} ${locationKeyword} 프리미엄 마사지 테라피 안내. 고객 만족도가 검증된 우수 제휴 샵 리스트입니다.`,
    /* 20 */ `${locationKeyword} 전신 순환 및 릴렉스 바디 마사지 제휴 정보. 건강한 활력을 선사하는 웰니스 프로그램.`,
    /* 21 */ `${locationKeyword} 맞춤형 감성 마사지 테라피 및 힐링 프로그램. 마음까지 편안해지는 휴식을 경험해 보세요.`,
    /* 22 */ `공식 제휴된 ${locationKeyword} 안심 방문 마사지 케어 가이드. 투명하고 정직한 운영 시스템을 약속드립니다.`,
    /* 23 */ `${locationKeyword} 프리미엄 힐링 테라피 및 마사지 코스 비교. 내 몸에 꼭 맞는 프로그램과 가격 정보를 살펴보세요.`,
    /* 24 */ `${locationKeyword} 컨디션 맞춤형 바디마사지 케어 요금표 안내. 투명한 정찰제로 신뢰를 더합니다.`,
    /* 25 */ `전문 웰니스 마사지 샵 제휴 정보 - ${SITE_NAME}. ${locationKeyword} 주민 여러분을 위한 힐링 가이드.`,
    /* 26 */ `${locationKeyword} 릴렉싱 아로마 마사지 테라피 프로그램. 고급 오일과 함께하는 깊은 이완의 시간.`,
    /* 27 */ `${SITE_NAME} 추천 ${locationKeyword} 맞춤 힐링 마사지 케어. 엄선된 제휴처에서 품격 있는 휴식을 누려보세요.`,
    /* 28 */ `${locationKeyword} 편안한 휴식을 위한 전문 바디마사지 케어. 몸과 마음의 피로를 부드럽게 씻어내 드립니다.`,
    /* 29 */ `${locationKeyword} 최종 웰니스 마사지 테라피 제휴 가이드. ${SITE_NAME}가 보증하는 안전하고 쾌적한 휴식 공간 정보.`
  ];

  const finalTitle = titleVariants[variantIndex];
  const finalDescription = descriptionVariants[variantIndex];

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}`,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}`,
      siteName: `${SITE_NAME} (GIS Massage)`,
      locale: "ko_KR",
      type: "website",
      images: [{ url: "/og-main.png", width: 1200, height: 630, alt: `${locationKeyword} ${SITE_NAME}` }],
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const districtName = districtInfo ? districtInfo.name : district;
  const fullTitle = `${cityName} ${districtName}`;

  const shops = [
    { id: 1, name: `✨ ${fullTitle} 제휴 한국골든테라피`, desc: "고품격 릴렉싱 & 딥티슈 피로회복! 전문 테라피스트의 품격 있는 1:1 맞춤 마사지 케어", phone: "0507-1280-3361", price: "맞춤 코스별 상이", image: "/shop1.jpg" },
    { id: 2, name: `🌸 ${fullTitle} 제휴 한국미인테라피`, desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디마사지 프로그램", phone: "0507-1280-3303", price: "맞춤 코스별 상이", image: "/shop2.jpg" },
    { id: 3, name: `💎 ${fullTitle} 제휴 주주테라피`, desc: "재방문율 높은 만족도! 철저한 위생 관리와 프라이빗 힐링 바디마사지 서비스 제공", phone: "0507-1280-3193", price: "맞춤 코스별 상이", image: "/shop3.jpg" },
    { id: 4, name: `👑 ${fullTitle} 제휴 퀸즈홈테라피`, desc: "품격 있게 누리는 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 특화 마사지 프로그램", phone: "0507-1280-3334", price: "맞춤 코스별 상이", image: "/shop4.jpg" },
    { id: 5, name: `🌙 ${fullTitle} 제휴 오늘밤테라피`, desc: "엄선된 우수 제휴점! 수도권 전지역 쾌적하고 편안한 방문 힐링 마사지", phone: "0507-1280-3223", price: "맞춤 코스별 상이", image: "/shop5.jpg" }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">{SITE_NAME} (GIS Massage)</Link>
          <Link href="/" className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; 메인 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white space-y-3">
          <span className="text-sky-400 text-xs font-black tracking-widest uppercase">LOCAL HEALING GUIDE</span>
          <h1 className="text-2xl md:text-4xl font-black">{fullTitle} 프리미엄 힐링 마사지 테라피 안내</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {fullTitle} 고객님을 위한 엄선된 테라피 및 에스테틱 마사지 제휴 샵 안내입니다. 검증된 프로그램과 투명한 정보를 확인해 보세요.
          </p>
        </section>

        {/* 하위 동(읍/면) 선택 칩 리스트 */}
        {districtInfo && districtInfo.dongs && districtInfo.dongs.length > 0 && (
          <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              📍 {districtName} 세부 지역(동·읍·면) 선택
            </h2>
            <div className="flex flex-wrap gap-2">
              {districtInfo.dongs.map((dongName, idx) => (
                <Link
                  key={idx}
                  href={`/${city}/${district}/${encodeURIComponent(dongName)}`}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition"
                >
                  {dongName} &rarr;
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 🌟 새로고침 시 순서가 랜덤으로 섞이는 구 단위 추천 제휴 샵 리스트 컴포넌트 */}
        <RandomDistrictShopList shops={shops} fullTitle={fullTitle} city={city} district={district} />
      </main>
    </div>
  );
}

// 클라이언트 사이드 랜덤 셔플 컴포넌트
"use client";

import { useState, useEffect } from "react";

interface ShopItem {
  id: number;
  name: string;
  desc: string;
  phone: string;
  price: string;
  image: string;
}

function RandomDistrictShopList({ shops, fullTitle, city, district }: { 
  shops: ShopItem[]; 
  fullTitle: string; 
  city: string; 
  district: string; 
}) {
  const [randomShops, setRandomShops] = useState<ShopItem[]>(shops);

  useEffect(() => {
    // Fisher-Yates 셔플 알고리즘을 통한 무작위 재배치
    const shuffled = [...shops];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRandomShops(shuffled);
  }, [shops]);

  return (
    <section className="space-y-6">
      <div className="text-center">
        <p className="text-xs text-sky-600 font-bold tracking-widest uppercase">RECOMMENDED PARTNERS</p>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
          {fullTitle} 추천 제휴 샵 (총 5곳)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {randomShops.map((lShop) => (
          <div key={lShop.id} className="bg-white border border-slate-200 hover:border-sky-300 rounded-2xl p-4 flex gap-4 items-center shadow-sm transition-all group relative">
            <Link href={`/${city}/${district}/shop/${lShop.id}`} className="absolute inset-0 z-10" aria-label={`${lShop.name} 상세페이지 보기`} />
            <img 
              src={lShop.image} 
              alt={lShop.name} 
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-slate-100 group-hover:scale-105 transition-transform" 
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-sm md:text-base text-slate-900 truncate group-hover:text-sky-600 transition-colors">
                {lShop.name}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {lShop.desc}
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs font-black text-sky-600">{lShop.price}</span>
                <span className="bg-sky-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm relative z-20">
                  상세보기
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}