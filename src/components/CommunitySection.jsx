import React, { useEffect, useState } from 'react';
import { supabase, signInWithGoogle } from '../lib/supabase';
import { MessageSquare, PlusCircle, Trash2, Heart, Lock, AlertCircle, Send } from 'lucide-react';

export default function CommunitySection({ user, profile }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // 폼 입력 상태
  const [moodTitle, setMoodTitle] = useState('기분이 좋아요');
  const [activityTitle, setActivityTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 게시글 목록 조회
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching community posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 글 작성 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activityTitle.trim() || !content.trim()) {
      alert('활동 내용과 실천 후기를 작성해 주세요.');
      return;
    }

    if (!user) {
      alert('구글 로그인이 필요합니다.');
      return;
    }

    if (!profile?.is_approved && !profile?.is_admin) {
      alert('관리자의 승인이 완료된 회원만 글을 작성할 수 있습니다.');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('community_posts')
        .insert([
          {
            user_id: user.id,
            author_name: profile?.full_name || user.email.split('@')[0],
            mood: moodTitle,
            activity_title: activityTitle,
            content: content
          }
        ]);

      if (error) throw error;

      // 폼 초기화 및 목록 새로고침
      setActivityTitle('');
      setContent('');
      setShowForm(false);
      fetchPosts();
    } catch (err) {
      console.error('Post insertion error:', err);
      alert('게시글 등록 실패: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // 글 삭제 처리 (본인 또는 관리자만 가능)
  const handleDelete = async (postId) => {
    if (!window.confirm('정말로 이 활동 나눔 글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      console.error('Post deletion error:', err);
      alert('게시글 삭제 실패: ' + err.message);
    }
  };

  const isApproved = profile?.is_approved || profile?.is_admin;

  return (
    <section className="py-10 px-4 max-w-xl mx-auto border-t border-[#EBE4D8] mt-8">
      {/* 영역 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE8CC] text-[#D9480F] text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>시니어 소통 공간</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D2A26] tracking-tight">
            오늘의 활동 나눔터
          </h3>
          <p className="text-sm sm:text-base text-[#6C635B] mt-1">
            기분에 따라 실천한 소소한 일상을 이웃과 나눠보세요.
          </p>
        </div>

        {/* 글쓰기 버튼 */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-[#2D2A26] hover:bg-[#403B36] text-white text-sm font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#FFD8A8]" />
          <span>{showForm ? '닫기' : '활동 남기기'}</span>
        </button>
      </div>

      {/* 글쓰기 폼 영역 (승인 권한 체크) */}
      {showForm && (
        <div className="bg-white rounded-3xl border-2 border-[#FFD8A8] p-5 sm:p-6 mb-8 shadow-md animate-fadeIn">
          {!user ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#D9480F] flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#2D2A26] mb-1">
                구글 로그인이 필요합니다
              </h4>
              <p className="text-sm text-[#7A7067] mb-4">
                활동 나눔 글을 작성하시려면 먼저 구글 로그인을 진행해 주세요.
              </p>
              <button
                onClick={signInWithGoogle}
                className="px-5 py-2.5 rounded-xl bg-[#4285F4] text-white font-bold text-sm shadow-sm active:scale-95"
              >
                구글 로그인하기
              </button>
            </div>
          ) : !isApproved ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF9DB] text-[#8C6D00] flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#2D2A26] mb-1">
                관리자 승인 대기 중입니다
              </h4>
              <p className="text-sm text-[#7A7067] leading-relaxed max-w-sm mx-auto">
                현재 회원님({profile?.full_name || user.email})의 계정은 승인 대기 상태입니다.
                <br />
                관리자가 승인 페이지에서 승인하면 바로 글을 작성하거나 관리하실 수 있습니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F2EBDC]">
                <h4 className="text-lg font-bold text-[#2D2A26]">
                  새로운 활동 나눔 글 작성
                </h4>
                <span className="text-xs font-bold text-[#2B8A3E] bg-[#EBFBEE] px-2.5 py-1 rounded-full border border-[#C3FAE8]">
                  ✓ 승인된 회원 권한
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A443E] mb-1">
                  오늘의 기분
                </label>
                <select
                  value={moodTitle}
                  onChange={(e) => setMoodTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-sm font-semibold text-[#2D2A26] focus:outline-none focus:border-[#D9480F]"
                >
                  <option value="기분이 좋아요">😊 기분이 좋아요</option>
                  <option value="조금 우울해요">💧 조금 우울해요</option>
                  <option value="스트레스가 많아요">🌿 스트레스가 많아요</option>
                  <option value="지루하고 무료해요">✨ 지루하고 무료해요</option>
                  <option value="마음이 편안해요">🍵 마음이 편안해요</option>
                  <option value="누군가와 함께하고 싶어요">🤝 누군가와 함께하고 싶어요</option>
                  <option value="활력을 얻고 싶어요">☀️ 활력을 얻고 싶어요</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A443E] mb-1">
                  실천한 활동 한 줄 요약
                </label>
                <input
                  type="text"
                  placeholder="예: 공원에서 좋아하는 트로트 들으며 20분 걷기"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-sm text-[#2D2A26] focus:outline-none focus:border-[#D9480F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A443E] mb-1">
                  나눔 이야기 (후기)
                </label>
                <textarea
                  placeholder="오늘 이 활동을 하고 나서 어떤 기분이 드셨는지 편안하게 남겨주세요."
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-sm text-[#2D2A26] focus:outline-none focus:border-[#D9480F] leading-relaxed"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D5C9B8] text-sm font-bold text-[#7A7067] active:scale-95"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[#D9480F] hover:bg-[#BF3F0D] text-white text-sm font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? '등록 중...' : '이야기 등록하기'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* 활동 나눔 글 목록 */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-[#8C827A] text-sm">
            소중한 활동 이야기를 불러오는 중입니다...
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EBE4D8] p-8 text-center text-[#8C827A]">
            <p className="text-base font-semibold text-[#4A443E]">
              아직 등록된 활동 나눔 글이 없습니다.
            </p>
            <p className="text-xs mt-1">
              승인된 회원이 되시면 오늘 실천한 즐거운 활동 이야기를 첫 번째로 남겨보실 수 있습니다.
            </p>
          </div>
        ) : (
          posts.map((post) => {
            const isMyPost = user && post.user_id === user.id;
            const canDelete = isMyPost || profile?.is_admin;

            return (
              <div
                key={post.id}
                className="bg-white rounded-3xl border border-[#EBE4D8] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFE8CC] text-[#D9480F]">
                      {post.mood}
                    </span>
                    <span className="text-xs font-semibold text-[#8C827A]">
                      {post.author_name} 회원님
                    </span>
                  </div>

                  {canDelete && (
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-[#B3A9A0] hover:text-[#E03131] p-1.5 rounded-lg transition-colors"
                      title="글 삭제하기"
                      aria-label="글 삭제하기"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-[#2D2A26] mb-2 leading-snug">
                  {post.activity_title}
                </h4>

                <p className="text-base text-[#554D45] leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>

                <div className="mt-3 text-[11px] text-[#A69B91] text-right">
                  {new Date(post.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
