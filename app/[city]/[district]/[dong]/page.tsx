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
const SITE_NAME = "기인서테라피";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district, dong } = resolvedParams;
  
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const dongName = decodeURIComponent(dong);
  
  const locationKeyword = `${cityName} ${districtName} ${dongName}`;

  const charSum = (locationKeyword + "gis_dong_meta").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 10;

  const titleVariants = [
    /* 0 */ `${locationKeyword} 프리미엄 힐링 테라피 및 마사지 안내 - ${SITE_NAME}`,
    /* 1 */ `${locationKeyword} 전문 아로마 마사지 및 바디케어 가이드 | ${SITE_NAME}`,
    /* 2 */ `[${SITE_NAME}] ${locationKeyword} 릴렉스 스웨디시 마사지 제휴 샵`,
    /* 3 */ `${locationKeyword} 정통 웰니스 마사지 프로그램 및 제휴처 모음`,
    /* 4 */ `${locationKeyword} 안심 힐링 스페이스, 맞춤 마사지 정보 - ${SITE_NAME}`,
    /* 5 */ `[공식 제휴] ${locationKeyword} 쾌적한 아로마 & 스웨디시 마사지`,
    /* 6 */ `${locationKeyword} 1:1 맞춤형 피로회복 마사지 테라피 안내 - ${SITE_NAME}`,
    /* 7 */ `체계적인 바디케어 | ${locationKeyword} 전문 마사지 제휴 가이드`,
    /* 8 */ `${locationKeyword} 도심 속 힐링, 프리미엄 마사지 프로그램`,
    /* 9 */ `${SITE_NAME} 추천 ${locationKeyword} 맞춤 힐링 마사지 제휴 정보`
  ];

  const descriptionVariants = [
    /* 0 */ `${locationKeyword} 지역 검증된 프리미엄 힐링 테라피 및 마사지 제휴 샵 안내. 투명한 가격과 쾌적한 휴식 공간 정보를 ${SITE_NAME}에서 확인하세요.`,
    /* 1 */ `${locationKeyword} 맞춤형 바디케어 마사지 프로그램 안내. 지친 일상 속 편안한 휴식과 피로 회복을 돕는 전문 제휴처 정보를 제공합니다.`,
    /* 2 */ `엄선된 ${locationKeyword} 웰니스 마사지 테라피 가이드. 투명하고 정직한 정찰제 운영으로 편안하고 쾌적한 휴식을 누려보세요.`,
    /* 3 */ `${locationKeyword} 편안한 휴식 공간과 릴렉싱 마사지 정보. 숙련된 테라피스트의 맞춤 프로그램을 안내해 드립니다.`,
    /* 4 */ `${locationKeyword} 프라이빗 맞춤 마사지 테라피 제휴 샵 모음. 신뢰할 수 있는 시설과 품격 있는 서비스를 비교해 보세요.`,
    /* 5 */ `${locationKeyword} 전신 피로회복 힐링 마사지 테라피 안내. 뭉친 근육을 부드럽게 이완하는 전문 바디케어 프로그램입니다.`,
    /* 6 */ `${locationKeyword} 프리미엄 아로마 및 스웨디시 마사지 제휴 샵 정보. 심신 안정을 돕는 고품격 테라피를 확인하세요.`,
    /* 7 */ `마사지 프로그램 요금 및 코스 안내. 합리적이고 투명한 정찰제로 안심하고 이용하실 수 있습니다.`,
    /* 8 */ `베테랑 테라피스트의 ${locationKeyword} 맞춤 마사지 케어. 개인별 컨디션에 맞춘 최적의 힐링 솔루션을 제공합니다.`,
    /* 9 */ `${SITE_NAME}가 엄선한 ${locationKeyword} 안심 힐링 마사지 테라피 공간. 위생적이고 아늑한 제휴 샵 정보를 전해드립니다.`
  ];

  const finalTitle = titleVariants[variantIndex];
  const finalDescription = descriptionVariants[variantIndex];

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}/${dong}`,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}/${dong}`,
      siteName: `${SITE_NAME} (GIS Massage)`,
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
    { id: "1", name: `✨ ${fullLocation} 제휴 한국골든테라피`, desc: "고품격 릴렉싱 & 딥티슈 피로회복! 전문 테라피스트의 품격 있는 1:1 맞춤 바디케어", phone: "0507-1280-3361", price: "맞춤 코스별 상이", image: "/shop1.jpg" },
    { id: "2", name: `🌸 ${fullLocation} 제휴 한국미인테라피`, desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램", phone: "0507-1280-3303", price: "맞춤 코스별 상이", image: "/shop2.jpg" },
    { id: "3", name: `💎 ${fullLocation} 제휴 주주테라피`, desc: "재방문율 높은 만족도! 철저한 위생 관리와 프라이빗 힐링 바디케어 서비스 제공", phone: "0507-1280-3193", price: "맞춤 코스별 상이", image: "/shop3.jpg" },
    { id: "4", name: `👑 ${fullLocation} 제휴 퀸즈홈테라피`, desc: "품격 있게 누리는 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 특화 프로그램", phone: "0507-1280-3334", price: "맞춤 코스별 상이", image: "/shop4.jpg" },
    { id: "5", name: `🌙 ${fullLocation} 제휴 오늘밤테라피`, desc: "엄선된 우수 제휴점! 수도권 전지역 쾌적하고 편안한 방문 힐링 바디케어", phone: "0507-1280-3223", price: "맞춤 코스별 상이", image: "/shop5.jpg" }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans pb-16">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">{SITE_NAME} (GIS Massage)</Link>
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