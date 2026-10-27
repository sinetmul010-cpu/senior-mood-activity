import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Sun,
  Smile,
  CloudRain,
  Zap,
  Coffee,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  PhoneCall,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Heart,
  ChevronRight,
  CheckCircle2,
  Clock,
  UserCheck,
  UserX,
  Trash2,
  Lock,
  LogOut,
  AlertCircle,
  HelpCircle,
  Check
} from 'lucide-react';

/* =========================================================================
   [1. 앱 기본 설정 (CONFIG) - 여기서 전화번호와 카카오톡 주소를 변경하세요]
   ========================================================================= */
export const CONFIG = {
  // 앱 이름 및 슬로건
  appName: "마음따라 춤따라",
  slogan: "오늘 내 마음에 꼭 맞는 활력을 선물하세요",

  // 상담 연락처 설정 (따옴표 안에 전화번호나 카카오 채널 주소를 입력하세요)
  // 비워두면("") 어르신에게 "상담 연락처를 준비 중입니다"라는 다정한 안내창이 뜹니다.
  contactPhone: "", // 예: "010-1234-5678"
  kakaoChannelUrl: "", // 예: "https://pf.kakao.com/_xxxx"

  // 기본 관리자 이메일 (이 계정으로 구글 로그인하면 관리자 메뉴가 보입니다)
  adminEmail: "sinetmul010@gmail.com",

  // Supabase 백엔드 연동 정보
  supabaseUrl: import.meta.env?.VITE_SUPABASE_URL || 'https://gsstmtphlmbzhwrsiexr.supabase.co',
  supabaseAnonKey: import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzc3RtdHBobG1iemh3cnNpZXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0NjQ2OTksImV4cCI6MjEwODA0MDY5OX0.np7-3M3E0y8hdPLZ6wCkcjmQyRXPUcdUn5fAgp9-hxA'
};

// Supabase 클라이언트 초기화
export const supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);

/* =========================================================================
   [2. 7가지 기분별 맞춤 데이터 (어르신 맞춤 글귀, 컬러, 음식, 활동, 댄스)]
   ========================================================================= */
