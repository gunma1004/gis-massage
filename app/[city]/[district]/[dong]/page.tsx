import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";
import RandomShopList from "@/components/RandomShopList";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
    dong: string;
  }>;
}

const SITE_URL = "https://gis-massage.netlify.app";

// 🌟 1단: '출장'을 배제한 동 단위 메인 복합 코스 패턴 풀 (18개)
const dongServicePatterns = [
  '릴렉스 마사지·홈타이', '소프트스웨디시 마사지·홈타이', '아로마케어 마사지·홈타이',
  '감성힐링 마사지·홈타이', '프리미엄 마사지·홈타이', '바디케어 마사지·홈타이',
  '딥티슈이완 마사지·홈타이', '전신힐링 마사지·홈타이', '맞춤형케어 마사지·홈타이',
  '안심방문 마사지·홈타이', 'VIP스웨디시 마사지·홈타이', '명품테라피 마사지·홈타이',
  '소프트감성 마사지·홈타이', '림프순환 마사지·홈타이', '포근한힐링 마사지·홈타이',
  '체형맞춤 마사지·홈타이', '타이스트레칭 마사지·홈타이', '스페셜바디 마사지·홈타이'
];

// 🌟 2단: 구 단위 연계 안마 예약/안내 패턴 풀 (8개)
const districtBookingActions = [
  '안마 예약', '안마 방문예약', '테라피 예약', '힐링 안마예약',
  '바디케어 예약', '홈케어 예약', '방문 안마안내', '스웨디시 예약'
];

// 🌟 3단: 플랫폼 정체성 및 소구 키워드 풀 (8개)
const platformHooks = [
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
  const { city, district, dong } = resolvedParams;
  
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const dongName = decodeURIComponent(dong);
  
  const locationKeyword = `${cityName} ${districtName} ${dongName}`;

  const seedString = `${locationKeyword}-${district.toLowerCase()}-${dong.toLowerCase()}-gis-dong-careplace-style-seo`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const part1Idx = charSum % dongServicePatterns.length;
  const part2Idx = (charSum * 3) % districtBookingActions.length;
  const part3Idx = (charSum * 5) % platformHooks.length;
  const priceIdx = (charSum * 7) % priceHooks.length;

  // 💡 [양재동 릴렉스 마사지·홈타이 | 서초구 안마 예약 | 기인서테라피] 형식 (약 45~50자)
  const finalTitle = `${dongName} ${dongServicePatterns[part1Idx]} | ${districtName} ${districtBookingActions[part2Idx]} | ${platformHooks[part3Idx]}`;
  
  // 💡 [서울 서초구 양재동 마사지·홈타이·안마. 검증된 전문 관리사 100% 후불제. 건식 7만원부터 심야할증 없이 방문합니다.] 형식
  const finalDescription = `${locationKeyword} 마사지·홈타이·안마. 검증된 전문 관리사 100% 후불제. ${priceHooks[priceIdx]}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}/${dong}`,
    },
    keywords: [
      `${locationKeyword} 마사지`,
      `${dongName} 홈타이`,
      `${dongName} 스웨디시`,
      `${districtName} 안마`,
      `${locationKeyword} 아로마마사지`,
      `${locationKeyword} 타이마사지`,
      "기인서테라피"
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}/${dong}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongMainPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district, dong } = resolvedParams;

  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const dongName = decodeURIComponent(dong);

  const fullLocation = `${cityName} ${districtName} ${dongName}`;

  const shops = [
    { id: "1", name: `✨ ${fullLocation} 제휴 웰니스 테라피 1호점`, desc: "고품격 릴렉싱 & 딥티슈 피로회복! 전문 테라피스트의 품격 있는 1:1 맞춤 바디케어", phone: "0507-1280-3361", price: "맞춤 코스별 상이", image: "/shop1.jpg" },
    { id: "2", name: `🌸 ${fullLocation} 제휴 아로마 케어 2호점`, desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램", phone: "0507-1280-3303", price: "맞춤 코스별 상이", image: "/shop2.jpg" },
    { id: "3", name: `💎 ${fullLocation} 제휴 프리미엄 3호점`, desc: "재방문율 높은 만족도! 철저한 위생 관리와 프라이빗 힐링 바디케어 서비스 제공", phone: "0507-1280-3193", price: "맞춤 코스별 상이", image: "/shop3.jpg" },
    { id: "4", name: `👑 ${fullLocation} 제휴 바디케어 4호점`, desc: "품격 있게 누리는 휴식 공간! 전문 힐러들의 체형 맞춤형 피로회복 특화 프로그램", phone: "0507-1280-3334", price: "맞춤 코스별 상이", image: "/shop4.jpg" },
    { id: "5", name: `🌙 ${fullLocation} 제휴 힐링 스팟 5호점`, desc: "엄선된 우수 제휴점! 수도권 전지역 쾌적하고 편안한 힐링 바디케어", phone: "0507-1280-3223", price: "맞춤 코스별 상이", image: "/shop5.jpg" }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans pb-16">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">Wellness Guide</Link>
          <Link href={`/${city}/${district}`} className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; {districtName} 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white space-y-3">
          <span className="text-sky-400 text-xs font-black tracking-widest uppercase">LOCAL HEALING GUIDE</span>
          <h1 className="text-2xl md:text-3xl font-black">{fullLocation} 프리미엄 힐링 테라피 안내</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {fullLocation} 고객님을 위한 엄선된 테라피 및 에스테틱 바디케어 제휴 샵 안내입니다. 검증된 프로그램과 투명한 정보를 확인해 보세요.
          </p>
        </section>

        <RandomShopList shops={shops} fullLocation={fullLocation} city={city} district={district} dong={dong} />
      </main>
    </div>
  );
}