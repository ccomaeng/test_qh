# 🚀 배포 가이드 - 민감한 데이터 보호

## 🔒 민감한 데이터 보호 방안

5개 참조 노트 파일을 GitHub에 공개하지 않고 배포하는 방법입니다.

## 방법 1: 환경변수 사용 (Vercel/Render) ⭐ 추천

### 1단계: 노트 파일을 Base64로 인코딩

```bash
# 각 노트 파일을 Base64로 인코딩
base64 backend/app/data/note1_basic.md > note1_encoded.txt
base64 backend/app/data/note2_heavy_metals.md > note2_encoded.txt
# ... 나머지 파일들도 동일하게
```

### 2단계: 배포 플랫폼에 환경변수 설정

**Render/Railway/Heroku:**
```
NOTE1_CONTENT=인코딩된내용붙여넣기
NOTE2_CONTENT=인코딩된내용붙여넣기
NOTE3_CONTENT=인코딩된내용붙여넣기
NOTE4_CONTENT=인코딩된내용붙여넣기
NOTE5_CONTENT=인코딩된내용붙여넣기
```

### 3단계: 코드 수정

`backend/app/services/analysis_service.py` 수정:
```python
from .secure_data_loader import SecureDataLoader

# 기존 파일 읽기 대신
notes_data = SecureDataLoader.load_notes()
```

## 방법 2: 프라이빗 S3 버킷 사용 (AWS)

### 1단계: AWS S3 버킷 생성
- 프라이빗 버킷 생성
- `notes/` 폴더에 5개 노트 파일 업로드

### 2단계: 환경변수 설정
```
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_BUCKET_NAME=your-bucket-name
```

### 3단계: 필요 패키지 추가
```bash
pip install boto3
```

## 방법 3: 배포 후 수동 업로드

### 1단계: 배포 시 빈 파일 생성
```python
# backend/app/data/에 더미 파일 생성
touch backend/app/data/note{1..5}_dummy.md
```

### 2단계: 배포 후 관리자 API로 업로드
```python
# 관리자 전용 엔드포인트 생성
@app.post("/admin/upload-notes")
async def upload_notes(notes: Dict[str, str], api_key: str):
    if api_key != os.getenv("ADMIN_API_KEY"):
        raise HTTPException(status_code=401)
    # 노트 저장 로직
```

## 📋 GitHub 업로드 절차

### 1. 민감한 파일 제외 확인
```bash
# .gitignore 확인 - 노트 파일이 제외되는지 확인
git status
# note1_basic.md ~ note5_summary.md가 표시되지 않아야 함
```

### 2. 커밋 생성
```bash
git add .
git commit -m "Initial commit - 민감한 데이터 제외"
```

### 3. GitHub 저장소 생성 & 푸시
```bash
git remote add origin https://github.com/[username]/[repo-name].git
git push -u origin main
```

## 🌐 배포 플랫폼별 가이드

### Frontend (Vercel)
1. GitHub 저장소 연결
2. Root Directory: `frontend`
3. 환경변수: `VITE_API_URL=https://your-backend.com`

### Backend (Render)
1. GitHub 저장소 연결
2. Root Directory: `backend`
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. 환경변수 추가:
   - `NOTE1_CONTENT` ~ `NOTE5_CONTENT` (Base64 인코딩된 내용)
   - `CORS_ORIGINS` (Frontend URL)

### 대안: Docker + 프라이빗 레지스트리
```dockerfile
# Dockerfile에서 노트 파일 복사
COPY --from=secrets /notes/*.md /app/data/
```

## ⚠️ 보안 체크리스트

- [ ] 노트 파일이 `.gitignore`에 포함되어 있는가?
- [ ] 환경변수가 설정되어 있는가?
- [ ] CORS 설정이 프로덕션 도메인으로 되어 있는가?
- [ ] API 키/비밀번호가 코드에 하드코딩되지 않았는가?
- [ ] 관리자 API에 인증이 적용되어 있는가?

## 📞 문제 발생 시

1. 로컬에서 먼저 테스트 (`NOTE1_CONTENT=... python main.py`)
2. 로그 확인 (어떤 소스에서 노트를 로드했는지)
3. 환경변수 확인 (배포 플랫폼 대시보드)