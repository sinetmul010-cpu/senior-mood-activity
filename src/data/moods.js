// 7가지 기분별 활동 추천 데이터
export const MOODS = [
  {
    id: 'good',
    name: '기분이 좋아요',
    emoji: '😊',
    colorBg: 'bg-[#FFF4E5]',
    colorBorder: 'border-[#FFD8A8]',
    colorActive: 'active:bg-[#FFE8CC]',
    colorAccent: 'text-[#D9480F]',
    activities: [
      '좋아하는 신나는 음악 듣기',
      '음악에 맞춰 가볍게 몸 움직이기',
      '가족이나 친구와 즐거운 이야기 나누기'
    ],
    recommendedDance: '스포츠댄스, 웰빙댄스(사교댄스)',
    recommendationReason: '좋은 기분을 음악과 움직임으로 표현하며 즐거운 시간을 보내보세요.'
  },
  {
    id: 'gloomy',
    name: '조금 우울해요',
    emoji: '💧',
    colorBg: 'bg-[#EBFBEE]',
    colorBorder: 'border-[#C3FAE8]',
    colorActive: 'active:bg-[#D3F9D8]',
    colorAccent: 'text-[#2B8A3E]',
    activities: [
      '좋아하는 노래 한 곡 듣기',
      '날씨가 좋다면 가볍게 산책하기',
      '친한 친구에게 안부 전화하기'
    ],
    recommendedDance: '포크댄스, 웰빙댄스(사교댄스)',
    recommendationReason: '작은 활동부터 시작해 보세요. 음악을 듣거나 다른 사람과 즐거운 시간을 보내는 것도 좋은 선택이에요.'
  },
  {
    id: 'stressed',
    name: '스트레스가 많아요',
    emoji: '🌿',
    colorBg: 'bg-[#E7F5FF]',
    colorBorder: 'border-[#D0EBFF]',
    colorActive: 'active:bg-[#A5D8FF]',
    colorAccent: 'text-[#1971C2]',
    activities: [
      '편안한 음악 듣기',
      '어깨와 팔을 천천히 움직이기',
      '잠시 쉬면서 천천히 호흡하기'
    ],
    recommendedDance: '웰빙댄스(사교댄스), 스포츠댄스',
    recommendationReason: '잠시 하던 일을 내려놓고 자신에게 편안한 시간을 선물해 보세요.'
  },
  {
    id: 'bored',
    name: '지루하고 무료해요',
    emoji: '✨',
    colorBg: 'bg-[#FFF9DB]',
    colorBorder: 'border-[#FFF3BF]',
    colorActive: 'active:bg-[#FFEC99]',
    colorAccent: 'text-[#F08C00]',
    activities: [
      '신나는 음악 한 곡 듣기',
      '음악에 맞춰 가볍게 스텝 밟기',
      '새로운 음악이나 춤 찾아보기'
    ],
    recommendedDance: '스포츠댄스, 웰빙댄스(사교댄스)',
    recommendationReason: '새로운 리듬과 움직임을 만나면 평범한 하루에 작은 즐거움을 더할 수 있어요.'
  },
  {
    id: 'peaceful',
    name: '마음이 편안해요',
    emoji: '🍵',
    colorBg: 'bg-[#F3F0FF]',
    colorBorder: 'border-[#E5DBFF]',
    colorActive: 'active:bg-[#D0BFFF]',
    colorAccent: 'text-[#6741D9]',
    activities: [
      '잔잔한 음악 듣기',
      '여유롭게 산책하기',
      '좋아하는 책 몇 쪽 읽기'
    ],
    recommendedDance: '포크댄스, 스포츠댄스',
    recommendationReason: '지금의 편안한 기분을 즐기며 자신이 좋아하는 활동을 천천히 해보세요.'
  },
  {
    id: 'with_others',
    name: '누군가와 함께하고 싶어요',
    emoji: '🤝',
    colorBg: 'bg-[#FFF0F6]',
    colorBorder: 'border-[#FCC2D7]',
    colorActive: 'active:bg-[#FAA2C1]',
    colorAccent: 'text-[#C2255C]',
    activities: [
      '친구에게 안부 전화하기',
      '가족이나 지인과 차 한잔하기',
      '함께할 수 있는 취미 활동 찾아보기'
    ],
    recommendedDance: '포크댄스, 웰빙댄스(사교댄스)',
    recommendationReason: '사람들과 함께하는 작은 활동에서 새로운 즐거움을 발견해 보세요.'
  },
  {
    id: 'vitality',
    name: '활력을 얻고 싶어요',
    emoji: '☀️',
    colorBg: 'bg-[#FFF3BF]',
    colorBorder: 'border-[#FFE066]',
    colorActive: 'active:bg-[#FFD43B]',
    colorAccent: 'text-[#E8590C]',
    activities: [
      '좋아하는 음악에 맞춰 가볍게 움직이기',
      '가까운 곳 산책하기',
      '신나는 노래를 들으며 기분 전환하기'
    ],
    recommendedDance: '스포츠댄스, 웰빙댄스(사교댄스)',
    recommendationReason: '자신의 몸 상태에 맞춰 가볍게 움직이며 활기찬 하루를 시작해 보세요.'
  }
];

// 보조 댄스 프로그램 데이터
export const DANCE_PROGRAMS = [
  {
    id: 'sports',
    name: '스포츠댄스',
    badge: '활력 충전',
    icon: '💃',
    description: '다양한 리듬과 스텝을 익히며 신체 활동의 즐거움과 활력을 느낄 수 있어요.'
  },
  {
    id: 'wellbeing',
    name: '웰빙댄스(사교댄스)',
    badge: '즐거운 소통',
    icon: '🕺',
    description: '음악에 맞춰 즐겁게 움직이고 사람들과 교류하며 일상에 활력을 더할 수 있어요.'
  },
  {
    id: 'folk',
    name: '포크댄스',
    badge: '친밀한 어울림',
    icon: '🎶',
    description: '여러 사람과 함께 춤추며 친밀감을 나누고, 새로운 친구들과 어울리는 즐거움을 느낄 수 있어요.'
  }
];
