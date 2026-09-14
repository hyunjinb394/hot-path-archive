@AGENTS.md

# hot path archive

그때 가장 많이 시간을 쓴 관심사를 파고든 기록. 이름은 가장 자주 실행되는 코드 경로를 뜻하는 hot path에서 따왔다. Next.js App Router 정적 export + MDX(velite), Cloudflare Pages 배포.

## 명령

- `pnpm dev` — velite(글 감시) + next dev (http://localhost:3100, 3000은 다른 프로젝트와 겹쳐서 피함)
- `pnpm new` — 새 글 파일 생성 (`content/posts/<slug>/index.mdx`, `draft: true`)
- `pnpm build` — velite build → next build (정적 `out/`)
- `pnpm test` / `pnpm lint` / `pnpm typecheck`

## 글

- `content/posts/<slug>/index.mdx`. 속성: `title`, `date`, `type`(post | til), `category`(하나), `tags`, `summary`, `draft`. 스키마는 `velite.config.ts`.
- 이미지는 글 폴더에 두고 `./이미지.jpg`로 참조하면 빌드 때 `public/static/`으로 복사된다.
- MDX라 `<br>` 같은 태그는 `<br />`로 닫아야 한다.
- 글은 작성자가 직접 쓴다. 글 본문을 AI로 대신 쓰지 않는다.

## 규칙

- 글 목록 계산(공개 필터·정렬·이전/다음 글·카테고리 집계)은 `src/lib/posts.ts` 순수 함수에 둔다 (테스트: `posts.test.ts`).
- 정적 export(`output: "export"`)라 서버 기능(Server Actions, rewrites, 쿠키 등)은 쓸 수 없다.
