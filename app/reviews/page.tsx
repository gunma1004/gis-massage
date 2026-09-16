import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://gis-massage.netlify.app";
const SITE_NAME = "기인서테라피";

export const metadata: Metadata = {
  title: `실제 고객 생생후기 | 만족도 4.9 안심 이용 리뷰 - ${SITE_NAME}`,
  description: "서울·경기·인천 기인서테라피 실제 이용 고객 100% 솔직 후기 모음! 엄선된 제휴 샵 이용 만족도, 관리사 실력, 선입금 없는 안심 후불제 리뷰를 확인해 보세요.",
  keywords: [
    "기인서테라피 후기",
    "마사지 이용후기",
    "힐링테라피 솔직리뷰",
    "스웨디시 후기",
    "서울 방문케어 후기",
    "경기 마사지 리뷰",
    "인천 에스테틱 후기"
  ],
  alternates: {
    canonical: `${SITE_URL}/reviews`,
  },
  openGraph: {
    title: `실제 고객 생생후기 | ${SITE_NAME} 검증된 100% 솔직 리뷰`,
    description: "선입금 없는 안심 후불제와 엄선된 프리미엄 케어! 서울·경기·인천 고객님들이 직접 작성한 생생한 피로회복 후기를 만나보세요.",
    url: `${SITE_URL}/reviews`,
    siteName: `${SITE_NAME} (GIS Massage)`,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} 실제 고객 생생후기`,
      },
    ],
  },
};

const reviewStats = {
  average: "4.9",
  totalReviews: "1,240+",
  recommendRate: "98.7%",
};

const reviews = [
  {
    name: "서울 강남구 직장인",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "감성 스웨디시 90분",
    badge: "재이용 고객",
    text: "야근 후에 피로가 심해 기인서테라피에서 신청했는데 안내도 친절하고 빠르게 연결되었어요. 어깨와 목에 뭉친 피로가 싹 풀려서 밤에 정말 꿀잠 잤습니다. 다음에도 다시 이용할 생각입니다!",
  },
  {
    name: "경기 수원시 영통구 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "베테랑 VIP 스페셜 120분",
    badge: "인증 리뷰",
    text: "선입금 없는 100% 후불제 시스템이라 정말 마음 편하게 이용했습니다. 테라피스트 분 마인드와 실력이 너무 훌륭하시고 위생도 청결해서 아주 만족스러웠습니다.",
  },
  {
    name: "인천 연수구 송도 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "프리미엄 천연 아로마 90분",
    badge: "인증 리뷰",
    text: "스웨디시와 아로마 오일 조합 코스를 이용해봤는데 전신 긴장이 제대로 풀리는 느낌이었어요. 쾌적하고 편안하게 케어를 받을 수 있어 최고네요.",
  },
  {
    name: "서울 마포구 상암동 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "타이 건식 릴렉싱 60분",
    badge: "신규 고객",
    text: "운동 후 근육 뭉침이 심해서 예약했는데 시간도 정확하셨고 스트레칭 압 조절을 너무 잘해주셔서 뭉친 다리가 완전히 가벼워졌습니다.",
  },
  {
    name: "경기 성남시 분당구 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "감성 스웨디시 60분",
    badge: "재이용 고객",
    text: "타 플랫폼은 선입금 유도가 많아서 불안했는데, 기인서테라피는 확실한 투명 정찰제 및 후불 시스템이라 믿음이 갑니다. 친절하고 프라이빗한 케어 감사합니다.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen py-10 px-4 font-sans selection:bg-sky-500 selection:text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-black tracking-widest uppercase shadow-sm">
            REAL CUSTOMER REVIEWS
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            {SITE_NAME} 실제 이용 고객 솔직 후기
          </h1>
          <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            서울·경기·인천 전지역에서 {SITE_NAME} 제휴 서비스를 직접 경험하신 고객님들의 100% 솔직한 생생 후기입니다.
          </p>
        </section>

        {/* 만족도 통계 요약 카드 */}
        <section className="bg-white border border-slate-200 p-6 rounded-3xl grid grid-cols-3 gap-2 text-center shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold block">평균 고객 평점</span>
            <span className="text-xl md:text-2xl font-black text-amber-500">★ {reviewStats.average}</span>
          </div>
          <div className="space-y-1 border-x border-slate-100">
            <span className="text-[11px] text-slate-500 font-semibold block">누적 안심 리뷰</span>
            <span className="text-xl md:text-2xl font-black text-slate-900">{reviewStats.totalReviews}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold block">지인 추천율</span>
            <span className="text-xl md:text-2xl font-black text-emerald-600">{reviewStats.recommendRate}</span>
          </div>
        </section>

        {/* 리뷰 카드 리스트 */}
        <section className="space-y-4">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 hover:border-sky-300 p-5 md:p-6 rounded-2xl space-y-3 transition-all shadow-sm group"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-black text-sm tracking-wide">
                      {rev.rate}
                    </span>
                    <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-200 font-bold">
                      {rev.badge}
                    </span>
                  </div>
                  <div className="text-xs text-slate-900 font-bold">
                    {rev.name}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium block">
                    {rev.date}
                  </span>
                  <span className="text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 font-medium">
                    {rev.course}
                  </span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                &quot;{rev.text}&quot;
              </p>
            </div>
          ))}
        </section>

        {/* 안심 예약 보증 배너 */}
        <section className="bg-white border border-slate-200 p-6 rounded-3xl text-center space-y-3 shadow-sm">
          <h3 className="text-base font-black text-slate-900">
            🛡️ 100% 안심 후불 정찰제 운영
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            {SITE_NAME}는 사전 선입금 없이 투명하고 안전한 안내 시스템을 고수하여 예약금 피해 걱정 없이 안심하고 이용하실 수 있습니다.
          </p>
          <div className="pt-1">
            <a 
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-sm transition-all transform active:scale-95"
            >
              📞 지금 바로 실시간 힐링 예약하기
            </a>
          </div>
        </section>

        {/* 홈으로 돌아가기 버튼 */}
        <div className="text-center pt-2">
          <Link 
            href="/"
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-sky-600 transition-colors font-medium"
          >
            ← {SITE_NAME} 메인 홈으로 이동하기
          </Link>
        </div>

      </div>
    </div>
  );
}