import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

const SITE_URL = "https://gis-massage.netlify.app";

// 🌟 1단: '출장'을 배제한 광역 메인 복합 코스 패턴 풀 (18개)
const cityServicePatterns = [
  '릴렉스 마사지·홈타이', '소프트스웨디시 마사지·홈타이', '아로마케어 마사지·홈타이',
  '감성힐링 마사지·홈타이', '프리미엄 마사지·홈타이', '바디케어 마사지·홈타이',
  '딥티슈이완 마사지·홈타이', '전신힐링 마사지·홈타이', '맞춤형케어 마사지·홈타이',
  '안심방문 마사지·홈타이', 'VIP스웨디시 마사지·홈타이', '명품테라피 마사지·홈타이',
  '소프트감성 마사지·홈타이', '림프순환 마사지·홈타이', '포근한힐링 마사지·홈타이',
  '체형맞춤 마사지·홈타이', '타이스트레칭 마사지·홈타이', '스페셜바디 마사지·홈타이'
];

// 🌟 2단: 광역 단위 안마 예약/안내 패턴 풀 (8개)
const cityBookingPatterns = [
  '전지역 안마 예약', '실시간 안마 방문예약', '테라피 코스 예약', '힐링 안마예약',
  '바디케어 추천예약', '웰니스 안마 안내', '구·동 안마 방문안내', '스웨디시 통합예약'
];

// 🌟 3단: 브랜드/플랫폼 정체성 및 소구 키워드 풀 (8개)
const cityPlatformHooks = [
  '기인서테라피', 'GIS 마사지', '안심 웰니스', '1:1 방문케어',
  '프라이빗 케어', '힐링 네트워크', '안심 후불제', '전신 피로해소'
];

// 🌟 디스크립션 가격 및 소구점 조합 풀
const priceHooks = [
  '건식 6만원부터 심야할증 없이 방문합니다.',
  '건식 7만원부터 심야할증 없이 방문합니다.',
  '스웨디시 8만원부터 추가비용 없이 방문합니다.',
  '아로마 7만원부터 합리적인 정찰제로 방문합니다.',
  '타이 6만원부터 현장 결제 후불제로 방문합니다.'
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city } = resolvedParams;
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";

  const seedString = `${cityName}-${city.toLowerCase()}-gis-city-careplace-style-seo`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const part1Idx = charSum % cityServicePatterns.length;
  const part2Idx = (charSum * 3) % cityBookingPatterns.length;
  const part3Idx = (charSum * 5) % cityPlatformHooks.length;
  const priceIdx = (charSum * 7) % priceHooks.length;

  // 💡 [서울 릴렉스 마사지·홈타이 | 서울 전지역 안마 예약 | 기인서테라피] 형식 (약 45~50자)
  const finalTitle = `${cityName} ${cityServicePatterns[part1Idx]} | ${cityName} ${cityBookingPatterns[part2Idx]} | ${cityPlatformHooks[part3Idx]}`;
  
  // 💡 [서울 마사지·홈타이·안마. 검증된 전문 관리사 100% 후불제. 건식 7만원부터 심야할증 없이 방문합니다.] 형식
  const finalDescription = `${cityName} 전지역 마사지·홈타이·안마. 검증된 전문 관리사 100% 후불제. ${priceHooks[priceIdx]}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}`,
    },
    keywords: [
      `${cityName} 마사지`,
      `${cityName} 홈타이`,
      `${cityName} 스웨디시`,
      `${cityName} 안마`,
      `${cityName} 아로마마사지`,
      `${cityName} 타이마사지`,
      "기인서테라피"
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city } = resolvedParams;

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const region = regionData[city.toLowerCase()];
  const districts = region?.districts || {};

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">GIS Massage</Link>
          <Link href="/" className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; 메인 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white space-y-3">
          <span className="text-sky-400 text-xs font-black tracking-widest uppercase">REGIONAL HEALING GUIDE</span>
          <h1 className="text-2xl md:text-4xl font-black">{cityName} 전지역 프리미엄 힐링 테라피 안내</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {cityName} 지역 내 세부 구·시·군별 엄선된 테라피 및 에스테틱 바디케어 제휴 샵 안내입니다. 원하시는 권역을 선택해 보세요.
          </p>
        </section>

        {/* 하위 구/시/군 선택 칩 리스트 */}
        <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            📍 {cityName} 세부 권역(구·시·군) 선택
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {Object.entries(districts).map(([dKey, dVal]) => (
              <Link
                key={dKey}
                href={`/${city}/${dKey}`}
                className="px-3.5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition text-center flex items-center justify-between"
              >
                <span>{dVal.name}</span>
                <span className="text-sky-500">&rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}