export const MOOD_DATA = [
  {
    id: 'good',
    name: '기분이 좋아요',
    emoji: '😊',
    themeBg: 'bg-[#FFF9DB]',
    themeBorder: 'border-[#FFE066]',
    badgeBg: 'bg-[#FFF3BF]',
    badgeText: 'text-[#E8590C]',
    quote: '오늘 당신의 환한 미소가 세상에서 가장 아름다운 풍경입니다.',
    recommendColor: '산뜻한 노랑',
    colorDesc: '기쁨과 밝은 기운을 더해줘요',
    colorPreview: '#F59F00',
    recommendFood: '상큼한 제철 과일주스',
    recommendActivity: '신나는 음악을 듣고 편안하게 리듬에 맞춰 몸 움직이기',
    recommendDance: '자이브, 웰빙댄스',
    recommendReason: '즐거운 기분을 음악과 경쾌한 움직임으로 표현할 수 있어요.'
  },
  {
    id: 'gloomy',
    name: '조금 우울해요',
    emoji: '😔',
    themeBg: 'bg-[#FFF4E5]',
    themeBorder: 'border-[#FFD8A8]',
    badgeBg: 'bg-[#FFE8CC]',
    badgeText: 'text-[#D9480F]',
    quote: '흐린 날 뒤엔 언제나 맑은 하늘이 기다려요. 오늘은 나를 꼭 안아주세요.',
    recommendColor: '따뜻한 주황',
    colorDesc: '마음에 온기와 생기를 채워줘요',
    colorPreview: '#F76707',
    recommendFood: '달콤하고 따뜻한 대추차',
    recommendActivity: '좋아하는 음악을 듣거나 가볍게 햇볕 쬐며 산책하기',
    recommendDance: '포크댄스, 웰빙댄스',
    recommendReason: '음악과 즐거운 움직임을 통해 기분 전환을 시도해 볼 수 있어요.'
  },
  {
    id: 'stressed',
    name: '스트레스가 많아요',
    emoji: '😫',
    themeBg: 'bg-[#EBFBEE]',
    themeBorder: 'border-[#C3FAE8]',
    badgeBg: 'bg-[#D3F9D8]',
    badgeText: 'text-[#2B8A3E]',
    quote: '잠시 내려놓아도 괜찮아요. 깊은 숨 속에 마음의 쉼표를 찍어보세요.',
    recommendColor: '편안한 숲속 초록',
    colorDesc: '눈과 마음에 휴식을 선물해요',
    colorPreview: '#2F9E44',
    recommendFood: '은은한 캐모마일차나 따뜻한 보리차',
    recommendActivity: '어깨와 팔을 부드럽게 움직이며 천천히 깊게 호흡하기',
    recommendDance: '룸바, 웰빙댄스, 포크댄스',
    recommendReason: '편안한 음악과 무리 없는 움직임으로 잠시 긴장을 풀어보세요.'
  },
  {
    id: 'bored',
    name: '지루하고 무료해요',
    emoji: '🥱',
    themeBg: 'bg-[#FFF0F6]',
    themeBorder: 'border-[#FCC2D7]',
    badgeBg: 'bg-[#FFE3EC]',
    badgeText: 'text-[#C2255C]',
    quote: '가벼운 발걸음 하나로 오늘은 어제와 다른 새로운 하루가 됩니다.',
    recommendColor: '열정적인 빨강',
    colorDesc: '일상에 생기와 자극을 불어넣어요',
    colorPreview: '#E03131',
    recommendFood: '새콤달콤한 오미자차 한잔',
    recommendActivity: '경쾌한 음악 한 곡에 맞춰 가볍게 스텝 밟기',
    recommendDance: '차차차, 자이브, 포크댄스',
    recommendReason: '새로운 리듬과 스텝을 배우며 일상에 즐거움을 더할 수 있어요.'
  },
  {
    id: 'peaceful',
    name: '마음이 평온해요',
    emoji: '😌',
    themeBg: 'bg-[#E7F5FF]',
    themeBorder: 'border-[#D0EBFF]',
    badgeBg: 'bg-[#D0EBFF]',
    badgeText: 'text-[#1971C2]',
    quote: '물 흐르듯 잔잔한 이 순간, 내 마음속 고요한 평화를 누려보세요.',
    recommendColor: '맑은 하늘색',
    colorDesc: '여유롭고 차분한 마음을 지켜줘요',
    colorPreview: '#228BE6',
    recommendFood: '구수한 메밀차나 연근차',
    recommendActivity: '잔잔한 음악을 들으며 가볍게 몸 풀고 스트레칭하기',
    recommendDance: '왈츠, 룸바',
    recommendReason: '부드러운 음악과 움직임을 여유롭게 즐길 수 있어요.'
  },
  {
    id: 'with_others',
    name: '사람들과 어울리고 싶어요',
    emoji: '🤝',
    themeBg: 'bg-[#F8F0FC]',
    themeBorder: 'border-[#EEBEFA]',
    badgeBg: 'bg-[#F3D9FA]',
    badgeText: 'text-[#9C36B5]',
    quote: '함께 나누는 눈빛과 온기 속에 행복은 두 배로 피어납니다.',
    recommendColor: '다정한 분홍',
    colorDesc: '따뜻한 소통과 온기를 전해줘요',
    colorPreview: '#D6336C',
    recommendFood: '도란도란 나눠 마시는 향긋한 전통차와 다과',
    recommendActivity: '친구에게 안부 전화하거나 정다운 모임 찾아보기',
    recommendDance: '포크댄스, 웰빙댄스',
    recommendReason: '다른 사람들과 음악과 움직임을 함께 나누며 교감할 수 있어요.'
  },
  {
    id: 'vitality',
    name: '활력을 얻고 싶어요',
    emoji: '💪',
    themeBg: 'bg-[#F4FCE3]',
    themeBorder: 'border-[#D8F5A2]',
    badgeBg: 'bg-[#E9FAC8]',
    badgeText: 'text-[#5C940D]',
    quote: '나이는 숫자에 불과할 뿐, 가슴속 설렘이 나를 다시 청춘으로 이끕니다.',
    recommendColor: '싱그러운 연두',
    colorDesc: '새싹처럼 힘찬 기운을 북돋아요',
    colorPreview: '#74B816',
    recommendFood: '몸을 따뜻하게 깨우는 생강레몬차',
    recommendActivity: '좋아하는 음악에 맞춰 보폭을 넓혀 씩씩하게 걷기',
    recommendDance: '포크댄스, 자이브, 차차차',
    recommendReason: '경쾌한 리듬에 맞춰 즐겁게 움직이며 활기를 충전할 수 있어요.'
  }
];

