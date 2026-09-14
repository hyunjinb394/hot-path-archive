/**
 * 새 글 파일을 속성 틀과 함께 만든다.
 *   pnpm new
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = createInterface({ input: stdin, output: stdout });

const ask = async (question: string, fallback = "") => {
  const answer = (await rl.question(fallback ? `${question} (${fallback}): ` : `${question}: `)).trim();
  return answer || fallback;
};

/** 기존 글들의 category 값 */
function existingCategories() {
  const dir = "content/posts";
  if (!existsSync(dir)) return [];
  const found = new Set<string>();
  for (const slug of readdirSync(dir)) {
    const file = `${dir}/${slug}/index.mdx`;
    if (!existsSync(file)) continue;
    const match = readFileSync(file, "utf8").match(/^category:\s*"?(.+?)"?\s*$/m);
    if (match) found.add(match[1]);
  }
  return [...found];
}

async function main() {
  const slug = await ask("주소에 쓸 영문 이름 (예: idempotent-payment)");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    console.error("영문 소문자, 숫자, 하이픈만 쓸 수 있어요.");
    process.exit(1);
  }
  const dir = `content/posts/${slug}`;
  if (existsSync(dir)) {
    console.error(`${dir}가 이미 있어요.`);
    process.exit(1);
  }

  const title = await ask("제목");
  const type = (await ask("종류 post / til", "post")) === "til" ? "til" : "post";
  const categories = existingCategories();
  if (categories.length > 0) console.log(`기존 카테고리: ${categories.join(", ")}`);
  const category = await ask("카테고리");
  const tags = (await ask("태그 (쉼표로 구분, 없으면 엔터)"))
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const summary = await ask("한 줄 요약");
  rl.close();

  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 19);

  mkdirSync(dir, { recursive: true });
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `date: ${kst}+09:00`,
    `type: ${type}`,
    `category: ${JSON.stringify(category)}`,
    `tags: ${JSON.stringify(tags)}`,
    `summary: ${JSON.stringify(summary)}`,
    "draft: true",
    "---",
    "",
    "",
  ].join("\n");
  writeFileSync(`${dir}/index.mdx`, frontmatter);

  console.log(`\n✍️  ${dir}/index.mdx 를 만들었어요. 다 쓰면 draft: false로 바꾸세요.`);
}

main();
