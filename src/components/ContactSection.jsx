import React, { useState } from 'react';
import { Phone, MessageCircle, AlertCircle, Settings, Check } from 'lucide-react';

export default function ContactSection({ selectedProgram }) {
  // 실제 연락처 상태 (기본값은 요구사항에 따라 빈 값이며 자리 표시 문구 노출)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [kakaoUrl, setKakaoUrl] = useState('');

  // 연락처 미등록 안내 팝업 상태
  const [alertInfo, setAlertInfo] = useState(null);

  // 테스트/설정 패널 열림 상태 (초보자 체험용)
  const [showConfig, setShowConfig] = useState(false);
  const [tempPhone, setTempPhone] = useState('');
  const [tempKakao, setTempKakao] = useState('');

  // 1. 전화 상담 버튼 클릭 처리
  const handlePhoneClick = (e) => {
    if (!phoneNumber || phoneNumber.trim() === '') {
      e.preventDefault();
      setAlertInfo({
        title: '전화 상담 안내',
        message: '현재 [상담 전화번호 입력] 상태입니다. 실제 전화번호가 등록되기 전까지는 안전을 위해 임의의 번호로 연결되지 않습니다.'
      });
    }
  };

  // 2. 카카오톡 문의 버튼 클릭 처리
  const handleKakaoClick = (e) => {
    if (!kakaoUrl || kakaoUrl.trim() === '') {
      e.preventDefault();
      setAlertInfo({
        title: '카카오톡 문의 안내',
        message: '현재 [카카오톡 채널 주소 입력] 상태입니다. 실제 채널 주소가 등록되기 전까지는 안전을 위해 외부 링크로 이동하지 않습니다.'
      });
    }
  };

  // 연락처 저장 (로컬 테스트용)
  const handleSaveContact = (e) => {
    e.preventDefault();
    setPhoneNumber(tempPhone);
    setKakaoUrl(tempKakao);
    setShowConfig(false);
  };

  return (
    <section id="contact-section" className="py-10 px-4 max-w-xl mx-auto border-t border-[#EBE4D8] mt-6">
      <div className="bg-white rounded-3xl border-2 border-[#EBE4D8] p-6 sm:p-8 shadow-sm">
        {/* 선택한 프로그램이 있을 경우 안내 */}
        {selectedProgram && (
          <div className="bg-[#FFF4E5] border border-[#FFD8A8] text-[#D9480F] text-sm font-bold px-3.5 py-2 rounded-xl mb-4 text-center">
            ✨ '{selectedProgram}'에 대해 문의를 준비 중입니다.
          </div>
        )}

        {/* 타이틀 및 안내 문구 */}
        <div className="text-center mb-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D2A26] tracking-tight mb-2">
            궁금한 점이 있으신가요?
          </h3>
          <p className="text-base sm:text-lg text-[#6C635B] leading-relaxed">
            댄스 프로그램이나 수업 참여에 대해 궁금하신 점이 있다면 편하게 문의해 주세요.
          </p>
        </div>

        {/* 2개의 큰 버튼 */}
        <div className="space-y-4">
          {/* 1. 전화 상담하기 */}
          {phoneNumber ? (
            <a
              href={`tel:${phoneNumber}`}
              className="w-full py-4 px-6 rounded-2xl bg-[#2B8A3E] hover:bg-[#237032] text-white text-lg sm:text-xl font-bold flex flex-col items-center justify-center gap-1 shadow-md active:scale-[0.98] transition-all cursor-pointer text-center"
              style={{ minHeight: '68px' }}
            >
              <div className="flex items-center gap-2">
                <Phone className="w-6 h-6" />
                <span>전화 상담하기</span>
              </div>
              <span className="text-xs text-[#C3FAE8] font-normal">
                {phoneNumber} (터치 시 통화 연결)
              </span>
            </a>
          ) : (
            <button
              onClick={handlePhoneClick}
              className="w-full py-4 px-6 rounded-2xl bg-[#EBFBEE] hover:bg-[#D3F9D8] text-[#2B8A3E] border-2 border-[#C3FAE8] text-lg sm:text-xl font-bold flex flex-col items-center justify-center gap-1 shadow-sm active:scale-[0.98] transition-all cursor-pointer text-center"
              style={{ minHeight: '68px' }}
            >
              <div className="flex items-center gap-2">
                <Phone className="w-6 h-6" />
                <span>1. 전화 상담하기</span>
              </div>
              <span className="text-xs text-[#2B8A3E]/80 font-medium">
                [상담 전화번호 입력]
              </span>
            </button>
          )}

          {/* 2. 카카오톡 문의하기 */}
          {kakaoUrl ? (
            <a
              href={kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] text-lg sm:text-xl font-bold flex flex-col items-center justify-center gap-1 shadow-md active:scale-[0.98] transition-all cursor-pointer text-center"
              style={{ minHeight: '68px' }}
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6 fill-current" />
                <span>카카오톡 문의하기</span>
              </div>
              <span className="text-xs text-[#554D45] font-normal">
                {kakaoUrl} (터치 시 카카오 채널 이동)
              </span>
            </a>
          ) : (
            <button
              onClick={handleKakaoClick}
              className="w-full py-4 px-6 rounded-2xl bg-[#FFF9DB] hover:bg-[#FFF3BF] text-[#8C6D00] border-2 border-[#FFE066] text-lg sm:text-xl font-bold flex flex-col items-center justify-center gap-1 shadow-sm active:scale-[0.98] transition-all cursor-pointer text-center"
              style={{ minHeight: '68px' }}
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6 fill-[#8C6D00]" />
                <span>2. 카카오톡 문의하기</span>
              </div>
              <span className="text-xs text-[#8C6D00]/80 font-medium">
                [카카오톡 채널 주소 입력]
              </span>
            </button>
          )}
        </div>

        {/* 실제 연락처 테스트 입력용 접이식 패널 */}
        <div className="mt-6 pt-4 border-t border-[#F2EBDC] text-center">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-xs text-[#8C827A] hover:text-[#5C4033] font-semibold inline-flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-[#FAF7F2] transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>연락처 등록/테스트 (체험용 설정)</span>
          </button>

          {showConfig && (
            <form onSubmit={handleSaveContact} className="mt-3 text-left bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBE4D8] space-y-3">
              <p className="text-xs text-[#7A7067] font-medium">
                실제 번호와 카카오톡 채널 주소를 입력하면 즉시 버튼의 tel: 및 외부 링크 동작을 확인해 볼 수 있습니다.
              </p>
              <div>
                <label className="block text-xs font-bold text-[#4A443E] mb-1">
                  상담 전화번호
                </label>
                <input
                  type="tel"
                  placeholder="예: 010-1234-5678"
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#D5C9B8] bg-white focus:outline-none focus:border-[#D9480F]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4A443E] mb-1">
                  카카오톡 채널 URL
                </label>
                <input
                  type="url"
                  placeholder="예: https://pf.kakao.com/_xxxx"
                  value={tempKakao}
                  onChange={(e) => setTempKakao(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#D5C9B8] bg-white focus:outline-none focus:border-[#D9480F]"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#2D2A26] text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>설정 적용</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhoneNumber('');
                    setKakaoUrl('');
                    setTempPhone('');
                    setTempKakao('');
                    setShowConfig(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-white border border-[#D5C9B8] text-xs font-bold text-[#7A7067]"
                >
                  초기화
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 미등록 시 안전 안내 팝업 모달 */}
      {alertInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-[#EBE4D8] animate-fadeIn text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF4E5] text-[#D9480F] flex items-center justify-center mx-auto mb-4 border border-[#FFD8A8]">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#2D2A26] mb-2">
              {alertInfo.title}
            </h4>
            <p className="text-base text-[#554D45] leading-relaxed mb-6 font-medium">
              {alertInfo.message}
            </p>
            <button
              onClick={() => setAlertInfo(null)}
              className="w-full py-3.5 rounded-2xl bg-[#2D2A26] hover:bg-[#403B36] text-white text-base font-bold shadow-sm active:scale-95 transition-all"
            >
              확인했습니다
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