/* =========================================================================
   [3. 3가지 댄스 프로그램 소개 데이터]
   ========================================================================= */
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
    description: '세계 각 나라의 민속춤으로 여러 사람들과 함께 춤추며 친밀감을 나누고 새로운 친구들과 어울리는 즐거움을 느낄 수 있어요.'
  }
];

/* =========================================================================
   [4. 메인 단일 컴포넌트: App]
   ========================================================================= */
export default function App() {
  // 상태 관리
  const [selectedMood, setSelectedMood] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'admin'
  const [modalMessage, setModalMessage] = useState(null);

  // 커뮤니티 게시글 상태
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 관리자 회원 목록 상태
  const [adminUsers, setAdminUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // 1. Supabase 인증 및 프로필 로드
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id, currentUser.email);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id, currentUser.email);
      } else {
        setProfile(null);
      }
    });

    fetchPosts();

    return () => subscription.unsubscribe();
  }, []);

  // 프로필 정보 조회
  const fetchProfile = async (userId, email) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        // 지정된 관리자 이메일인 경우 관리자 권한 보장
        if (email === CONFIG.adminEmail && !data.is_admin) {
          await supabase.from('profiles').update({ is_admin: true, is_approved: true }).eq('id', userId);
          data.is_admin = true;
          data.is_approved = true;
        }
        setProfile(data);
      }
    } catch (err) {
      console.error('fetchProfile error:', err);
    }
  };

  // 커뮤니티 글 목록 조회
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setPosts(data);
      }
    } catch (err) {
      console.error('fetchPosts error:', err);
    }
  };

  // 관리자 회원 목록 조회
  const fetchAdminUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setAdminUsers(data);
      }
    } catch (err) {
      console.error('fetchAdminUsers error:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (currentView === 'admin' && profile?.is_admin) {
      fetchAdminUsers();
    }
  }, [currentView, profile]);

  // 구글 로그인 실행
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      alert('로그인 중 문제가 발생했습니다: ' + err.message);
    }
  };

  // 로그아웃 실행
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setCurrentView('home');
  };

  // 기분 선택 핸들러
  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
    setTimeout(() => {
      const resultEl = document.getElementById('result-section');
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // 다른 기분 선택하기 (화면 최상단 이동)
  const handleResetMood = () => {
    setSelectedMood(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 춤 수업 알아보기 스크롤
  const handleGoToDance = () => {
    const el = document.getElementById('dance-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 상담 영역으로 스크롤
  const handleGoToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 전화 상담 연결 (안전장치)
  const handlePhoneCall = () => {
    if (!CONFIG.contactPhone || CONFIG.contactPhone.trim() === '') {
      setModalMessage({
        title: '📞 상담 안내',
        desc: '현재 상담 연락처를 준비 중입니다. 잠시만 기다려 주세요.'
      });
    } else {
      window.location.href = `tel:${CONFIG.contactPhone}`;
    }
  };

  // 카카오톡 상담 연결 (안전장치)
  const handleKakaoChat = () => {
    if (!CONFIG.kakaoChannelUrl || CONFIG.kakaoChannelUrl.trim() === '') {
      setModalMessage({
        title: '💬 카카오톡 안내',
        desc: '현재 상담 연락처를 준비 중입니다. 잠시만 기다려 주세요.'
      });
    } else {
      window.open(CONFIG.kakaoChannelUrl, '_blank');
    }
  };

  // 커뮤니티 글 등록 핸들러 (승인된 회원만 가능)
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) {
      setModalMessage({
        title: '🔒 로그인 안내',
        desc: '구글 로그인을 하신 후, 관리자의 승인을 받으시면 따뜻한 마음 글을 남기실 수 있어요.'
      });
      return;
    }

    if (!profile?.is_approved && !profile?.is_admin) {
      setModalMessage({
        title: '⏳ 승인 대기 중',
        desc: '회원님의 계정이 현재 관리자 승인 대기 중입니다. 관리자가 확인 후 승인해 드리면 글을 남기실 수 있어요.'
      });
      return;
    }

    if (!postContent.trim()) {
      alert('이야기하실 내용을 적어주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const authorName = profile?.full_name || user?.user_metadata?.full_name || '마음 이웃';
      const currentMoodName = selectedMood?.name || '오늘의 기분';
      const activityTitle = selectedMood?.recommendActivity || '몸과 마음 돌보기';

      const { error } = await supabase.from('community_posts').insert({
        user_id: user.id,
        author_name: authorName,
        mood: currentMoodName,
        activity_title: activityTitle,
        content: postContent.trim()
      });

      if (error) throw error;

      setPostContent('');
      fetchPosts();
      setModalMessage({
        title: '🌸 등록 완료',
        desc: '소중한 마음 이야기가 이웃들과 나누어졌습니다.'
      });
    } catch (err) {
      alert('글 등록 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 커뮤니티 글 삭제 핸들러 (작성자 또는 관리자)
  const handleDeletePost = async (postId) => {
    if (!confirm('정말로 이 글을 지우시겠습니까?')) return;
    try {
      const { error } = await supabase.from('community_posts').delete().eq('id', postId);
      if (error) throw error;
      fetchPosts();
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다: ' + err.message);
    }
  };

  // 관리자: 회원 승인 상태 변경
  const handleToggleApproval = async (targetUserId, currentApproved) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_approved: !currentApproved, updated_at: new Date().toISOString() })
        .eq('id', targetUserId);

      if (error) throw error;
      fetchAdminUsers();
    } catch (err) {
      alert('승인 상태 변경 실패: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2A26] flex flex-col font-sans selection:bg-[#FFE3B3]">
      {/* =========================================================================
          [A. 상단 헤더: 큰 글씨, 로그인/관리자 메뉴, 따뜻한 색감]
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE4D8] px-4 py-3 sm:px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* 로고 및 홈 이동 */}
          <div
            onClick={() => { setCurrentView('home'); handleResetMood(); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#FFE8CC] flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
              ☀️
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#2D2A26] tracking-tight">
                {CONFIG.appName}
              </h1>
              <p className="text-xs text-[#8C827A] hidden sm:block">
                {CONFIG.slogan}
              </p>
            </div>
          </div>

          {/* 우측 로그인 & 관리자 액션 */}
          <div className="flex items-center gap-2">
            {profile?.is_admin && (
              <button
                onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
                className={`px-3.5 py-2 rounded-xl text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentView === 'admin'
                    ? 'bg-[#2D2A26] text-white shadow-sm'
                    : 'bg-[#F3F0FF] text-[#6741D9] border border-[#E5DBFF] hover:bg-[#E5DBFF]'
                }`}
                style={{ minHeight: '44px' }}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{currentView === 'admin' ? '앱 화면으로' : '회원 승인 관리'}</span>
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-bold text-[#2D2A26] leading-none">
                    {profile?.full_name || '회원'}님
                  </span>
                  <span className={`text-[11px] font-semibold mt-0.5 ${profile?.is_approved ? 'text-[#2B8A3E]' : 'text-[#D9480F]'}`}>
                    {profile?.is_approved ? '✓ 승인 회원' : '승인 대기 중'}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  title="로그아웃"
                  className="px-3 py-2 rounded-xl bg-white border border-[#D5C9B8] text-[#554D45] hover:bg-[#F3ECE0] text-sm font-bold flex items-center gap-1 transition-all cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">나가기</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFF9DB] border border-[#D5C9B8] text-[#2D2A26] text-sm font-extrabold flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                style={{ minHeight: '44px' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>구글 시작</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          [B. 본문 콘텐츠 영역]
          ========================================================================= */}
      <main className="flex-1 pb-16">
        {currentView === 'admin' ? (
          /* =====================================================================
             [관리자 전용: 회원 승인 관리 뷰]
             ===================================================================== */
          <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl border border-[#EBE4D8] p-6 shadow-sm mb-6">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-6 h-6 text-[#6741D9]" />
                <h2 className="text-2xl font-black text-[#2D2A26]">회원 승인 관리실</h2>
              </div>
              <p className="text-base text-[#6C635B] leading-relaxed">
                구글로 로그인한 회원 목록입니다. <strong>‘승인’</strong>된 회원만 활동 나눔터에 글을 쓰고 지울 수 있습니다.
              </p>
            </div>

            {isLoadingUsers ? (
              <div className="text-center py-12 text-[#8C827A] text-lg font-bold">
                회원 목록을 불러오는 중입니다...
              </div>
            ) : adminUsers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-[#EBE4D8] text-[#8C827A] text-lg">
                아직 가입한 회원이 없습니다.
              </div>
            ) : (
              <div className="space-y-4">
                {adminUsers.map((u) => (
                  <div
                    key={u.id}
                    className="bg-white rounded-2xl border border-[#EBE4D8] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#2D2A26]">
                          {u.full_name || '이름 없음'}
                        </span>
                        {u.is_admin && (
                          <span className="px-2 py-0.5 rounded-md bg-[#F3F0FF] text-[#6741D9] text-xs font-black">
                            관리자
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#8C827A]">{u.email}</p>
                      <p className="text-xs text-[#A89F95] mt-1">
                        가입일: {new Date(u.created_at).toLocaleDateString('ko-KR')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleApproval(u.id, u.is_approved)}
                        className={`w-full sm:w-auto px-5 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          u.is_approved
                            ? 'bg-[#EBFBEE] text-[#2B8A3E] border border-[#C3FAE8] hover:bg-[#D3F9D8]'
                            : 'bg-[#FFF4E5] text-[#D9480F] border border-[#FFD8A8] hover:bg-[#FFE8CC]'
                        }`}
                        style={{ minHeight: '52px' }}
                      >
                        {u.is_approved ? (
                          <>
                            <UserCheck className="w-4 h-4" />
                            <span>승인 완료 (누르면 취소)</span>
                          </>
                        ) : (
                          <>
                            <UserX className="w-4 h-4" />
                            <span>대기 중 (누르면 승인)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* =====================================================================
             [일반 뷰: 1. 첫화면 기분선택 -> 2. 맞춤추천 -> 3. 댄스소개 -> 4. 상담]
             ===================================================================== */
          <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10 space-y-12">
            {/* -----------------------------------------------------------------
                1) 첫 화면: 기분 선택 영역
                ----------------------------------------------------------------- */}
            <section className="text-center">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFE8CC] text-[#D9480F] text-sm sm:text-base font-extrabold mb-3">
                <Sparkles className="w-4 h-4" />
                <span>오늘의 기분 맞춤 활동</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#2D2A26] tracking-tight mb-2">
                {CONFIG.appName}
              </h2>
              <p className="text-lg sm:text-xl text-[#6C635B] font-medium max-w-lg mx-auto leading-relaxed mb-8">
                {CONFIG.slogan}
              </p>

              {/* 7개 기분 버튼 카드 리스트 (어르신 맞춤: 56px 이상 큰 버튼) */}
              <div className="space-y-3.5 text-left">
                {MOOD_DATA.map((mood) => {
                  const isSelected = selectedMood?.id === mood.id;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => handleSelectMood(mood)}
                      className={`w-full p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 transition-all flex items-center justify-between shadow-sm cursor-pointer active:scale-[0.99] ${
                        isSelected
                          ? `${mood.themeBg} ${mood.themeBorder} ring-4 ring-[#FFD8A8]/50 shadow-md`
                          : 'bg-white border-[#EBE4D8] hover:border-[#D5C9B8] hover:bg-[#FDFBF7]'
                      }`}
                      style={{ minHeight: '68px' }}
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4">
                        <span className="text-3xl sm:text-4xl filter drop-shadow-sm">
                          {mood.emoji}
                        </span>
                        <div>
                          <div className="text-lg sm:text-2xl font-black text-[#2D2A26]">
                            {mood.name}
                          </div>
                          <div className="text-sm sm:text-base text-[#8C827A] mt-0.5 line-clamp-1">
                            추천 댄스: {mood.recommendDance}
                          </div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EBE4D8] flex items-center justify-center text-[#8C827A]">
                        {isSelected ? (
                          <Check className="w-5 h-5 text-[#D9480F] stroke-[3]" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-[#8C827A]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                2) 맞춤 추천 결과 카드
                ----------------------------------------------------------------- */}
            {selectedMood && (
              <section id="result-section" className="pt-6 border-t-2 border-[#EBE4D8]">
                <div className={`rounded-3xl border-2 ${selectedMood.themeBorder} ${selectedMood.themeBg} p-6 sm:p-8 shadow-md`}>
                  {/* 상단 기분 타이틀 */}
                  <div className="flex items-center justify-between pb-5 border-b border-[#D5C9B8]/40 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{selectedMood.emoji}</span>
                      <div>
                        <span className="text-sm font-bold text-[#8C827A]">선택하신 오늘의 마음</span>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#2D2A26]">
                          {selectedMood.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* 1. 오늘의 마음 글귀 (따뜻한 감성 카드) */}
                  <div className="bg-white/90 backdrop-blur rounded-2xl p-5 sm:p-6 border border-[#EBE4D8] shadow-sm mb-6">
                    <div className="text-sm font-bold text-[#D9480F] flex items-center gap-1.5 mb-2">
                      <Heart className="w-4 h-4 fill-[#D9480F]" />
                      <span>오늘의 마음 글귀</span>
                    </div>
                    <p className="text-lg sm:text-2xl font-black text-[#2D2A26] leading-relaxed">
                      "{selectedMood.quote}"
                    </p>
                  </div>

                  {/* 2. 추천 컬러 & 건강 차/음식 (나란히 배치) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* 추천 컬러 */}
                    <div className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-[#EBE4D8]">
                      <div className="text-sm font-bold text-[#8C827A] mb-1.5">
                        오늘의 추천 컬러
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                          style={{ backgroundColor: selectedMood.colorPreview }}
                        />
                        <div>
                          <div className="text-lg sm:text-xl font-black text-[#2D2A26]">
                            {selectedMood.recommendColor}
                          </div>
                          <div className="text-xs sm:text-sm text-[#6C635B]">
                            {selectedMood.colorDesc}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 추천 음식/차 */}
                    <div className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-[#EBE4D8]">
                      <div className="text-sm font-bold text-[#8C827A] mb-1.5 flex items-center gap-1">
                        <Coffee className="w-4 h-4 text-[#8C827A]" />
                        <span>오늘의 건강 차 / 음식</span>
                      </div>
                      <div className="text-lg sm:text-xl font-black text-[#2D2A26]">
                        {selectedMood.recommendFood}
                      </div>
                      <div className="text-xs sm:text-sm text-[#6C635B] mt-0.5">
                        몸과 마음을 다정하게 채워줍니다
                      </div>
                    </div>
                  </div>

                  {/* 3. 오늘 바로 해볼 수 있는 활동 */}
                  <div className="bg-white/90 rounded-2xl p-5 border border-[#EBE4D8] mb-6">
                    <div className="text-sm font-bold text-[#2B8A3E] flex items-center gap-1.5 mb-2">
                      <Compass className="w-4 h-4" />
                      <span>오늘 바로 해볼 수 있는 활동</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-[#2D2A26] leading-relaxed">
                      {selectedMood.recommendActivity}
                    </p>
                  </div>

                  {/* 4. 추천 댄스 및 추천 이유 */}
                  <div className="bg-white/95 rounded-2xl p-5 sm:p-6 border-2 border-[#FFD8A8] shadow-sm mb-8">
                    <div className="text-sm font-bold text-[#D9480F] flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>오늘 어울리는 춤 & 추천 이유</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#2D2A26] mb-2">
                      {selectedMood.recommendDance}
                    </div>
                    <p className="text-base sm:text-lg text-[#554D45] leading-relaxed">
                      {selectedMood.recommendReason}
                    </p>
                  </div>

                  {/* 하단 2개 큰 버튼: 다른 기분 선택하기 / 이 춤의 수업 알아보기 */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleResetMood}
                      className="flex-1 py-4 px-5 rounded-2xl bg-white border border-[#D5C9B8] text-[#554D45] hover:bg-[#F3ECE0] text-base sm:text-lg font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
                      style={{ minHeight: '58px' }}
                    >
                      <RotateCcw className="w-5 h-5 text-[#8C827A]" />
                      <span>다른 기분 선택하기</span>
                    </button>
                    <button
                      onClick={handleGoToDance}
                      className="flex-1 py-4 px-5 rounded-2xl bg-[#D9480F] hover:bg-[#C2410C] text-white text-base sm:text-lg font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
                      style={{ minHeight: '58px' }}
                    >
                      <span>이 춤의 수업 알아보기</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* -----------------------------------------------------------------
                3) 댄스 프로그램 소개 (3종 카드)
                ----------------------------------------------------------------- */}
            <section id="dance-section" className="pt-6 border-t border-[#EBE4D8]">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F0FF] text-[#6741D9] text-sm font-bold mb-2">
                  <Sun className="w-4 h-4" />
                  <span>맞춤 프로그램 소개</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#2D2A26] tracking-tight mb-2">
                  춤으로 만나는 새로운 활력
                </h3>
                <p className="text-base sm:text-lg text-[#6C635B] leading-relaxed max-w-md mx-auto">
                  초보자도 부끄러움 없이 즐겁게 시작할 수 있는 맞춤형 댄스 교실입니다.
                </p>
              </div>

              <div className="space-y-5">
                {DANCE_PROGRAMS.map((program, idx) => (
                  <div
                    key={program.id}
                    className="bg-white rounded-3xl border border-[#EBE4D8] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#8C827A] border border-[#EBE4D8]">
                        프로그램 {idx + 1}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFE8CC] text-[#D9480F]">
                        {program.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl sm:text-4xl filter drop-shadow-sm">
                        {program.icon}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-[#2D2A26]">
                        {program.name}
                      </h4>
                    </div>

                    <p className="text-base sm:text-lg text-[#554D45] leading-relaxed mb-5">
                      {program.description}
                    </p>

                    <button
                      onClick={handleGoToContact}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#FFE8CC] text-[#4A443E] hover:text-[#D9480F] border border-[#D5C9B8] hover:border-[#FFD8A8] text-base font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                      style={{ minHeight: '56px' }}
                    >
                      <PhoneCall className="w-5 h-5 text-[#D9480F]" />
                      <span>'{program.name}' 상담 문의하기</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* -----------------------------------------------------------------
                4) 상담 연결 및 안내 (화면 하단)
                ----------------------------------------------------------------- */}
            <section id="contact-section" className="pt-6 border-t border-[#EBE4D8]">
              <div className="bg-gradient-to-br from-[#FFF4E5] to-[#FFE8CC] rounded-3xl p-6 sm:p-8 border border-[#FFD8A8] text-center shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl mx-auto mb-4">
                  📞
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#2D2A26] mb-3">
                  춤으로 일상에 새로운 즐거움을 시작해 보세요!
                </h3>
                <p className="text-base sm:text-lg text-[#6C635B] max-w-md mx-auto leading-relaxed mb-6">
                  "몸치여도 괜찮을까?", "혼자 가도 안 어색할까?" 망설이지 마시고 편하게 물어보세요. 따뜻하게 안내해 드립니다.
                </p>

                {/* 2대 문의 버튼: 전화 문의 / 카카오톡 문의 (어르신 맞춤: 56px+ 높이) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-md mx-auto mb-6">
                  <button
                    onClick={handlePhoneCall}
                    className="w-full py-4 px-5 rounded-2xl bg-[#D9480F] hover:bg-[#C2410C] text-white text-lg font-black flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-all cursor-pointer"
                    style={{ minHeight: '58px' }}
                  >
                    <PhoneCall className="w-5 h-5 stroke-[2.5]" />
                    <span>전화로 편하게 문의하기</span>
                  </button>

                  <button
                    onClick={handleKakaoChat}
                    className="w-full py-4 px-5 rounded-2xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#3C1E1E] text-lg font-black flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-all cursor-pointer"
                    style={{ minHeight: '58px' }}
                  >
                    <MessageCircle className="w-5 h-5 fill-[#3C1E1E]" />
                    <span>카카오톡으로 문의하기</span>
                  </button>
                </div>

                {/* 하단 건강 안전 안내문 */}
                <div className="bg-white/80 rounded-2xl p-4 text-xs sm:text-sm text-[#73685E] leading-relaxed max-w-lg mx-auto border border-[#EBE4D8]">
                  <p className="flex items-center justify-center gap-1.5 font-bold text-[#D9480F] mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>건강하고 안전한 활동 안내</span>
                  </p>
                  본 앱의 추천은 일상의 즐거움과 활력을 위한 제안입니다. 개인의 건강 상태에 맞게 무리 없는 범위에서 가볍게 즐겨주세요.
                </div>
              </div>
            </section>

            {/* -----------------------------------------------------------------
                5) 승인 회원 전용: 활동 나눔터 (커뮤니티)
                ----------------------------------------------------------------- */}
            <section className="pt-6 border-t border-[#EBE4D8]">
              <div className="bg-white rounded-3xl border border-[#EBE4D8] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-[#D9480F]" />
                    <h3 className="text-2xl font-black text-[#2D2A26]">
                      마음 나눔터 (회원 공간)
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EBFBEE] text-[#2B8A3E] border border-[#C3FAE8]">
                    승인 회원 전용
                  </span>
                </div>
                <p className="text-base text-[#6C635B] mb-6">
                  오늘 추천받은 활동이나 춤을 실천해보신 소감을 자유롭게 나눠보세요.
                </p>

                {/* 글쓰기 폼 */}
                <form onSubmit={handleCreatePost} className="mb-8">
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder={
                      user
                        ? (profile?.is_approved || profile?.is_admin)
                          ? "오늘 음악을 들으며 가볍게 걸어보니 마음이 한결 상쾌해졌어요..."
                          : "관리자의 승인을 받으신 후 글을 작성하실 수 있습니다."
                        : "구글 로그인 후 관리자 승인을 받으시면 글을 작성하실 수 있습니다."
                    }
                    className="w-full p-4 rounded-2xl border border-[#D5C9B8] bg-[#FAF7F2] text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-3 px-6 rounded-xl bg-[#2D2A26] hover:bg-[#443E38] text-white font-bold text-base transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                      style={{ minHeight: '50px' }}
                    >
                      {isSubmitting ? '등록 중...' : '마음 나누기'}
                    </button>
                  </div>
                </form>

                {/* 글 목록 */}
                <div className="space-y-4">
                  {posts.length === 0 ? (
                    <div className="text-center py-8 text-[#8C827A] text-base">
                      아직 등록된 이야기가 없습니다. 첫 번째 이야기를 들려주세요!
                    </div>
                  ) : (
                    posts.map((post) => {
                      const isAuthor = user?.id === post.user_id;
                      const canDelete = isAuthor || profile?.is_admin;
                      return (
                        <div
                          key={post.id}
                          className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBE4D8] flex flex-col justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-[#2D2A26] text-base">
                                  {post.author_name}
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded-md bg-[#FFE8CC] text-[#D9480F] font-bold">
                                  {post.mood}
                                </span>
                              </div>
                              <span className="text-xs text-[#A89F95]">
                                {new Date(post.created_at).toLocaleDateString('ko-KR')}
                              </span>
                            </div>
                            <p className="text-base text-[#443E38] leading-relaxed">
                              {post.content}
                            </p>
                          </div>

                          {canDelete && (
                            <div className="flex justify-end pt-2 border-t border-[#EBE4D8]/60">
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="text-xs font-bold text-[#E03131] hover:text-[#C92A2A] flex items-center gap-1 cursor-pointer py-1 px-2 rounded hover:bg-white"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>삭제하기</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* =========================================================================
          [C. 다정한 알림 모달 (안전장치 & 승인 안내 팝업)]
          ========================================================================= */}
      {modalMessage && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-[#EBE4D8] shadow-2xl text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#D9480F] flex items-center justify-center mx-auto mb-4 text-2xl">
              🔔
            </div>
            <h4 className="text-2xl font-black text-[#2D2A26] mb-2">
              {modalMessage.title}
            </h4>
            <p className="text-base sm:text-lg text-[#6C635B] leading-relaxed mb-6">
              {modalMessage.desc}
            </p>
            <button
              onClick={() => setModalMessage(null)}
              className="w-full py-4 rounded-2xl bg-[#2D2A26] hover:bg-[#443E38] text-white font-extrabold text-lg transition-all active:scale-95 cursor-pointer shadow-md"
              style={{ minHeight: '56px' }}
            >
              확인했습니다
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          [D. 푸터]
          ========================================================================= */}
      <footer className="bg-[#FAF7F2] border-t border-[#EBE4D8] py-8 text-center text-xs sm:text-sm text-[#8C827A]">
        <div className="max-w-2xl mx-auto px-4 space-y-2">
          <p className="font-bold text-[#554D45]">
            © {new Date().getFullYear()} {CONFIG.appName}. All rights reserved.
          </p>
          <p>어르신들의 건강하고 활력 넘치는 매일을 진심으로 응원합니다.</p>
        </div>
      </footer>
    </div>
  );
}
