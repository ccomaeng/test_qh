# 큐모발검사 종합멘트 자동 생성 시스템

모발 미네랄 검사 결과를 입력하면 개인 맞춤형 종합 분석 보고서를 자동으로 생성하는 웹 애플리케이션입니다.

## 주요 기능

- 📊 모발 검사 결과 입력 폼 (중금속, 영양 미네랄, 건강 지표)
- 📝 개인 맞춤형 종합 분석 보고서 생성
- 🖨️ PDF 출력 및 저장 기능
- 📱 반응형 디자인 (모바일/태블릿/데스크톱)
- 🎨 한글 손글씨 폰트 지원
- 🏥 카카오톡 채널 연동

## 기술 스택

### Frontend
- React 18 + TypeScript
- Vite (빌드 도구)
- Tailwind CSS (스타일링)
- React Hook Form (폼 관리)
- html2canvas + jsPDF (PDF 생성)

### Backend
- FastAPI (Python)
- Uvicorn (ASGI 서버)
- Pydantic (데이터 검증)

## 설치 및 실행

### 사전 요구사항
- Node.js 18+ 및 npm
- Python 3.8+
- Git

### 1. 저장소 클론
```bash
git clone [repository-url]
cd hair_analysis_app
```

### 2. Backend 설정
```bash
cd backend

# 가상환경 생성 및 활성화 (선택사항)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Frontend 설정
```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 4. 애플리케이션 접속
- Frontend: http://localhost:3001
- Backend API: http://localhost:8000
- API 문서: http://localhost:8000/docs

## 프로덕션 빌드

### Frontend 빌드
```bash
cd frontend
npm run build
# dist 폴더에 빌드 파일 생성
```

### 배포 옵션
1. **정적 호스팅** (Frontend): Vercel, Netlify, GitHub Pages
2. **백엔드 호스팅**: Heroku, AWS EC2, Google Cloud Run
3. **풀스택**: Docker 컨테이너화 후 클라우드 배포

## 프로젝트 구조

```
hair_analysis_app/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI 앱 진입점
│   │   ├── models.py          # Pydantic 모델
│   │   ├── services/          # 비즈니스 로직
│   │   └── data/              # 참조 데이터 (5개 노트)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.tsx            # 메인 앱 컴포넌트
│   │   ├── components/        # React 컴포넌트
│   │   ├── services/          # API 클라이언트
│   │   └── types/             # TypeScript 타입
│   ├── public/
│   │   └── images/            # 정적 이미지
│   └── package.json
└── README.md
```

## API 엔드포인트

- `GET /` - API 루트
- `GET /health` - 헬스 체크
- `POST /analyze` - 표준 분석
- `POST /api/hair-analysis/full` - 전체 분석
- `GET /test-data` - 테스트 데이터

## 환경 변수 설정

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```
CORS_ORIGINS=http://localhost:3001,http://localhost:3002
```

## 기여 가이드

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

이 프로젝트는 비공개 프로젝트입니다. 무단 복제 및 배포를 금지합니다.

## 문의

카카오톡 채널: [큐모발검사 카카오톡 채널]