import React from 'react';
import { ShieldAlert, Heart } from 'lucide-react';

export default function SafetyNotice() {
  return (
    <footer className="py-8 px-4 max-w-xl mx-auto border-t border-[#EBE4D8] text-center text-[#7A7067] text-xs sm:text-sm">
      <div className="bg-[#F2EBDC]/60 rounded-2xl p-4 mb-4 text-left border border-[#E8DCBF]">
        <div className="flex items-center gap-2 text-[#5C4033] font-bold mb-1.5">
          <ShieldAlert className="w-4 h-4 text-[#D9480F]" />
          <span>이용 및 건강 안전 안내</span>
        </div>
        <p className="text-xs text-[#6C635B] leading-relaxed">
          • 본 앱에서 제안하는 활동은 일상의 작은 기분 전환을 돕기 위한 추천이며, 의료적 진단이나 심리 치료를 대신하지 않습니다.
          <br />
          • 모든 활동과 댄스는 개인의 건강 상태와 신체 능력에 맞춰 무리하지 않는 편안한 범위 내에서 실천해 주세요.
        </p>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-[#8C827A] font-medium">
        <span>내 기분에 맞는 작은 즐거움</span>
        <span>•</span>
        <span className="font-bold text-[#4A443E]">오늘의 기분, 오늘의 활동</span>
      </div>
      <p className="text-[11px] text-[#A69B91] mt-1">
        시니어의 활기찬 일상을 함께 응원합니다.
      </p>
    </footer>
  );
}
