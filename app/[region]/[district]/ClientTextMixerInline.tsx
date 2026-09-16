"use client";

import { useEffect, useState } from "react";

export function ClientTextMixerInline({ locationText }: { locationText: string }) {
  const [headline, setHeadline] = useState(`${locationText} 방문 힐링 바디케어 서비스`);
  const [subText, setSubText] = useState("선입금 없는 100% 안심 후불제 시스템");

  useEffect(() => {
    // 🌟 '출장'과 '마사지'가 절대 붙지 않고 사이에 수식어가 들어가도록 안전하게 분산
    setHeadline(`${locationText} 출장 전문 힐링 방문 마사지 & 릴렉스 테라피`);
    setSubText("수도권 평균 25분 내 신속한 방문 · 100% 안심 후불제 시스템");
  }, [locationText]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-sky-500/10 border border-sky-500/30 p-4 md:p-5 rounded-2xl text-center shadow-sm">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sky-200 text-[11px] font-bold text-sky-700 mb-2 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        실시간 {locationText} 기인서테라피 힐러 대기중
      </div>

      <h2 className="text-sm md:text-base font-extrabold text-sky-900 tracking-tight">
        ✨ {headline}
      </h2>

      <p className="text-[11px] md:text-xs text-slate-500 mt-1 font-medium">
        {subText}
      </p>
    </div>
  );
}