import * as runtime from "react/jsx-runtime";
import type { ElementType, ReactNode } from "react";

type MDXComponents = Record<string, ElementType>;
type MDXModule = { default: (props: { components?: MDXComponents }) => ReactNode };

// 글 안에서 쓸 인터랙티브 컴포넌트는 여기에 등록한다
const components: MDXComponents = {};

/**
 * velite가 컴파일한 MDX 함수 본문을 빌드 시점(서버 컴포넌트)에 실행해 렌더링한다.
 * 렌더마다 새 컴포넌트 타입을 만들지 않도록 JSX로 감싸지 않고 함수로 바로 호출한다.
 */
export function MDXContent({ code }: { code: string }) {
  const mdx = new Function(code)({ ...runtime }) as MDXModule;
  return mdx.default({ components });
}
