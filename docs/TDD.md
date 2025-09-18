# TDD: 큐모발검사 종합멘트 자동 생성 시스템

## 1. 시스템 설계 개요

### 1.1 아키텍처 패턴
- **Pattern**: 3-Layer Architecture (Presentation → Business → Data)
- **Design Philosophy**: Template-driven Content Generation
- **Integration Strategy**: Knowledge Base Driven Analysis

### 1.2 시스템 컴포넌트 다이어그램
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │ Knowledge Base  │
│   (React)       │◄──►│   (FastAPI)     │◄──►│ (Markdown Files)│
│                 │    │                 │    │                 │
│ - Input Forms   │    │ - Analysis      │    │ - 5 Note Files  │
│ - Result Views  │    │   Services      │    │ - Templates     │
│ - UI Components │    │ - API Endpoints │    │ - Conditions    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 1.3 핵심 설계 원칙
1. **Template-First Design**: 모든 컨텐츠는 사전 정의된 템플릿에서 추출
2. **Condition-Based Matching**: 복합 조건을 우선 적용하는 계층적 매칭
3. **Zero AI Generation**: 100% 기존 노트 기반, AI 생성 컨텐츠 없음
4. **Korean Grammar Validation**: 한국어 문법 자동 검증 및 교정

## 2. 데이터 흐름 설계

### 2.1 전체 데이터 흐름
```
User Input → Validation → Analysis Engine → Template Matching → Grammar Processing → Response
    ↓             ↓              ↓                ↓                  ↓              ↓
  Forms      Pydantic     Service Layer    Note Files        Korean NLP     JSON Response
```

### 2.2 7단계 분석 프로세스 흐름
```
Step 1: Personal Info Section
         ↓
Step 2: Comprehensive Analysis (5 Notes Sequential Processing)
         ↓
Step 3: Statistics Analysis
         ↓
Step 4: Summary Analysis (Note 5 Rules)
         ↓
Step 5: Nutritionist Summary
         ↓
Step 6: Compressed Version (950-1000자)
         ↓
Step 7: Grammar Validation & Response
```

### 2.3 템플릿 매칭 알고리즘
```
Input Conditions → Priority Matrix → Template Search → Content Extraction
      ↓                   ↓              ↓               ↓
   User Data        Complex Conditions   Note Files    Clean Content
                    Individual Conditions
                    Default Templates
```

## 3. 백엔드 설계

### 3.1 디렉토리 구조
```
backend/
├── app/
│   ├── main.py                 # FastAPI 애플리케이션 엔트리포인트
│   ├── models/
│   │   └── hair_analysis.py    # Pydantic 데이터 모델
│   ├── services/
│   │   ├── simple_analysis_service.py      # 메인 분석 서비스
│   │   └── prompt_based_analysis_service.py # 프롬프트 기반 서비스
│   └── routers/
│       └── hair_analysis.py    # API 라우터
├── requirements.txt
└── README.md
```

### 3.2 서비스 레이어 설계

