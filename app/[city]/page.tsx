import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

const SITE_URL = "https://gis-massage.netlify.app";

// 🌟 1. 수식어 300개 이상 풀 생성기 ('출장' 완전 배제)
function getModifiersPool(): string[] {
  const baseAdjectives = [
    "프라이빗한", "전문적인", "쾌적한 공간의", "안락한 분위기 속", "정성 어린 손길의", 
    "신뢰할 수 있는", "차분한 힐링", "품격 있는", "맞춤형 바디케어", "일상 회복을 위한",
    "엄선된 제휴점의", "편안한 휴식을 선사하는", "체계적인 프로그램의", "도심 속 오아시스", "부드러운 릴렉싱",
    "고품격 웰니스", "피로 회복 맞춤형", "안정감 있는", "조용하고 아늑한", "에너지 충전을 위한",
    "릴렉싱 바디케어", "프리미엄 힐링", "상쾌한 활력을 주는", "정성 가득한", "지친 몸을 위한"
  ];
  const intensityWords = [
    "깊은", "부드러운", "섬세한", "꼼꼼한", "완벽한", 
    "탁월한", "특별한", "차별화된", "노련한", "깔끔한",
    "포근한", "산뜻한"
  ];
  const pool: string[] = [];
  for (const adj of baseAdjectives) {
    for (const int of intensityWords) {
      pool.push(`${int} ${adj}`);
    }
  }
  return pool; // 총 300개 충족
}

// 🌟 2. 서비스 종류 150개 풀 생성기 ('마사지' 필수 포함, '출장' 배제)
function getServiceTypesPool(): string[] {
  const coreTechniques = ["스웨디시", "아로마", "타이", "스포츠", "힐링", "바디케어", "릴렉싱", "웰니스", "전문", "프리미엄", "감성", "토탈"];
  const styles = [
    "감성 마사지 코스", "맞춤형 마사지 프로그램", "전신 관리 마사지", "전문 테크닉 마사지", 
    "집중 이완 마사지", "릴렉스 마사지 과정", "힐링 마사지 프로그램", "프리미엄 바디 마사지", 
    "맞춤형 바디 마사지", "토탈 마사지 솔루션", "바디 릴렉싱 마사지", "시그니처 마사지"
  ];
  const pool: string[] = [];
  for (const tech of coreTechniques) {
    for (const style of styles) {
      pool.push(`${tech} 기반의 ${style}`);
      pool.push(`${tech} 전문 ${style}`);
      if (pool.length >= 150) break;
    }
    if (pool.length >= 150) break;
  }
  return pool;
}

// 🌟 3. 상세 설명 100개 풀 생성기 ('출장' 배제)
function getDescriptionsPool(): string[] {
  const actions = [
    "숙련된 테라피스트의 세심한 손길로 진행되는 전문 마사지 프로그램은", 
    "엄선된 제휴 샵에서 제공하는 맞춤형 마사지 서비스는", 
    "지친 일상 속에서 찾아가는 힐링 마사지 코스는", 
    "안락한 공간에서 즐기는 전문적인 테라피 마사지는", 
    "체계적인 프로그램을 통해 제공되는 프라이빗 마사지 솔루션은", 
    "부드러운 테크닉이 돋보이는 릴렉스 중심의 바디 마사지 안내는"
  ];
  const effects = [
    "몸과 마음의 피로를 부드럽게 씻어내 줍니다.",
    "온전한 휴식과 재충전의 시간을 선사합니다.",
    "지친 신체 리듬을 편안하게 되찾아드립니다.",
    "일상의 스트레스를 말끔히 해소해 줍니다.",
    "최상의 릴렉스와 안락함을 제공합니다.",
    "몸의 긴장을 풀고 가벼운 활력을 채워줍니다.",
    "오래도록 지속되는 편안한 안정감을 전해드립니다.",
    "누적된 근육의 긴장을 개운하게 이완시켜 줍니다."
  ];
  const pool: string[] = [];
  for (const act of actions) {
    for (const eff of effects) {
      pool.push(`${act} ${eff}`);
      if (pool.length >= 100) break;
    }
    if (pool.length >= 100) break;
  }
  return pool;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city } = resolvedParams;
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";

  const modifiersPool = getModifiersPool();
  const serviceTypesPool = getServiceTypesPool();
  const descriptionsPool = getDescriptionsPool();

  const seedString = cityName + city.toLowerCase() + "gis_city_clean_seo";
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const modIndex = charSum % modifiersPool.length;
  const serviceIndex = (charSum * 3) % serviceTypesPool.length;
  const descIndex = (charSum * 7) % descriptionsPool.length;

  const selectedModifier = modifiersPool[modIndex];
  const selectedService = serviceTypesPool[serviceIndex];
  const selectedDesc = descriptionsPool[descIndex];

  // 🌟 샵 이름, 사이트 이름, '출장'이 완전히 배제된 고유 메타 태그
  const finalTitle = `${cityName} 지역 ${selectedModifier} 제휴점의 ${selectedService}`;
  const finalDescription = `${cityName} 맞춤형 힐링 네트워크. ${selectedModifier} 진행되는 ${selectedService}. ${selectedDesc}`;

  return {
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}`,
    },
    keywords: [
      `${cityName} 타이 마사지`,
      `${cityName} 아로마 마사지`,
      `${cityName} 릴렉스 마사지`,
      `${cityName} 스웨디시 마사지`,
      `${cityName} 힐링 마사지`,
      `${cityName} 전신 마사지`,
      `${cityName} 건식 마사지`,
      `${cityName} 오일 마사지`,
      `${cityName} 감성 마사지`,
      `${cityName} 딥티슈 마사지`,
      `${cityName} 웰니스 마사지`,
      `${cityName} 프라이빗 마사지`,
      `${cityName} 맞춤 마사지`,
      `${cityName} 24시 마사지`,
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