import React from 'react';
import { DANCE_PROGRAMS } from '../data/moods';
import { PhoneCall, HeartHandshake } from 'lucide-react';

export default function DancePrograms({ onContactClick }) {
  return (
    <section id="dance-programs-section" className="py-10 px-4 max-w-xl mx-auto border-t border-[#EBE4D8] mt-10">
      {/* 영역 헤더 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F0FF] text-[#6741D9] text-sm font-bold mb-2.5 border border-[#E5DBFF]">
          <HeartHandshake className="w-4 h-4" />
          <span>보조 프로그램 안내</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D2A26] tracking-tight mb-2">
          춤으로 만나는 새로운 즐거움
        </h3>
        <p className="text-base sm:text-lg text-[#6C635B] leading-relaxed max-w-md mx-auto">
          음악과 함께 몸을 움직이고, 새로운 사람들과 즐거운 시간을 나눠보세요.
        </p>
      </div>

      {/* 3가지 프로그램 카드 리스트 */}
      <div className="space-y-5">
        {DANCE_PROGRAMS.map((program, idx) => (
          <div
            key={program.id}
            className="bg-white rounded-3xl border border-[#EBE4D8] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            {/* 상단 뱃지 및 번호 */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#8C827A] border border-[#EBE4D8]">
                프로그램 {idx + 1}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFE8CC] text-[#D9480F]">
                {program.badge}
              </span>
            </div>

            {/* 프로그램 타이틀 */}
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-3xl filter drop-shadow-sm">
                {program.icon}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-[#2D2A26]">
                {program.name}
              </h4>
            </div>

            {/* 소개 내용 */}
            <p className="text-base sm:text-lg text-[#554D45] leading-relaxed mb-5">
              {program.description}
            </p>

            {/* 상담 문의하기 버튼 */}
            <button
              onClick={() => onContactClick(program.name)}
              className="w-full py-3.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#FFE8CC] text-[#4A443E] hover:text-[#D9480F] border border-[#D5C9B8] hover:border-[#FFD8A8] text-base font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              style={{ minHeight: '52px' }}
            >
              <PhoneCall className="w-5 h-5 text-[#D9480F]" />
              <span>'{program.name}' 상담 문의하기</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