#### 3.2.1 SimpleHairAnalysisService 클래스
```python
class SimpleHairAnalysisService:
    def __init__(self):
        self.note_paths = {
            1: "/path/to/1. 첫 번째 단락 정리.md",
            2: "/path/to/2. 중금속 분석 파트 정리.md",
            3: "/path/to/3. 영양 미네랄 분석 파트 정리.md",
            4: "/path/to/4. 건강 지표 분석 파트 정리.md",
            5: "/path/to/5. 요약 설명 파트 정리.md"
        }
        self._note_contents = {}  # 캐싱용

    # Core Methods
    def generate_full_analysis(self, request: HairAnalysisRequest) -> FullAnalysisResponse
    def generate_simple_analysis(self, request: HairAnalysisRequest) -> SimpleAnalysisResponse

    # Analysis Step Methods
    def _generate_personal_info_section(self, personal_info: PersonalInfo) -> str
    def _generate_comprehensive_analysis(self, request: HairAnalysisRequest) -> str
    def _generate_statistics_analysis(self, request: HairAnalysisRequest) -> str
    def _generate_summary_analysis(self, request: HairAnalysisRequest, comprehensive: str) -> str
    def _generate_nutritionist_summary(self, request: HairAnalysisRequest) -> str
    def _generate_compressed_version(self, summary: str) -> str

    # Template Processing Methods
    def _load_note_content(self, note_number: int) -> str
    def _find_matching_condition(self, note_content: str, conditions: Dict) -> str
    def _extract_content_for_condition(self, note_content: str, condition: str) -> str

    # Note 5 Specific Methods
    def _determine_priority_management_points(self, request: HairAnalysisRequest) -> List[str]
    def _extract_recommended_foods_from_comprehensive(self, comprehensive: str) -> List[str]
    def _extract_mentioned_supplements(self, comprehensive: str) -> List[str]
    def _calculate_reexamination_period(self, request: HairAnalysisRequest) -> str
    def _generate_management_content(self, request: HairAnalysisRequest) -> str

    # Grammar Processing
    def _improve_korean_grammar(self, text: str) -> str
    def _fix_particles(self, text: str) -> str
    def _remove_redundant_expressions(self, text: str) -> str
```

#### 3.2.2 조건 매칭 우선순위 시스템
```python
# 우선순위 기반 조건 처리
PRIORITY_CONDITIONS = [
    # 1순위: 복합 조건
    {
        "pattern": "칼슘: 낮음, 마그네슘: 낮음",
        "priority": 1,
        "description": "칼슘+마그네슘 동시 부족"
    },
    {
        "pattern": "부신활성도: 낮음, 갑상선활성도: 낮음",
        "priority": 1,
        "description": "부신+갑상선 동시 저하"
    },

    # 2순위: 연령별 조건
    {
        "pattern": "나이: ≤10세, 나트륨: 높음, 칼륨: 낮음",
        "priority": 2,
        "description": "10세 이하 나트륨/칼륨 불균형"
    },

    # 3순위: 특이사항 조건
    {
        "pattern": "특이사항: 파마/염색/탈색, 바륨: 높음",
        "priority": 3,
        "description": "화학적 모발 손상 + 바륨 증가"
    },

    # 4순위: 개별 조건
    {
        "pattern": "수은: 높음",
        "priority": 4,
        "description": "수은 단일 증가"
    }
]
```

### 3.3 데이터 검증 레이어

#### 3.3.1 Pydantic 모델 검증
```python
# 자동 타입 검증
class PersonalInfo(BaseModel):
    name: str = Field(..., min_length=1, max_length=50, regex=r'^[가-힣a-zA-Z\s]+$')
    age: int = Field(..., ge=1, le=120)
    special_notes: str = Field(default="없음", max_length=200)

    @validator('name')
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('이름은 필수입니다')
        return v.strip()

    @validator('special_notes')
    def validate_special_notes(cls, v):
        if v in ["", None]:
            return "없음"
        return v
```

#### 3.3.2 비즈니스 로직 검증
```python
def _validate_analysis_conditions(self, request: HairAnalysisRequest) -> bool:
    """분석 조건의 비즈니스 로직 검증"""

    # 1. 연령별 특별 조건 검증
    if request.personal_info.age <= 10:
        # 10세 이하는 특별한 해석 필요
        pass

    # 2. 특이사항과 검사 결과 일관성 검증
    if "파마" in request.personal_info.special_notes:
        if request.heavy_metals.barium == "높음":
            # 예상되는 패턴
            pass

    # 3. 논리적 모순 검사
    if (request.health_indicators.stress_state == "높음" and
        request.health_indicators.adrenal_activity == "높음"):
        # 스트레스 높음 + 부신 활성도 높음은 모순일 수 있음
        logger.warning("Potential inconsistency in stress indicators")

    return True
```

## 4. 프론트엔드 설계

### 4.1 컴포넌트 아키텍처
```
App
├── Header
├── HairAnalysisForm
│   ├── PersonalInfoSection
│   ├── HeavyMetalsSection
│   ├── NutritionalMineralsSection
│   └── HealthIndicatorsSection
├── ResultsDisplay
│   ├── FullAnalysisResults
│   ├── SimpleAnalysisResults
│   └── CompressedResults
└── Footer
```

