import React, { useState, useRef } from 'react';

// ==========================================
// 1. 기본 환경 설정 및 데이터 (CONFIG & MOOD_DATA)
// ==========================================
const CONFIG = {
  PHONE: "[상담 전화번호 입력]",
  KAKAO: "[카카오톡 채널 주소 입력]"
};

const MOOD_DATA = [
  {
    id: 'HAPPY',
    buttonLabel: '기분이 좋아요',
    responseTitle: '기분이 좋으시군요',
    bgClass: 'bg-yellow-50',
    borderClass: 'border-yellow-200',
    hoverClass: 'hover:bg-yellow-100',
    activeClass: 'active:bg-yellow-200',
    colorBoxBg: 'bg-[#FEF08A]/40',
    colorBoxBorder: 'border-yellow-400',
    textAccent: 'text-amber-800',
    btnBg: 'bg-amber-600 hover:bg-amber-700',
    colorName: '산뜻한 노랑',
    teaName: '상큼한 제철 과일주스',
    poem: [
      '하늘이 맑아서 좋고',
      '바람이 달아서 좋다',
      '오늘 내 얼굴에 핀 웃음꽃 하나로',
      '세상이 온통 환하다'
    ],
    stretching: '가슴을 활짝 펴고 양팔을 날개처럼 위로 올려 5초간 기지개 켜기 (3회 반복)',
    musicList: [
      { theme: '신나는 명곡', title: "남진 '둥지'" },
      { theme: '경쾌한 클래식', title: "요한 슈트라우스 '라데츠키 행진곡'" },
      { theme: '흥겨운 비트', title: '자이브 빅밴드 스윙' }
    ],
    danceName: '자이브, 웰빙댄스',
    danceReason: '즐거운 기분을 음악과 경쾌한 스텝으로 표현해 보세요.'
  },
  {
    id: 'BLUE',
    buttonLabel: '조금 우울해요',
    responseTitle: '조금 우울하시군요',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    hoverClass: 'hover:bg-orange-100',
    activeClass: 'active:bg-orange-200',
    colorBoxBg: 'bg-[#FFEDD5]/50',
    colorBoxBorder: 'border-orange-400',
    textAccent: 'text-orange-800',
    btnBg: 'bg-orange-600 hover:bg-orange-700',
    colorName: '따뜻한 주황',
    teaName: '달콤하고 따뜻한 대추차',
    poem: [
      '가만히 흔들려도 괜찮다',
      '뿌리가 깊은 나무는',
      '바람이 지나간 뒤',
      '더 푸른 잎을 틔우나니'
    ],
    stretching: '양손을 깍지 끼고 앞으로 천천히 밀며 등과 어깨 둥글게 말아 풀어주기 (10초간 유지)',
    musicList: [
      { theme: '따스한 위로', title: "노사연 '바램'" },
      { theme: '마음 정화', title: "쇼팽 '녹턴 Op.9 No.2'" },
      { theme: '정다운 포크', title: '따뜻한 왈츠풍 포크 음악' }
    ],
    danceName: '포크댄스, 웰빙댄스',
    danceReason: '사람들과 손잡고 음악에 맞춰 걷다 보면 마음이 환해집니다.'
  },
  {
    id: 'STRESS',
    buttonLabel: '스트레스가 많아요',
    responseTitle: '스트레스가 많으시군요',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    hoverClass: 'hover:bg-emerald-100',
    activeClass: 'active:bg-emerald-200',
    colorBoxBg: 'bg-[#DCFCE7]/50',
    colorBoxBorder: 'border-emerald-400',
    textAccent: 'text-emerald-800',
    btnBg: 'bg-emerald-600 hover:bg-emerald-700',
    colorName: '편안한 숲속 초록',
    teaName: '은은한 캐모마일차나 따뜻한 보리차',
    poem: [
      '짊어진 짐이 무거울 땐',
      '잠시 내려놓고 하늘을 보세요',
      '구름도 쉬어가는데',
      '그대라고 쉬지 못할까'
    ],
    stretching: "숨을 들이쉬며 어깨를 귀 가까이 으쓱 올렸다가, '후-' 내쉬며 툭 떨어뜨리기 (5회 반복)",
    musicList: [
      { theme: '편안한 힐링', title: "김광석 '바람이 불어오는 곳'" },
      { theme: '자연 경음악', title: '숲속 피아노 연주곡' },
      { theme: '부드러운 이완', title: '잔잔한 룸바 멜로디' }
    ],
    danceName: '룸바, 웰빙댄스',
    danceReason: '느리고 부드러운 움직임으로 온몸의 긴장을 사르르 녹여보세요.'
  },
  {
    id: 'BORED',
    buttonLabel: '지루하고 무료해요',
    responseTitle: '지루하고 무료하시군요',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-200',
    hoverClass: 'hover:bg-rose-100',
    activeClass: 'active:bg-rose-200',
    colorBoxBg: 'bg-[#FEE2E2]/50',
    colorBoxBorder: 'border-rose-400',
    textAccent: 'text-rose-800',
    btnBg: 'bg-rose-600 hover:bg-rose-700',
    colorName: '열정적인 연빨강',
    teaName: '새콤달콤한 오미자차 한잔',
    poem: [
      '작은 발걸음 하나 떼었을 뿐인데',
      '길가의 풀꽃이 반갑게 인사를 건넨다',
      '오늘은 새로운 설렘이 시작되는 날'
    ],
    stretching: '의자에 앉아 발뒤꿈치를 들었다 내렸다 하며 종아리와 발목 깨우기 (10회 반복)',
    musicList: [
      { theme: '어깨 들썩 가요', title: "박군 '한잔해'" },
      { theme: '톡톡 튀는 연주', title: "르로이 앤더슨 '싱코페이티드 클락'" },
      { theme: '스텝 자극', title: '신나는 차차차 리듬' }
    ],
    danceName: '차차차, 자이브',
    danceReason: '경쾌하고 통통 튀는 스텝을 배우며 일상에 짜릿한 활력을 더해보세요.'
  },
  {
    id: 'CALM',
    buttonLabel: '마음이 평온해요',
    responseTitle: '마음이 평온하시군요',
    bgClass: 'bg-sky-50',
    borderClass: 'border-sky-200',
    hoverClass: 'hover:bg-sky-100',
    activeClass: 'active:bg-sky-200',
    colorBoxBg: 'bg-[#E0F2FE]/50',
    colorBoxBorder: 'border-sky-400',
    textAccent: 'text-sky-800',
    btnBg: 'bg-sky-600 hover:bg-sky-700',
    colorName: '맑은 하늘색',
    teaName: '구수한 메밀차나 연근차',
    poem: [
      '물 흐르듯 잔잔한 이 시간',
      '차 한 잔의 온기에 기대어',
      '내 안의 고요한 평화를 가만히 품어봅니다'
    ],
    stretching: '고개를 좌우로 천천히 반원을 그리며 부드럽게 목 근육 이완하기 (각 3회)',
    musicList: [
      { theme: '서정 가요', title: "이문세 '가을이 오면'" },
      { theme: '우아한 왈츠', title: '아름답고 푸른 도나우강' },
      { theme: '잔잔한 기타', title: '따뜻한 통기타 연주곡' }
    ],
    danceName: '왈츠, 룸바',
    danceReason: '물 흐르듯 부드럽고 우아한 곡선 움직임으로 여유를 즐겨보세요.'
  },
  {
    id: 'SOCIAL',
    buttonLabel: '사람들과 어울리고 싶어요',
    responseTitle: '사람들과 어울리고 싶으시군요',
    bgClass: 'bg-pink-50',
    borderClass: 'border-pink-200',
    hoverClass: 'hover:bg-pink-100',
    activeClass: 'active:bg-pink-200',
    colorBoxBg: 'bg-[#FCE7F3]/50',
    colorBoxBorder: 'border-pink-400',
    textAccent: 'text-pink-800',
    btnBg: 'bg-pink-600 hover:bg-pink-700',
    colorName: '다정한 분홍',
    teaName: '도란도란 나눠 마시는 향긋한 전통차와 다과',
    poem: [
      '손과 손이 맞닿을 때 번지는 온기',
      '마주 보며 웃는 그 얼굴 속에',
      '꽃보다 고운 정이 피어납니다'
    ],
    stretching: '양손을 가볍게 털어주며 손가락 마디마디 쥐었다 폈다 잼잼 체조 (10회)',
    musicList: [
      { theme: '정다운 노래', title: "송창식 '여행을 떠나요'" },
      { theme: '흥겨운 민속곡', title: '오클라호마 믹서 (세계 민속춤곡)' },
      { theme: '함께 부르는 노래', title: '신나는 사교댄스 메들리' }
    ],
    danceName: '포크댄스, 웰빙댄스',
    danceReason: '파트너와 발맞추고 정을 나누며 즐거운 사교의 장을 만들어보세요.'
  },
  {
    id: 'ENERGY',
    buttonLabel: '활력을 얻고 싶어요',
    responseTitle: '활력을 얻고 싶으시군요',
    bgClass: 'bg-lime-50',
    borderClass: 'border-lime-200',
    hoverClass: 'hover:bg-lime-100',
    activeClass: 'active:bg-lime-200',
    colorBoxBg: 'bg-[#ECFCCB]/50',
    colorBoxBorder: 'border-lime-400',
    textAccent: 'text-lime-800',
    btnBg: 'bg-lime-700 hover:bg-lime-800',
    colorName: '싱그러운 연두',
    teaName: '몸을 따뜻하게 깨우는 생강레몬차',
    poem: [
      '나이는 숫자에 불과할 뿐',
      '뛰어라 심장아, 춤추어라 청춘아',
      '오늘이 내 인생의 가장 푸른 날이다'
    ],
    stretching: '제자리에서 허리를 곧게 펴고 무릎을 교대로 가볍게 들어 올리기 (10회)',
    musicList: [
      { theme: '파워 가요', title: "설운도 '다함께 차차차'" },
      { theme: '힘찬 클래식', title: "비발디 '봄' 1악장" },
      { theme: '청춘의 비트', title: '빠른 스윙 재즈 비트' }
    ],
    danceName: '자이브, 차차차',
    danceReason: '빠르고 신나는 비트에 맞춰 온몸의 에너지를 마음껏 발산해 보세요.'
  }
];

