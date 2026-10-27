import React from 'react';
import { MOODS } from '../data/moods';
import { ChevronRight, Heart } from 'lucide-react';

export default function MoodSelector({ onSelectMood }) {
  return (
    <section className="py-6 sm:py-8 px-4 max-w-xl mx-auto">
      {/* 상단 대표 타이틀 및 안내 문구 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFE8CC] text-[#D9480F] text-sm font-semibold mb-3 border border-[#FFD8A8]">
          <Heart className="w-4 h-4 fill-current" />
          <span>오늘 하루를 위한 다정한 추천</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2A26] tracking-tight mb-3 leading-snug">
          내 기분에 맞는 작은 즐거움,
          <br className="sm:hidden" /> 지금 찾아보세요.
        </h2>

        <div className="bg-[#FFFFFF]/80 backdrop-blur-sm border border-[#EBE4D8] rounded-2xl p-4 shadow-sm inline-block w-full max-w-md">
          <p className="text-lg sm:text-xl font-bold text-[#4A443E] leading-relaxed">
            오늘은 어떤 기분이세요?
          </p>
          <p className="text-base sm:text-lg text-[#7A7067] font-medium mt-1">
            나에게 맞는 활동을 찾아보세요.
          </p>
        </div>
      </div>

      {/* 기분 선택 큰 버튼 7개 */}
      <div className="space-y-3.5">
        {MOODS.map((mood, index) => (
          <button
            key={mood.id}
            onClick={() => onSelectMood(mood)}
            className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group active:scale-[0.98] ${mood.colorBg} ${mood.colorBorder} ${mood.colorActive} hover:shadow-md cursor-pointer`}
            style={{ minHeight: '74px' }}
            aria-label={`${index + 1}번. ${mood.name} 선택하기`}
          >
            <div className="flex items-center gap-4">
              {/* 기분 이모지 */}
              <span className="text-3xl sm:text-4xl filter drop-shadow-sm flex-shrink-0">
                {mood.emoji}
              </span>
              
              <div>
                <span className="text-xs font-bold text-[#8C827A] block mb-0.5">
                  {index + 1}번 기분
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#2D2A26] tracking-tight group-hover:text-[#D9480F] transition-colors">
                  {mood.name}
                </span>
              </div>
            </div>

            {/* 오른쪽 이동 화살표 아이콘 */}
            <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-[#8C827A] group-hover:text-[#D9480F] group-hover:translate-x-1 transition-all flex-shrink-0 shadow-sm border border-black/5">
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
