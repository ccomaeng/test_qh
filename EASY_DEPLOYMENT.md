# 🚀 초간단 무료 배포 가이드 (비개발자용)

## 📌 추천 방법: Vercel (무료)로 한번에 배포

**장점**:
- ✅ 완전 무료
- ✅ 클릭 몇 번으로 배포 완료
- ✅ 자동 HTTPS 제공
- ✅ 한국에서 빠른 속도

## 📝 준비물
1. GitHub 계정 (무료)
2. Vercel 계정 (무료)
3. 5개 노트 파일 내용

---

## 🔧 STEP 1: GitHub에 코드 올리기

### 1-1. GitHub 가입 (이미 있으면 스킵)
- https://github.com 접속
- Sign up 클릭하여 가입

### 1-2. 새 저장소 만들기
1. GitHub 로그인 후 우측 상단 `+` 클릭
2. `New repository` 클릭
3. Repository name: `hair-analysis-app` 입력
4. Public 선택 (무료)
5. `Create repository` 클릭

### 1-3. 코드 업로드
터미널에서:
```bash
cd /Users/yujineom/Tmp/qhq_total/hair_analysis_app
git commit -m "Initial commit"
git remote add origin https://github.com/[귀하의GitHub아이디]/hair-analysis-app.git
git push -u origin main
```

---

## 🚀 STEP 2: Vercel에 배포하기

### 2-1. Vercel 가입
1. https://vercel.com 접속
2. `Sign Up` → `Continue with GitHub` 클릭
3. GitHub 계정으로 로그인

### 2-2. 프로젝트 Import
1. Vercel 대시보드에서 `Add New...` → `Project` 클릭
2. `Import Git Repository`에서 방금 만든 `hair-analysis-app` 선택
3. `Import` 클릭

### 2-3. 배포 설정
**⚠️ 중요: 다음 설정을 정확히 입력하세요**

1. **Framework Preset**: `Vite` 선택
2. **Root Directory**: `frontend` 입력
3. **Build Command**: (기본값 그대로)
4. **Output Directory**: (기본값 그대로)

### 2-4. 환경변수 설정 (가장 중요! 🔴)

`Environment Variables` 섹션에서 `Add` 클릭하여 다음 추가:

#### API 서버 URL (필수)
- Name: `VITE_API_URL`
- Value: `https://hair-analysis-backend.vercel.app/api`

#### 노트 데이터 추가 (5개 모두 필수)

**NOTE1_CONTENT** 추가:
1. 메모장에 `backend/app/data/note1_basic.md` 파일 내용 전체 복사
2. https://www.base64encode.org/ 접속
3. 복사한 내용 붙여넣고 `ENCODE` 클릭
4. 인코딩된 결과 복사
5. Vercel에서:
   - Name: `NOTE1_CONTENT`
   - Value: (인코딩된 내용 붙여넣기)

**NOTE2_CONTENT ~ NOTE5_CONTENT도 동일하게 반복**

### 2-5. 배포 시작
1. 모든 환경변수 입력 완료 후 `Deploy` 클릭
2. 약 2-3분 기다리기
3. 완료되면 URL 제공됨 (예: https://your-app.vercel.app)

---

## 🔧 STEP 3: 백엔드 API 배포

### 3-1. Vercel에 백엔드용 프로젝트 하나 더 생성
1. Vercel 대시보드에서 `Add New...` → `Project`
2. 같은 저장소 `hair-analysis-app` 선택
3. `Import` 클릭

### 3-2. 백엔드 설정
1. **Framework Preset**: `Other` 선택
2. **Root Directory**: `backend` 입력
3. **Build Command**: `pip install -r requirements.txt`

### 3-3. 환경변수 설정
위에서 인코딩한 NOTE1_CONTENT ~ NOTE5_CONTENT 5개 모두 다시 추가

### 3-4. 배포
`Deploy` 클릭

---

## ✅ STEP 4: 최종 연결

### 4-1. 백엔드 URL 확인
백엔드 배포 완료 후 URL 확인 (예: https://hair-backend.vercel.app)

### 4-2. 프론트엔드 환경변수 수정
1. 프론트엔드 Vercel 프로젝트로 이동
2. Settings → Environment Variables
3. `VITE_API_URL` 값을 백엔드 URL로 수정
4. Deployments 탭 → 점 3개 메뉴 → Redeploy

---

## 🎉 완료!

이제 `https://your-app.vercel.app` 에서 서비스를 이용할 수 있습니다!

---

## ❓ 자주 묻는 질문

### Q: Base64 인코딩이 어려워요
A: 노트 파일 내용을 이메일로 보내주시면 인코딩해드립니다.

### Q: 환경변수가 너무 길어요
A: Vercel은 긴 환경변수도 지원합니다. 그대로 붙여넣으세요.

### Q: 배포 실패했어요
A: Build logs를 확인하고 오류 메시지를 복사해서 문의하세요.

### Q: 속도가 느려요
A: 첫 접속은 느릴 수 있습니다. 두 번째부터는 빨라집니다.

---

## 💡 더 쉬운 대안: Netlify

Vercel이 어려우면 Netlify도 좋습니다:
1. https://www.netlify.com
2. GitHub 연동
3. 자동 배포
4. 환경변수 설정 동일

---

## 📞 도움 요청

막히는 부분이 있으면:
1. 오류 메시지 스크린샷
2. 어느 단계에서 막혔는지
3. 카카오톡 채널로 문의