import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import MoodSelector from './components/MoodSelector';
import MoodResult from './components/MoodResult';
import DancePrograms from './components/DancePrograms';
import ContactSection from './components/ContactSection';
import CommunitySection from './components/CommunitySection';
import AdminPage from './components/AdminPage';
import SafetyNotice from './components/SafetyNotice';

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'admin'
  const [selectedProgramForContact, setSelectedProgramForContact] = useState('');

  // 1. Supabase 사용자 및 프로필 상태 로드
  useEffect(() => {
    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        loadUserProfile(currentUser.id);
      }
    });

    // 인증 상태 변화 구독
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        loadUserProfile(currentUser.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 프로필 정보 조회
  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Profile fetch error:', error);
      }
      if (data) {
        setProfile(data);
      }
    } catch (err) {
      console.error('loadUserProfile error:', err);
    }
  };

  // 2. 댄스 프로그램 알아보기 버튼 클릭 시 스크롤
  const handleExploreDance = () => {
    const el = document.getElementById('dance-programs-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3. 상담 문의하기 버튼 클릭 시 스크롤
  const handleContactClick = (programName) => {
    setSelectedProgramForContact(programName);
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 4. 기분 다시 고르기 (첫 화면으로 복귀)
  const handleResetMood = () => {
    setSelectedMood(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col text-[#2D2A26]">
      {/* 고정 상단 헤더 */}
      <Header
        user={user}
        profile={profile}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <main className="flex-1 pb-12">
        {currentView === 'admin' ? (
          /* 관리자 승인 관리 페이지 */
          <AdminPage
            user={user}
            profile={profile}
            onBack={() => setCurrentView('home')}
          />
        ) : (
          /* 메인 시니어 웹앱 */
          <>
            {/* 1. 기분 선택 화면 또는 활동 추천 결과 화면 */}
            {!selectedMood ? (
              <MoodSelector onSelectMood={setSelectedMood} />
            ) : (
              <MoodResult
                mood={selectedMood}
                onReset={handleResetMood}
                onExploreDance={handleExploreDance}
              />
            )}

            {/* 2. 활동 나눔터 (구글 로그인 및 승인 회원 권한 소통 공간) */}
            <CommunitySection
              user={user}
              profile={profile}
            />

            {/* 3. 보조 기능: 댄스 프로그램 소개 */}
            <DancePrograms onContactClick={handleContactClick} />

            {/* 4. 마지막 영역: 전화 상담 및 카카오톡 문의 */}
            <ContactSection selectedProgram={selectedProgramForContact} />
          </>
        )}
      </main>

      {/* 5. 안전 및 이용 안내 푸터 */}
      <SafetyNotice />
    </div>
  );
}