### 4.2 상태 관리 설계
```typescript
// 전역 상태 인터페이스
interface AppState {
  formData: HairAnalysisRequest;
  analysisResults: {
    full?: FullAnalysisResponse;
    simple?: SimpleAnalysisResponse;
    promptBased?: PromptBasedAnalysisResponse;
  };
  loading: {
    fullAnalysis: boolean;
    simpleAnalysis: boolean;
    promptBasedAnalysis: boolean;
  };
  errors: {
    validation?: string[];
    api?: string;
  };
}

// 액션 타입
type Action =
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<HairAnalysisRequest> }
  | { type: 'SET_LOADING'; payload: { type: string; loading: boolean } }
  | { type: 'SET_RESULTS'; payload: { type: string; results: any } }
  | { type: 'SET_ERROR'; payload: { type: string; error: string } }
  | { type: 'CLEAR_ERRORS' };
```

### 4.3 폼 검증 로직
```typescript
// 실시간 폼 검증
const validateForm = (formData: HairAnalysisRequest): string[] => {
  const errors: string[] = [];

  // 필수 필드 검증
  if (!formData.personal_info.name.trim()) {
    errors.push('이름은 필수입니다');
  }

  if (formData.personal_info.age < 1 || formData.personal_info.age > 120) {
    errors.push('나이는 1세부터 120세까지 입력 가능합니다');
  }

  // 모든 검사 항목 입력 확인
  const heavyMetalsComplete = Object.values(formData.heavy_metals).every(v => v !== '');
  const mineralsComplete = Object.values(formData.nutritional_minerals).every(v => v !== '');
  const indicatorsComplete = Object.values(formData.health_indicators).every(v => v !== '');

  if (!heavyMetalsComplete) errors.push('모든 중금속 검사 결과를 입력해주세요');
  if (!mineralsComplete) errors.push('모든 영양 미네랄 검사 결과를 입력해주세요');
  if (!indicatorsComplete) errors.push('모든 건강 지표를 입력해주세요');

  return errors;
};
```

## 5. 지식 베이스 설계

### 5.1 노트 파일 구조 설계
```markdown
# 템플릿 구조 예시 (1. 첫 번째 단락 정리.md)

## 10세 이하
[이름]님은 현재 10세 이하로, 성장기에 있어 특별한 관리가 필요합니다.

## 11-19세
[이름]님은 현재 청소년기로, 활발한 신체 활동과 학업 스트레스에 대한 관리가 중요합니다.

## 20세 이상
[이름]님은 성인으로서 일상생활과 직업적 스트레스 관리가 필요합니다.

## 기본
[이름]님의 모발검사 결과를 바탕으로 종합적인 건강 상태를 분석해드리겠습니다.
```

### 5.2 조건 매칭 패턴 설계
```python
# 정규표현식 패턴 설계
CONDITION_PATTERNS = {
    # 기본 조건 패턴
    'basic': r'## (.+?)\n(.*?)(?=\n## |\Z)',

    # 복합 조건 패턴
    'complex': r'## (.+?), (.+?)\n(.*?)(?=\n## |\Z)',

    # 연령 조건 패턴
    'age': r'## (\d+)세\s*(이하|이상|~\d+세)\n(.*?)(?=\n## |\Z)',

    # 특이사항 조건 패턴
    'special': r'## 특이사항:\s*(.+?)\n(.*?)(?=\n## |\Z)',

    # 이름 플레이스홀더
    'name_placeholder': r'\[이름\]'
}
```

