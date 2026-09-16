"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ShopItem {
  id: string;
  name: string;
  desc: string;
  phone: string;
  price: string;
  image: string;
}

export default function RandomShopList({ shops, fullLocation, city, district, dong }: { 
  shops: ShopItem[]; 
  fullLocation: string; 
  city: string; 
  district: string; 
  dong: string; 
}) {
  const [randomShops, setRandomShops] = useState<ShopItem[]>(shops);

  useEffect(() => {
    const shuffled = [...shops];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRandomShops(shuffled);
  }, [shops]);

  return (
    <section className="space-y-4">
      <div className="text-center">
        <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">RECOMMENDED PARTNERS</span>
        <h2 className="text-lg md:text-xl font-black text-slate-900 mt-1">✨ {fullLocation} 추천 제휴 샵 (총 5곳)</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {randomShops.map((s) => (
          <div key={s.id} className="bg-white border border-slate-200 hover:border-sky-300 rounded-2xl p-4 flex gap-4 items-center shadow-sm transition-all group relative">
            <Link href={`/${city}/${district}/${dong}/shop/${s.id}`} className="absolute inset-0 z-10" aria-label={`${s.name} 상세페이지 보기`} />
            <img src={s.image} alt={s.name} className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-100 group-hover:scale-105 transition-transform" />
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-sm md:text-base text-slate-900 truncate group-hover:text-sky-600 transition-colors">{s.name}</h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{s.desc}</p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs font-black text-sky-600">{s.price}</span>
                <span className="bg-sky-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm relative z-20">상세보기</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}