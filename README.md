# KAU Trash Network (Frontend)

한국항공대학교 캠퍼스 내 실시간 쓰레기통 모니터링 및 관리 시스템의 웹 애플리케이션입니다.

## 프로젝트 개요

ESP32와 AWS IoT를 활용하여 캠퍼스 내 쓰레기통의 상태를 실시간으로 모니터링하고 관리하는 시스템입니다. 각 쓰레기통의 용량과 화재 감지 상태를 실시간으로 확인할 수 있으며, 데이터 분석을 통한 효율적인 수거 일정 관리를 지원합니다.

### 주요 기능

- **실시간 모니터링**
  - 쓰레기통 용량 실시간 확인
  - 화재 감지 상태 모니터링
  - 배터리 잔량 확인
  - 실시간 상태 업데이트

- **데이터 분석**
  - 용량 변화 추이 분석
  - 위치별 사용량 통계
  - 수거 패턴 분석

- **관리 기능**
  - 쓰레기통 정보 관리
  - 수거 일정 관리
  - 알림 설정

## 기술 스택

- **Frontend Framework**
  - React
  - TypeScript
  - Tailwind CSS

- **상태 관리**
  - Zustand

- **UI 컴포넌트**
  - shadcn/ui
  - lucide-react (아이콘)
  - react-router-dom (라우팅)

- **API 통신**
  - Axios
  - AWS API Gateway 연동

## 시작하기

### 필수 조건
- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/hwouu/trash-network-frontend.git

# 디렉토리 이동
cd trash-network-frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
REACT_APP_API_URL=https://your-api-gateway-url.amazonaws.com/prod
```

## 프로젝트 구조

```
src/
├── components/      # 재사용 가능한 컴포넌트
├── hooks/          # 커스텀 훅
├── pages/          # 페이지 컴포넌트
├── services/       # API 서비스
├── store/          # 상태 관리
├── types/          # TypeScript 타입 정의
└── utils/          # 유틸리티 함수
```

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 팀 소개

- **Frontend & Cloud**
  - 노현우 ([@hwouu](https://github.com/hwouu))

- **Backend & Cloud**
  - 김강연 ([@kangyeon9525](https://github.com/kangyeon9525))
  - 표형민 ([@pyohm](https://github.com/pyohm))

- **Hardware & IoT**
  - 송준수 ([@songsare1225](https://github.com/songsare1225))

## 라이선스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 관련 저장소

- [Backend Repository](https://github.com/hwouu/trash-network-backend)
- [Hardware Repository](https://github.com/hwouu/trash-network-hardware)
