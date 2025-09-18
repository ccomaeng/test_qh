# TRD: 큐모발검사 종합멘트 자동 생성 시스템

## 1. 기술 개요

### 1.1 시스템 아키텍처
```
Frontend (React/Next.js) ←→ Backend (FastAPI) ←→ Knowledge Base (Markdown Notes)
      ↓                            ↓                          ↓
  Port 3000                   Port 8000                  5개 노트 파일
```

### 1.2 기술 스택
- **Backend**: Python 3.9+, FastAPI, Pydantic, uvicorn
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Knowledge Base**: Markdown 파일 (.md)
- **Development**: npm, pip, hot-reload 지원

### 1.3 배포 환경
- **Backend Server**: uvicorn with hot-reload
- **Frontend Server**: Next.js dev server
- **Port Configuration**: Backend(8000), Frontend(3000)
- **CORS**: localhost:3000 허용

## 2. API 명세

### 2.1 REST API 엔드포인트

#### 2.1.1 모발검사 전체 분석
```http
POST /api/hair-analysis/full
Content-Type: application/json

Request Body:
{
  "personal_info": {
    "name": "string (required)",
    "age": "integer (1-120, required)",
    "special_notes": "string (optional)"
  },
  "heavy_metals": {
    "mercury": "정상|높음",
    "arsenic": "정상|높음",
    "cadmium": "정상|높음",
    "lead": "정상|높음",
    "aluminum": "정상|높음",
    "barium": "정상|높음",
    "nickel": "정상|높음",
    "uranium": "정상|높음",
    "bismuth": "정상|높음"
  },
  "nutritional_minerals": {
    "calcium": "정상|높음|낮음",
    "magnesium": "정상|높음|낮음",
    "sodium": "정상|높음|낮음",
    "potassium": "정상|높음|낮음",
    "copper": "정상|높음|낮음",
    "zinc": "정상|높음|낮음",
    "phosphorus": "정상|높음|낮음",
    "iron": "정상|높음|낮음",
    "manganese": "정상|높음|낮음",
    "chromium": "정상|높음|낮음",
    "selenium": "정상|높음|낮음"
  },
  "health_indicators": {
    "insulin_sensitivity": "정상|높음|낮음",
    "autonomic_nervous_system": "정상|높음|낮음",
    "stress_state": "정상|높음|낮음",
    "immune_skin_health": "정상|높음|낮음",
    "adrenal_activity": "정상|높음|낮음",
    "thyroid_activity": "정상|높음|낮음"
  }
}

Response:
{
  "personal_info_section": "string",
  "comprehensive_analysis": "string",
  "statistics_analysis": "string",
  "summary_analysis": "string",
  "nutritionist_summary": "string",
  "compressed_version": "string (950-1000자)"
}
```

#### 2.1.2 간소화 분석
```http
POST /api/hair-analysis/simple
Content-Type: application/json

Request Body: [동일한 구조]

Response:
{
  "analysis_result": "string (간소화된 분석 결과)"
}
```

#### 2.1.3 프롬프트 기반 분석
```http
POST /api/hair-analysis/prompt-based
Content-Type: application/json

Request Body: [동일한 구조]

Response:
{
  "analysis_result": "string (프롬프트 기반 분석 결과)"
}
```

### 2.2 데이터 모델

#### 2.2.1 Core Models
```python
class PersonalInfo(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    age: int = Field(..., ge=1, le=120)
    special_notes: str = Field(default="없음", max_length=200)

class HeavyMetalValue(str, Enum):
    NORMAL = "정상"
    HIGH = "높음"

class TestResultValue(str, Enum):
    NORMAL = "정상"
    HIGH = "높음"
    LOW = "낮음"

class HeavyMetals(BaseModel):
    mercury: HeavyMetalValue
    arsenic: HeavyMetalValue
    cadmium: HeavyMetalValue
    lead: HeavyMetalValue
    aluminum: HeavyMetalValue
    barium: HeavyMetalValue
    nickel: HeavyMetalValue
    uranium: HeavyMetalValue
    bismuth: HeavyMetalValue

class NutritionalMinerals(BaseModel):
    calcium: TestResultValue
    magnesium: TestResultValue
    sodium: TestResultValue
    potassium: TestResultValue
    copper: TestResultValue
    zinc: TestResultValue
    phosphorus: TestResultValue
    iron: TestResultValue
    manganese: TestResultValue
    chromium: TestResultValue
    selenium: TestResultValue

class HealthIndicators(BaseModel):
    insulin_sensitivity: TestResultValue
    autonomic_nervous_system: TestResultValue
    stress_state: TestResultValue
    immune_skin_health: TestResultValue
    adrenal_activity: TestResultValue
    thyroid_activity: TestResultValue

class HairAnalysisRequest(BaseModel):
    personal_info: PersonalInfo
    heavy_metals: HeavyMetals
    nutritional_minerals: NutritionalMinerals
    health_indicators: HealthIndicators
```