### 5.3 컨텐츠 추출 알고리즘
```python
def _extract_content_with_priority(self, note_content: str, request: HairAnalysisRequest) -> str:
    """우선순위 기반 컨텐츠 추출"""

    # 1단계: 복합 조건 검사
    complex_conditions = self._generate_complex_conditions(request)
    for condition in complex_conditions:
        content = self._search_condition_in_note(note_content, condition)
        if content:
            return self._process_content(content, request.personal_info.name)

    # 2단계: 연령별 조건 검사
    age_condition = self._generate_age_condition(request.personal_info.age)
    content = self._search_condition_in_note(note_content, age_condition)
    if content:
        return self._process_content(content, request.personal_info.name)

    # 3단계: 특이사항 조건 검사
    if request.personal_info.special_notes != "없음":
        special_condition = f"특이사항: {request.personal_info.special_notes}"
        content = self._search_condition_in_note(note_content, special_condition)
        if content:
            return self._process_content(content, request.personal_info.name)

    # 4단계: 개별 조건 검사
    individual_conditions = self._generate_individual_conditions(request)
    for condition in individual_conditions:
        content = self._search_condition_in_note(note_content, condition)
        if content:
            return self._process_content(content, request.personal_info.name)

    # 5단계: 기본 템플릿
    return self._get_default_template(note_content, request.personal_info.name)
```

## 6. 한국어 처리 시스템 설계

### 6.1 문법 검증 엔진
```python
class KoreanGrammarProcessor:
    """한국어 문법 처리 전용 클래스"""

    def __init__(self):
        # 한글 음성학적 분석을 위한 초성, 중성, 종성 테이블
        self.CHOSUNG_LIST = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
                            'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
        self.JUNGSUNG_LIST = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
                             'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
        self.JONGSUNG_LIST = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
                             'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
                             'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

    def has_jongsung(self, char: str) -> bool:
        """받침(종성) 유무 확인"""
        if not ('가' <= char <= '힣'):
            return False

        char_code = ord(char) - ord('가')
        jongsung_index = char_code % 28
        return jongsung_index != 0

    def get_correct_particle(self, word: str, particle_type: str) -> str:
        """올바른 조사 반환"""
        if not word:
            return particle_type

        last_char = word[-1]
        has_final = self.has_jongsung(last_char)

        particle_map = {
            '을를': '을' if has_final else '를',
            '이가': '이' if has_final else '가',
            '은는': '은' if has_final else '는',
            '와과': '과' if has_final else '와',
            '로으로': '으로' if has_final else '로'
        }

        return particle_map.get(particle_type, particle_type)

    def fix_duplicate_particles(self, text: str) -> str:
        """중복 조사 제거"""
        patterns = [
            (r'을/를', '을를'),
            (r'이/가', '이가'),
            (r'은/는', '은는'),
            (r'와/과', '와과'),
            (r'로/으로', '로으로')
        ]

        for pattern, particle_type in patterns:
            def replace_particle(match):
                # 앞 단어 찾기
                start = max(0, match.start() - 10)
                before_text = text[start:match.start()]
                words = before_text.split()
                if words:
                    last_word = words[-1]
                    return self.get_correct_particle(last_word, particle_type)
                return particle_type

            text = re.sub(pattern, replace_particle, text)

        return text
```

### 6.2 자연어 처리 파이프라인
```python
def process_natural_korean(self, text: str) -> str:
    """한국어 자연어 처리 파이프라인"""

    # 1단계: 중복 조사 제거
    text = self.grammar_processor.fix_duplicate_particles(text)

    # 2단계: 문장 구조 개선
    text = self._improve_sentence_structure(text)

    # 3단계: 중복 표현 제거
    text = self._remove_redundant_expressions(text)

    # 4단계: 자연스러운 연결어 추가
    text = self._add_natural_connectors(text)

    # 5단계: 최종 문법 검증
    text = self._final_grammar_check(text)

    return text

def _improve_sentence_structure(self, text: str) -> str:
    """문장 구조 개선"""
    # 중복 표현 통합
    redundant_patterns = [
        (r'유해 중금속은 모두 정상.*?영양 미네랄은 모두 정상',
         '유해 중금속과 영양 미네랄은 모두 정상'),
        (r'(\w+)이/가.*?\1이/가', r'\1이/가'),  # 같은 주어 반복 제거
        (r'합니다\.\s*합니다\.', '합니다.'),  # 중복 종결어미 제거
    ]

    for pattern, replacement in redundant_patterns:
        text = re.sub(pattern, replacement, text)

    return text
```

