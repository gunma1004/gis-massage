import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";
import RandomDistrictShopList from "@/components/RandomDistrictShopList"; // 🌟 분리된 클라이언트 컴포넌트 import

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

  return {
    title: `${locationKeyword} 프리미엄 마사지 테라피 및 바디케어 안내 - ${SITE_NAME}`,
    description: `${locationKeyword} 지역 프리미엄 마사지 테라피 및 바디케어 제휴 샵 안내. 투명한 가격과 쾌적한 휴식 공간 정보를 ${SITE_NAME}에서 확인하세요.`,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}`,
    },
    openGraph: {
      title: `${locationKeyword} 프리미엄 마사지 테라피 및 바디케어 안내 - ${SITE_NAME}`,
      description: `${locationKeyword} 지역 프리미엄 마사지 테라피 및 바디케어 제휴 샵 안내.`,
      url: `${SITE_URL}/${city}/${district}`,
      siteName: `${SITE_NAME} (GIS Massage)`,
      locale: "ko_KR",
      type: "website",
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
    { id: 1, name: `✨ ${fullTitle} 제휴 한국골든테라피`, desc: "고품격 릴렉싱 & 딥티슈 피로회복! 전문 테라피스트의 품격 있는 1:1 맞춤 바디케어", phone: "0507-1280-3361", price: "맞춤 코스별 상이", image: "/shop1.jpg" },
    { id: 2, name: `🌸 ${fullTitle} 제휴 한국미인테라피`, desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램", phone: "0507-1280-3303", price: "맞춤 코스별 상이", image: "/shop2.jpg" },
    { id: 3, name: `💎 ${fullTitle} 제휴 주주테라피`, desc: "재방문율 높은 만족도! 철저한 위생 관리와 프라이빗 힐링 바디케어 서비스 제공", phone: "0507-1280-3193", price: "맞춤 코스별 상이", image: "/shop3.jpg" },
    { id: 4, name: `👑 ${fullTitle} 제휴 퀸즈홈테라피`, desc: "품격 있게 누리는 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 특화 프로그램", phone: "0507-1280-3334", price: "맞춤 코스별 상이", image: "/shop4.jpg" },
    { id: 5, name: `🌙 ${fullTitle} 제휴 오늘밤테라피`, desc: "엄선된 우수 제휴점! 수도권 전지역 쾌적하고 편안한 방문 힐링 바디케어", phone: "0507-1280-3223", price: "맞춤 코스별 상이", image: "/shop5.jpg" }
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
          <h1 className="text-2xl md:text-4xl font-black">{fullTitle} 프리미엄 힐링 테라피 안내</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {fullTitle} 고객님을 위한 엄선된 테라피 및 에스테틱 바디케어 제휴 샵 안내입니다. 검증된 프로그램과 투명한 정보를 확인해 보세요.
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

        {/* 🌟 클라이언트 셔플 컴포넌트 호출 */}
        <RandomDistrictShopList shops={shops} fullTitle={fullTitle} city={city} district={district} />
      </main>
    </div>
  );
}