#### 2.2.2 Response Models
```python
class FullAnalysisResponse(BaseModel):
    personal_info_section: str
    comprehensive_analysis: str
    statistics_analysis: str
    summary_analysis: str
    nutritionist_summary: str
    compressed_version: str

class SimpleAnalysisResponse(BaseModel):
    analysis_result: str

class PromptBasedAnalysisResponse(BaseModel):
    analysis_result: str
```

## 3. 지식 베이스 구조

### 3.1 노트 파일 시스템
```
/Users/yujineom/Documents/Obsidian/2025/00. Inbox/큐모발검사 종합멘트/
├── 1. 첫 번째 단락 정리.md           # 첫 번째 단락 템플릿
├── 2. 중금속 분석 파트 정리.md        # 중금속 분석 템플릿
├── 3. 영양 미네랄 분석 파트 정리.md   # 영양 미네랄 템플릿
├── 4. 건강 지표 분석 파트 정리.md     # 건강 지표 템플릿
└── 5. 요약 설명 파트 정리.md          # 요약 설명 템플릿
```

### 3.2 템플릿 매칭 로직
```python
# 조건 매칭 우선순위
1. 복합 조건 (칼슘+마그네슘, 부신+갑상선 등)
2. 연령별 조건 (≤10세, 11-19세, ≥20세)
3. 특이사항 조건 (파마/염색/탈색)
4. 개별 항목 조건
5. 기본 템플릿

# 정규표현식 패턴
- 조건 블록: r"## (.+?)\n(.*?)(?=\n## |\Z)"
- 플레이스홀더: r"\[이름\]" → 실제 이름으로 대체
- 내용 추출: 마크다운에서 순수 텍스트만 추출
```

### 3.3 컨텐츠 규칙
- **100% 노트 기반**: AI 생성 내용 없음
- **정확한 매칭**: 조건과 완전히 일치하는 템플릿만 사용
- **개인화**: [이름] 플레이스홀더만 실제 이름으로 대체
- **우선순위**: 복합 조건 > 개별 조건

## 4. 핵심 알고리즘

### 4.1 7단계 분석 프로세스
```python
def generate_full_analysis(request: HairAnalysisRequest) -> FullAnalysisResponse:
    # 1단계: 개인정보 섹션
    personal_info = self._generate_personal_info_section(request.personal_info)

    # 2단계: 종합 분석 (5개 노트 순차 처리)
    comprehensive = self._generate_comprehensive_analysis(request)

    # 3단계: 통계 분석
    statistics = self._generate_statistics_analysis(request)

    # 4단계: 종합 요약
    summary = self._generate_summary_analysis(request, comprehensive)

    # 5단계: 영양사 요약
    nutritionist = self._generate_nutritionist_summary(request)

    # 6단계: 압축 버전 (950-1000자)
    compressed = self._generate_compressed_version(summary)

    return FullAnalysisResponse(...)
```

### 4.2 복합 조건 처리 로직
```python
# 우선순위 기반 매칭
def _find_matching_condition(self, note_content: str, conditions: Dict) -> str:
    # 1. 복합 조건 검사
    for complex_condition in self.complex_conditions:
        if self._matches_complex_condition(conditions, complex_condition):
            content = self._extract_content(note_content, complex_condition)
            if content:
                return content

    # 2. 개별 조건 검사
    for condition_key, condition_value in conditions.items():
        pattern = f"## {condition_key}: {condition_value}"
        content = self._extract_content(note_content, pattern)
        if content:
            return content

    # 3. 기본 템플릿
    return self._extract_default_content(note_content)
```

### 4.3 요약 생성 로직 (Note 5 규칙)
```python
def _generate_summary_analysis(self, request, comprehensive_analysis):
    # 1. 우선순위 기반 관리 지점 결정
    priority_points = self._determine_priority_management_points(request)

    # 2. 종합 분석 기반 음식 추천 (정확히 5개)
    foods = self._extract_recommended_foods_from_comprehensive(comprehensive_analysis)

    # 3. 언급된 영양제 기반 추천
    supplements = self._extract_mentioned_supplements(comprehensive_analysis)

    # 4. 재검사 기간 결정
    reexam_period = self._calculate_reexamination_period(request)

    # 5. 한국어 문법 검사 및 자연스러운 문장 생성
    result = self._improve_korean_grammar(summary_text)

    return result
```

### 4.4 한국어 문법 처리
```python
def _improve_korean_grammar(self, text: str) -> str:
    # 1. 중복 조사 제거
    text = re.sub(r'을/를', '을', text)
    text = re.sub(r'이/가', '이', text)
    text = re.sub(r'은/는', '은', text)

    # 2. 받침 유무에 따른 조사 자동 교정
    def fix_particles(match):
        word = match.group(1)
        last_char = word[-1]
        has_final_consonant = (ord(last_char) - ord('가')) % 28 != 0

        if particle in ['을', '를']:
            return word + ('을' if has_final_consonant else '를')
        elif particle in ['이', '가']:
            return word + ('이' if has_final_consonant else '가')
        elif particle in ['은', '는']:
            return word + ('은' if has_final_consonant else '는')

    # 3. 중복 표현 제거
    text = re.sub(r'유해 중금속은 모두 정상.*?영양 미네랄은 모두 정상',
                 '유해 중금속과 영양 미네랄은 모두 정상', text)

    return text
```