// 댄스 프로그램 3종 데이터
const DANCE_PROGRAMS = [
  {
    id: 'sports',
    title: '스포츠댄스',
    description: '자이브, 룸바, 차차차 등 다양한 리듬과 바른 자세를 배우는 활기찬 프로그램'
  },
  {
    id: 'wellbeing',
    title: '웰빙댄스',
    description: '누구나 쉽게 따라 하며 몸과 마음의 긴장을 푸는 생활 친화형 댄스'
  },
  {
    id: 'folk',
    title: '포크댄스',
    description: '여럿이 동그랗게 원을 만들어 즐기는 춤으로 건강과 즐거움과 친목을 함께 나눌 수 있는 세계전통민속춤입니다.'
  }
];

// ==========================================
// 2. 메인 단일 컴포넌트 (App)
// ==========================================
export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);

  const moodSelectSectionRef = useRef(null);
  const resultSectionRef = useRef(null);
  const danceSectionRef = useRef(null);

  // 기분 선택 핸들러
  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
    setTimeout(() => {
      if (resultSectionRef.current) {
        resultSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // 다른 기분 골라보기 (선택 영역으로 복귀)
  const handleReset = () => {
    setSelectedMood(null);
    if (moodSelectSectionRef.current) {
      moodSelectSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 이 댄스의 수업 알아보기 (하단 프로그램 소개로 스크롤 이동)
  const handleScrollToDance = () => {
    if (danceSectionRef.current) {
      danceSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 유튜브 검색 링크 열기
  const handleOpenMusic = (title) => {
    const cleanTitle = title.replace(/['"]/g, '');
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanTitle)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // 음악 가수와 노래제목을 2행으로 깔끔하게 나누어주는 렌더러
  const renderMusicTitle = (title) => {
    const quoteMatch = title.match(/^(.*?)\s*(['"].*)$/);
    if (quoteMatch) {
      const artist = quoteMatch[1].trim();
      const song = quoteMatch[2].trim();
      return (
        <div className="flex flex-col">
          {artist && (
            <span className="text-sm sm:text-base font-semibold text-[#4B5563] leading-snug">
              {artist}
            </span>
          )}
          <span className="text-base sm:text-lg font-bold text-[#1F2937] leading-snug">
            {song}
          </span>
        </div>
      );
    }
    const parenMatch = title.match(/^(.*?)\s*(\(.*\))$/);
    if (parenMatch) {
      const main = parenMatch[1].trim();
      const sub = parenMatch[2].trim();
      return (
        <div className="flex flex-col">
          <span className="text-base sm:text-lg font-bold text-[#1F2937] leading-snug">
            {main}
          </span>
          <span className="text-xs sm:text-sm font-medium text-[#6B7280] leading-snug">
            {sub}
          </span>
        </div>
      );
    }
    return (
      <span className="text-base sm:text-lg font-bold text-[#1F2937] leading-snug">
        {title}
      </span>
    );
  };

  // 전화 상담 연결
  const handlePhoneCall = () => {
    if (!CONFIG.PHONE || CONFIG.PHONE.includes('입력')) {
      alert('현재 전화 상담 창구를 준비하고 있습니다. 등록 후 바로 연결됩니다.');
      return;
    }
    window.location.href = `tel:${CONFIG.PHONE}`;
  };

  // 카카오톡 문의 연결
  const handleKakaoChat = () => {
    if (!CONFIG.KAKAO || CONFIG.KAKAO.includes('입력')) {
      alert('현재 카카오톡 채널 상담 창구를 준비하고 있습니다. 등록 후 바로 연결됩니다.');
      return;
    }
    window.open(CONFIG.KAKAO, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2422] font-sans antialiased selection:bg-amber-200">
      <div className="max-w-md mx-auto px-4 py-8 sm:py-10 flex flex-col gap-8">

        {/* ==================================================== */}
        {/* [1. 앱 기본 정보 및 상단 헤더] */}
        {/* ==================================================== */}
        <header className="text-center py-4 sm:py-6">
          {/* 첫 행: 메인 타이틀 (세 가지 조화로운 웰니스 컬러로 구분 적용) */}
          <h1 className="text-[23px] sm:text-[27px] font-bold tracking-tight leading-snug">
            <span className="text-[#3B6E52]">마음따라~</span>
            <span className="inline-block mx-1.5 sm:mx-2">&nbsp;</span>
            <span className="text-[#C97A2B]">기분따라~</span>
            <span className="inline-block mx-1.5 sm:mx-2">&nbsp;</span>
            <span className="text-[#E07A5F]">리듬따라~</span>
          </h1>

          {/* 둘째 행: 서브 슬로건 (15px~16px, 웜 그레이, mt-2.5로 10px 상단 여백) */}
          <p className="text-[15px] sm:text-[16px] text-[#6E6661] mt-2.5 font-medium leading-relaxed">
            오늘 내 마음에 꼭 맞는 활력을 선물하세요
          </p>

          {/* 안내 문구 (2행 분리) */}
          <p className="text-[14px] sm:text-[15px] text-[#8C837D] leading-relaxed mt-4 pt-3 border-t border-[#EAE3D9]/70">
            <span className="block">오늘 하루, 내 마음은 어떤 날씨인가요?</span>
            <span className="block mt-0.5">편안하게 골라보세요.</span>
          </p>
        </header>

        {/* ==================================================== */}
        {/* [3. 7가지 기분 선택 버튼 (섹션 1)] */}
        {/* ==================================================== */}
        <section ref={moodSelectSectionRef} aria-label="기분 선택 영역">
          <div className="flex flex-col gap-3">
            {MOOD_DATA.map((mood) => {
              const isSelected = selectedMood?.id === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleSelectMood(mood)}
                  style={{ minHeight: '56px' }}
                  className={`w-full px-5 py-4 rounded-2xl border-2 text-left font-bold text-lg sm:text-xl transition-all duration-150 flex items-center justify-between shadow-sm cursor-pointer ${
                    mood.bgClass
                  } ${mood.borderClass} ${mood.hoverClass} ${mood.activeClass} ${
                    isSelected ? 'ring-2 ring-rose-400 ring-offset-2' : ''
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-[#1F2937]">{mood.buttonLabel}</span>
                  <span className="text-xs font-semibold text-[#6B7280]">선택</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ==================================================== */}
        {/* [4. 맞춤 처방 결과 카드 레이아웃 (섹션 2)] */}
        {/* ==================================================== */}
        {selectedMood && (
          <section
            ref={resultSectionRef}
            aria-label="맞춤 처방 결과"
            className="flex flex-col gap-6 p-6 sm:p-7 rounded-3xl bg-white border border-[#E5E7EB] shadow-md scroll-mt-6"
          >
            {/* 1. 헤더 (2행 구성 및 상단 다른 기분 골라보기 버튼) */}
            <div className="border-b border-[#F3F4F6] pb-4 flex items-center justify-between gap-3">
              <div>
                <span className="text-sm sm:text-base font-semibold text-[#6B7280] block mb-1">
                  오늘의 마음
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] leading-tight">
                  {selectedMood.responseTitle}
                </h2>
              </div>
              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-gray-400 text-[#1F2937] font-bold text-xs sm:text-sm flex-shrink-0 cursor-pointer shadow-xs active:scale-95 transition-all text-center leading-snug"
              >
                다른 기분<br className="sm:hidden" /> 골라보기
              </button>
            </div>

            {/* 2. [마음에 띄우는 시 한편] (추천 색상 테두리 및 배경 적용) */}
            <div
              className={`p-5 rounded-2xl border-2 ${selectedMood.colorBoxBg} ${selectedMood.colorBoxBorder}`}
            >
              <h3 className={`text-sm sm:text-base font-bold ${selectedMood.textAccent} mb-3`}>
                마음에 띄우는 시 한편
              </h3>
              <div className="text-base sm:text-lg font-medium text-[#1F2937] leading-loose tracking-wide whitespace-pre-line">
                {selectedMood.poem.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>

            {/* 3. [어울리는 색과 건강차] */}
            <div
              className={`p-5 rounded-2xl border-2 ${selectedMood.colorBoxBg} ${selectedMood.colorBoxBorder}`}
            >
              <h3 className={`text-sm sm:text-base font-bold ${selectedMood.textAccent} mb-3`}>
                어울리는 색과 건강차
              </h3>
              <div className="flex flex-col gap-2.5 text-base sm:text-lg">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-[#374151] min-w-[78px]">추천 색 :</span>
                  <span className="font-medium text-[#1F2937]">{selectedMood.colorName}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-[#374151] min-w-[78px]">건강차 :</span>
                  <span className="font-medium text-[#1F2937]">{selectedMood.teaName}</span>
                </div>
              </div>
            </div>

            {/* 4. [의자에서 하는 1분 관절 펴기] (추천 색상 테두리 및 배경 적용) */}
            <div
              className={`p-5 rounded-2xl border-2 ${selectedMood.colorBoxBg} ${selectedMood.colorBoxBorder}`}
            >
              <h3 className={`text-base sm:text-lg font-bold ${selectedMood.textAccent} mb-2 flex items-center gap-1.5`}>
                <span>⏱️</span>
                <span>의자에서 하는 1분 관절 펴기</span>
              </h3>
              <p className="text-base sm:text-lg text-[#1F2937] leading-relaxed font-medium">
                {selectedMood.stretching}
              </p>
            </div>

            {/* 5. [오늘은 이 음악을 추천합니다] (추천 색상 테두리 및 배경으로 통일) */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-bold text-[#111827]">
                오늘은 이 음악을 추천합니다
              </h3>
              <div className="flex flex-col gap-2.5">
                {selectedMood.musicList.map((music, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 sm:p-4 rounded-xl border-2 ${selectedMood.colorBoxBg} ${selectedMood.colorBoxBorder} flex items-center justify-between gap-3 shadow-xs`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-xs font-bold ${selectedMood.textAccent}`}>
                        {music.theme}
                      </span>
                      {renderMusicTitle(music.title)}
                    </div>
                    <button
                      onClick={() => handleOpenMusic(music.title)}
                      style={{ minHeight: '44px' }}
                      className={`px-3.5 py-2 rounded-xl text-white font-bold text-sm sm:text-base flex-shrink-0 cursor-pointer shadow-sm active:scale-95 transition-all ${selectedMood.btnBg}`}
                    >
                      ▶ 바로 듣기
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. [오늘 추천하는 댄스] (추천 색상 테두리 및 배경으로 조화롭게 통일) */}
            <div
              className={`p-5 rounded-2xl border-2 ${selectedMood.colorBoxBg} ${selectedMood.colorBoxBorder}`}
            >
              <h3 className={`text-sm sm:text-base font-bold ${selectedMood.textAccent} mb-1.5`}>
                오늘 추천하는 댄스
              </h3>
              <p className="text-xl sm:text-2xl font-extrabold text-[#1F2937] mb-2">
                {selectedMood.danceName}
              </p>
              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
                {selectedMood.danceReason}
              </p>
            </div>

            {/* 7. 액션 버튼 2종 */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleReset}
                style={{ minHeight: '56px' }}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#F3F4F6] hover:bg-[#E5E7EB] border-2 border-[#6B7280] hover:border-[#374151] text-[#1F2937] font-bold text-lg sm:text-xl cursor-pointer transition-colors shadow-sm active:scale-95 text-center"
              >
                다른 기분 골라보기
              </button>

              <button
                onClick={handleScrollToDance}
                style={{ minHeight: '56px' }}
                className={`w-full py-3.5 px-5 rounded-2xl text-white font-bold text-lg sm:text-xl cursor-pointer transition-all shadow-md active:scale-95 ${selectedMood.btnBg}`}
              >
                이 댄스의 수업 알아보기
              </button>
            </div>
          </section>
        )}

        {/* ==================================================== */}
        {/* [6. 프로그램 소개 및 상담 섹션 (섹션 3 & 4)] */}
        {/* ==================================================== */}
        <section ref={danceSectionRef} className="flex flex-col gap-6 pt-4 border-t border-[#E5E7EB]">
          {/* 섹션 3: 댄스 프로그램 카드 3종 */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D2422] mb-1.5">
              함께 즐기는 댄스 프로그램
            </h2>
            <p className="text-base sm:text-lg text-[#4B5563]">
              몸도 마음도 한결 가벼워지는 즐거운 움직임을 함께합니다.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {DANCE_PROGRAMS.map((program) => (
              <div
                key={program.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm flex flex-col gap-2"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  {program.title}
                </h3>
                <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
                  {program.description}
                </p>
              </div>
            ))}
          </div>

          {/* 섹션 4: 5670 행복한아지트 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-rose-100 shadow-sm flex flex-col gap-5 mt-2">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                5670 행복한아지트
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handlePhoneCall}
                style={{ minHeight: '56px' }}
                className="w-full py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg sm:text-xl flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
              >
                전화로 편하게 문의하기
              </button>

              <button
                onClick={handleKakaoChat}
                style={{ minHeight: '56px' }}
                className="w-full py-4 px-5 rounded-2xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-lg sm:text-xl flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
              >
                카카오톡으로 문의하기
              </button>
            </div>
          </div>

          {/* 하단 건강 안심 문구 */}
          <footer className="text-center py-4 px-2">
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              본 서비스의 활동 추천은 일상의 즐거움과 활력을 돕기 위한 제안입니다. 개인의 건강 상태에 맞게 무리 없는 범위에서 가볍게 즐겨주세요.
            </p>
          </footer>
        </section>

      </div>
    </div>
  );
}