## 7. 성능 최적화 설계

### 7.1 캐싱 전략
```python
class NoteContentCache:
    """노트 컨텐츠 캐싱 시스템"""

    def __init__(self):
        self._cache = {}
        self._cache_timestamps = {}
        self.cache_ttl = 3600  # 1시간

    def get_note_content(self, note_path: str) -> str:
        """캐시된 노트 컨텐츠 반환"""
        current_time = time.time()

        # 캐시 확인
        if note_path in self._cache:
            if current_time - self._cache_timestamps[note_path] < self.cache_ttl:
                return self._cache[note_path]

        # 파일 읽기 및 캐시 저장
        content = self._read_file(note_path)
        self._cache[note_path] = content
        self._cache_timestamps[note_path] = current_time

        return content

    def invalidate_cache(self, note_path: str = None):
        """캐시 무효화"""
        if note_path:
            self._cache.pop(note_path, None)
            self._cache_timestamps.pop(note_path, None)
        else:
            self._cache.clear()
            self._cache_timestamps.clear()
```

### 7.2 비동기 처리 설계
```python
@asyncio.coroutine
async def generate_full_analysis_async(self, request: HairAnalysisRequest) -> FullAnalysisResponse:
    """비동기 전체 분석 생성"""

    # 병렬 처리 가능한 작업들
    tasks = []

    # 1. 개인정보 섹션 (독립적)
    tasks.append(self._generate_personal_info_section_async(request.personal_info))

    # 2. 통계 분석 (독립적)
    tasks.append(self._generate_statistics_analysis_async(request))

    # 3. 영양사 요약 (독립적)
    tasks.append(self._generate_nutritionist_summary_async(request))

    # 병렬 실행
    personal_info, statistics, nutritionist = await asyncio.gather(*tasks)

    # 순차 처리가 필요한 작업들
    comprehensive = await self._generate_comprehensive_analysis_async(request)
    summary = await self._generate_summary_analysis_async(request, comprehensive)
    compressed = await self._generate_compressed_version_async(summary)

    return FullAnalysisResponse(
        personal_info_section=personal_info,
        comprehensive_analysis=comprehensive,
        statistics_analysis=statistics,
        summary_analysis=summary,
        nutritionist_summary=nutritionist,
        compressed_version=compressed
    )
```

### 7.3 메모리 최적화
```python
class MemoryOptimizedAnalysisService:
    """메모리 최적화된 분석 서비스"""

    def __init__(self):
        self.max_cache_size = 100  # 최대 캐시 항목 수
        self._lru_cache = OrderedDict()

    def _get_cached_result(self, cache_key: str):
        """LRU 캐시에서 결과 조회"""
        if cache_key in self._lru_cache:
            # 최근 사용으로 이동
            self._lru_cache.move_to_end(cache_key)
            return self._lru_cache[cache_key]
        return None

    def _cache_result(self, cache_key: str, result: str):
        """결과를 LRU 캐시에 저장"""
        if len(self._lru_cache) >= self.max_cache_size:
            # 가장 오래된 항목 제거
            self._lru_cache.popitem(last=False)

        self._lru_cache[cache_key] = result

    def _generate_cache_key(self, request: HairAnalysisRequest) -> str:
        """요청 기반 캐시 키 생성"""
        import hashlib

        # 요청 데이터를 JSON으로 직렬화 후 해시 생성
        request_json = request.json(sort_keys=True)
        return hashlib.md5(request_json.encode()).hexdigest()
```

## 8. 에러 처리 및 로깅 설계

