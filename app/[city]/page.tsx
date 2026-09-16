import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions"; // 🌟 전체 통합 지역 데이터 import

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

const SITE_URL = "https://gis-massage.netlify.app";
const SITE_NAME = "기인서테라피";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cityKey = resolvedParams.city.toLowerCase();
  const region = regionData[cityKey] || regionData["seoul"];

  const charSum = (cityKey + "gis_massage_city").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 10;

  const titleVariants = [
    /* 0 */ `${region.name} 지역별 힐링 마사지 제휴 안내 - ${SITE_NAME}`,
    /* 1 */ `${region.name} 프리미엄 테라피 및 맞춤 마사지 가이드 | ${SITE_NAME}`,
    /* 2 */ `[${SITE_NAME}] ${region.name} 전문 바디케어 및 릴렉스 마사지 샵`,
    /* 3 */ `${region.name} 구·군별 정통 마사지 프로그램 및 제휴처 모음`,
    /* 4 */ `${region.name} 안심 힐링 스페이스, 웰니스 마사지 정보 - ${SITE_NAME}`,
    /* 5 */ `[공식 제휴] ${region.name} 쾌적한 아로마 & 스웨디시 마사지`,
    /* 6 */ `${region.name} 1:1 맞춤형 피로회복 마사지 테라피 안내 - ${SITE_NAME}`,
    /* 7 */ `체계적인 바디케어 | ${region.name} 전문 마사지 제휴 가이드`,
    /* 8 */ `${region.name} 도심 속 힐링, 프리미엄 마사지 프로그램`,
    /* 9 */ `${SITE_NAME} 추천 ${region.name} 맞춤 힐링 마사지 제휴 정보`
  ];

  const descriptionVariants = [
    /* 0 */ `${region.name} 지역 검증된 프리미엄 힐링 마사지 제휴 샵 안내. 투명한 가격과 쾌적한 휴식 공간 정보를 ${SITE_NAME}에서 확인하세요.`,
    /* 1 */ `${region.name} 맞춤형 바디케어 마사지 프로그램 안내. 지친 일상 속 편안한 휴식과 피로 회복을 돕는 전문 제휴처 정보를 제공합니다.`,
    /* 2 */ `엄선된 ${region.name} 웰니스 마사지 테라피 가이드. 투명하고 정직한 정찰제 운영으로 편안하고 쾌적한 휴식을 누려보세요.`,
    /* 3 */ `${region.name} 편안한 휴식 공간과 릴렉싱 마사지 정보. 숙련된 테라피스트의 맞춤 프로그램을 안내해 드립니다.`,
    /* 4 */ `${region.name} 프라이빗 맞춤 마사지 테라피 제휴 샵 모음. 신뢰할 수 있는 시설과 품격 있는 서비스를 비교해 보세요.`,
    /* 5 */ `${region.name} 전신 피로회복 힐링 마사지 테라피 안내. 뭉친 근육을 부드럽게 이완하는 전문 바디케어 프로그램입니다.`,
    /* 6 */ `${region.name} 프리미엄 아로마 및 스웨디시 마사지 제휴 샵 정보. 심신 안정을 돕는 고품격 테라피를 확인하세요.`,
    /* 7 */ `${region.name} 마사지 프로그램 요금 및 코스 안내. 합리적이고 투명한 정찰제로 안심하고 이용하실 수 있습니다.`,
    /* 8 */ `베테랑 테라피스트의 ${region.name} 맞춤 마사지 케어. 개인별 컨디션에 맞춘 최적의 힐링 솔루션을 제공합니다.`,
    /* 9 */ `${SITE_NAME}가 엄선한 ${region.name} 안심 힐링 마사지 테라피 공간. 위생적이고 아늑한 제휴 샵 정보를 전해드립니다.`
  ];

  const finalTitle = titleVariants[variantIndex];
  const finalDescription = descriptionVariants[variantIndex];

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${cityKey}/`,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${cityKey}/`,
      siteName: `${SITE_NAME} (GIS Massage)`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const cityKey = resolvedParams.city.toLowerCase();
  const region = regionData[cityKey] || regionData["seoul"];

  const districtsArray = Object.entries(region.districts).map(([distKey, distVal]) => ({
    distKey,
    ...distVal,
  }));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-sky-600">
            {SITE_NAME} (GIS Massage)
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">
            &larr; 홈으로 돌아가기
          </Link>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-200 py-3 px-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-sky-600 font-semibold hover:underline">홈</Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">{region.name}</span>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="mb-8">
          <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-md mb-2 inline-block">
            {region.name} 제휴 샵 안내
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            {region.name} 지역별 프리미엄 마사지 & 힐링 테라피
          </h1>
          <p className="text-slate-600 text-sm md:text-base">{region.desc}</p>
        </div>

        <RandomDistrictList districts={districtsArray} cityKey={cityKey} />
      </section>

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-400 mt-20">
        <p>© 2026 {SITE_NAME} (GIS Massage). All rights reserved.</p>
        <p className="mt-1">도메인: {SITE_URL}/{cityKey}/</p>
      </footer>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";

interface DistrictItem {
  distKey: string;
  name: string;
  dongs: string[];
}

function RandomDistrictList({ districts, cityKey }: { districts: DistrictItem[]; cityKey: string }) {
  const [shuffledDistricts, setShuffledDistricts] = useState<DistrictItem[]>(districts);

  useEffect(() => {
    const shuffled = [...districts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledDistricts(shuffled);
  }, [districts]);

  return (
    <div className="space-y-6">
      {shuffledDistricts.map((distVal) => (
        <div key={distVal.distKey} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <Link href={`/${cityKey}/${distVal.distKey}`} className="text-lg font-bold text-slate-900 hover:text-sky-600 transition flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              {distVal.name} 전체보기 &rarr;
            </Link>
            <span className="text-xs text-slate-400">{distVal.dongs.length}개 지역 등록</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {distVal.dongs.map((dong, idx) => (
              <Link
                key={idx}
                href={`/${cityKey}/${distVal.distKey}/${encodeURIComponent(dong)}/shop/1`}
                className="inline-flex items-center px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition"
              >
                {dong} &rarr;
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}