## 5. 성능 요구사항

### 5.1 응답 시간
- **API 응답 시간**: < 3초
- **노트 파일 읽기**: < 500ms
- **템플릿 매칭**: < 1초
- **문법 처리**: < 200ms

### 5.2 동시성
- **동시 접속**: 최소 10명
- **요청 처리**: 비동기 처리
- **파일 I/O**: 캐싱 적용

### 5.3 메모리 사용량
- **노트 파일 캐싱**: 메모리 내 저장
- **템플릿 재사용**: 인스턴스 레벨 캐싱
- **가비지 컬렉션**: 자동 메모리 관리

## 6. 보안 요구사항

### 6.1 입력 검증
```python
# Pydantic 모델을 통한 자동 검증
- 이름: 1-50자, 필수
- 나이: 1-120세, 정수
- 특이사항: 최대 200자
- 검사 결과: Enum 값만 허용
```

### 6.2 데이터 보호
- **개인정보**: 메모리에서만 처리, 저장 안함
- **로그**: 개인정보 제외
- **에러 처리**: 내부 구조 노출 방지

### 6.3 CORS 설정
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

## 7. 에러 처리

### 7.1 HTTP 상태 코드
```python
200: 성공
400: 잘못된 요청 (유효성 검사 실패)
404: 리소스 없음 (노트 파일 누락)
422: 처리할 수 없는 엔터티 (Pydantic 검증 실패)
500: 서버 내부 오류
```

### 7.2 에러 응답 형식
```json
{
  "detail": [
    {
      "loc": ["body", "personal_info", "age"],
      "msg": "ensure this value is greater than or equal to 1",
      "type": "value_error.number.not_ge",
      "ctx": {"limit_value": 1}
    }
  ]
}
```

### 7.3 로깅 전략
```python
import logging

logger = logging.getLogger(__name__)

# 에러 로깅 (개인정보 제외)
logger.error(f"Template matching failed for condition: {condition_type}")

# 성능 로깅
logger.info(f"Analysis completed in {elapsed_time:.2f}s")
```

## 8. 배포 및 운영

### 8.1 개발 환경 구성
```bash
# Backend
cd /Users/yujineom/Tmp/qhq_total/hair_analysis_app/backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Frontend
cd /Users/yujineom/Tmp/qhq_total/hair_analysis_app/frontend
npm run dev
```

### 8.2 의존성 관리
```python
# requirements.txt
fastapi==0.104.1
pydantic==2.5.0
uvicorn==0.24.0

# package.json
{
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 8.3 모니터링
- **헬스체크**: `/health` 엔드포인트
- **메트릭**: 응답 시간, 에러율
- **로그**: 구조화된 JSON 로그

## 9. 테스트 전략

### 9.1 단위 테스트
```python
# 템플릿 매칭 테스트
def test_template_matching():
    service = SimpleHairAnalysisService()
    result = service._find_matching_condition(note_content, conditions)
    assert result is not None

# 문법 처리 테스트
def test_korean_grammar():
    service = SimpleHairAnalysisService()
    result = service._improve_korean_grammar("칼슘을/를 섭취하세요")
    assert "을/를" not in result
```

### 9.2 통합 테스트
```python
# API 엔드포인트 테스트
@pytest.mark.asyncio
async def test_full_analysis_endpoint():
    response = await client.post("/api/hair-analysis/full", json=test_data)
    assert response.status_code == 200
    assert "personal_info_section" in response.json()
```

### 9.3 테스트 데이터
```python
# 정상 케이스
normal_test_data = {
    "personal_info": {"name": "김정상", "age": 25, "special_notes": "없음"},
    "heavy_metals": {"mercury": "정상", ...},
    "nutritional_minerals": {"calcium": "정상", ...},
    "health_indicators": {"stress_state": "정상", ...}
}

# 스트레스 케이스
stress_test_data = {
    "health_indicators": {"stress_state": "높음", ...}
}
```

## 10. 확장성 고려사항

### 10.1 수평 확장
- **로드 밸런서**: nginx 또는 Apache
- **인스턴스 복제**: Docker 컨테이너화
- **세션 관리**: 무상태(stateless) 설계

### 10.2 수직 확장
- **메모리 최적화**: 노트 파일 캐싱 전략
- **CPU 최적화**: 비동기 처리, 병렬 처리
- **I/O 최적화**: 파일 시스템 캐싱

### 10.3 기능 확장
- **새로운 노트**: 노트 파일 추가 시 자동 감지
- **다국어 지원**: 템플릿 다국어화
- **새로운 검사 항목**: 모델 확장 가능한 구조