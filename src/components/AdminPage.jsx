import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ShieldCheck, UserCheck, UserX, ArrowLeft, RefreshCw, AlertTriangle, Users } from 'lucide-react';

export default function AdminPage({ user, profile, onBack }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  // 전체 프로필 목록 불러오기
  const fetchProfiles = async () => {
    setLoading(true);
    setStatusMessage('');
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setStatusMessage('회원 목록을 불러오지 못했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // 회원 승인 상태 토글 (is_approved)
  const toggleApproval = async (targetProfile) => {
    setUpdatingId(targetProfile.id);
    const newStatus = !targetProfile.is_approved;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_approved: newStatus })
        .eq('id', targetProfile.id);

      if (error) throw error;

      setProfiles(prev =>
        prev.map(p => (p.id === targetProfile.id ? { ...p, is_approved: newStatus } : p))
      );
      setStatusMessage(`'${targetProfile.full_name || targetProfile.email}' 회원이 ${newStatus ? '승인' : '승인 대기'} 상태로 변경되었습니다.`);
    } catch (err) {
      console.error('Approval toggle error:', err);
      alert('승인 상태 변경 실패: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // 관리자 권한 토글 (is_admin)
  const toggleAdmin = async (targetProfile) => {
    if (targetProfile.id === user.id) {
      alert('본인의 관리자 권한은 해제할 수 없습니다.');
      return;
    }
    setUpdatingId(targetProfile.id);
    const newStatus = !targetProfile.is_admin;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: newStatus })
        .eq('id', targetProfile.id);

      if (error) throw error;

      setProfiles(prev =>
        prev.map(p => (p.id === targetProfile.id ? { ...p, is_admin: newStatus } : p))
      );
    } catch (err) {
      console.error('Admin toggle error:', err);
      alert('관리자 권한 변경 실패: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="py-6 sm:py-8 px-4 max-w-2xl mx-auto animate-fadeIn">
      {/* 상단 네비게이션 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-base font-bold text-[#7A7067] hover:text-[#2D2A26] bg-white border border-[#EBE4D8] px-4 py-2 rounded-xl shadow-sm active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>앱으로 돌아가기</span>
        </button>

        <button
          onClick={fetchProfiles}
          disabled={loading}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5C4033] bg-[#FAF7F2] border border-[#EBE4D8] px-3.5 py-2 rounded-xl hover:bg-[#F2EBDC] transition-colors active:scale-95"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>새로고침</span>
        </button>
      </div>

      {/* 관리자 헤더 카드 */}
      <div className="bg-[#2D2A26] text-white rounded-3xl p-6 mb-6 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-[#FFE8CC] text-[#D9480F] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              구글 로그인 회원 승인 관리
            </h2>
            <p className="text-xs sm:text-sm text-[#D5C9B8]">
              관리자가 승인한 회원만 글쓰기 및 삭제 권한을 부여받습니다.
            </p>
          </div>
        </div>

        {statusMessage && (
          <div className="mt-4 p-3 bg-white/10 rounded-xl text-xs sm:text-sm text-[#FFD8A8] border border-white/10">
            {statusMessage}
          </div>
        )}
      </div>

      {/* 회원 목록 */}
      <div className="bg-white rounded-3xl border border-[#EBE4D8] p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F2EBDC]">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#D9480F]" />
            <h3 className="font-bold text-lg text-[#2D2A26]">
              가입 회원 목록 ({profiles.length}명)
            </h3>
          </div>
          <span className="text-xs text-[#8C827A]">
            실시간 Supabase DB 연동
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-[#8C827A]">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-[#D9480F]" />
            <p className="text-sm">회원 목록을 불러오는 중입니다...</p>
          </div>
        ) : profiles.length === 0 ? (
          <div className="py-12 text-center text-[#8C827A]">
            <Users className="w-10 h-10 mx-auto mb-2 text-[#D5C9B8]" />
            <p className="text-base font-semibold text-[#4A443E]">아직 가입한 회원이 없습니다.</p>
            <p className="text-xs mt-1">상단에서 구글 로그인을 진행하시면 이곳에 회원 정보가 등록됩니다.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F2EBDC]">
            {profiles.map((p) => {
              const isMe = p.id === user?.id;
              const isUpdating = updatingId === p.id;

              return (
                <div key={p.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* 회원 정보 */}
                  <div className="flex items-center gap-3">
                    {p.avatar_url ? (
                      <img
                        src={p.avatar_url}
                        alt={p.full_name || '회원'}
                        className="w-11 h-11 rounded-full object-cover border border-[#EBE4D8]"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#FFE8CC] text-[#D9480F] flex items-center justify-center font-bold text-base">
                        {(p.full_name || '회')[0]}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#2D2A26] text-base">
                          {p.full_name || '이름 없음'}
                        </span>
                        {isMe && (
                          <span className="text-[10px] bg-[#E7F5FF] text-[#1971C2] px-1.5 py-0.5 rounded font-bold">
                            나
                          </span>
                        )}
                        {p.is_admin && (
                          <span className="text-[10px] bg-[#2D2A26] text-[#FFD8A8] px-1.5 py-0.5 rounded font-bold">
                            관리자
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#8C827A]">{p.email || '이메일 없음'}</p>
                      <p className="text-[10px] text-[#A69B91]">
                        가입일: {new Date(p.created_at).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>

                  {/* 승인 상태 및 조작 버튼 */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {/* 승인 토글 버튼 */}
                    <button
                      onClick={() => toggleApproval(p)}
                      disabled={isUpdating}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                        p.is_approved
                          ? 'bg-[#EBFBEE] text-[#2B8A3E] border border-[#C3FAE8] hover:bg-[#D3F9D8]'
                          : 'bg-[#FFF9DB] text-[#8C6D00] border border-[#FFE066] hover:bg-[#FFF3BF]'
                      }`}
                    >
                      {p.is_approved ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          <span>승인 완료 (클릭 시 취소)</span>
                        </>
                      ) : (
                        <>
                          <UserX className="w-4 h-4" />
                          <span>승인 대기 (클릭 시 승인)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