### 8.1 계층별 에러 처리
```python
class HairAnalysisException(Exception):
    """모발분석 관련 최상위 예외"""
    pass

class TemplateNotFoundException(HairAnalysisException):
    """템플릿을 찾을 수 없는 경우"""
    pass

class NoteFileNotFoundException(HairAnalysisException):
    """노트 파일을 찾을 수 없는 경우"""
    pass

class GrammarProcessingException(HairAnalysisException):
    """문법 처리 중 오류"""
    pass

# 에러 핸들러
@app.exception_handler(HairAnalysisException)
async def hair_analysis_exception_handler(request: Request, exc: HairAnalysisException):
    logger.error(f"Hair analysis error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=422,
        content={"detail": f"분석 처리 중 오류가 발생했습니다: {str(exc)}"}
    )

@app.exception_handler(FileNotFoundError)
async def file_not_found_handler(request: Request, exc: FileNotFoundError):
    logger.error(f"File not found: {str(exc)}")
    return JSONResponse(
        status_code=404,
        content={"detail": "필요한 템플릿 파일을 찾을 수 없습니다"}
    )
```

### 8.2 구조화된 로깅
```python
import structlog

# 구조화된 로거 설정
logger = structlog.get_logger()

class AnalysisLogger:
    """분석 과정 전용 로거"""

    def __init__(self, request_id: str):
        self.request_id = request_id
        self.logger = logger.bind(request_id=request_id)

    def log_analysis_start(self, analysis_type: str, conditions: dict):
        """분석 시작 로그"""
        self.logger.info(
            "analysis_started",
            analysis_type=analysis_type,
            conditions_count=len(conditions),
            has_special_notes=conditions.get('special_notes') != '없음'
        )

    def log_template_match(self, note_number: int, condition: str, found: bool):
        """템플릿 매칭 로그"""
        self.logger.info(
            "template_match_attempt",
            note_number=note_number,
            condition=condition,
            match_found=found
        )

    def log_analysis_complete(self, analysis_type: str, duration: float, result_length: int):
        """분석 완료 로그"""
        self.logger.info(
            "analysis_completed",
            analysis_type=analysis_type,
            duration_seconds=duration,
            result_length=result_length
        )

    def log_error(self, error: Exception, context: dict):
        """에러 로그"""
        self.logger.error(
            "analysis_error",
            error_type=type(error).__name__,
            error_message=str(error),
            context=context
        )
```

## 9. 테스트 설계

### 9.1 테스트 전략
```python
# 테스트 카테고리별 구조
tests/
├── unit/
│   ├── test_models.py              # Pydantic 모델 테스트
│   ├── test_template_matching.py   # 템플릿 매칭 로직 테스트
│   ├── test_korean_grammar.py      # 한국어 문법 처리 테스트
│   └── test_note5_logic.py         # Note 5 규칙 테스트
├── integration/
│   ├── test_analysis_services.py   # 서비스 통합 테스트
│   └── test_api_endpoints.py       # API 엔드포인트 테스트
├── fixtures/
│   ├── test_data.json             # 테스트 데이터
│   └── mock_notes/                # 테스트용 노트 파일들
└── conftest.py                    # pytest 설정
```

