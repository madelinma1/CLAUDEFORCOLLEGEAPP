/**
 * Two build modes:
 *  - Default (server): keeps the /api/ai route so live Claude works on a Node host.
 *  - GitHub Pages (GITHUB_PAGES=true): static export under the repo's basePath.
 *    Pages is static-only, so the AI route is dropped in CI and every AI surface
 *    falls back to its deterministic built-in answer.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isPages
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath || undefined,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
