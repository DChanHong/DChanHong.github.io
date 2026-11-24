# 성찬홍의 개발 기록

포트폴리오와 같은 흑백 톤, 큰 제목, 연회색 프로젝트 카드로 구성한 Markdown 블로그입니다. Eleventy로 정적 HTML을 생성하며 DB를 사용하지 않습니다.

## 로컬 실행

Node.js 20 이상에서 실행합니다.

```sh
npm ci
npm run dev
```

http://localhost:8088 에서 확인합니다. 개발 모드에서는 `draft: true` 글도 미리 볼 수 있습니다.

## 글 작성

`src/posts/글주소.md`에 Markdown 파일을 추가합니다.

```yaml
---
title: "글 제목"
description: "글을 소개하는 한두 문장"
date: 2026-11-24
category: "AI Agent"
topic: agent
draft: true
---
```

본문은 위 정보 아래에 작성합니다. 분류 `topic`은 `agent`, `backend`, `ops`를 사용합니다. 글 주소는 `/posts/파일명/`입니다. 공개할 때만 `draft: false`로 변경하세요. 원문 이전 시 작성일을 보존하고, 필요하면 `updated`와 `originalUrl`을 추가합니다. 이미지는 `src/assets/images/`에 넣고 `/assets/images/파일명.png`로 참조합니다.

## 확인·빌드

```sh
npm run check
```

`_site/`에 공개 파일을 생성합니다. 작성안은 페이지·글 목록·사이트맵에서 제외합니다. `_site`는 매 빌드 전에 지워 오래된 작성안이 남지 않도록 합니다.

## 현재 단계

- 메인, 글 상세, 분류 필터, 라이트/다크 모드, 404 구현
- KBO Mate LangGraph/Context 글 1개 시험 이전 완료. 본문·작성일·수정일 보존, 이미지 1개 로컬 보관
- 이전 기록: `docs/migrations/langgraph-context.json`
- 아직 이전하지 않은 이전 글 링크는 Velog 원문 유지
- 상세 화면 확인용 `writing-guide.md`는 미발행 샘플
- `main`에 푸시하면 GitHub Actions가 검증 후 `_site/`만 Pages에 배포
- 공개 주소: https://dchanhong.github.io/
- 이후 작업: 나머지 Velog 글 순차 이전 및 필요 시 사용자 도메인 연결

## 주요 파일

- `src/index.njk`: 메인 화면
- `src/_includes/base.njk`: 공통 레이아웃
- `src/_includes/post.njk`: 글 상세
- `src/assets/style.css`: 디자인
- `src/_data/site.json`: 사이트 정보와 기본 주소

## GitHub Pages 배포

저장소 Settings → Pages의 Source는 **GitHub Actions**를 사용합니다.
`.github/workflows/deploy.yml`이 Node.js 22에서 `npm ci`, `npm run check`를 실행하고 검증한 `_site/`만 배포합니다. `draft: true` 글은 공개 사이트에서 제외되지만, 소스 저장소는 Public이므로 커밋한 Markdown 원문은 GitHub에서 열람할 수 있습니다. 비공개 메모·개인정보는 이 저장소에 커밋하지 마세요.

배포 상태는 저장소 Actions에서 확인하고, 수동 재배포는 해당 워크플로의 Run workflow를 사용합니다. 커스텀 도메인은 아직 설정하지 않았습니다.
