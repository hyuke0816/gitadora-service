# Gitadora Service

기타도라 플레이어들을 위한 스킬 분석 및 성과 관리 서비스입니다.

## 주요 기능

- **스킬 시뮬레이터 & 트래킹**
  - 스킬 포인트(Hot/Other) 자동 계산
  - 플레이 기록 저장 및 시각화
  - 스킬 변동 이력 조회
- **곡 데이터베이스**
  - 곡 검색 및 상세 정보 조회
  - 시리즈별 난이도/레벨 정보 제공
  - 아티스트 및 태그별 분류
- **데이터 업로드**
  - 북마크릿을 이용한 공식 홈페이지 데이터 간편 업로드 (`public/js/uploaddata.js`)
- **커뮤니티 & 유저 기능**
  - 곡/아티스트 코멘트 작성
  - S-Random Tower 등 특수 콘텐츠
  - 유저 랭킹 시스템
- **관리자(Admin) 도구**
  - 곡, 아티스트, 이벤트, 태그 데이터 관리

## 기술 스택

### Frontend & Framework

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query)
- **HTTP Client**: [Ky](https://github.com/sindresorhus/ky)

### Backend & Database

- **Database**: MySQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev/)

### ETC

- **I18n**: [next-intl](https://next-intl-docs.vercel.app/) (다국어 지원)
- **Icons**: Lucide React
- **UI Components**: Shadcn UI 기반 (추정)

## 설치 및 실행 (Getting Started)

### 1. 프로젝트 클론 및 의존성 설치

```bash
git clone https://github.com/hyuke0816/gitadora-service.git
cd gitadora-service
npm install
# or
yarn install
```

### 2. 환경 변수 설정 (.env)

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정해야 합니다.

```env
# Database
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

# API & Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:30001"
NEXT_PUBLIC_API_BASE_URL="http://localhost:30001/api"
```

### 3. 데이터베이스 설정

Prisma를 사용하여 데이터베이스 스키마를 동기화하고 시드 데이터를 넣습니다.

```bash
# DB 스키마 동기화
npx prisma generate
npx prisma db push

# (선택) 시드 데이터 주입
npm run db:seed
```

### 4. 개발 서버 실행

```bash
npm run dev
# https로 실행 시
npm run dev:https
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 확인합니다.

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router 페이지 및 API 라우트
│   ├── (auth)/       # 로그인 등 인증 관련
│   ├── admin/        # 관리자 페이지 (곡/아티스트 관리 등)
│   ├── api/          # 백엔드 API 엔드포인트
│   ├── user/         # 사용자 페이지 (스킬, 리스트, 보드 등)
│   └── ...
├── components/       # 공통 UI 컴포넌트
├── entities/         # 도메인별 엔티티 (Auth, Songs, Users 등) - FSD 아키텍처 일부 적용
├── features/         # 기능별 모듈 (SongCreate, VersionUpdate 등)
├── shared/           # 공유 유틸리티, 설정, 라이브러리 (Prisma, Config 등)
├── messages/         # 다국어(i18n) JSON 파일
└── middleware.ts     # Next.js 미들웨어
```
