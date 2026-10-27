---
name: anti-ai-design
description: Removes stereotypical AI-generated looks from web apps by applying human-centered design principles, warm typography, authentic color palettes, rich micro-interactions, and senior-friendly usability.
---

# Anti-AI Human-Centered Design Skill

이 스킬은 인공지능이 생성한 웹사이트 특유의 '뻔하고 차가운 회색 박스/밋밋한 템플릿(AI Slop)' 느낌을 지우고, 전문 디자이너가 정성스럽게 빚어낸 듯한 따뜻하고 인간적인 UI/UX를 구축하는 지침입니다.

## 1. AI 디자인 특유의 악취(Code Smells) 제거
- ❌ **차갑고 밋밋한 무채색 회색 박스 난립 (`bg-gray-100`, `border-gray-200`)**: 피하고 따뜻한 웜톤(크림, 소프트 베이지, 웜 슬레이트, 라이트 피치 등) 사용
- ❌ **천편일률적인 보라색-파란색 그라데이션**: 뻔한 AI 시그니처 색상을 지양하고 목적에 맞는 자연의 색채(세이지 그린, 따뜻한 선셋 코랄, 올리브, 웜 앰버 등) 적용
- ❌ **동일한 크기의 카드들의 바둑판 나열**: 크기와 시각적 무게감의 강약을 주어 계층감(Hierarchy) 형성
- ❌ **기계적이고 어색한 번역투 문구**: 친근하고 따뜻하며 공감 가는 자연스러운 한국어(존댓말, 경어체) 작성

## 2. 시니어 중심(Senior-Friendly) 인간적 UI 원칙
1. **시각적 선명성과 가독성**:
   - 본문 최소 18px~20px, 버튼 및 주요 제목 22px~32px 이상
   - 대비비(Contrast ratio)를 충분히 확보하여 눈이 침침해도 편안하게 읽힘
   - 자간(Letter spacing)과 행간(Line-height: 1.6~1.8)을 넉넉히 확보
2. **크고 쾌적한 터치 타겟**:
   - 모든 인터랙티브 버튼은 최소 세로 56px 이상, 손가락 터치 시 빗나가지 않도록 여백 확보
   - 누르는 순간 자연스러운 햅틱 느낌의 반응(`active:scale-[0.98]`, 부드러운 음영 변화)
3. **부드럽고 유기적인 질감**:
   - 딱딱한 각진 모서리 대신 부드러운 라운드(`rounded-2xl`, `rounded-3xl`)
   - 은은한 듀얼 섀도우와 따뜻한 하이라이트로 손에 닿을 듯한 입체감 제공
4. **한눈에 들어오는 단순한 플로우**:
   - 복잡한 뎁스 없이 직관적으로 원하는 정보를 찾고 첫 화면으로 손쉽게 복귀 가능

## 3. 타이포그래피 & 보이스 앤 톤
- **서체**: Pretendard 등 선명하고 정돈된 한글 폰트 적용
- **톤앤매너**: 과장되지 않고 정중하며, 다정하고 따뜻한 손자/손녀 혹은 친절한 이웃 같은 어조