### 9.2 핵심 테스트 케이스
```python
class TestTemplateMatching:
    """템플릿 매칭 로직 테스트"""

    def test_complex_condition_priority(self):
        """복합 조건이 개별 조건보다 우선 적용되는지 테스트"""
        request = self.create_test_request(
            calcium="낮음",
            magnesium="낮음"
        )

        service = SimpleHairAnalysisService()
        result = service._find_matching_condition(self.mock_note_content, request)

        # 복합 조건 템플릿이 선택되었는지 확인
        assert "칼슘과 마그네슘이 동시에" in result
        assert "개별적으로" not in result

    def test_age_specific_conditions(self):
        """연령별 조건 처리 테스트"""
        # 10세 이하 테스트
        request = self.create_test_request(age=8, sodium="높음", potassium="낮음")
        result = service._generate_personal_info_section(request.personal_info)
        assert "성장기" in result

        # 성인 테스트
        request = self.create_test_request(age=35)
        result = service._generate_personal_info_section(request.personal_info)
        assert "성인" in result

class TestKoreanGrammar:
    """한국어 문법 처리 테스트"""

    def test_particle_correction(self):
        """조사 자동 교정 테스트"""
        service = SimpleHairAnalysisService()

        # 받침 있는 경우
        result = service._improve_korean_grammar("칼슘을/를 섭취하세요")
        assert result == "칼슘을 섭취하세요"

        # 받침 없는 경우
        result = service._improve_korean_grammar("비타민을/를 복용하세요")
        assert result == "비타민을 복용하세요"

    def test_redundant_expression_removal(self):
        """중복 표현 제거 테스트"""
        text = "유해 중금속은 모두 정상 수치 입니다. 영양 미네랄은 모두 정상 수치입니다."
        service = SimpleHairAnalysisService()
        result = service._improve_korean_grammar(text)
        assert result == "유해 중금속과 영양 미네랄은 모두 정상 수치입니다."

class TestNote5Logic:
    """Note 5 규칙 구현 테스트"""

    def test_food_extraction_exactly_five(self):
        """음식 추천이 정확히 5개인지 테스트"""
        comprehensive_text = "브로콜리, 시금치, 견과류, 연어, 달걀을 추천합니다."
        service = SimpleHairAnalysisService()
        foods = service._extract_recommended_foods_from_comprehensive(comprehensive_text)
        assert len(foods) == 5

    def test_supplement_extraction_from_comprehensive(self):
        """종합 분석에서 언급된 영양제만 추출하는지 테스트"""
        comprehensive_text = "비타민D와 오메가3 보충을 권장합니다."
        service = SimpleHairAnalysisService()
        supplements = service._extract_mentioned_supplements(comprehensive_text)
        assert "비타민D" in supplements
        assert "오메가3" in supplements
        assert len([s for s in supplements if s not in comprehensive_text]) == 0
```

## 10. 배포 및 모니터링 설계

### 10.1 컨테이너화 설계
```dockerfile
# Dockerfile (Backend)
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./notes:/app/notes:ro
    environment:
      - LOG_LEVEL=info

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:8000
```

### 10.2 모니터링 설계
```python
# 헬스체크 엔드포인트
@app.get("/health")
async def health_check():
    """시스템 상태 확인"""

    health_status = {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "checks": {}
    }

    # 노트 파일 존재 확인
    note_files_ok = all(
        os.path.exists(path)
        for path in SimpleHairAnalysisService().note_paths.values()
    )
    health_status["checks"]["note_files"] = "ok" if note_files_ok else "error"

    # 메모리 사용량 확인
    import psutil
    memory_usage = psutil.virtual_memory().percent
    health_status["checks"]["memory"] = {
        "status": "ok" if memory_usage < 80 else "warning",
        "usage_percent": memory_usage
    }

    # 전체 상태 결정
    if any(check == "error" for check in health_status["checks"].values()):
        health_status["status"] = "unhealthy"

    return health_status

# 메트릭 수집
class MetricsCollector:
    """성능 메트릭 수집기"""

    def __init__(self):
        self.request_count = 0
        self.error_count = 0
        self.response_times = []

    def record_request(self, duration: float, success: bool):
        """요청 메트릭 기록"""
        self.request_count += 1
        if not success:
            self.error_count += 1
        self.response_times.append(duration)

        # 최근 100개 요청만 유지
        if len(self.response_times) > 100:
            self.response_times = self.response_times[-100:]

    def get_metrics(self) -> dict:
        """현재 메트릭 반환"""
        if not self.response_times:
            return {"error": "No data available"}

        return {
            "total_requests": self.request_count,
            "error_rate": self.error_count / self.request_count,
            "avg_response_time": sum(self.response_times) / len(self.response_times),
            "max_response_time": max(self.response_times),
            "min_response_time": min(self.response_times)
        }
```

이로써 큐모발검사 종합멘트 자동 생성 시스템의 완전한 기술 설계 문서가 완성되었습니다. 이 문서는 실제 구현된 시스템을 역분석하여 작성된 것으로, 향후 시스템 확장이나 유지보수 시 참고할 수 있는 포괄적인 기술 가이드 역할을 할 것입니다.