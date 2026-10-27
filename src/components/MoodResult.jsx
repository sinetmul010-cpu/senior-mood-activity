import React from 'react';
import { Sparkles, ArrowLeft, Music, CheckCircle2, Compass, MessageCircleHeart } from 'lucide-react';

export default function MoodResult({
  mood,
  onReset,
  onExploreDance
}) {
  return (
    <section className="py-6 sm:py-8 px-4 max-w-xl mx-auto animate-fadeIn">
      {/* 뒤로 가기 / 처음으로 버튼 */}
      <div className="mb-4">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-base font-bold text-[#7A7067] hover:text-[#2D2A26] bg-white border border-[#EBE4D8] px-4 py-2.5 rounded-xl shadow-sm active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>기분 다시 고르기</span>
        </button>
      </div>

      {/* 1. 내가 선택한 오늘의 기분 카드 */}
      <div className={`p-6 rounded-3xl border-2 ${mood.colorBg} ${mood.colorBorder} mb-6 shadow-sm`}>
        <div className="flex items-center gap-4">
          <span className="text-4xl sm:text-5xl drop-shadow-sm">
            {mood.emoji}
          </span>
          <div>
            <span className="text-sm font-bold text-[#8C827A] block">
              내가 선택한 오늘의 기분
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2A26] tracking-tight">
              "{mood.name}"
            </h2>
          </div>
        </div>
      </div>

      {/* 2. 지금 바로 할 수 있는 활동 3가지 */}
      <div className="bg-white rounded-3xl border border-[#EBE4D8] p-5 sm:p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-9 h-9 rounded-xl bg-[#FFE8CC] text-[#D9480F] flex items-center justify-center">
            <Sparkles className="w-5 h-5 fill-current" />
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#2D2A26]">
            지금 바로 할 수 있는 활동 3가지
          </h3>
        </div>

        <p className="text-sm text-[#8C827A] mb-4">
          별도의 준비물이나 비용 없이 지금 바로 시작할 수 있어요.
        </p>

        <ul className="space-y-3">
          {mood.activities.map((activity, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#F2EBDC]"
            >
              <div className="w-7 h-7 rounded-full bg-[#EBFBEE] text-[#2B8A3E] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#C3FAE8]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#8C827A] block mb-0.5">
                  활동 {idx + 1}
                </span>
                <span className="text-lg sm:text-xl font-bold text-[#2D2A26] leading-snug">
                  {activity}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. 활동을 추천하는 이유 */}
      <div className="bg-[#FFFDF9] rounded-3xl border border-[#EBE4D8] p-5 sm:p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircleHeart className="w-5 h-5 text-[#D9480F]" />
          <h4 className="text-lg font-bold text-[#4A443E]">
            이 활동을 추천해 드리는 이유
          </h4>
        </div>
        <blockquote className="text-lg sm:text-xl font-medium text-[#2D2A26] leading-relaxed pl-2 border-l-4 border-[#FFD8A8]">
          "{mood.recommendationReason}"
        </blockquote>
      </div>

      {/* 4. 어울리는 댄스 종류 */}
      <div className="bg-[#FFF4E5] rounded-3xl border border-[#FFD8A8] p-5 sm:p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-2xl">💃</span>
          <h4 className="text-lg font-bold text-[#D9480F]">
            오늘의 기분과 어울리는 댄스
          </h4>
        </div>
        <p className="text-xl sm:text-2xl font-extrabold text-[#2D2A26] mt-1">
          {mood.recommendedDance}
        </p>
        <p className="text-sm text-[#7A7067] mt-2">
          무리하지 않고 음악에 맞춰 가볍게 박자를 타는 것만으로도 충분해요.
        </p>
      </div>

      {/* 5. 핵심 액션 버튼 2개 */}
      <div className="space-y-3.5">
        {/* 다른 활동 추천받기 (첫 화면으로 복귀) */}
        <button
          onClick={onReset}
          className="w-full py-4 px-6 rounded-2xl bg-[#2D2A26] hover:bg-[#403B36] text-white text-lg sm:text-xl font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
          style={{ minHeight: '62px' }}
        >
          <Compass className="w-6 h-6 text-[#FFD8A8]" />
          <span>다른 활동 추천받기 (첫 화면)</span>
        </button>

        {/* 댄스 프로그램 알아보기 (프로그램 소개 영역으로 이동) */}
        <button
          onClick={onExploreDance}
          className="w-full py-4 px-6 rounded-2xl bg-[#FFE8CC] hover:bg-[#FFD8A8] text-[#D9480F] border-2 border-[#FFD8A8] text-lg sm:text-xl font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          style={{ minHeight: '62px' }}
        >
          <Music className="w-6 h-6" />
          <span>댄스 프로그램 알아보기</span>
        </button>
      </div>
    </section>
  );
}
