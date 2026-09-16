import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://gis-massage.netlify.app";
const SITE_NAME = "기인서테라피";

export const metadata: Metadata = {
  title: `코스별 가격 안내 | 투명한 100% 후불 정찰제 - ${SITE_NAME}`,
  description: "서울·경기·인천 기인서테라피 투명한 코스별 가격 안내! 릴렉스, 타이, 아로마, VIP 맞춤 케어 비용과 100% 안심 후불제 예약 시스템을 확인하세요.",
  keywords: [
    "기인서테라피 가격",
    "테라피 가격",
    "홈케어 요금",
    "타이마사지 비용",
    "아로마 테라피 요금",
    "스웨디시 가격",
    "후불제 바디케어"
  ],
  alternates: {
    canonical: `${SITE_URL}/prices`,
  },
  openGraph: {
    title: `코스별 가격 안내 | ${SITE_NAME} 투명한 후불 정찰제`,
    description: "선입금 없는 100% 안심 후불제! 릴렉스, 타이, 아로마 맞춤 코스별 요금을 투명하게 비교해 보세요.",
    url: `${SITE_URL}/prices`,
    siteName: `${SITE_NAME} (GIS Massage)`,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} 코스별 가격 안내`,
      },
    ],
  },
};

const priceList = [
  {
    title: "타이 건식 릴렉싱 케어",
    duration: "60분 / 90분 / 120분",
    price: "60,000원부터~",
    desc: "전신 굳은 근육 이완 및 척추·하체 중심의 맞춤 스트레칭 프로그램",
    badge: "가성비 추천",
    highlight: false,
  },
  {
    title: "프리미엄 천연 아로마 오일",
    duration: "60분 / 90분 / 120분",
    price: "70,000원부터~",
    desc: "최고급 유기농 아로마 오일을 활용한 부드러운 전신 림프 순환 케어",
    badge: "인기 만족도",
    highlight: false,
  },
  {
    title: "감성 딥티슈 스웨디시 케어",
    duration: "60분 / 90분 / 120분",
    price: "90,000원부터~",
    desc: "심신 안정과 체내 노폐물 배출을 돕는 최고급 럭셔리 VIP 테라피",
    badge: "BEST 시그니처",
    highlight: true,
  },
  {
    title: "베테랑 힐러 VIP 스페셜 코스",
    duration: "60분 / 90분 / 120분",
    price: "140,000원부터~",
    desc: "숙련된 테라피스트의 1:1 맞춤 전신 체형 밸런스 & 피로회복 집중 프로그램",
    badge: "VIP 추천",
    highlight: false,
  },
];

export default function PricesPage() {
  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen py-10 px-4 font-sans selection:bg-sky-500 selection:text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-black tracking-widest uppercase shadow-sm">
            TRANSPARENT PRICE POLICY
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            {SITE_NAME} 투명한 코스별 가격 안내
          </h1>
          <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            100% 후불제 안심 예약 시스템으로 운영되며, 방문 전 일체의 선입금이나 예약금을 요구하지 않습니다.
          </p>
        </section>

        {/* 100% 안심 보증 배너 */}
        <section className="bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-sky-500/10 border border-sky-200 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-2xl shrink-0">
            🛡️
          </div>
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-sky-900">
              선입금 ZERO · 100% 현장 결제 보장
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {SITE_NAME}의 모든 제휴점은 서비스 진행 후 현장 결제로 진행되어 안심하고 이용하실 수 있습니다.
            </p>
          </div>
        </section>

        {/* 코스별 가격 카드 리스트 */}
        <section className="space-y-4">
          {priceList.map((item, idx) => (
            <div 
              key={idx} 
              className={`bg-white border rounded-2xl p-5 md:p-6 transition-all shadow-sm group relative ${
                item.highlight 
                  ? "border-sky-300 shadow-md bg-gradient-to-b from-sky-50/50 to-white" 
                  : "border-slate-200 hover:border-sky-300"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                      item.highlight 
                        ? "bg-sky-600 text-white border-sky-600" 
                        : "bg-sky-50 text-sky-700 border-sky-200"
                    }`}>
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      ⏱️ {item.duration}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base md:text-lg text-slate-900 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between border-t border-slate-100 md:border-0 pt-3 md:pt-0">
                  <span className="text-sky-600 font-black text-lg md:text-xl tracking-tight">
                    {item.price}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    (VAT 포함 / 100% 후불)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 하단 이용 가이드 및 주의사항 */}
        <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 text-xs text-slate-600 leading-relaxed shadow-sm">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span>📌</span> 이용 요금 및 예약 안내 사항
          </h4>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>서울, 경기, 인천 전 지역 거점 기준 투명한 정찰제로 이용하실 수 있습니다.</li>
            <li>심야 시간대 및 일부 외곽 지역의 경우 상황에 따라 약간의 조율이 발생할 수 있습니다.</li>
            <li>과도한 음주 또는 비매너 이용 시 서비스 제공이 제한될 수 있습니다.</li>
          </ul>
        </section>

        {/* 빠른 상담 및 예약 연결 */}
        <section className="text-center pt-2 space-y-4">
          <a 
            href="tel:0507-1280-3344"
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-black text-sm px-8 py-3.5 rounded-2xl shadow-sm transition-all transform active:scale-95"
          >
            📞 실시간 코스 및 비용 상담하기
          </a>

          <div>
            <Link 
              href="/"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-sky-600 transition-colors font-medium"
            >
              ← {SITE_NAME} 메인 홈으로 이동하기
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}