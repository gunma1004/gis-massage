import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // 🌐 기인서테라피 Netlify 공식 도메인
  const baseUrl = 'https://gis-massage.netlify.app';

  // 1. 메인 홈 페이지 (클린 웰니스 플랫폼)
  const mainRoute: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. 상단 카테고리 메인 페이지 (SEO 신뢰도 향상)
  const categoryRoutes: MetadataRoute.Sitemap = [
    'services',
    'prices',
    'travel',
    'places',
    'reviews',
  ].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. 메인 제휴업체 상세 페이지 (/shop/1 ~ /shop/5)
  const shopRoutes: MetadataRoute.Sitemap = [1, 2, 3, 4, 5].map((id) => ({
    url: `${baseUrl}/shop/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. 서울·경기·인천 전지역 구·시·군 전체 목록 (핵심 타겟 페이지)
  const regionList = [
    // ─── 서울특별시 (25개 구) ───
    { region: 'seoul', district: '종로구' },
    { region: 'seoul', district: '중구' },
    { region: 'seoul', district: '용산구' },
    { region: 'seoul', district: '성동구' },
    { region: 'seoul', district: '광진구' },
    { region: 'seoul', district: '동대문구' },
    { region: 'seoul', district: '중랑구' },
    { region: 'seoul', district: '성북구' },
    { region: 'seoul', district: '강북구' },
    { region: 'seoul', district: '도봉구' },
    { region: 'seoul', district: '노원구' },
    { region: 'seoul', district: '은평구' },
    { region: 'seoul', district: '서대문구' },
    { region: 'seoul', district: '마포구' },
    { region: 'seoul', district: '양천구' },
    { region: 'seoul', district: '강서구' },
    { region: 'seoul', district: '구로구' },
    { region: 'seoul', district: '금천구' },
    { region: 'seoul', district: '영등포구' },
    { region: 'seoul', district: '동작구' },
    { region: 'seoul', district: '관악구' },
    { region: 'seoul', district: '서초구' },
    { region: 'seoul', district: '강남구' },
    { region: 'seoul', district: '송파구' },
    { region: 'seoul', district: '강동구' },

    // ─── 경기도 (31개 시·군 및 세부 구) ───
    { region: 'gyeonggi', district: '수원시 장안구' },
    { region: 'gyeonggi', district: '수원시 권선구' },
    { region: 'gyeonggi', district: '수원시 팔달구' },
    { region: 'gyeonggi', district: '수원시 영통구' },
    { region: 'gyeonggi', district: '성남시 수정구' },
    { region: 'gyeonggi', district: '성남시 중원구' },
    { region: 'gyeonggi', district: '성남시 분당구' },
    { region: 'gyeonggi', district: '고양시 덕양구' },
    { region: 'gyeonggi', district: '고양시 일산동구' },
    { region: 'gyeonggi', district: '고양시 일산서구' },
    { region: 'gyeonggi', district: '용인시 처인구' },
    { region: 'gyeonggi', district: '용인시 기흥구' },
    { region: 'gyeonggi', district: '용인시 수지구' },
    { region: 'gyeonggi', district: '부천시 원미구' },
    { region: 'gyeonggi', district: '부천시 소사구' },
    { region: 'gyeonggi', district: '부천시 오정구' },
    { region: 'gyeonggi', district: '안산시 상록구' },
    { region: 'gyeonggi', district: '안산시 단원구' },
    { region: 'gyeonggi', district: '안양시 만안구' },
    { region: 'gyeonggi', district: '안양시 동안구' },
    { region: 'gyeonggi', district: '남양주시' },
    { region: 'gyeonggi', district: '화성시' },
    { region: 'gyeonggi', district: '평택시' },
    { region: 'gyeonggi', district: '의정부시' },
    { region: 'gyeonggi', district: '파주시' },
    { region: 'gyeonggi', district: '김포시' },
    { region: 'gyeonggi', district: '시흥시' },
    { region: 'gyeonggi', district: '광명시' },
    { region: 'gyeonggi', district: '광주시' },
    { region: 'gyeonggi', district: '하남시' },
    { region: 'gyeonggi', district: '군포시' },
    { region: 'gyeonggi', district: '오산시' },
    { region: 'gyeonggi', district: '이천시' },
    { region: 'gyeonggi', district: '안성시' },
    { region: 'gyeonggi', district: '양주시' },
    { region: 'gyeonggi', district: '포천시' },
    { region: 'gyeonggi', district: '여주시' },
    { region: 'gyeonggi', district: '동두천시' },
    { region: 'gyeonggi', district: '가평군' },
    { region: 'gyeonggi', district: '양평군' },
    { region: 'gyeonggi', district: '연천군' },

    // ─── 인천광역시 (최신 행정구역 개편 반영) ───
    { region: 'incheon', district: '제물포구' },
    { region: 'incheon', district: '영종구' },
    { region: 'incheon', district: '미추홀구' },
    { region: 'incheon', district: '연수구' },
    { region: 'incheon', district: '남동구' },
    { region: 'incheon', district: '부평구' },
    { region: 'incheon', district: '계양구' },
    { region: 'incheon', district: '서해구' },
    { region: 'incheon', district: '검단구' },
    { region: 'incheon', district: '강화군' },
    { region: 'incheon', district: '옹진군' },
  ];

  // 구/시 단위 동적 라우트 매핑 (/[region]/[district])
  const regionRoutes: MetadataRoute.Sitemap = regionList.map((item) => {
    return {
      url: `${baseUrl}/${item.region}/${encodeURIComponent(item.district)}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    };
  });

  return [...mainRoute, ...categoryRoutes, ...shopRoutes, ...regionRoutes];
}