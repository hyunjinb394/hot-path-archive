import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages에 정적 파일로 배포한다 (서버 없음)
  output: "export",
  // /posts/slug → /posts/slug/index.html 로 내보내 Pages에서 그대로 서빙되게 한다
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
