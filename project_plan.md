# 큐모발검사 종합멘트 자동 생성 앱 개발 계획

## 🎯 프로젝트 개요

**프로젝트명**: 큐모발검사 종합멘트 자동 생성 시스템
**목표**: 모발검사 결과를 입력받아 5개 핵심 노트에서 정확한 멘트를 추출하여 개인 맞춤형 종합멘트를 자동 생성하는 웹 애플리케이션

## 🏗️ 시스템 아키텍처

```
Frontend (React + TypeScript)
    ↕️ HTTP API
Backend (FastAPI + Python)
    ↕️ File System
5개 핵심 노트 파일 (Markdown)
```

## 📊 핵심 요구사항

### 1. 정확성 보장
- AI가 새로운 멘트를 생성하지 않고 **5개 노트에서만 100% 정확히 추출**
- 프롬프트 지시사항을 한글자도 틀리지 않게 실행
- YAML 메타데이터 및 극단적 표현 절대 금지

### 2. 순차 작업 프로세스
1. **1단계**: 개인정보 섹션 작성
2. **2단계**: 종합멘트 작성 (5개 노트 순차 참조)
3. **3단계**: 요약 설명 작성
4. **4단계**: 통계 분석
5. **5단계**: 종합멘트 요약
6. **6단계**: 영양전문가 요약
7. **7단계**: 압축 버전 (950-1000자)

## 📝 입력 데이터 구조

### 개인정보
- 이름: string (필수)
- 나이: number (필수)
- 특이사항: string (염색/펌/질환/직업 등 또는 "없음")

### 유해 중금속 (9종)
각각 "정상" 또는 "높음" 값
- 수은, 비소, 카드뮴, 납, 알루미늄, 바륨, 니켈, 우라늄, 비스무트

### 영양 미네랄 (11종)
각각 "정상", "높음", "낮음" 값
- 칼슘, 마그네슘, 나트륨, 칼륨, 구리, 아연, 인, 철, 망간, 크롬, 셀레늄

### 건강 상태 지표 (6종)
각각 "정상", "높음", "낮음" 값
- 인슐린민감도, 자율신경계, 스트레스상태, 면역및피부건강, 부신활성도, 갑상선활성도

## 🔄 멘트 생성 로직

### Step 2-1: 첫 번째 단락
- 참조: `1. 기본 구성_첫번째 단락.md`
- 검사 결과 조건에 맞는 멘트 찾기
- 해당 조건의 멘트를 정확히 복사 후 이름만 실제 이름으로 치환

### Step 2-2: 중금속 분석
- 참조: `2. 중금속 종류별 최종 멘트.md`
- 높음으로 표시된 중금속만 작성
- 연령대(10세 이하/11-19세/20세 이상) 구분 확인
- 해당 중금속+연령대 조건의 멘트 정확히 복사

### Step 2-3: 영양 미네랄 분석
- 참조: `3. 영양 미네랄 상세 조건별 최종 멘트.md`
- 높음/낮음 미네랄 확인
- 복합조건(칼슘+마그네슘 등) 우선 확인
- 복합조건 사용 시 개별 항목 생략

### Step 2-4: 건강 상태 지표 분석
- 참조: `4. 건강 상태 지표별 최종 멘트.md`
- 높음/낮음 지표만 작성
- 부신+갑상선 복합조건 시 갑상선 생략

### Step 3: 요약 설명 작성
- 참조: `5. 요약 설명 파트 정리.md` 규칙 적용
- 핵심 관리 포인트 결정
- 정확히 5개 식품 추천
- 적절한 영양제 추천
- 재검사 기간 설정

## 🔧 기술 스택

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.9+
- **Dependencies**:
  - pydantic (데이터 검증)
  - uvicorn (ASGI 서버)
  - python-markdown (마크다운 파싱)

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript
- **State Management**: React Hook Form
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI

### Development Tools
- **Package Manager**: npm/yarn (frontend), pip (backend)
- **Code Quality**: ESLint, Prettier, Black, mypy
- **Testing**: pytest (backend), Vitest (frontend)

## 📁 프로젝트 구조

```
hair_analysis_app/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── input_models.py
│   │   │   └── output_models.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── analysis_service.py
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   └── text_processor.py
│   │   └── data/
│   │       ├── note1_basic.md
│   │       ├── note2_heavy_metals.md
│   │       ├── note3_minerals.md
│   │       ├── note4_health_indicators.md
│   │       └── note5_summary.md
│   ├── requirements.txt
│   └── pytest.ini
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputForm/
│   │   │   ├── ResultDisplay/
│   │   │   └── common/
│   │   ├── types/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md
```

## 🚀 개발 단계

1. **백엔드 API 개발**: FastAPI로 핵심 멘트 생성 로직 구현
2. **프론트엔드 UI 개발**: React로 사용자 인터페이스 구현
3. **멘트 생성 로직 구현**: 5개 노트 파일에서 정확한 멘트 추출
4. **통합 테스트**: 전체 시스템 동작 검증

## ⚠️ 주요 제약사항

- 5개 노트 파일 외의 다른 자료에서 멘트 복사 절대 금지
- 순서 준수: 반드시 1→2→3→4→5 단계 순서로 작업
- 개인화: 이름, 나이, 특이사항 정확히 반영
- 복합조건: 칼슘+마그네슘, 부신+갑상선 등 복합조건 우선 적용
- 생략 규칙: 복합조건 사용 시 개별 항목 생략