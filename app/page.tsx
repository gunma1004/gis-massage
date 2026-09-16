import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

const SITE_URL = "https://gis-massage.netlify.app";
const SITE_NAME = "기인서테라피";

export const metadata: Metadata = {
  // 스팸 키워드 배제 및 네이버 검색 최적화 규격 준수
  title: `${SITE_NAME} | 경기·인천·서울 프리미엄 힐링 테라피`,
  description: "경기·인천·서울 지역의 검증된 프리미엄 힐링 테라피 & 바디케어 정보 플랫폼! 내 주변 맞춤형 제휴 샵과 쾌적한 휴식 공간 정보를 확인하세요.",
  keywords: [
    "기인서테라피",
    "GIS Massage",
    "힐링테라피플랫폼",
    "바디케어",
    "타이 마사지",
    "아로마 마사지",
    "릴렉스 테라피",
    "경기 마사지",
    "인천 힐링",
    "서울 에스테틱",
    "프리미엄 스파"
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} | 경기·인천·서울 힐링 테라피 예약`,
    description: "내 주변 검증된 힐링 테라피 샵 정보 총집합! 타이, 아로마, 에스테틱 맞춤 휴식 공간을 기인서테라피에서 만나보세요.",
    url: SITE_URL,
    siteName: `${SITE_NAME} (GIS Massage)`,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "기인서테라피 - 프리미엄 힐링 & 바디케어 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 경기·인천·서울 프리미엄 테라피`,
    description: "경기·인천·서울 검증된 테라피 제휴 정보 및 프리미엄 힐링 가이드",
    images: ["/og-main.png"],
  },
};

export default function Page() {
  return <MainClientUI />;
}