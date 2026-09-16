"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationHeader() {
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-4 py-3 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-sky-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
            GIS
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
              기인서테라피 <span className="text-xs text-sky-600 font-semibold tracking-normal">GIS Massage</span>
            </span>
          </div>
        </Link>

        {/* 데스크톱 메뉴 목록 */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
          
          {/* 1. 서비스 */}
          <Link href="/services" className="hover:text-sky-600 transition-colors">
            서비스 안내
          </Link>

          {/* 2. 코스 & 가격 */}
          <Link href="/prices" className="hover:text-sky-600 transition-colors">
            코스&가격
          </Link>

          {/* 3. 힐링 여행지 */}
          <Link href="/travel" className="hover:text-sky-600 transition-colors">
            지역 힐링스팟
          </Link>

          {/* 4. 맛집 & 숙소 */}
          <Link href="/places" className="hover:text-sky-600 transition-colors">
            주변 제휴명소
          </Link>

          {/* 5. 지역별 안내 (드롭다운) */}
          <div 
            className="relative cursor-pointer py-2"
            onMouseEnter={() => setIsRegionOpen(true)}
            onMouseLeave={() => setIsRegionOpen(false)}
          >
            <button className="hover:text-sky-600 transition-colors flex items-center gap-1 text-xs font-bold text-slate-600">
              지역별 테라피
              <span className="text-[10px] text-sky-600">▼</span>
            </button>

            {isRegionOpen && (
              <div className="absolute top-full left-0 w-36 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 space-y-1 text-xs z-50 animate-in fade-in slide-in-from-top-1">
                <Link href="/seoul/gangnam/yeoksam/shop/1" className="block px-4 py-2 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                  📍 서울 지역
                </Link>
                <Link href="/gyeonggi/seongnam_bundang/jeongja1dong/shop/1" className="block px-4 py-2 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                  📍 경기 지역
                </Link>
                <Link href="/incheon/yeonsu/songdo1dong/shop/1" className="block px-4 py-2 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                  📍 인천 지역
                </Link>
              </div>
            )}
          </div>

          {/* 6. 고객 후기 */}
          <Link href="/reviews" className="text-sky-600 font-extrabold hover:text-sky-700 transition-colors flex items-center gap-1 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100">
            <span>⭐</span> 생생후기
          </Link>

        </nav>

        {/* 우측 CTA & 모바일 토글 버튼 */}
        <div className="flex items-center gap-2">
          <Link 
            href="/seoul/gangnam/yeoksam/shop/1"
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm transition-all active:scale-95"
          >
            📞 빠른 제휴/예약
          </Link>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-sky-600 focus:outline-none"
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs font-bold text-slate-600 px-2 pb-2">
          <Link 
            href="/services" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-slate-100 hover:text-sky-600"
          >
            서비스 안내
          </Link>
          <Link 
            href="/prices" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-slate-100 hover:text-sky-600"
          >
            코스&가격
          </Link>
          <div className="py-2 px-3 rounded-lg bg-slate-50 space-y-1">
            <span className="text-slate-400 text-[11px]">지역별 바로가기</span>
            <div className="flex gap-2 pt-1">
              <Link 
                href="/seoul/gangnam/yeoksam/shop/1" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-1.5 bg-white rounded-md border border-slate-200 hover:text-sky-600 text-[11px]"
              >
                서울
              </Link>
              <Link 
                href="/gyeonggi/seongnam_bundang/jeongja1dong/shop/1" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-1.5 bg-white rounded-md border border-slate-200 hover:text-sky-600 text-[11px]"
              >
                경기
              </Link>
              <Link 
                href="/incheon/yeonsu/songdo1dong/shop/1" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-1.5 bg-white rounded-md border border-slate-200 hover:text-sky-600 text-[11px]"
              >
                인천
              </Link>
            </div>
          </div>
          <Link 
            href="/reviews" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg text-sky-600 bg-sky-50 border border-sky-100"
          >
            ⭐ 생생후기 보러가기
          </Link>
        </div>
      )}
    </header>
  );
}