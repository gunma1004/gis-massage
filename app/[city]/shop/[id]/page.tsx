import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    city: string;
    id: string;
  }>;
}

const SITE_URL = "https://gis-massage.netlify.app";
const SITE_NAME = "기인서테라피";

// 🌟 정확한 샵별 코스 및 가격 정보 반영 (5개 제휴점 전체)
const shopData: Record<string, {
  name: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: {
    category: string;
    badge?: string;
    desc: string;
    items: { time: string; price: string; recommend?: boolean }[];
  }[];
  features: string[];
}> = {
  "1": {
    name: "한국골든테라피",
    phone: "0507-1280-3361",
    badge: "VIP 골든 힐링 케어",
    image: "/shop1.jpg",
    desc: "골든 품격의 감성 릴렉싱! 전문 관리사들의 정성스러운 맞춤 테라피로 일상의 피로를 완벽하게 해소해 드립니다.",
    courses: [
      {
        category: "스웨디시 코스",
        badge: "인기 추천",
        desc: "부드럽고 섬세한 터치로 전신의 피로를 깊이 있게 이완해 주는 프리미엄 스웨디시 케어.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "190,000원", recommend: true }
        ]
      },
      {
        category: "프리미엄 코스",
        badge: "시그니처",
        desc: "만족도 높은 힐링 테크닉으로 전신의 활력을 되찾아주는 맞춤형 바디케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ],
    features: ["100% 안심 후불제", "25분 내 신속 방문", "24시간 상시 운영", "전문 관리사 1:1 배정"]
  },
  "2": {
    name: "한국미인테라피",
    phone: "0507-1280-3303",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램 및 스웨디시 제휴 샵.",
    courses: [
      {
        category: "아로디시 코스",
        desc: "부드러운 아로마 감성과 힐링 케어를 동시에 즐길 수 있는 실속 프로그램.",
        items: [
          { time: "90분", price: "100,000원" },
          { time: "120분", price: "130,000원", recommend: true }
        ]
      },
      {
        category: "VIP 스웨디시 코스",
        badge: "인기 추천",
        desc: "고급 오일과 깊은 이완 테크닉으로 최고의 휴식을 선사하는 프리미엄 케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      },
      {
        category: "한국인 스웨디시 코스",
        badge: "BEST",
        desc: "한국인 전문 관리사의 섬세하고 수준 높은 프리미엄 맞춤 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["선입금 ZERO 100% 후불제", "전문 힐러 상시 대기", "철저한 프라이빗 보장", "맞춤형 케어 안내"]
  },
  "3": {
    name: "주주테라피",
    phone: "0507-1280-3193",
    badge: "만족도 1위 추천",
    image: "/shop3.jpg",
    desc: "재방문율 1위 만족도! 정통 타이 마사지부터 올인원 VIP 코스까지 체계적인 프로그램.",
    courses: [
      {
        category: "타이코스",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 마사지.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "전신아로마",
        desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "더욱 품격 있고 여유로운 휴식을 완성하는 프리미엄 스페셜 관리.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" }
        ]
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "타이 & 아로마 & 풋코스를 모두 즐길 수 있는 올인원 150분 힐링.",
        items: [
          { time: "150분", price: "160,000원", recommend: true }
        ]
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 세심한 터치로 완성되는 최고급 스웨디시.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["선입금 없는 100% 후불제", "평균 25분 빠른 방문", "24시간 상담 가능", "최고급 오일 사용"]
  },
  "4": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    badge: "여왕처럼 누리는 VIP",
    image: "/shop4.jpg",
    desc: "여왕처럼 누리는 고품격 테라피! 전문 관리사들의 품격 있는 1:1 맞춤 방문 힐링 서비스.",
    courses: [
      {
        category: "건식 힐링 코스",
        desc: "오일 없이 건식 지압과 스트레칭으로 굳은 전신 근육을 시원하게 풀어주는 코스.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "아로마 힐링 코스",
        desc: "고급 아로마 오일을 사용하여 뭉친 피로를 부드럽게 이완시키는 방문 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "힐링스웨디시 코스",
        badge: "인기",
        desc: "부드럽고 감성적인 오일 테라피로 심신의 안정을 찾아주는 스웨디시.",
        items: [
          { time: "60분", price: "80,000원" },
          { time: "90분", price: "100,000원", recommend: true },
          { time: "120분", price: "120,000원" }
        ]
      },
      {
        category: "VIP스페셜코스",
        badge: "★추천",
        desc: "최고의 만족감을 선사하는 고품격 프리미엄 맞춤 스페셜 케어.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      },
      {
        category: "한국 관리사 코스",
        badge: "BEST",
        desc: "한국인 관리사의 전문적인 손길로 진행되는 맞춤형 프리미엄 코스.",
        items: [
          { time: "60분", price: "150,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 후불 안심결제", "전문 관리사 상시 대기", "수도권 전지역 출장 방문", "24시간 예약 가능"]
  },
  "5": {
    name: "오늘밤테라피",
    phone: "0507-1280-3223",
    badge: "야간 힐링 만족 1위",
    image: "/shop5.jpg",
    desc: "선입금 없는 100% 후불제! 깊은 밤 지친 하루의 피로를 타이부터 스웨디시까지 완벽하게 날려버리세요.",
    courses: [
      {
        category: "타이코스",
        desc: "오일 없이 정통 건식 지압과 스트레칭으로 피로를 시원하게 해소.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "전신아로마",
        desc: "천연 오일의 부드러움으로 전신을 편안하게 이완시켜주는 아로마 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "섬세하고 감각적인 터치로 깊은 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "완벽한 휴식을 위한 고품격 프리미엄 스페셜 관리 프로그램.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" }
        ]
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "타이 & 아로마 & 풋코스를 종합적으로 즐기는 150분 올인원 코스.",
        items: [
          { time: "150분", price: "160,000원", recommend: true }
        ]
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 디테일하고 품격 있는 스웨디시 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 안심 후불제", "수도권 전지역 신속 방문", "심야 24시 상시 운영", "개인 맞춤 압 조절"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, id } = resolvedParams;
  const shop = shopData[id] || shopData["1"];
  
  const cityName = city.toUpperCase() === "SEOUL" ? "서울" : city.toUpperCase() === "GYEONGGI" ? "경기" : "인천";

  const charSum = (cityName + shop.name + "gis_city_shop_unique").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 30;

  // 🌟 '출장'과 '마사지'가 절대 붙지 않고 수식어로 분산된 30개 고유 패턴 (샵 이름 제외)
  const titleVariants = [
    /* 0 */ `${cityName} 전문 출장 타이 마사지 안내 - ${SITE_NAME}`,
    /* 1 */ `${cityName} 맞춤 출장 아로마 마사지 가이드 - ${SITE_NAME}`,
    /* 2 */ `${cityName} 쾌적한 출장 스웨디시 마사지 정보 · ${SITE_NAME}`,
    /* 3 */ `[${SITE_NAME}] ${cityName} 신속 출장 타이 마사지 24시`,
    /* 4 */ `${cityName} 프리미엄 출장 아로마 마사지 및 릴렉스 케어`,
    /* 5 */ `${cityName} 안전한 출장 스웨디시 마사지 제휴 안내`,
    /* 6 */ `[안심후불] ${cityName} 추천 출장 타이 마사지 프로그램`,
    /* 7 */ `${cityName} 고품격 출장 아로마 마사지 & 힐링 케어`,
    /* 8 */ `${cityName} 전문 출장 스웨디시 마사지 요금 및 코스 비교`,
    /* 9 */ `${SITE_NAME} | ${cityName} 베테랑 출장 타이 마사지 샵`,
    /* 10 */ `${cityName} 24시 출장 아로마 마사지 신속 방문 제휴처`,
    /* 11 */ `${cityName} 안심 출장 스웨디시 마사지 최종 정보 안내`,
    /* 12 */ `[추천 제휴] ${cityName} 맞춤형 출장 타이 마사지`,
    /* 13 */ `${cityName} 1:1 방문형 출장 아로마 마사지 솔루션`,
    /* 14 */ `${SITE_NAME} ${cityName} 프리미엄 출장 스웨디시 마사지`,
    /* 15 */ `${cityName} 코스별 요금표 | 출장 타이 마사지 가이드`,
    /* 16 */ `${cityName} 우수 제휴점 출장 아로마 마사지 프로그램`,
    /* 17 */ `${SITE_NAME} 추천 ${cityName} 힐링 출장 스웨디시 마사지`,
    /* 18 */ `[24시 후불제] ${cityName} 안전한 출장 타이 마사지`,
    /* 19 */ `${cityName} 바디케어 중심 출장 아로마 마사지 안내`,
    /* 20 */ `${cityName} 릴렉스 특화 출장 타이 마사지 제휴`,
    /* 21 */ `${cityName} 감성 웰니스 출장 아로마 마사지 프로그램`,
    /* 22 */ `[공식 제휴] ${cityName} 신속 출장 스웨디시 마사지`,
    /* 23 */ `${cityName} 맞춤 컨디션 회복 출장 타이 마사지`,
    /* 24 */ `${cityName} 정찰제 요금 안내 | 출장 아로마 마사지`,
    /* 25 */ `${cityName} 전문 웰니스 제휴 샵 - ${SITE_NAME}`,
    /* 26 */ `${cityName} 프리미엄 힐링 출장 스웨디시 마사지 공간`,
    /* 27 */ `${SITE_NAME} 보증 ${cityName} 안전 출장 타이 마사지`,
    /* 28 */ `${cityName} 맞춤형 힐링 출장 아로마 마사지 스팟`,
    /* 29 */ `${cityName} 최종 방문 케어 출장 스웨디시 마사지 가이드`
  ];

  const descriptionVariants = [
    /* 0 */ `${cityName} 전문 출장 타이 마사지 제휴처 ${shop.name}. 선입금 없는 100% 안심 후불제 코스 및 가격 정보를 ${SITE_NAME}에서 확인하세요.`,
    /* 1 */ `${cityName} 맞춤 출장 아로마 마사지 제휴 샵 ${shop.name}. 24시 신속 방문과 투명한 코스별 가격비교를 제공합니다.`,
    /* 2 */ `선입금 사기 걱정 없는 100% 후불제! ${cityName} 프리미엄 출장 스웨디시 마사지 프로그램과 맞춤 케어를 ${shop.name}에서 만나보세요.`,
    /* 3 */ `${cityName} 릴렉스 케어 전문 ${shop.name}. 지친 피로를 풀어주는 1:1 맞춤 출장 마사지 서비스를 안내합니다.`,
    /* 4 */ `${cityName} 24시 출장 타이 마사지 예약 가이드. 검증된 ${shop.name} 제휴점에서 편안하고 안심되는 휴식을 누려보세요.`,
    /* 5 */ `${cityName} 전문 출장 아로마 마사지 점 ${shop.name}. 25분 내 신속한 방문과 정직한 후불제 시스템을 보장합니다.`,
    /* 6 */ `안심하고 이용하는 ${cityName} 우수 출장 스웨디시 마사지 ${shop.name}! 선입금 0원, 100% 후불제로 쾌적한 전신 바디케어를 경험하세요.`,
    /* 7 */ `${cityName} 특화 제휴 샵 ${shop.name}. 세심한 터치로 일상의 피로를 말끔히 비워내 드리는 출장 마사지 서비스.`,
    /* 8 */ `${cityName} 전문 출장 타이 마사지 코스별 상세 요금표 안내. ${shop.name}의 투명하고 합리적인 방문 테라피 프로그램을 확인하세요.`,
    /* 9 */ `${cityName} 실속 있는 출장 아로마 마사지 우수 제휴점 ${shop.name}. 언제나 편리하게 이용할 수 있는 실시간 예약 가이드.`,
    /* 10 */ `${SITE_NAME}가 엄선한 ${cityName} 안전 출장 스웨디시 마사지 ${shop.name}. 100% 후불제로 안전하고 편안한 나만의 홈스파를 즐겨보세요.`,
    /* 11 */ `${cityName} 전문 ${shop.name}! 숙련된 힐러진의 정성스러운 1:1 방문 출장 마사지 케어 안내.`,
    /* 12 */ `${cityName} 24시 연중무휴 운영 ${shop.name}. 깊은 이완과 힐링을 선사하는 고품격 방문 출장 마사지 프로그램.`,
    /* 13 */ `${cityName} 투명한 출장 아로마 마사지 제휴 정보. ${shop.name}에서 제공하는 정직한 코스별 가격을 비교하세요.`,
    /* 14 */ `신속한 방문과 친절한 서비스! ${cityName} 전문 출장 스웨디시 마사지 ${shop.name}의 안심 후불제 프로그램을 만나보세요.`,
    /* 15 */ `${cityName} 인기 제휴점 ${shop.name}. 지친 몸과 마음에 편안한 쉼을 선물해 드리는 출장 마사지 힐링 스팟.`,
    /* 16 */ `${cityName} 선입금 없는 안전한 후불 시스템으로 부담 없이 이용하는 출장 타이 마사지 ${shop.name}.`,
    /* 17 */ `${cityName} 맞춤형 출장 아로마 마사지 솔루션 ${shop.name}. 굳은 전신 근육을 시원하게 풀어주는 전문 방문 테라피.`,
    /* 18 */ `${cityName} 투명하고 정직한 제휴 정보를 제공하는 출장 스웨디시 마사지 가이드 ${shop.name}.`,
    /* 19 */ `${cityName} 전문 ${shop.name}! 최고급 오일 테라피와 함께 온전한 출장 마사지 휴식을 누려보세요.`,
    /* 20 */ `${cityName} 24시간 언제든 빠르고 정확하게 연결되는 출장 타이 마사지 제휴 안내 ${shop.name}.`,
    /* 21 */ `${cityName} 프라이빗 맞춤 케어로 일상의 활력을 되찾아주는 출장 아로마 마사지 제휴 샵 ${shop.name}.`,
    /* 22 */ `100% 후불제로 안전한 ${cityName} 출장 스웨디시 마사지 ${shop.name}. 출발 전 선입금을 요구하지 않는 믿을 수 있는 제휴점.`,
    /* 23 */ `${cityName} 합리적인 출장 타이 마사지 코스 요금을 ${shop.name}에서 지금 확인하세요.`,
    /* 24 */ `${cityName} 베테랑 테라피스트가 선사하는 고품격 출장 아로마 마사지 요금 및 예약 안내 ${shop.name}.`,
    /* 25 */ `${cityName} 신속한 방문 배차로 만족도를 높여주는 출장 스웨디시 마사지 우수 제휴 샵 ${shop.name}.`,
    /* 26 */ `${cityName} 전문 관리사 배정 ${shop.name}. 부드러운 림프 순환과 출장 마사지 힐링을 위한 최적의 선택.`,
    /* 27 */ `${SITE_NAME} 공식 ${cityName} 출장 타이 마사지 ${shop.name}. 쾌적하고 편안한 방문 휴식 공간 제휴 정보를 전해드립니다.`,
    /* 28 */ `${cityName} 묵은 피로를 시원하게 날려버리는 출장 아로마 마사지 제휴 프로그램 ${shop.name}.`,
    /* 29 */ `${cityName} 최종 이용 가이드 ${shop.name}. 100% 안심 후불제 시스템으로 편안하고 안전하게 즐기는 출장 마사지.`
  ];

  const finalTitle = titleVariants[variantIndex];
  const finalDescription = descriptionVariants[variantIndex];

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/shop/${id}`,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/shop/${id}`,
      siteName: `${SITE_NAME} (GIS Massage)`,
      locale: "ko_KR",
      type: "website",
      images: [{ url: shop.image, width: 800, height: 600, alt: shop.name }],
    },
  };
}

export default async function CityShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, id } = resolvedParams;
  const shop = shopData[id] || shopData["1"];

  const cityName = city.toUpperCase() === "SEOUL" ? "서울" : city.toUpperCase() === "GYEONGGI" ? "경기" : "인천";
  const displayShopTitle = `${cityName} 전문 출장 타이 마사지 - ${shop.name}`;

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans pb-28">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">{SITE_NAME} (GIS Massage)</Link>
          <Link href={`/${city}`} className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; {cityName} 목록으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img src={shop.image} alt={displayShopTitle} className="w-full h-full object-cover filter brightness-[0.85]" />
            <span className="absolute top-4 left-4 bg-sky-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">✨ {shop.badge}</span>
          </div>
          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10 bg-white rounded-t-3xl border-t border-slate-100">
            <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">{displayShopTitle}</h1>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{shop.desc}</p>
          </div>
        </section>

        <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-lg md:text-2xl font-black text-slate-900 mt-1">💎 {cityName} 정규 코스 및 요금 안내</h2>
          </div>
          <div className="space-y-6">
            {shop.courses.map((courseGroup, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-slate-900 text-base">{courseGroup.category}</h3>
                  {courseGroup.badge && (
                    <span className="text-[10px] bg-sky-100 text-sky-700 font-bold px-2.5 py-0.5 rounded-full">
                      {courseGroup.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{courseGroup.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {courseGroup.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="p-3.5 bg-white rounded-xl border border-slate-200 flex justify-between items-center shadow-2xs">
                      <span className="text-xs font-bold text-slate-700">⏱️ {item.time}</span>
                      <span className="text-sm font-black text-sky-600">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-3 md:p-4 shadow-lg">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a href={`tel:${shop.phone}`} className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-sm">📞 전화예약 ({shop.phone})</a>
          <a href={`sms:${shop.phone}`} className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-3.5 rounded-2xl text-xs md:text-sm">💬 문자상담</a>
        </div>
      </div>
    </div>
  );
}