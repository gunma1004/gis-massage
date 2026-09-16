import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

const SITE_URL = "https://gis-massage.netlify.app";
const SITE_NAME = "기인서테라피";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // 네이버 검색 최적화 규격 준수 (경기·인천·서울 테라피)
    default: `${SITE_NAME} | 경기·인천·서울 프리미엄 힐링 테라피 플랫폼`,
    template: `%s | ${SITE_NAME}`
  },
  // 스팸 키워드를 배제한 클린하고 신뢰감 주는 메인 디스크립션
  description: "경기, 인천, 서울 지역의 검증된 프리미엄 힐링 테라피 및 바디케어 정보를 한눈에! 내 주변 맞춤형 휴식 공간과 제휴 샵 정보를 빠르고 편리하게 확인하세요.",
  keywords: [
    "기인서테라피",
    "경기 마사지",
    "인천 힐링 테라피",
    "서울 에스테틱",
    "수도권 마사지 플랫폼",
    "바디케어 제휴 샵",
    "방문 힐링"
  ],
  alternates: {
    canonical: SITE_URL,
  },
  // 🌟 네이버 웹마스터툴 소유권 확인 태그 추가
  other: {
    "naver-site-verification": "00e7695442b89d369943895964f00b130a83f820",
  },
  openGraph: {
    title: `${SITE_NAME} | 경기·인천·서울 힐링 테라피 플랫폼`,
    description: "경기, 인천, 서울 전 지역의 엄선된 프리미엄 힐링 테라피 및 바디케어 정보를 간편하게 찾아보세요.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "기인서테라피 프리미엄 힐링 플랫폼 안내",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}