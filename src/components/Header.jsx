import React from 'react';
import { LogIn, LogOut, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';
import { signInWithGoogle, signOut } from '../lib/supabase';

export default function Header({
  user,
  profile,
  currentView,
  setCurrentView
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE4D8] px-4 py-3 sm:px-6">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {/* 앱 로고 & 홈 복귀 */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
          aria-label="홈 화면으로 이동"
        >
          <span className="w-11 h-11 rounded-2xl bg-[#FFE8CC] text-[#D9480F] flex items-center justify-center text-2xl shadow-sm border border-[#FFD8A8]">
            ☀️
          </span>
          <div>
            <h1 className="font-bold text-[#2D2A26] text-xl sm:text-2xl tracking-tight leading-tight group-hover:text-[#D9480F] transition-colors">
              오늘의 기분, 오늘의 활동
            </h1>
            <p className="text-xs text-[#8C827A] font-medium hidden sm:block">
              시니어를 위한 마음 활력 쉼터
            </p>
          </div>
        </button>

        {/* 로그인 및 네비게이션 영역 */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              {/* 관리자 승인 페이지 버튼 */}
              {profile?.is_admin && (
                <button
                  onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
                    currentView === 'admin'
                      ? 'bg-[#2D2A26] text-white shadow-sm'
                      : 'bg-[#F2EBDC] text-[#5C4033] hover:bg-[#E8DCBF]'
                  }`}
                  title="회원 승인 관리 페이지"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D9480F]" />
                  <span>관리자</span>
                </button>
              )}

              {/* 사용자 아바타 & 승인 배지 */}
              <div className="relative group flex items-center gap-1.5 bg-white border border-[#EBE4D8] rounded-full px-2.5 py-1.5 shadow-sm">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || '사용자'}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#FFE8CC] text-[#D9480F] flex items-center justify-center text-xs font-bold">
                    {(profile?.full_name || '회원')[0]}
                  </div>
                )}
                <span className="text-xs font-semibold text-[#4A443E] max-w-[70px] truncate hidden sm:inline">
                  {profile?.full_name || '회원님'}
                </span>
                {profile?.is_approved ? (
                  <span className="inline-flex items-center text-[10px] bg-[#EBFBEE] text-[#2B8A3E] font-bold px-1.5 py-0.5 rounded-full border border-[#C3FAE8]">
                    승인회원
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[10px] bg-[#FFF9DB] text-[#F08C00] font-bold px-1.5 py-0.5 rounded-full border border-[#FFF3BF]">
                    승인대기
                  </span>
                )}

                {/* 로그아웃 버튼 */}
                <button
                  onClick={signOut}
                  className="text-[#8C827A] hover:text-[#D9480F] p-1 rounded-full transition-colors ml-1"
                  title="로그아웃"
                  aria-label="로그아웃"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="bg-white hover:bg-[#FFF9F2] text-[#2D2A26] border border-[#D5C9B8] px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>구글 로그인</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
