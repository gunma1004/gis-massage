"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DistrictItem {
  distKey: string;
  name: string;
  dongs: string[];
}

export default function RandomDistrictList({ districts, cityKey }: { districts: DistrictItem[]; cityKey: string }) {
  const [shuffledDistricts, setShuffledDistricts] = useState<DistrictItem[]>(districts);

  useEffect(() => {
    const shuffled = [...districts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledDistricts(shuffled);
  }, [districts]);

  return (
    <div className="space-y-6">
      {shuffledDistricts.map((distVal) => (
        <div key={distVal.distKey} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <Link href={`/${cityKey}/${distVal.distKey}`} className="text-lg font-bold text-slate-900 hover:text-sky-600 transition flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              {distVal.name} 전체보기 &rarr;
            </Link>
            <span className="text-xs text-slate-400">{distVal.dongs.length}개 지역 등록</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {distVal.dongs.map((dong, idx) => (
              <Link
                key={idx}
                href={`/${cityKey}/${distVal.distKey}/${encodeURIComponent(dong)}`}
                className="inline-flex items-center px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition"
              >
                {dong} &rarr;
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}